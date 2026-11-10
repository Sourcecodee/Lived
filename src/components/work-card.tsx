"use client";

import Image from "next/image";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import type { DiscoveryItem } from "@/types/content";

interface WorkCardProps {
  item: DiscoveryItem;
}

const imageSizes =
  "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw";

export function WorkCard({ item }: WorkCardProps) {
  const [saved, setSaved] = useState(false);
  const ratioClass = {
    portrait: "aspect-[4/5]",
    landscape: "aspect-[5/4]",
    square: "aspect-square",
  }[item.ratio];

  return (
    <article className="group min-w-0">
      <div
        className={`image-zoom relative overflow-hidden rounded-[5px] bg-[#e7e4dc] ${ratioClass}`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes={imageSizes}
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#68695f]">
            Sample · not verified
          </span>
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-label={saved ? `Remove ${item.title} from saves` : `Save ${item.title}`}
            aria-pressed={saved}
            className={`grid size-9 place-items-center rounded-full backdrop-blur transition-colors ${
              saved
                ? "bg-[#65704e] text-white"
                : "bg-white/85 text-[#34352f] hover:bg-white"
            }`}
          >
            <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 pt-3">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium tracking-[-0.015em]">
            {item.title}
          </p>
          <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#777970]">
            {item.summary}
          </p>
          <p className="mt-1 text-[12px] text-[#777970]">
            {item.creator.name}
            <span className="mx-1.5 text-[#b8b8b0]">·</span>
            {item.kind} · {item.category}
          </p>
        </div>
        <Image
          src={item.creator.avatar}
          alt=""
          width={30}
          height={30}
          sizes="30px"
          className="mt-0.5 size-[30px] shrink-0 rounded-full object-cover"
        />
      </div>
    </article>
  );
}
