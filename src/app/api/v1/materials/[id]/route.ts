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

    return Response.json({
      apiVersion: "v1",
      source: "Art Institute of Chicago",
      data: material,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return Response.json(
      {
        error: timedOut
          ? "The Art Institute collection request timed out. Please try again."
          : "The Art Institute collection is temporarily unavailable. Please try again.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
