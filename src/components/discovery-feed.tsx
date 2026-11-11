"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  ArrowRight,
  AudioLines,
  ExternalLink,
  Lightbulb,
  RotateCw,
  Search,
} from "lucide-react";
import type {
  DiscoveryItem,
  DiscoveryResponse,
} from "@/types/content";

const sources = [
  { id: "art", label: "Art" },
  { id: "modern-art", label: "Modern art" },
  { id: "music", label: "Songs" },
  { id: "code", label: "Codebases" },
  { id: "books", label: "Books" },
  { id: "ideas", label: "Ideas & research" },
  { id: "photography", label: "Photography" },
] as const;

type SourceId = (typeof sources)[number]["id"];

const sourceNotes: Record<SourceId, string> = {
  art: "Browse public-domain artworks from The Art Institute of Chicago and The Met, across periods and materials.",
  "modern-art":
    "Public-domain works dated 1860–1969 from The Art Institute of Chicago and The Met, with each museum record and rights status attached.",
  music:
    "Track discovery from Deezer. Listen to the available 30-second preview or continue to the artist’s listening page.",
  code:
    "Public GitHub projects, shown with their maintainers and declared license. A listing is not a Lived authorship review.",
  books:
    "Discover books through Open Library. Cover and edition details belong to the catalog record.",
  ideas:
    "Explore published research and writing through Crossref metadata. Open each source to read the work.",
  photography:
    "Photographs from Wikimedia Commons with creator attribution and item-level license information.",
};

function isErrorPayload(value: unknown): value is { error: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "string"
  );
}

function PostHeader({
  creator,
  source,
  href,
}: {
  creator: string;
  source: string;
  href: string;
}) {
  return (
    <header className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold text-[#29241f]">{creator}</p>
        <p className="mt-0.5 truncate text-[13px] text-[#756d63]">{source}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${creator} at ${source}`}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#783e42] hover:bg-[#eee7db]"
      >
        <ExternalLink size={18} strokeWidth={1.6} />
      </a>
    </header>
  );
}

function ArtworkCard({ item }: { item: Extract<DiscoveryItem, { kind: "artwork" }> }) {
  return (
    <article className="border-b border-[#d9d0c3] pb-8">
      <PostHeader
        creator={item.artist || "Artist not recorded"}
        source={item.sourceName}
        href={item.sourceUrl}
      />
      <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="group block">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#e8e1d7]">
          <Image
            src={item.imageUrl}
            alt={`${item.title}${item.artist ? `, by ${item.artist}` : ""}`}
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, 760px"
            className="object-contain transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </div>
      </a>
      <div className="pt-4">
        <p className="text-[15px] leading-6 text-[#29241f]">
          <span className="font-semibold">{item.title}</span>
          {item.date && <span className="text-[#625b52]"> · {item.date}</span>}
        </p>
        <p className="mt-1 text-[14px] leading-6 text-[#625b52]">
          {[item.medium, item.department, item.category].filter(Boolean).join(" · ")}
        </p>
        <p className="mt-2 text-[13px] leading-5 text-[#756d63]">
          {item.rightsStatement}
        </p>
      </div>
    </article>
  );
}

function TrackCard({ item }: { item: Extract<DiscoveryItem, { kind: "track" }> }) {
  return (
    <article className="border-b border-[#d9d0c3] pb-8">
      <PostHeader creator={item.artist} source="Music · Deezer" href={item.artistUrl} />
      {item.coverUrl ? (
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#e8e1d7]">
          <Image
            src={item.coverUrl}
            alt={`${item.album} cover`}
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, 760px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-4 bg-[#eee7db] text-center">
          <AudioLines size={42} strokeWidth={1.2} className="text-[#783e42]" />
          <p className="max-w-[80%] font-serif text-3xl">{item.title}</p>
        </div>
      )}
      <div className="pt-4">
        <p className="text-[15px] leading-6 text-[#29241f]">
          <span className="font-semibold">{item.title}</span>
          <span className="text-[#625b52]"> · {item.album}</span>
        </p>
        {item.previewUrl ? (
          <audio
            className="mt-3 h-11 w-full"
            controls
            preload="none"
            src={item.previewUrl}
            aria-label={`Preview ${item.title} by ${item.artist}`}
          >
            Your browser does not support audio playback.
          </audio>
        ) : (
          <p className="mt-3 text-[14px] text-[#756d63]">
            No preview is available for this track.
          </p>
        )}
      </div>
    </article>
  );
}

function CodebaseCard({
  item,
}: {
  item: Extract<DiscoveryItem, { kind: "codebase" }>;
}) {
  return (
    <article className="border-b border-[#d9d0c3] pb-8">
      <PostHeader creator={item.owner} source="Codebase · GitHub" href={item.ownerUrl} />
      <a
        href={item.repositoryUrl}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-[3/2] w-full min-w-0 flex-col justify-between bg-[#29241f] p-6 text-[#f5f0e7] transition-colors hover:bg-[#37302a] sm:p-9"
      >
        <span className="font-mono text-[15px] text-[#d3b88a]">
          {item.language || "Open source project"}
        </span>
        <span>
          <span className="block break-all font-mono text-[28px] leading-tight sm:text-[38px]">
            {item.owner}/{item.name}
          </span>
          <span className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#e8d9bf]">
            View repository <ExternalLink size={15} />
          </span>
        </span>
      </a>
      <div className="pt-4">
        <p className="text-[14px] leading-6 text-[#625b52]">
          {item.description || "No project description provided."}
        </p>
        <p className="mt-2 text-[13px] leading-5 text-[#756d63]">
          {item.language || "Language not listed"} · {item.license} · Updated{" "}
          {new Date(item.updatedAt).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}

function BookCard({ item }: { item: Extract<DiscoveryItem, { kind: "book" }> }) {
  return (
    <article className="border-b border-[#d9d0c3] pb-8">
      <PostHeader
        creator={item.author || "Author not recorded"}
        source="Books · Open Library"
        href={item.sourceUrl}
      />
      {item.coverUrl ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="relative block aspect-[3/2] w-full overflow-hidden bg-[#e8e1d7]"
        >
          <Image
            src={item.coverUrl}
            alt={`Cover of ${item.title}`}
            fill
            unoptimized
            sizes="(max-width: 700px) 100vw, 760px"
            className="object-contain"
          />
        </a>
      ) : (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="flex aspect-[3/2] w-full flex-col items-center justify-center bg-[#e4ddcf] p-8 text-center"
        >
          <span className="font-serif text-[32px] leading-tight">{item.title}</span>
          <span className="mt-4 text-[14px] text-[#625b52]">
            {item.author || "Author not recorded"}
          </span>
        </a>
      )}
      <div className="pt-4">
        <p className="text-[16px] leading-6 text-[#29241f]">
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-semibold hover:text-[#783e42]"
          >
            {item.title}
          </a>
        </p>
        <p className="mt-1 text-[14px] leading-6 text-[#625b52]">
          {[item.author, item.year].filter(Boolean).join(" · ")}
        </p>
        {item.editionCount && (
          <p className="mt-1 text-[13px] text-[#756d63]">
            {item.editionCount} catalogued editions
          </p>
        )}
      </div>
    </article>
  );
}

function IdeaCard({ item }: { item: Extract<DiscoveryItem, { kind: "idea" }> }) {
  return (
    <article className="border-b border-[#d9d0c3] pb-8">
      <PostHeader
        creator={item.authors[0] || item.publisher || "Contributor not recorded"}
        source="Ideas & research · Crossref"
        href={item.sourceUrl}
      />
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-[3/2] w-full flex-col justify-between bg-[#e9e3d8] p-6 text-[#29241f] transition-colors hover:bg-[#e2d9ca] sm:p-9"
      >
        <span className="flex items-center gap-2 text-[13px] font-medium tracking-[0.08em] text-[#783e42] uppercase">
          <Lightbulb size={17} strokeWidth={1.5} />
          {item.type.replaceAll("-", " ")}
        </span>
        <span className="font-serif text-[26px] leading-tight sm:text-[32px]">
          {item.title}
        </span>
        <span className="inline-flex items-center gap-2 text-[14px] text-[#783e42]">
          Read the source <ExternalLink size={15} />
        </span>
      </a>
      <div className="pt-4">
        <p className="text-[14px] leading-6 text-[#625b52]">
          {[item.authors.join(", "), item.publication, item.publisher, item.year]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <p className="mt-2 text-[13px] leading-5 text-[#756d63]">
          Crossref provides publication metadata; full-text access and reuse
          rights depend on the publisher.
        </p>
      </div>
    </article>
  );
}

function PhotoCard({ item }: { item: Extract<DiscoveryItem, { kind: "photo" }> }) {
  return (
    <article className="border-b border-[#d9d0c3] pb-8">
      <PostHeader
        creator={item.artist || "Creator not recorded"}
        source="Photography · Wikimedia Commons"
        href={item.sourceUrl}
      />
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[3/2] w-full overflow-hidden bg-[#e8e1d7]"
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          unoptimized
          sizes="(max-width: 700px) 100vw, 760px"
          className="object-contain"
        />
      </a>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="text-[15px] font-semibold leading-6 text-[#29241f]">{item.title}</p>
          <p className="mt-1 text-[14px] leading-6 text-[#625b52]">
            {item.artist || "Creator not recorded"}
          </p>
        </div>
        {item.rightsUrl && (
          <a
            href={item.rightsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-[13px] text-[#783e42] underline underline-offset-4"
          >
            License <ExternalLink size={13} />
          </a>
        )}
      </div>
      <p className="mt-2 text-[13px] leading-5 text-[#756d63]">
        {item.license} · Check the source record for attribution and reuse terms.
      </p>
    </article>
  );
}

function DiscoveryCard({ item }: { item: DiscoveryItem }) {
  if (item.kind === "artwork") return <ArtworkCard item={item} />;
  if (item.kind === "track") return <TrackCard item={item} />;
  if (item.kind === "codebase") return <CodebaseCard item={item} />;
  if (item.kind === "book") return <BookCard item={item} />;
  if (item.kind === "idea") return <IdeaCard item={item} />;
  return <PhotoCard item={item} />;
}

export function DiscoveryFeed() {
  const [source, setSource] = useState<SourceId>("art");
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<DiscoveryItem[]>([]);
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [requestNumber, setRequestNumber] = useState(0);
  const loadingMoreRef = useRef(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const retry = useCallback(
    () => setRequestNumber((number) => number + 1),
    [],
  );
  const requestNextPage = useCallback(() => {
    if (!hasMore || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadMoreError("");
    setLoadingMore(true);
    setPage((currentPage) => currentPage + 1);
  }, [hasMore]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("page", String(page));

    async function loadDiscovery() {
      const isFirstPage = page === 1;
      if (isFirstPage) {
        loadingMoreRef.current = false;
        setLoading(true);
        setErrorMessage("");
        setLoadMoreError("");
        setItems([]);
        setSourceName("");
        setSourceUrl("");
        setWarnings([]);
        setHasMore(false);
      } else {
        setLoadingMore(true);
        setLoadMoreError("");
      }

      try {
        const response = await fetch(
          `/api/v1/discovery/${source}?${params.toString()}`,
          { signal: controller.signal },
        );
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(
            isErrorPayload(payload)
              ? payload.error
              : "Discovery could not be loaded. Please try again.",
          );
        }

        const result = payload as DiscoveryResponse;
        setItems((currentItems) => {
          if (isFirstPage) return result.data;
          const knownItems = new Set(
            currentItems.map((item) => `${item.kind}-${item.id}`),
          );
          const newItems: DiscoveryItem[] = [];
          for (const item of result.data) {
            const key = `${item.kind}-${item.id}`;
            if (knownItems.has(key)) continue;
            knownItems.add(key);
            newItems.push(item);
          }
          return [...currentItems, ...newItems];
        });
        setSourceName(result.source);
        setSourceUrl(result.sourceUrl);
        setWarnings(result.warnings ?? []);
        setHasMore(result.pagination.hasMore);
      } catch (error) {
        if (controller.signal.aborted) return;
        const message =
          error instanceof Error
            ? error.message
            : "Discovery could not be loaded. Please try again.";
        if (isFirstPage) {
          setErrorMessage(message);
          setWarnings([]);
        } else {
          setLoadMoreError(message);
        }
      } finally {
        if (!controller.signal.aborted) {
          if (isFirstPage) setLoading(false);
          else {
            setLoadingMore(false);
            loadingMoreRef.current = false;
          }
        }
      }
    }

    void loadDiscovery();
    return () => controller.abort();
  }, [source, query, page, requestNumber]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (
      !sentinel ||
      !hasMore ||
      loading ||
      loadingMore ||
      loadMoreError ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          requestNextPage();
        }
      },
      { rootMargin: "700px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, loadMoreError, requestNextPage]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(queryInput.trim());
    setPage(1);
  }

  function retryNextPage() {
    loadingMoreRef.current = true;
    setLoadMoreError("");
    setLoadingMore(true);
    retry();
  }

  return (
    <section
      className="mx-auto min-w-0 w-full max-w-[760px] py-5 sm:py-8"
      aria-labelledby="discovery-heading"
    >
      <div className="mb-5">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#783e42] uppercase">
          Lived · Discover
        </p>
        <h2
          id="discovery-heading"
          className="display-font mt-2 text-[31px] leading-tight tracking-[-0.05em] sm:text-[36px]"
        >
          A feed of work made by people.
        </h2>
        <p className="mt-2 text-[14px] leading-6 text-[#625b52]">
          Art, music, code, books, ideas, and photography—with the maker and
          original source close by.
        </p>
      </div>

      <div className="border-y border-[#d9d0c3] bg-[#f5f0e7] py-3 sm:border-0 sm:bg-transparent sm:py-0">
        <div
          className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain"
          role="group"
          aria-label="Discovery type. Scroll horizontally to see all categories."
        >
          {sources.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={source === item.id}
              onClick={() => {
                setSource(item.id);
                setPage(1);
              }}
              className={`flex min-h-11 shrink-0 items-center justify-start px-4 py-2.5 text-left text-[14px] transition-colors sm:min-h-0 ${
                source === item.id
                  ? "bg-[#783e42] text-[#fffaf2]"
                  : "bg-[#eee7db] text-[#51493f] hover:bg-[#e3d9ca]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1 text-[12px] text-[#756d63] sm:hidden">
          Scroll for more categories <ArrowRight size={13} aria-hidden="true" />
        </p>
      </div>

      <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[380px] text-[13px] leading-5 text-[#756d63]">
          {sourceNotes[source]}
        </p>
        <form onSubmit={handleSearch} className="flex w-full sm:max-w-[300px]">
          <label className="flex h-12 min-w-0 flex-1 items-center gap-2.5 border-b border-[#877d70]">
            <Search size={16} className="shrink-0 text-[#783e42]" aria-hidden="true" />
            <input
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder={
                source === "modern-art" || source === "art"
                  ? "Search artists or art"
                  : source === "music"
                    ? "Search songs or artists"
                    : source === "code"
                      ? "Search codebases"
                      : source === "books"
                        ? "Search books or authors"
                          : source === "ideas"
                            ? "Search ideas or topics"
                            : "Search photographers or subjects"
              }
              aria-label={`Search ${sources.find((item) => item.id === source)?.label}`}
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#92887d]"
            />
          </label>
          <button
            type="submit"
            className="ml-3 px-3 text-[14px] font-medium text-[#783e42] hover:text-[#29241f]"
          >
            Go
          </button>
        </form>
      </div>

      <div
        id="discovery-results"
        aria-label={`${sources.find((item) => item.id === source)?.label} discoveries`}
        className="pt-2"
      >
        {loading && items.length === 0 ? (
          <p className="py-12 text-center text-[15px] text-[#756d63]" aria-live="polite">
            Finding work from {sourceName || "the selected source"}…
          </p>
        ) : errorMessage && items.length === 0 ? (
          <div role="alert" className="bg-[#f0e2dc] px-5 py-7">
            <p className="font-serif text-xl text-[#783e42]">
              This source is temporarily unavailable.
            </p>
            <p className="mt-2 text-[14px] leading-6 text-[#625b52]">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 inline-flex items-center gap-2 border border-[#783e42] px-4 py-2.5 text-[14px] text-[#783e42] hover:bg-[#783e42] hover:text-white"
            >
              <RotateCw size={15} /> Try again
            </button>
          </div>
        ) : items.length === 0 && hasMore ? (
          <div className="bg-[#eee7db] px-6 py-10 text-center">
            <p className="text-[15px] text-[#625b52]">
              No records in this batch. Continue to the next page.
            </p>
            <div ref={loadMoreRef} className="mt-4">
              {loadingMore ? (
                <p className="text-[14px] text-[#756d63]">Finding more work…</p>
              ) : loadMoreError ? (
                <button
                  type="button"
                  onClick={retryNextPage}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#783e42]"
                >
                  <RotateCw size={15} /> Try again
                </button>
              ) : (
                <button
                  type="button"
                  onClick={requestNextPage}
                  className="px-4 py-2 text-[14px] font-medium text-[#783e42]"
                >
                  Load next batch
                </button>
              )}
            </div>
          </div>
        ) : items.length === 0 && !loading ? (
          <p className="bg-[#eee7db] px-6 py-10 text-center text-[15px] text-[#625b52]">
            No results found. Try another search.
          </p>
        ) : items.length > 0 ? (
          <>
            {warnings.length > 0 && (
              <p
                role="status"
                className="mb-5 bg-[#eee7db] px-4 py-3 text-[13px] leading-6 text-[#625b52]"
              >
                {warnings.join(" ")} Showing results from the available source.
              </p>
            )}
            <div className="mb-2 flex items-center justify-between gap-4 text-[13px] text-[#756d63]">
              <p>{items.length} discoveries from {sourceName}</p>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 underline underline-offset-4 hover:text-[#783e42]"
              >
                About this source <ExternalLink size={14} />
              </a>
            </div>
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <DiscoveryCard key={`${item.kind}-${item.id}`} item={item} />
              ))}
            </div>
            {(source === "code" ||
              source === "books" ||
              source === "ideas" ||
              source === "photography") && (
              <p className="mt-6 text-[13px] leading-6 text-[#756d63]">
                {source === "code"
                  ? "GitHub repository metadata and declared licenses are supplied by GitHub. Repository listings do not establish authorship or guarantee that a project is human-made."
                  : source === "books"
                    ? "Open Library is a shared book catalog. Cover availability and edition metadata may vary by record."
                    : source === "ideas"
                      ? "Crossref indexes publication metadata. An index record does not grant access to or reuse rights for full text."
                      : "Wikimedia Commons records include creator and license metadata. Check each source page for the license terms and attribution requirements."}
              </p>
            )}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="flex min-h-20 flex-col items-center justify-center gap-2 py-5 text-center"
                aria-live="polite"
              >
                {loadingMore ? (
                  <p className="text-[14px] text-[#756d63]">Finding more work…</p>
                ) : loadMoreError ? (
                  <>
                    <p className="text-[14px] text-[#783e42]">
                      More work could not be loaded: {loadMoreError}
                    </p>
                    <button
                      type="button"
                      onClick={retryNextPage}
                      className="inline-flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-[#783e42] hover:bg-[#eee7db]"
                    >
                      <RotateCw size={15} /> Try again
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={requestNextPage}
                    className="px-4 py-2 text-[14px] font-medium text-[#783e42] hover:bg-[#eee7db]"
                  >
                    Load more
                  </button>
                )}
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
}
