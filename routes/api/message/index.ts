import { Handlers } from "$fresh/server.ts";
import { addMessage, getMessage, removeAllMessage } from "../../../utils/db.ts";
import { Message } from "../../../utils/type.ts";

export const handler: Handlers = {
  async GET() {
    const result = await getMessage();
    console.log("getMessage result:", result);
    console.log("stringify:", JSON.stringify({ messages: result }));
    return new Response(JSON.stringify({ messages: result }));
  },
  async POST(req) {
    const json: Message = await req.json();
    const reuslt = await addMessage(json);
    if (reuslt.ok) {
      return new Response("message post success.");
    }
    return new Response("message post failed.", { status: 500 });
  },
  async DELETE() {
    const result = await removeAllMessage();
    return new Response(result);
  },
};
