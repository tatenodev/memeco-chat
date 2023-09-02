import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { tw } from "twind";
import { css } from "twind/css";
import { Message } from "../utils/type.ts";
import { ChatMessagesArea } from "./ChatMessagesArea.tsx";
import { ChatInputArea } from "./ChatInputArea.tsx";

const ChatWrapper = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ConnectionState = {
  Connecting: 0,
  Open: 1,
  Close: 2,
} as const;

type ChatProps = {
  messages: Message[];
};

export function Chat({ messages }: ChatProps) {
  const connectionState = useSignal<number>(ConnectionState.Close);
  const receivedMessages = useSignal<Message[]>([]);

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

  return (
    <section class={tw(ChatWrapper)}>
      <ChatMessagesArea
        messages={messages}
        receivedMessages={receivedMessages}
      />
      <ChatInputArea connectionState={connectionState} />
    </section>
  );
}
