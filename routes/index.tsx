import { Chat } from "../islands/Chat.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <header class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">めめこの牢屋チャット</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}
