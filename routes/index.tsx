import { tw } from "twind";
import { css } from "twind/css";
import { Chat } from "../islands/Chat.tsx";
import { XLink } from "../components/snsLink/XLink.tsx";
import { TwitchLink } from "../components/snsLink/TwitchLink.tsx";
import { FreshLink } from "../components/snsLink/FreshLink.tsx";
import { MailLink } from "../components/snsLink/MailLink.tsx";

const RootWrap = css`
  padding: 8px 4px;
  margin: auto 0;
  background: #313338;
  display: flex;
  height: 100%;
`;

const Header = css`
  max-width: 768px;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-grow: 0;
  }
`;

const SiteName = css`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  padding: 0.75rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default function Home() {
  return (
    <div class={tw(RootWrap)}>
      <header class={tw(Header)}>
        <img
          class="my-2 rounded-full"
          src="/memeco.jpg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class={`text-white ${tw(SiteName)}`}>めめこの牢屋</h1>
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
