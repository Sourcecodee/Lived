import type { ExternalMaterial } from "@/types/content";

const API_BASE = "https://api.artic.edu/api/v1";
const ARTWORK_FIELDS = [
  "id",
  "title",
  "artist_title",
  "date_display",
  "medium_display",
  "artwork_type_title",
  "image_id",
  "is_public_domain",
  "thumbnail",
  "api_link",
].join(",");

interface ArtInstituteArtwork {
  id: number;
  title: string;
  artist_title: string | null;
  date_display: string | null;
  medium_display: string | null;
  artwork_type_title: string | null;
  image_id: string | null;
  is_public_domain: boolean;
  thumbnail: { alt_text?: string | null } | null;
  api_link: string;
}

interface ArtInstituteResponse {
  pagination: {
    total: number;
    limit: number;
    current_page: number;
    total_pages: number;
  };
  data: ArtInstituteArtwork[];
}

export interface MaterialSearchResult {
  data: ExternalMaterial[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

function mapArtwork(artwork: ArtInstituteArtwork): ExternalMaterial {
  return {
    id: artwork.id,
    title: artwork.title,
    artistTitle: artwork.artist_title,
    dateDisplay: artwork.date_display,
    mediumDisplay: artwork.medium_display,
    artworkTypeTitle: artwork.artwork_type_title,
    imageId: artwork.image_id,
    imageUrl:
      artwork.image_id && artwork.is_public_domain
        ? `/api/v1/materials/${artwork.id}/image`
        : null,
    imageAlt: artwork.thumbnail?.alt_text || artwork.title,
    isPublicDomain: artwork.is_public_domain,
    sourceUrl: `https://www.artic.edu${new URL(artwork.api_link).pathname.replace(
      "/api/v1",
      "",
    )}`,
    sourceName: "Art Institute of Chicago",
  };
}

export async function searchArtInstituteMaterials(
  query: string,
  page: number,
  limit: number,
): Promise<MaterialSearchResult> {
  const url = new URL(`${API_BASE}/artworks/search`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("page", String(page));
  url.searchParams.set("fields", ARTWORK_FIELDS);
  url.searchParams.set("q", query || "art");
  url.searchParams.set(
    "params",
    JSON.stringify({ query: { term: { is_public_domain: true } } }),
  );

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(
      `Art Institute API returned ${response.status} ${response.statusText}.`,
    );
  }

  const payload = (await response.json()) as ArtInstituteResponse;

  return {
    data: payload.data.map(mapArtwork),
    pagination: {
      total: payload.pagination.total,
      limit: payload.pagination.limit,
      page: payload.pagination.current_page,
      totalPages: payload.pagination.total_pages,
    },
  };
}

export async function getArtInstituteMaterial(
  id: number,
): Promise<ExternalMaterial | undefined> {
  const url = new URL(`${API_BASE}/artworks/${id}`);
  url.searchParams.set("fields", ARTWORK_FIELDS);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 3600 },
  });

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(
      `Art Institute API returned ${response.status} ${response.statusText}.`,
    );
  }

  const payload = (await response.json()) as {
    data: ArtInstituteArtwork;
  };
  return mapArtwork(payload.data);
}
