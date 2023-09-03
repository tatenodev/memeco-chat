import { Handlers } from "$fresh/server.ts";
import { ulid } from "https://deno.land/x/ulid@v0.3.0/mod.ts";
import { Message } from "../../../utils/type.ts";
import { addMessage } from "../../../utils/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const json = await req.json();
    const token = json.token;
    const body = json.message;
    const userName = json.userName;
    const userColor = json.userColor;

    if (token !== Deno.env.get("MESSAGE_SEND_PASSWORD")) {
      return new Response("Invalid token.", { status: 401 });
    }

    if (typeof body !== "string") {
      return new Response("Invalid body.", { status: 404 });
    }

    const channel = new BroadcastChannel("chat");

    const message: Message = {
      id: ulid(),
      timestamp: new Date().toISOString(),
      userName,
      userColor,
      body,
    };

    channel.postMessage(message);
    channel.close();

    const result = await addMessage(message);

    if (!result.ok) return new Response("Faild addMessage.");
    return new Response("Successful!");
  },
};
