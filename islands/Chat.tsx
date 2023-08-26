import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Message } from "../utils/type.ts";

const ConnectionState = {
  Connecting: 0,
  Connected: 1,
  Disconnected: 2,
} as const;

export function Chat() {
  const connectionState = useSignal<number>(ConnectionState.Disconnected);
  const inputMessage = useSignal("");
  const receivedMessages = useSignal<Message[]>([]);

  const sendHandler = async (msg: string) => {
    if (msg === "") {
      return;
    }
    await fetch(`${location.origin}/api/message/send`, {
      method: "POST",
      body: JSON.stringify({ message: msg }),
    });
    inputMessage.value = "";
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
    <div>
      {receivedMessages.value.map((msg) => <div>{msg.body}</div>)}
      <input
        type="text"
        placeholder="メッセージを送信"
        value={inputMessage.value}
        onChange={(e) => inputMessage.value = e.currentTarget.value}
        onKeyDown={(e) =>
          e.key === "Enter" && sendHandler(e.currentTarget.value)}
      />
      <button onClick={() => sendHandler(inputMessage.value)}>
        チャット
      </button>
    </div>
  );
}
