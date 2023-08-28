import { tw } from "twind";
import { css } from "twind/css";

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
    padding: 16px;
    font-size: 18px;
  }
  & span {
    display: block;
    font-size: 14px;
  }
`;

export default function Roadmap() {
  return (
    <>
      <main class={tw(Main)}>
        <h1 class={tw(Title)}>気まぐれ開発ロードマップ</h1>
        <p class="text-center text-sm">
          実装したい願望を書き綴ったもので実際に実装されるかはわかりません！
        </p>
        <ul class={tw(Card)}>
          <li>
            ログの永続化
            <span>
              30日間ぐらいorもうちょっと長めでログを保存できるようにする
            </span>
          </li>
          <li>
            デザインの見直し<span>サイト全体のデザインの調整</span>
          </li>
          <li>
            曲リクエスト機能<span>
              めめこさんに歌ってほしい曲リクができるようにしたい
            </span>
          </li>
        </ul>
      </main>
    </>
  );
}
