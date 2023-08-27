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

export function XLink() {
  return (
    <a
      class={`flex bg-black text-white rounded-md border border-gray-600 ${
        tw(LinkStyle)
      }`}
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
  );
}
