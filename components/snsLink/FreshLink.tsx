import { tw } from "twind";
import { css } from "twind/css";

const LinkStyle = css`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export function FreshLink() {
  return (
    <a
      class={tw(LinkStyle)}
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
  );
}
