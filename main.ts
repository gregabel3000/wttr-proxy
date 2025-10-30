import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

serve(async (req: Request) => {
  try {
    // The city for the weather
    const city = "Greenfield,MA";
    // WTTR image URL
    const wttrUrl = `https://wttr.in/${city}.png?1&u`;

    // Fetch the image from WTTR
    const response = await fetch(wttrUrl);

    if (!response.ok) {
      return new Response(`Failed to fetch wttr.in: ${response.status}`, { status: 500 });
    }

    const imageBuffer = await response.arrayBuffer();

    // Return the PNG
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
});
