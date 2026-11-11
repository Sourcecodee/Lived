import type {
  CodebaseDiscovery,
  BookDiscovery,
  DiscoveryItem,
  IdeaDiscovery,
  ArtworkDiscovery,
  MusicDiscovery,
  PhotoDiscovery,
} from "@/types/content";
import { searchArtInstituteMaterials } from "@/lib/art-institute";

const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1.1";
const DEEZER_API = "https://api.deezer.com";
const GITHUB_API = "https://api.github.com";
const OPEN_LIBRARY_API = "https://openlibrary.org";
const CROSSREF_API = "https://api.crossref.org/works";
const WIKIMEDIA_API = "https://commons.wikimedia.org/w/api.php";

interface MetSearchResponse {
  total: number;
  objectIDs: number[] | null;
}

interface MetObject {
  objectID: number;
  objectBeginDate: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  department: string;
  medium: string;
  isPublicDomain: boolean;
  primaryImage: string;
  primaryImageSmall: string;
  objectURL: string;
}

interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  preview: string;
  link: string;
  artist: { name: string; link: string };
  album: { title: string; cover_medium: string };
}

interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  owner: { login: string; html_url: string };
  language: string | null;
  license: { name: string; spdx_id: string | null } | null;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepository[];
}

interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
}

interface OpenLibraryResponse {
  numFound: number;
  docs: OpenLibraryBook[];
}

interface CrossrefWork {
  DOI: string;
  title?: string[];
  author?: { given?: string; family?: string }[];
  published?: { "date-parts"?: number[][] };
  publisher?: string;
  type?: string;
  URL?: string;
  "container-title"?: string[];
}

interface CrossrefResponse {
  message: { "total-results": number; items: CrossrefWork[] };
}

interface WikimediaImageInfo {
  thumburl?: string;
  descriptionurl?: string;
  extmetadata?: {
    Artist?: { value?: string };
    LicenseShortName?: { value?: string };
    LicenseUrl?: { value?: string };
  };
}

interface WikimediaPage {
  pageid: number;
  title: string;
  imageinfo?: WikimediaImageInfo[];
}

interface WikimediaResponse {
  query?: { pages?: WikimediaPage[] };
  continue?: { gsroffset?: number };
}

const DISCOVERY_PAGE_SIZE = 12;

async function fetchJson<T>(url: URL, headers?: HeadersInit): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json", ...headers },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`Discovery source returned ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function searchArt(
  query: string,
  modernOnly: boolean,
  page: number,
): Promise<{ data: ArtworkDiscovery[]; warnings: string[]; hasMore: boolean }> {
  const url = new URL(`${MET_API}/search`);
  url.searchParams.set("q", query || (modernOnly ? "modern art" : "art"));
  url.searchParams.set("hasImages", "true");
  url.searchParams.set("isPublicDomain", "true");
  url.searchParams.set("limit", String(DISCOVERY_PAGE_SIZE));
  url.searchParams.set("page", String(page));

  const [artInstituteResult, metResult] = await Promise.allSettled([
    searchArtInstituteMaterials(
      query || (modernOnly ? "modern art" : "art"),
      page,
      DISCOVERY_PAGE_SIZE,
      modernOnly ? { start: 1860, end: 1969 } : undefined,
    ),
    (async () => {
      const search = await fetchJson<MetSearchResponse>(url);
      const ids = search.objectIDs ?? [];
      const records = await Promise.all(
        ids.map(async (id) => {
          const objectUrl = new URL(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
          );
          return fetchJson<MetObject>(objectUrl);
        }),
      );
      return { records, total: search.total };
    })(),
  ]);
  const warnings: string[] = [];
  const artworks: ArtworkDiscovery[] = [];
  let hasMore = false;

  if (artInstituteResult.status === "fulfilled") {
    hasMore ||= artInstituteResult.value.pagination.page <
      artInstituteResult.value.pagination.totalPages;
    for (const material of artInstituteResult.value.data) {
      if (!material.imageUrl) continue;
      artworks.push({
        kind: "artwork",
        id: material.id,
        sourceName: material.sourceName,
        title: material.title,
        artist: material.artistTitle,
        date: material.dateDisplay,
        department: null,
        category: material.artworkTypeTitle,
        medium: material.mediumDisplay,
        imageUrl: material.imageUrl,
        sourceUrl: material.sourceUrl,
        rightsStatement: material.rightsStatement,
      });
    }
  } else {
    warnings.push("The Art Institute of Chicago could not be reached.");
  }

  if (metResult.status === "fulfilled") {
    hasMore ||= page * DISCOVERY_PAGE_SIZE < metResult.value.total;
    artworks.push(
      ...metResult.value.records
        .filter(
          (record) =>
            (!modernOnly ||
              (record.objectBeginDate >= 1860 &&
                record.objectBeginDate <= 1969)) &&
            record.isPublicDomain &&
            record.primaryImage,
        )
        .map(
          (record): ArtworkDiscovery => ({
            kind: "artwork",
            id: record.objectID,
            sourceName: "The Metropolitan Museum of Art",
            title: record.title,
            artist: record.artistDisplayName || null,
            date: record.objectDate || null,
            department: record.department || null,
            category: null,
            medium: record.medium || null,
            imageUrl: record.primaryImageSmall || record.primaryImage,
            sourceUrl: record.objectURL,
            rightsStatement:
              "The Metropolitan Museum of Art marks this work as public domain.",
          }),
        ),
    );
  } else {
    warnings.push("The Metropolitan Museum of Art could not be reached.");
  }

  if (artInstituteResult.status === "rejected" && metResult.status === "rejected") {
    throw new Error("Neither museum collection is available right now.");
  }

  const uniqueArtworks = new Map(
    artworks.map((artwork) => [
      `${artwork.sourceName}-${artwork.id}`,
      artwork,
    ]),
  );
  return { data: [...uniqueArtworks.values()], warnings, hasMore };
}

async function searchMusic(
  query: string,
  page: number,
): Promise<{ data: DiscoveryItem[]; hasMore: boolean }> {
  const searchTerms = query
    ? [`artist:"${query.replaceAll('"', '\\"')}"`, `track:"${query.replaceAll('"', '\\"')}"`]
    : ["indie"];
  const responses = await Promise.all(
    searchTerms.map(async (term) => {
      const url = new URL(`${DEEZER_API}/search`);
      url.searchParams.set("q", term);
      url.searchParams.set("limit", String(DISCOVERY_PAGE_SIZE));
      url.searchParams.set("index", String((page - 1) * DISCOVERY_PAGE_SIZE));
      const response = await fetchJson<{
        error?: { message?: string };
        data?: DeezerTrack[];
        total?: number;
      }>(url);
      if (response.error) {
        throw new Error(response.error.message || "Deezer search failed.");
      }
      return response;
    }),
  );

  const uniqueTracks = new Map(
    responses.flatMap((response) => response.data ?? []).map((track) => [track.id, track]),
  );
  const queryTerms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const relevantTracks = [...uniqueTracks.values()].filter((track) => {
    const searchableText = [
      track.title,
      track.artist.name,
      track.album.title,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return queryTerms.every((term) => searchableText.includes(term));
  });

  return {
    data: relevantTracks.map(
      (track): MusicDiscovery => ({
        kind: "track",
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        artistUrl: track.artist.link,
        album: track.album.title,
        coverUrl: track.album.cover_medium || null,
        previewUrl: track.preview || null,
        duration: track.duration,
        sourceUrl: track.link,
      }),
    ),
    hasMore: responses.some(
      (response) =>
        typeof response.total === "number" &&
        page * DISCOVERY_PAGE_SIZE < response.total,
    ),
  };
}

async function searchCodebases(
  query: string,
  page: number,
): Promise<{ data: DiscoveryItem[]; hasMore: boolean }> {
  const url = new URL(`${GITHUB_API}/search/repositories`);
  url.searchParams.set("q", `${query || "creative coding"} stars:>10`);
  url.searchParams.set("sort", "updated");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(DISCOVERY_PAGE_SIZE));
  url.searchParams.set("page", String(page));

  const response = await fetchJson<GitHubSearchResponse>(url, {
    "User-Agent": "LivedDiscovery/1.0",
    Accept: "application/vnd.github+json",
  });

  return {
    data: response.items.map(
      (repository): CodebaseDiscovery => ({
        kind: "codebase",
        id: repository.id,
        name: repository.name,
        description: repository.description,
        owner: repository.owner.login,
        ownerUrl: repository.owner.html_url,
        repositoryUrl: repository.html_url,
        language: repository.language,
        license:
          (repository.license?.spdx_id === "NOASSERTION"
            ? null
            : repository.license?.spdx_id) ||
          repository.license?.name ||
          "No license declared",
        updatedAt: repository.pushed_at,
      }),
    ),
    hasMore: page * DISCOVERY_PAGE_SIZE < response.total_count,
  };
}

async function searchBooks(
  query: string,
  page: number,
): Promise<{ data: DiscoveryItem[]; hasMore: boolean }> {
  const url = new URL("/search.json", OPEN_LIBRARY_API);
  url.searchParams.set("q", query || "art and creativity");
  url.searchParams.set("limit", String(DISCOVERY_PAGE_SIZE));
  url.searchParams.set("page", String(page));
  url.searchParams.set(
    "fields",
    "key,title,author_name,first_publish_year,cover_i,edition_count",
  );
  const response = await fetchJson<OpenLibraryResponse>(url);

  const data = response.docs.flatMap((book): BookDiscovery[] => {
    if (!/^\/works\/OL\d+W$/.test(book.key)) return [];
    return [{
      kind: "book",
      id: book.key,
      title: book.title,
      author: book.author_name?.[0] ?? null,
      year: book.first_publish_year ?? null,
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      sourceUrl: `https://openlibrary.org${book.key}`,
      editionCount: book.edition_count ?? null,
    }];
  });
  return {
    data,
    hasMore: page * DISCOVERY_PAGE_SIZE < response.numFound,
  };
}

function cleanMetadataText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

async function searchIdeas(
  query: string,
  page: number,
): Promise<{ data: DiscoveryItem[]; hasMore: boolean }> {
  const url = new URL(CROSSREF_API);
  url.searchParams.set("query.bibliographic", query || "creative practice");
  url.searchParams.set("filter", "type:journal-article");
  url.searchParams.set("rows", String(DISCOVERY_PAGE_SIZE));
  url.searchParams.set("offset", String((page - 1) * DISCOVERY_PAGE_SIZE));
  url.searchParams.set(
    "select",
    "DOI,title,author,published,publisher,type,URL,container-title",
  );
  const response = await fetchJson<CrossrefResponse>(url);

  const data = response.message.items.flatMap((work): IdeaDiscovery[] => {
    const title = work.title?.[0];
    if (!work.DOI || !title) return [];
    const dateParts = work.published?.["date-parts"]?.[0];
    const year = dateParts?.[0];
    return [{
      kind: "idea",
      id: work.DOI,
      title: cleanMetadataText(title),
      authors: (work.author ?? [])
        .map((author) =>
          cleanMetadataText([author.given, author.family].filter(Boolean).join(" ")),
        )
        .filter(Boolean)
        .slice(0, 3),
      publication: work["container-title"]?.[0]
        ? cleanMetadataText(work["container-title"][0])
        : null,
      publisher: work.publisher ? cleanMetadataText(work.publisher) : null,
      year: typeof year === "number" ? year : null,
      sourceUrl: `https://doi.org/${encodeURIComponent(work.DOI)}`,
      type: work.type || "research",
    }];
  });
  return {
    data,
    hasMore:
      page * DISCOVERY_PAGE_SIZE < response.message["total-results"],
  };
}

async function searchPhotography(
  query: string,
  page: number,
): Promise<{ data: DiscoveryItem[]; hasMore: boolean }> {
  const url = new URL(WIKIMEDIA_API);
  url.searchParams.set("action", "query");
  url.searchParams.set("generator", "search");
  url.searchParams.set(
    "gsrsearch",
    query ? `${query} filetype:bitmap` : "portrait photography filetype:bitmap",
  );
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", String(DISCOVERY_PAGE_SIZE));
  url.searchParams.set("gsroffset", String((page - 1) * DISCOVERY_PAGE_SIZE));
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|extmetadata");
  url.searchParams.set("iiurlwidth", "1000");
  url.searchParams.set("format", "json");
  url.searchParams.set("formatversion", "2");
  const response = await fetchJson<WikimediaResponse>(url, {
    "User-Agent": "LivedDiscovery/1.0 (https://lived.example)",
  });

  const data = (response.query?.pages ?? []).flatMap((resultPage): PhotoDiscovery[] => {
    const info = resultPage.imageinfo?.[0];
    const license = info?.extmetadata?.LicenseShortName?.value;
    if (!info?.thumburl || !info.descriptionurl || !license) return [];
    return [{
      kind: "photo",
      id: resultPage.pageid,
      title: cleanMetadataText(resultPage.title.replace(/^File:/, "")),
      artist: info.extmetadata?.Artist?.value
        ? cleanMetadataText(info.extmetadata.Artist.value)
        : null,
      imageUrl: info.thumburl,
      sourceUrl: info.descriptionurl,
      license: cleanMetadataText(license),
      rightsUrl: info.extmetadata?.LicenseUrl?.value ?? null,
    }];
  });
  return { data, hasMore: response.continue !== undefined };
}

export async function searchDiscovery(
  source: string,
  query: string,
  page: number,
): Promise<
  | {
      source: string;
      sourceUrl: string;
      data: DiscoveryItem[];
      warnings?: string[];
      pagination: { page: number; hasMore: boolean };
    }
  | null
> {
  if (source === "art" || source === "modern-art") {
    const modernOnly = source === "modern-art";
    const result = await searchArt(query, modernOnly, page);
    return {
      source: "Art Institute of Chicago and The Metropolitan Museum of Art",
      sourceUrl: "https://www.artic.edu/open-access/public-api/",
      data: result.data,
      warnings: result.warnings,
      pagination: { page, hasMore: result.hasMore },
    };
  }
  if (source === "music") {
    const result = await searchMusic(query, page);
    return {
      source: "Deezer",
      sourceUrl: "https://www.deezer.com/",
      data: result.data,
      pagination: { page, hasMore: result.hasMore },
    };
  }
  if (source === "code") {
    const result = await searchCodebases(query, page);
    return {
      source: "GitHub",
      sourceUrl: "https://github.com/",
      data: result.data,
      pagination: { page, hasMore: result.hasMore },
    };
  }
  if (source === "books") {
    const result = await searchBooks(query, page);
    return {
      source: "Open Library",
      sourceUrl: "https://openlibrary.org/developers/api",
      data: result.data,
      pagination: { page, hasMore: result.hasMore },
    };
  }
  if (source === "ideas") {
    const result = await searchIdeas(query, page);
    return {
      source: "Crossref",
      sourceUrl: "https://www.crossref.org/documentation/retrieve-metadata/rest-api/",
      data: result.data,
      pagination: { page, hasMore: result.hasMore },
    };
  }
  if (source === "photography") {
    const result = await searchPhotography(query, page);
    return {
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Commons:Licensing",
      data: result.data,
      pagination: { page, hasMore: result.hasMore },
    };
  }
  return null;
}
