import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";
import { tw } from "twind";
import { css } from "twind/css";
import IconSettings from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/settings.tsx";
import { Message } from "../utils/type.ts";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";
import { SettingModal } from "./SettingModal.tsx";
import { getRandomColorCode } from "../utils/color.ts";

const ChatWrapper = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatBoxWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: end;
  height: 100vh;
  overflow-y: hidden;
`;

const ChatBox = css`
color: white;
width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  -ms-overflow-style: none;
`;

const InputArea = css`
  display: flex;
  width: 100%;
`;

const ConnectionState = {
  Connecting: 0,
  Open: 1,
  Close: 2,
} as const;

type SettingsStorage = {
  userName: string;
  userColor: string;
} | null;

export function Chat() {
  const connectionState = useSignal<number>(ConnectionState.Close);
  const inputMessage = useSignal("");
  const receivedMessages = useSignal<Message[]>([]);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const isOpenSettingModal = useSignal(false);
  const settingsStorage = IS_BROWSER
    ? window.localStorage.getItem("memecoPrisonSettings")
    : null;
  const settings: SettingsStorage = settingsStorage
    ? JSON.parse(settingsStorage)
    : null;
  const userName = useSignal(
    settings?.userName ?? "囚人",
  );
  const userColor = useSignal(settings?.userColor ?? getRandomColorCode());
  const sendTime = useSignal<{ timestamp: Date; message: string }[]>([]);

  const sendMessage = async (msg: string) => {
    if (msg === "") {
      return;
    }
    // 文字数制限
    if (msg.length >= 500) {
      alert("上限の500文字に到達しています");
      return;
    }
    // 連投抑制
    if (sendTime.value.length > 0) {
      const isSameMessage = sendTime.value.some((prevMsg) =>
        prevMsg.message === msg
      );
      const currentTime = new Date().getTime();
      const targetPrevContent = sendTime.value.find((content) =>
        content.message === msg
      );
      if (targetPrevContent) {
        const millisecondsDifference = currentTime -
          targetPrevContent.timestamp.getTime();
        const isOver30Seconds = (millisecondsDifference / 1000) <= 30;
        if (isOver30Seconds && isSameMessage) {
          alert("30以内に同じコメントは送信できません");
          return;
        }
      }
    }

    // コメントを送信した時間と文字列を格納
    sendTime.value = [
      {
        timestamp: new Date(),
        message: msg,
      },
      ...sendTime.value.splice(0, 4),
    ];
    await fetch(`${location.origin}/api/message/send`, {
      method: "POST",
      body: JSON.stringify({
        message: msg,
        userName: userName.value,
        userColor: userColor.value,
      }),
    });
    inputMessage.value = "";
  };

  const handleKeyDown = (
    e: JSX.TargetedKeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.isComposing || e.key === "Process" || e.keyCode === 229) {
      // IME入力中
      return;
    } else {
      e.key === "Enter" && sendMessage(e.currentTarget.value);
    }
  };

  useEffect(() => {
    const events = new EventSource("/api/message/listen");
    events.addEventListener(
      "open",
      () => connectionState.value = EventSource.OPEN,
    );
    events.addEventListener("error", () => {
      switch (events.readyState) {
        case EventSource.CONNECTING:
          connectionState.value = EventSource.CONNECTING;
          break;
        case EventSource.OPEN:
          connectionState.value = EventSource.OPEN;
          break;
        case EventSource.CLOSED:
          connectionState.value = EventSource.CLOSED;
          break;
        default:
          break;
      }
    });
    events.addEventListener("message", (e) => {
      const message = JSON.parse(e.data);
      receivedMessages.value = [...receivedMessages.value, message];
    });
  }, []);

  // 自動スクロール
  useEffect(() => {
    scrollElementRef.current?.scroll(
      0,
      scrollElementRef.current?.scrollHeight ?? 0,
    );
  }, [receivedMessages.value]);

  return (
    <section class={tw(ChatWrapper)}>
      <div class={tw(ChatBoxWrapper)}>
        <div class={tw(ChatBox)} ref={scrollElementRef}>
          {receivedMessages.value.map((msg) => (
            <div>
              <span class={`text-[${msg.userColor}]`}>{msg.userName}</span>
              {": "}
              <span>{msg.body}</span>
            </div>
          ))}
        </div>
      </div>
      <div class={tw(InputArea)}>
        <Input
          class="flex-grow"
          type="text"
          placeholder="メッセージを送信"
          value={inputMessage.value}
          onChange={(e) => inputMessage.value = e.currentTarget.value}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => sendMessage(inputMessage.value)} class="text-sm">
          {connectionState.value === 0 && "接続中"}
          {connectionState.value === 1 && "チャット"}
          {connectionState.value === 2 && "接続切れ"}
        </Button>
        <Button
          onClick={() => isOpenSettingModal.value = !isOpenSettingModal.value}
        >
          <IconSettings />
        </Button>
        {isOpenSettingModal.value && (
          <SettingModal
            userName={userName}
            userColor={userColor}
            isOpen={isOpenSettingModal}
          />
        )}
      </div>
    </section>
  );
}
