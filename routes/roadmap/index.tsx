import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";
import { css } from "twind/css";
import { MailLink } from "../../components/snsLink/MailLink.tsx";

const Main = css`
  color: white;
  max-width: 768px;
  padding: 16px;
  margin: auto;
`;
const Title = css`
  text-align: center;
  font-size: 20px;
`;
const Card = css`
  padding: 16px;
  & > li {
    text-align: center;
    background: white;
    color: black;
    border-radius: 6px;
    max-width: 500px;
    width: 100%;
    margin: 0 auto 10px;
    padding: 16px 10px;
    font-size: 18px;
  }
  & span {
    display: block;
    font-size: 14px;
  }
`;
const Max500 = css`
  max-width: 500px;
  margin: 0 auto 20px;
`;

export default function Roadmap() {
  return (
    <>
      <Head>
        <title>めめこの牢屋 | ロードマップ</title>
        <meta property="og:site_name" content="めめこの牢屋" />
        <meta property="og:title" content="めめこの牢屋 | ロードマップ" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:url"
          content="https://memeco-prison.deno.dev/roadmap"
        />
        <meta
          property="og:description"
          content="めめこの牢屋 ロードマップ"
        />
        <meta
          property="og:image"
          content="https://memeco-prison.deno.dev/memeco.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@memeco2525" />
      </Head>
      <main class={tw(Main)}>
        <h1 class={tw(Title)}>気まぐれ開発ロードマップ</h1>
        <p class="text-center text-sm">
          実装したい願望を書き綴ったもので実際に実装されるかはわかりません！
        </p>
        <ul class={tw(Card)}>
          <li>
            ウォチパリクエスト<span>
              めめこさんと一緒に見たい映画リク機能
            </span>
          </li>
          <li>
            曲リクエスト機能<span>
              めめこさんに歌ってほしい曲リクエスト機能
            </span>
          </li>
        </ul>
        <div class={tw(Max500)}>
          <MailLink text="要望を出す" />
        </div>
        <div class="text-center">
          <a href="/" class="text-center">戻る</a>
        </div>
      </main>
    </>
  );
}
