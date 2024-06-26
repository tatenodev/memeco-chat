import { tw } from "twind";
import { css } from "twind/css";
import IconMail from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/mail.tsx";

const LinkStyle = css`
  background: #1E1E22;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  flex-grow: 1;
`;

type MailLinkProps = {
  text?: string;
};

export function MailLink({ text = "不具合報告" }: MailLinkProps) {
  return (
    <a
      class={`text-white rounded ${tw(LinkStyle)}`}
      href="https://forms.gle/kypDMiERV72Urjvu9"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconMail />
      <span class="pl-2">{text}</span>
    </a>
  );
}
