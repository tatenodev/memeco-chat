import { tw } from "twind";
import { css } from "twind/css";
import IconMapPin from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/map-pin.tsx";

const LinkStyle = css`
  display: flex;
  width: 197px;
  background: white;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 8px;
  margin-bottom: 10px;
  & > span {
    padding-left: 4px;
  }
  @media screen and (max-width: 768px) {
    width: 40px;
    & > span {
      display: none;
    }
  }
`;

export function RoadmapLink() {
  return (
    <a href="/roadmap" class={`rounded ${tw(LinkStyle)}`}>
      <IconMapPin />
      <span>Roadmap</span>
    </a>
  );
}
