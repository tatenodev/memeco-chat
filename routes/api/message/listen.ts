import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET() {
    const channel = new BroadcastChannel("chat");
    const stream = new ReadableStream({
      start: (controller) => {
        controller.enqueue(": sending...\n\n");
        controller.enqueue(
          `data: ${
            JSON.stringify({
              id: "first",
              userName: "看守",
              userColor: "#ffffff",
              body: "めめこの牢屋チャットへようこそ！",
              timestamp: new Date().toISOString(),
            })
          }\n\n`,
        );
        channel.onmessage = (e) => {
          const body = `data: ${JSON.stringify(e.data)}\n\n`;
          controller.enqueue(body);
        };
      },
      cancel() {
        channel.close();
      },
    });
    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-store",
      },
    });
  },
};
