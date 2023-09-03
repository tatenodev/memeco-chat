import { tw } from "twind";
import { css } from "twind/css";
import { Input } from "../components/Input.tsx";
import { Signal, useSignal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { Button } from "../components/Button.tsx";
import IconSettings from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/settings.tsx";
import { SettingModal } from "./SettingModal.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { getRandomColorCode } from "../utils/color.ts";

const InputArea = css`
  display: flex;
  width: 100%;
`;

type SettingsStorage = {
  userName: string;
  userColor: string;
} | null;

type PasswordStorage = {
  password: string;
} | null;

type ChatInputAreaProps = {
  connectionState: Signal<number>;
};

export const ChatInputArea = ({ connectionState }: ChatInputAreaProps) => {
  const passwordStorage = IS_BROWSER
    ? window.localStorage.getItem("memecoPrisonPassword")
    : null;
  const settingsStorage = IS_BROWSER
    ? window.localStorage.getItem("memecoPrisonSettings")
    : null;
  const password: PasswordStorage = passwordStorage
    ? JSON.parse(passwordStorage)
    : null;
  const settings: SettingsStorage = settingsStorage
    ? JSON.parse(settingsStorage)
    : null;
  const canMessageSent = useSignal(false);
  const localToken = useSignal("");
  const inputMessage = useSignal("");
  const userName = useSignal(settings?.userName ?? "囚人");
  const userColor = useSignal(settings?.userColor ?? getRandomColorCode());
  const lastTimeSend = useSignal<{ timestamp: Date; message: string }[]>([]);
  const isOpenSettingModal = useSignal(false);

  const checkPassword = async () => {
    const password = prompt("めめちゃんからパスワードを教えてもらってね");
    if (!password) {
      return alert("パスワードを入力してね");
    }
    const result = await fetch(`${location.origin}/api/check`, {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    if (result.status === 401) {
      return alert("パスワードが違うよ");
    }
    canMessageSent.value = true;
    localToken.value = password;
    window.localStorage.setItem(
      "memecoPrisonPassword",
      JSON.stringify({ password }),
    );
  };

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
    if (lastTimeSend.value.length > 0) {
      const isSameMessage = lastTimeSend.value.some((prevMsg) =>
        prevMsg.message === msg
      );
      const currentTime = new Date().getTime();
      const targetPrevContent = lastTimeSend.value.find((content) =>
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
    lastTimeSend.value = [
      {
        timestamp: new Date(),
        message: msg,
      },
      ...lastTimeSend.value.splice(0, 4),
    ];
    await fetch(`${location.origin}/api/message/send`, {
      method: "POST",
      body: JSON.stringify({
        token: password?.password,
        message: msg,
        userName: userName.value,
        userColor: userColor.value,
      }),
    }).then((res) => {
      if (res.status === 401) {
        alert("パスワードが違います");
        checkPassword();
      }
    }).catch((err) => {
      alert("メッセージを送信できませんでした。");
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

  return (
    <div class={tw(InputArea)}>
      {/* localStorageにpasswordが設定されているかSignalの値がtrueだったらメッセージ送信可能 */}
      {/* passwordが正しいかどうかはメッセージ送信時に確認 */}
      {password?.password || canMessageSent.value
        ? (
          // メッセージ送信用
          <Input
            class="flex-grow"
            type="text"
            placeholder="メッセージを送信"
            value={inputMessage.value}
            onChange={(e) => inputMessage.value = e.currentTarget.value}
            onKeyDown={handleKeyDown}
          />
        )
        : (
          // パスワードチェック用
          <Input
            class="flex-grow"
            type="text"
            placeholder="メッセージを送信"
            onClick={checkPassword}
            onKeyDown={(e) => e.key === "Enter" && checkPassword()}
          />
        )}
      <Button onClick={() => sendMessage(inputMessage.value)} class="text-sm">
        {connectionState.value === 1 ? "チャット" : "接続中..."}
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
  );
};
