import { tw } from "twind";
import { css } from "twind/css";
import { Chat } from "../islands/Chat.tsx";

const RootWrap = css`
  padding: 8px 4px;
  margin: auto 0;
  background: #86efac;
  display: flex;
  height: 100%;
  @media screen and (max-width: 768px) {

  }
`;

export default function Home() {
  return (
    <div class={tw(RootWrap)}>
      <header class="max-w-screen-md flex flex-col items-center justify-center flex-1">
        <img
          class="my-2 rounded-full"
          src="/memeco.jpg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold p-3">めめこの牢屋</h1>
        {/* X Link */}
        <a
          class="flex bg-black text-white rounded"
          style={{
            width: 197,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
          href="https://twitter.com/memeco2525"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="20"
            height="20"
            style={{ padding: "8px 0 6px" }}
            src="/X-logo.svg"
            alt="X"
          />
          <span style={{ paddingLeft: "10px" }}>@memeco2525</span>
        </a>
        {/* Twitch Link */}
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
        {/* Deno Fresh Link */}
        <a
          href="https://fresh.deno.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
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
