import "$std/dotenv/load.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(_req: Request, ctx: MiddlewareHandlerContext) {
  const origin = Deno.env.get("SITE_ORIGIN") ?? "";

  if (_req.method == "OPTIONS") {
    const resp = new Response(null, {
      status: 204,
    });
    // const origin = _req.headers.get("Origin") || "*";
    const headers = resp.headers;
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Origin", "https://memeco-cron.deno.dev");
    headers.set("Access-Control-Allow-Methods", "DELETE");
    return resp;
  }

  // const origin = _req.headers.get("Origin") || "*";
  const resp = await ctx.next();
  const headers = resp.headers;

  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Origin", "https://memeco-cron.deno.dev");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With",
  );
  headers.set(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS, GET, PUT, DELETE",
  );

  return resp;
}
