import { tw } from "twind";
import { css } from "twind/css";
import { Chat } from "../islands/Chat.tsx";
import { XLink } from "../components/snsLink/XLink.tsx";
import { TwitchLink } from "../components/snsLink/TwitchLink.tsx";
import { FreshLink } from "../components/snsLink/FreshLink.tsx";
import { RoadmapLink } from "../components/snsLink/RoadmapLink.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Message } from "../utils/type.ts";
import { getMessage } from "../utils/db.ts";
import { Head } from "$fresh/runtime.ts";

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
    padding-right: 6px;
  }
`;

const SiteName = css`
  color: white;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  padding: 0.75rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const handler: Handlers<{ messages: Message[] }> = {
  async GET(_req, ctx) {
    const messages = await getMessage();
    return ctx.render({ messages });
  },
};

export default function Home({ data }: PageProps<{ messages: Message[] }>) {
  return (
    <>
      <Head>
        <title>めめこの牢屋</title>
        <meta property="og:site_name" content="めめこの牢屋" />
        <meta property="og:title" content="めめこの牢屋" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://memeco-prison.deno.dev" />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:description"
          content="へたくそゲーム実況、雑談、料理配信してます( ˙༥˙ )"
        />
        <meta
          property="og:image"
          content="https://memeco-prison.deno.dev/memeco.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@memeco2525" />
      </Head>
      <div class={tw(RootWrap)}>
        <header class={tw(Header)}>
          <img
            class="my-2 rounded-full"
            src="/memeco.jpg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class={tw(SiteName)}>
            めめこの牢屋
          </h1>
          <XLink />
          <TwitchLink />
          <RoadmapLink />
          <FreshLink />
        </header>
        <main class="flex-1">
          <Chat messages={data.messages} />
        </main>
      </div>
    </>
  );
}
