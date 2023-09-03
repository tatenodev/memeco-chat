import { useRef } from "preact/hooks";
import { tw } from "twind";
import { css } from "twind/css";
import { Message } from "../utils/type.ts";
import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

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

type ChatMessagesAreaProps = {
  messages: Message[];
  receivedMessages: Signal<Message[]>;
};

export const ChatMessagesArea = (
  { messages, receivedMessages }: ChatMessagesAreaProps,
) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // 自動スクロール
  useEffect(() => {
    scrollElementRef.current?.scroll(
      0,
      scrollElementRef.current?.scrollHeight ?? 0,
    );
  }, [receivedMessages.value]);

  return (
    <div class={tw(ChatBoxWrapper)}>
      <div class={tw(ChatBox)} ref={scrollElementRef}>
        {messages &&
          messages.slice().reverse().map((msg) => (
            <div key={msg.id}>
              <span class={`text-[${msg.userColor}]`}>{msg.userName}</span>
              {": "}
              <span>{msg.body}</span>
            </div>
          ))}

        <div>
          <span class={`text-[#ffffff]`}>看守</span>
          {": "}
          <span>めめこの牢屋チャットへようこそ！</span>
        </div>

        {receivedMessages.value.map((msg) => (
          <div key={msg.id}>
            <span class={`text-[${msg.userColor}]`}>{msg.userName}</span>
            {": "}
            <span>{msg.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
