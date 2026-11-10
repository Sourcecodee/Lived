"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ExternalMaterial } from "@/types/content";

export function FeaturedMaterials() {
  const [materials, setMaterials] = useState<ExternalMaterial[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/v1/materials?limit=4", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load sourced works.");
        const result = (await response.json()) as { data: ExternalMaterial[] };
        setMaterials(result.data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <p role="status" className="py-8 text-[11px] text-[#756d63]">
        The collection is taking a moment to respond.{" "}
        <Link href="/materials" className="underline underline-offset-2">
          Browse the collection
        </Link>
        .
      </p>
    );
  }

  if (materials.length === 0) {
    return (
      <div aria-label="Loading sourced works" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="aspect-[4/5] bg-[#e2dacf]" />
            <div className="mt-3 h-3 w-3/4 bg-[#e2dacf]" />
            <div className="mt-2 h-2 w-1/2 bg-[#e2dacf]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {materials.map((material, index) => (
        <article key={material.id} className={index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
          <Link href={`/materials/${material.id}`} className="group block">
            <div className={`relative overflow-hidden bg-[#e2dacf] ${index === 0 ? "aspect-[1.12/1] sm:aspect-[1.4/1]" : "aspect-[4/5]"}`}>
              {material.imageUrl ? (
                <Image
                  src={material.imageUrl}
                  alt={material.imageAlt}
                  fill
                  sizes={index === 0 ? "(max-width: 640px) 90vw, 60vw" : "(max-width: 1024px) 45vw, 22vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center font-serif text-[17px] text-[#625b52]">
                  {material.title}
                </div>
              )}
            </div>
            <div className="pt-3">
              <h3 className={`font-serif leading-snug text-[#29241f] group-hover:text-[#783e42] ${index === 0 ? "text-[19px] sm:text-[23px]" : "text-[15px]"}`}>
                {material.title}
              </h3>
              <p className="mt-1 text-[9px] text-[#756d63]">
                {material.artistTitle || "Artist not recorded"}
                {material.dateDisplay && ` · ${material.dateDisplay}`}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
