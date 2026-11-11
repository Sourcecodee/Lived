"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, RotateCw } from "lucide-react";
import type { ExternalMaterial } from "@/types/content";

interface CollectionResponse {
  data: ExternalMaterial[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

export function CollectionResults({ query }: { query: string }) {
  const [result, setResult] = useState<CollectionResponse | null>(null);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ q: query, limit: "9" });

    fetch(`/api/v1/materials?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const payload: unknown = await response.json();
        if (!response.ok) {
          const message =
            typeof payload === "object" &&
            payload !== null &&
            "error" in payload &&
            typeof payload.error === "string"
              ? payload.error
              : "This collection could not be loaded.";
          throw new Error(message);
        }
        setResult(payload as CollectionResponse);
        setError("");
      })
      .catch((cause) => {
        if (controller.signal.aborted) return;
        setError(
          cause instanceof Error
            ? cause.message
            : "This collection could not be loaded.",
        );
        setResult(null);
      });

    return () => controller.abort();
  }, [query, retry]);

  if (error) {
    return (
      <div role="alert" className="bg-[#eee7db] p-6">
        <p className="font-serif text-[18px] text-[#783e42]">
          The collection is taking a moment.
        </p>
        <p className="mt-2 text-[10px] text-[#756d63]">{error}</p>
        <button
          type="button"
          onClick={() => setRetry((value) => value + 1)}
          className="mt-4 inline-flex items-center gap-2 text-[10px] text-[#783e42] underline underline-offset-2"
        >
          <RotateCw size={12} /> Try again
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div
        aria-label="Loading collection works"
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[1, 2, 3].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="aspect-[4/5] bg-[#eee7db]" />
            <div className="mt-3 h-3 w-3/4 bg-[#eee7db]" />
            <div className="mt-2 h-2 w-1/2 bg-[#eee7db]" />
          </div>
        ))}
      </div>
    );
  }

  if (result.data.length === 0) {
    return (
      <p className="bg-[#eee7db] p-7 text-[11px] text-[#756d63]">
        No works appeared for this theme.{" "}
        <Link href="/materials" className="underline underline-offset-2">
          Search the full collection
        </Link>
        .
      </p>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4 text-[10px] text-[#756d63]">
        <p>{result.pagination.total.toLocaleString()} matching collection works</p>
        <a
          href="https://www.artic.edu/open-access/public-api"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 underline decoration-[#b4a99b] underline-offset-2"
        >
          Source <ExternalLink size={11} />
        </a>
      </div>
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((material) => (
          <article key={material.id}>
            <Link href={`/materials/${material.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#eee7db]">
                {material.imageUrl ? (
                  <Image
                    src={material.imageUrl}
                    alt={material.imageAlt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                ) : (
                  <p className="flex h-full items-center justify-center px-6 text-center font-serif text-lg text-[#756d63]">
                    {material.title}
                  </p>
                )}
              </div>
              <h2 className="mt-3 font-serif text-[17px] leading-snug text-[#29241f] group-hover:text-[#783e42]">
                {material.title}
              </h2>
              <p className="mt-1 text-[10px] text-[#756d63]">
                {material.artistTitle || "Artist not recorded"}
                {material.dateDisplay && ` · ${material.dateDisplay}`}
              </p>
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-8 text-[9px] leading-5 text-[#817669]">
        This is a search-led pathway through the Art Institute of Chicago’s
        catalogue, not an endorsement or Lived authenticity review.
      </p>
    </div>
  );
}
