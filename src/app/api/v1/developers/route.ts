import { paginate, parsePagination, parseSearch } from "@/lib/api";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pagination = parsePagination(searchParams);
  const search = parseSearch(searchParams);

  if ("error" in pagination) {
    return Response.json({ error: pagination.error }, { status: 400 });
  }
  if ("error" in search) {
    return Response.json({ error: search.error }, { status: 400 });
  }

  return Response.json({
    apiVersion: "v1",
    collection: "community",
    status: "not_open",
    ...paginate([], pagination.value),
  });
}
