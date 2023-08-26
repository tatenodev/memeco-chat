import { tw } from "twind";
import { css } from "twind/css";
import { Chat } from "../islands/Chat.tsx";

const ChatBox = css`
  display: flex;
  align-items: flex-end;
`;

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac] flex h-full">
      <header class="max-w-screen-md flex flex-col items-center justify-center flex-1">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">めめこの牢屋チャット</h1>
      </header>
      <main class={`flex-1 ${tw(ChatBox)}`}>
        <Chat />
      </main>
    </div>
  );
}
