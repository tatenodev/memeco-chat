import "$std/dotenv/load.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    const data: { password: string } = await req.json();

    if (data.password === Deno.env.get("MESSAGE_SEND_PASSWORD")) {
      return new Response("Valid password!");
    }
    return new Response("Invalid password.", { status: 401 });
  },
};
