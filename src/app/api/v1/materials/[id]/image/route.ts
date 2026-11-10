import { getArtInstituteMaterial } from "@/lib/art-institute";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
    return Response.json({ error: "Material id must be a positive integer." }, { status: 400 });
  }

  try {
    const material = await getArtInstituteMaterial(Number(id));
    if (!material) {
      return Response.json({ error: "Collection material not found." }, { status: 404 });
    }
    if (!material.isPublicDomain || !material.imageId) {
      return Response.json({ error: "This collection image is not available." }, { status: 404 });
    }
    if (!/^[\da-f-]{36}$/i.test(material.imageId)) {
      throw new Error("The Art Institute returned an invalid image identifier.");
    }

    const imageUrl = new URL(
      `${material.imageId}/full/843,/0/default.jpg`,
      "https://www.artic.edu/iiif/2/",
    );
    const response = await fetch(imageUrl, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        Referer: "https://www.artic.edu/",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130 Safari/537.36",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(
        `Art Institute image service returned ${response.status} ${response.statusText}.`,
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.startsWith("image/")) {
      throw new Error("The Art Institute image service returned an invalid image.");
    }

    return new Response(response.body, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return Response.json(
      {
        error: timedOut
          ? "The Art Institute image request timed out. Please try again."
          : "The Art Institute image is temporarily unavailable.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
