import { tw } from "twind";
import { css } from "twind/css";
import { Chat } from "../islands/Chat.tsx";
import { XLink } from "../components/snsLink/XLink.tsx";
import { TwitchLink } from "../components/snsLink/TwitchLink.tsx";
import { FreshLink } from "../components/snsLink/FreshLink.tsx";

const RootWrap = css`
  padding: 8px 4px;
  margin: auto 0;
  background: #313338;
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
        <h1 class="text-4xl font-bold p-3 text-white">めめこの牢屋</h1>
        <XLink />
        <TwitchLink />
        <FreshLink />
      </header>
      <main class="flex-1">
        <Chat />
      </main>
    </div>
  );
}
