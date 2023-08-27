import { tw } from "twind";
import { css } from "twind/css";

const LinkStyle = css`
  width: 197px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    width: 40px;
    & > span {
      display: none;
    }
  }
`;

export function TwitchLink() {
  return (
    <a
      class={`flex bg-[#A970FF] text-white rounded ${tw(LinkStyle)}`}
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
  );
}
