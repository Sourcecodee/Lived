"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink, RotateCw } from "lucide-react";
import type { ExternalMaterial } from "@/types/content";

function isErrorPayload(value: unknown): value is { error: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof value.error === "string"
  );
}

export function ExternalMaterialDetail({ id }: { id: string }) {
  const [material, setMaterial] = useState<ExternalMaterial | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`/api/v1/materials/${encodeURIComponent(id)}`, {
          signal: controller.signal,
        });
        const payload: unknown = await response.json();
        if (!response.ok) {
          throw new Error(
            isErrorPayload(payload) ? payload.error : "Unable to load this artwork.",
          );
        }
        const result = payload as { data: ExternalMaterial };
        setMaterial(result.data);
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load this artwork.",
        );
        setMaterial(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [id, retry]);

  if (loading) {
    return (
      <main className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
        <p className="font-serif text-2xl text-[#29241f]">Opening the collection record…</p>
      </main>
    );
  }

  if (errorMessage || !material) {
    return (
      <main className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8">
        <Link href="/materials" className="text-[11px] text-[#783e42] underline underline-offset-2">
          Back to materials
        </Link>
        <div role="alert" className="mt-6 border-y border-[#b45a50] py-7">
          <p className="font-serif text-xl text-[#783e42]">This collection record is unavailable.</p>
          <p className="mt-2 text-[11px] text-[#756d63]">{errorMessage}</p>
          {errorMessage.includes("temporarily unavailable") ||
          errorMessage.includes("timed out") ? (
            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-4 inline-flex items-center gap-2 border border-[#783e42] px-3 py-2 text-[10px] text-[#783e42] hover:bg-[#783e42] hover:text-white"
            >
              <RotateCw size={13} /> Try again
            </button>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1080px] px-5 py-9 sm:px-8 sm:py-12">
      <Link
        href="/materials"
        className="text-[11px] text-[#783e42] underline decoration-[#b4a99b] underline-offset-2"
      >
        Back to the collection
      </Link>
      <article className="mt-6 grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-12">
        <div className="relative flex min-h-[360px] items-center justify-center bg-[#e8e1d7] sm:min-h-[520px]">
          {material.imageUrl ? (
            <Image
              src={material.imageUrl}
              alt={material.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain"
            />
          ) : (
            <p className="max-w-[260px] px-8 text-center font-serif text-[18px] text-[#625b52]">
              {material.isPublicDomain
                ? "No image is available for this record."
                : "The image is not displayed because its rights status varies."}
            </p>
          )}
        </div>
        <div className="py-1">
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#783e42] uppercase">
            Art Institute of Chicago · Collection record {material.id}
          </p>
          <h1 className="display-font mt-4 text-[36px] leading-[1.08] tracking-[-0.05em] sm:text-[46px]">
            {material.title}
          </h1>
          <p className="mt-4 font-serif text-[20px] text-[#62594e]">
            {material.artistTitle || "Artist not recorded"}
          </p>
          <dl className="mt-7 grid gap-2 bg-[#eee7db] p-4">
            {[
              ["Date", material.dateDisplay],
              ["Medium", material.mediumDisplay],
              ["Type", material.artworkTypeTitle],
              ["Rights", material.isPublicDomain ? "Public domain" : "Rights vary; consult source"],
            ]
              .filter((entry): entry is [string, string] => Boolean(entry[1]))
              .map(([label, value]) => (
                <div key={label} className="grid grid-cols-[74px_1fr] gap-3 py-1.5">
                  <dt className="text-[9px] font-semibold tracking-[0.08em] text-[#877c70] uppercase">{label}</dt>
                  <dd className="text-[11px] leading-5 text-[#51493f]">{value}</dd>
                </div>
              ))}
          </dl>
          <a
            href={material.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-[#783e42] px-4 py-3 text-[10px] font-medium text-[#783e42] hover:bg-[#783e42] hover:text-white"
          >
            View original museum record <ExternalLink size={13} />
          </a>
          <p className="mt-7 max-w-[420px] text-[10px] leading-5 text-[#82786c]">
            Collection details and rights information are supplied by the
            Art Institute of Chicago. Visit the original record for its full
            history and the latest rights details.
          </p>
        </div>
      </article>
    </main>
  );
}
