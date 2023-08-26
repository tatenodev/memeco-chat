import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { JSX } from "preact";
import { Message } from "../utils/type.ts";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";

const ConnectionState = {
  Connecting: 0,
  Connected: 1,
  Disconnected: 2,
} as const;

export function Chat() {
  const connectionState = useSignal<number>(ConnectionState.Disconnected);
  const inputMessage = useSignal("");
  const receivedMessages = useSignal<Message[]>([]);

  const sendMessage = async (msg: string) => {
    if (msg === "") {
      return;
    }
    await fetch(`${location.origin}/api/message/send`, {
      method: "POST",
      body: JSON.stringify({ message: msg }),
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
      () => connectionState.value = EventSource.CONNECTING,
    );
    events.addEventListener("error", () => {
      switch (events.readyState) {
        case EventSource.OPEN:
          connectionState.value = EventSource.OPEN;
          break;
        case EventSource.CONNECTING:
          connectionState.value = EventSource.CONNECTING;
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

  return (
    <div class="w-full">
      {receivedMessages.value.map((msg) => <div>{msg.body}</div>)}
      <div class="flex">
        <Input
          class="flex-grow"
          type="text"
          placeholder="メッセージを送信"
          value={inputMessage.value}
          onChange={(e) => inputMessage.value = e.currentTarget.value}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => sendMessage(inputMessage.value)}>
          チャット
        </Button>
      </div>
    </div>
  );
}
