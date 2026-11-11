import { parsePagination, parseSearch } from "@/lib/api";
import { searchDiscovery } from "@/lib/discovery";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ source: string }> },
) {
  const { source } = await params;
  const { searchParams } = new URL(request.url);
  const search = parseSearch(searchParams);
  const pagination = parsePagination(searchParams);

  if ("error" in search) {
    return Response.json({ error: search.error }, { status: 400 });
  }
  if ("error" in pagination) {
    return Response.json(
      { error: pagination.error },
      { status: 400 },
    );
  }

  try {
    const result = await searchDiscovery(
      source,
      search.value,
      pagination.value.page,
    );
    if (!result) {
      return Response.json({ error: "Unknown discovery source." }, { status: 404 });
    }

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The discovery source is temporarily unavailable.",
        source,
      },
      { status: 502 },
    );
  }
}
