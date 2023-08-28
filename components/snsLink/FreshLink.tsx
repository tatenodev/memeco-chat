import { tw } from "twind";
import { css } from "twind/css";

const LinkStylePc = css`
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const LinkStyleSp = css`
  background: white;
  width: 40px;
  margin-bottom: 10px;
  & img {
    padding: 4px;
  }
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export function FreshLink() {
  return (
    <>
      <a
        class={tw(LinkStylePc)}
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
      <a
        class={`rounded-md ${tw(LinkStyleSp)}`}
        href="https://fresh.deno.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
      </a>
    </>
  );
}
