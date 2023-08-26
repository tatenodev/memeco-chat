import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html class="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>memeco-chat</title>
      </head>
      <body class="h-full">
        <Component />
      </body>
    </html>
  );
}
