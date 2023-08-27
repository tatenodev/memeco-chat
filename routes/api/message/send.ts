import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const json = await req.json();
    const body = json.message;
    const userName = json.userName;
    if (typeof body !== "string") {
      return new Response("Invalid body.", { status: 404 });
    }

    const channel = new BroadcastChannel("chat");

    const message = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      userName,
      body,
    };

    channel.postMessage(message);
    channel.close();

    return new Response("Successful!");
  },
};
