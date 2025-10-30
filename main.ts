import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req: Request) => {
  try {
    const city = "Greenfield,MA";
    const wttrUrl = `https://wttr.in/${city}.png?1&u`;
    const response = await fetch(wttrUrl);

    if (!response.ok) {
      return new Response(`Failed to fetch wttr.in: ${response.status}`, { status: 500 });
    }

    const image = await response.arrayBuffer();

    return new Response(image, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
});
