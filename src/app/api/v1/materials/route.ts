import { searchArtInstituteMaterials } from "@/lib/art-institute";
import { parsePagination, parseSearch } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = parsePagination(searchParams);
  const search = parseSearch(searchParams);

  if ("error" in pagination) {
    return Response.json({ error: pagination.error }, { status: 400 });
  }
  if ("error" in search) {
    return Response.json({ error: search.error }, { status: 400 });
  }
  if (pagination.value.limit > 50) {
    return Response.json(
      { error: "limit cannot be greater than 50 for the external collection." },
      { status: 400 },
    );
  }

  try {
    const result = await searchArtInstituteMaterials(
      search.value,
      pagination.value.page,
      pagination.value.limit,
    );

    return Response.json({
      apiVersion: "v1",
      source: {
        name: "Art Institute of Chicago",
        url: "https://api.artic.edu/docs/",
        license: "Rights and public-domain status are provided per artwork.",
      },
      ...result,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return Response.json(
      {
        error: timedOut
          ? "The Art Institute collection request timed out. Please try again."
          : "The Art Institute collection is temporarily unavailable. Please try again.",
        source: "Art Institute of Chicago",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
