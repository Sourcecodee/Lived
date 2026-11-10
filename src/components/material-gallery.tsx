"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ExternalLink, RotateCw, Search } from "lucide-react";
import type { ExternalMaterial } from "@/types/content";

interface MaterialsResponse {
  data: ExternalMaterial[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

function isErrorPayload(value: unknown): value is { error: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "string"
  );
}

function ArtworkEntry({
  material,
  index,
}: {
  material: ExternalMaterial;
  index: number;
}) {
  const imageRatio = ["aspect-[4/5]", "aspect-[1/1]", "aspect-[3/4]"][index % 3];

  return (
    <article className="mb-10 break-inside-avoid">
      <Link
        href={`/materials/${material.id}`}
        className="group block text-[#29241f]"
      >
        <div className={`relative ${imageRatio} overflow-hidden bg-[#e8e1d7]`}>
          {material.imageUrl ? (
            <Image
              src={material.imageUrl}
              alt={material.imageAlt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 29vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center font-serif text-lg text-[#736a5d]">
              {material.isPublicDomain
                ? "No image in the collection record"
                : "Image not shown · rights vary"}
            </div>
          )}
          <span className="absolute left-3 top-3 bg-[#f5f0e7]/95 px-2.5 py-1 text-[9px] tracking-[0.07em] text-[#494139] uppercase">
            Art Institute collection
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 pt-3.5">
          <div className="min-w-0">
            <h2 className="font-serif text-[18px] leading-snug tracking-[-0.025em] group-hover:text-[#783e42]">
              {material.title}
            </h2>
            <p className="mt-1.5 text-[11px] text-[#756d63]">
              {material.artistTitle || "Artist not recorded"}
              {material.dateDisplay && ` · ${material.dateDisplay}`}
            </p>
            <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-[#8a8176]">
              {material.mediumDisplay || material.artworkTypeTitle || "Collection artwork"}
            </p>
          </div>
          <span className="mt-1 shrink-0 text-[9px] leading-4 text-[#756d63]">
            {material.isPublicDomain ? "Public domain" : "Rights vary"}
          </span>
        </div>
      </Link>
      <p className="mt-2 text-[9px] leading-4 text-[#8a8176]">
        Collection record #{material.id} ·{" "}
        <a
          href={material.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-[#b4a99b] underline-offset-2 hover:text-[#783e42]"
        >
          View source
        </a>
      </p>
    </article>
  );
}

export function MaterialGallery() {
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ExternalMaterial[]>([]);
  const [pagination, setPagination] = useState<MaterialsResponse["pagination"] | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestNumber, setRequestNumber] = useState(0);

  const retry = useCallback(() => setRequestNumber((number) => number + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), limit: "18" });
    if (query) params.set("q", query);

    async function loadMaterials() {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/v1/materials?${params}`, {
          signal: controller.signal,
        });
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(
            isErrorPayload(payload)
              ? payload.error
              : "The collection request failed. Please try again.",
          );
        }
        const result = payload as MaterialsResponse;
        setItems(result.data);
        setPagination(result.pagination);
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "The collection could not be loaded. Please try again.",
        );
        setItems([]);
        setPagination(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadMaterials();
    return () => controller.abort();
  }, [page, query, requestNumber]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setQuery(queryInput.trim());
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 bg-[#eee7db] px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#783e42] uppercase">
            Art Institute of Chicago · Open Access
          </p>
          <p className="mt-1.5 max-w-[540px] text-[11px] leading-5 text-[#756d63]">
            Original works with museum attribution, rights information, and a
            direct link to each collection record.
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex w-full sm:max-w-[355px]">
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 border-b border-[#877d70]">
            <Search size={15} className="shrink-0 text-[#783e42]" aria-hidden="true" />
            <input
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="Search art, artist, or material"
              aria-label="Search Art Institute collection"
              className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#92887d]"
            />
          </label>
          <button
            type="submit"
            className="ml-3 border border-[#783e42] px-4 text-[10px] font-medium text-[#783e42] transition-colors hover:bg-[#783e42] hover:text-white"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div aria-live="polite" className="py-16 text-center">
          <p className="font-serif text-2xl text-[#29241f]">Opening the collection…</p>
          <p className="mt-2 text-[11px] text-[#756d63]">
            Loading current records from the Art Institute of Chicago API.
          </p>
        </div>
      ) : errorMessage ? (
        <div role="alert" className="bg-[#f0e2dc] px-5 py-7">
          <p className="font-serif text-xl text-[#783e42]">
            We couldn’t reach the collection.
          </p>
          <p className="mt-2 text-[11px] leading-5 text-[#756d63]">{errorMessage}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-4 inline-flex items-center gap-2 border border-[#783e42] px-3 py-2 text-[10px] text-[#783e42] hover:bg-[#783e42] hover:text-white"
          >
            <RotateCw size={13} /> Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#eee7db] px-6 py-14 text-center">
          <p className="font-serif text-2xl text-[#29241f]">No works found.</p>
          <p className="mt-2 text-[11px] text-[#756d63]">
            Try a different artist, material, or title.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between text-[10px] text-[#756d63]">
            <p>
              {pagination?.total.toLocaleString()} collection records
              {query && ` for “${query}”`}
            </p>
            <a
              href="https://www.artic.edu/open-access/public-api"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline decoration-[#b4a99b] underline-offset-2 hover:text-[#783e42]"
            >
              About this source <ExternalLink size={11} />
            </a>
          </div>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {items.map((item, index) => (
              <ArtworkEntry key={item.id} material={item} index={index} />
            ))}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-3 flex items-center justify-between py-4">
              <span className="text-[10px] text-[#756d63]">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="border border-[#a99d8d] px-3 py-2 text-[10px] text-[#51493f] enabled:hover:border-[#783e42] enabled:hover:text-[#783e42] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((value) => value + 1)}
                  className="border border-[#a99d8d] px-3 py-2 text-[10px] text-[#51493f] enabled:hover:border-[#783e42] enabled:hover:text-[#783e42] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
