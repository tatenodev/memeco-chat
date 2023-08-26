import { Chat } from "../islands/Chat.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac] flex h-full">
      <header class="max-w-screen-md flex flex-col items-center justify-center flex-1">
        <img
          class="my-2 rounded-full"
          src="/memeco.jpg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold p-3">めめこの牢屋</h1>
        <a
          class="flex bg-[#A970FF] text-white rounded"
          style={{
            width: 197,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
          href="https://www.twitch.tv/memeco00"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="20"
            height="20"
            style={{ padding: "8px 0 6px" }}
            src="/TwitchGlitchWhite.svg"
            alt="Twtich"
          />
          <span style={{ paddingLeft: "10px" }}>Twtich</span>
        </a>
        <a
          href="https://fresh.deno.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge-dark.svg"
            alt="Made with Fresh"
          />
        </a>
      </header>
      <main class="flex-1">
        <Chat />
      </main>
    </div>
  );
}
