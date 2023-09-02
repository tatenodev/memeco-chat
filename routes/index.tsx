import { tw } from "twind";
import { css } from "twind/css";
import { Chat } from "../islands/Chat.tsx";
import { XLink } from "../components/snsLink/XLink.tsx";
import { TwitchLink } from "../components/snsLink/TwitchLink.tsx";
import { FreshLink } from "../components/snsLink/FreshLink.tsx";
import { RoadmapLink } from "../components/snsLink/RoadmapLink.tsx";
import { defineRoute, RouteConfig, RouteContext } from "$fresh/server.ts";
import { useCSP } from "$fresh/runtime.ts";
import { Message } from "../utils/type.ts";
import { getMessage } from "../utils/db.ts";

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

export default defineRoute(async (_req, _ctx) => {
  // console.log("get endpoint:", Deno.env.get("SITE_ORIGIN"));
  // const result = await fetch(`${Deno.env.get("SITE_ORIGIN")}api/message`, {
  //   headers: {
  //     accept: "application/json",
  //   },
  // });
  // console.log("result", result);
  // const data: { messages: Message[] } = await result.json();

  const messages = await getMessage();

  return (
    <>
      <link rel="stylesheet" type="text/css" href="top.css" />
      <div class="rootWrap">
        <header class="header">
          <img
            class="my-2 rounded-full"
            src="/memeco.jpg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="siteName">
            めめこの牢屋
          </h1>
          <XLink />
          <TwitchLink />
          <RoadmapLink />
          <FreshLink />
        </header>
        <main class="flex-1">
          <Chat messages={messages} />
        </main>
      </div>
    </>
  );
});
