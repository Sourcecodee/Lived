import type { ApiPage } from "@/types/content";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export function parsePagination(searchParams: URLSearchParams):
  | { value: PaginationOptions }
  | { error: string } {
  const rawPage = searchParams.get("page") ?? "1";
  const rawLimit = searchParams.get("limit") ?? "12";

  if (!/^[1-9]\d*$/.test(rawPage) || !/^[1-9]\d*$/.test(rawLimit)) {
    return { error: "page and limit must be positive integers." };
  }

  const page = Number(rawPage);
  const limit = Number(rawLimit);
  if (!Number.isSafeInteger(page) || !Number.isSafeInteger(limit)) {
    return { error: "page and limit must be safe integers." };
  }
  if (limit > 100) {
    return { error: "limit cannot be greater than 100." };
  }

  return { value: { page, limit } };
}

export function paginate<T>(
  items: T[],
  { page, limit }: PaginationOptions,
): ApiPage<T> {
  const start = (page - 1) * limit;
  const totalPages = Math.ceil(items.length / limit);

  return {
    data: items.slice(start, start + limit),
    pagination: { page, limit, total: items.length, totalPages },
  };
}

export function parseSearch(searchParams: URLSearchParams):
  | { value: string }
  | { error: string } {
  const query = searchParams.get("q")?.trim() ?? "";
  if (query.length > 100) {
    return { error: "q cannot be longer than 100 characters." };
  }
  return { value: query.toLocaleLowerCase() };
}
