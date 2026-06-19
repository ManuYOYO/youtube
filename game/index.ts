import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req: Request) => {
  try {
    const htmlBytes = await Deno.readFile(new URL("./game.html", import.meta.url));
    return new Response(htmlBytes, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
});
