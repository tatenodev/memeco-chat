import { AppProps } from "$fresh/server.ts";
import { tw } from "twind";
import { css } from "twind/css";

const RootWrap = css`
  background: #313338;
`;

export default function App({ Component }: AppProps) {
  return (
    <html class="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>めめこの牢屋</title>
      </head>
      <body class={`h-full ${tw(RootWrap)}`}>
        <Component />
      </body>
    </html>
  );
}
