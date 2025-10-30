// wttr-proxy - simple weather image proxy for Deno Deploy

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req: Request) => {
  try {
    // The city you want the weather for — you can change this to anything
    const city = "Greenfield,MA";

    // This is the actual wttr.in image URL
    const wttrUrl = `https://wttr.in/${city}.png?1&u`;

    // Fetch it
    const response = await fetch(wttrUrl);

    // If it fails, throw an error
    if (!response.ok) {
      return new Response(`Failed to fetch wttr.in: ${response.status}`, {
        status: 500,
      });
    }

    // Get image bytes
    const image = await response.arrayBuffer();

    // Return the image to the browser
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


Add simple weather proxy for wttr.in
