import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialCollections } from "@/data/collections";
import { DiscoveryFeed } from "@/components/discovery-feed";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1360px] px-5 sm:px-9">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)] lg:gap-16">
        <DiscoveryFeed />

        <aside className="hidden pt-12 lg:block">
          <div className="sticky top-8">
            <p className="text-[12px] font-semibold tracking-[0.12em] text-[#783e42] uppercase">
              A note from Lived
            </p>
            <p className="mt-3 font-serif text-[24px] leading-tight">
              Good work comes with a story.
            </p>
            <p className="mt-3 text-[14px] leading-6 text-[#625b52]">
              Here you can discover things people made, alongside their source,
              process, and provenance.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#783e42] underline underline-offset-4 hover:text-[#29241f]"
            >
              How Lived works <ArrowUpRight size={15} />
            </Link>
            <div className="mt-8 border-t border-[#d9d0c3] pt-5">
              <p className="text-[12px] font-semibold tracking-[0.1em] text-[#68735b] uppercase">
                From the collection
              </p>
              {editorialCollections.map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group mt-4 block"
                >
                  <span className="block font-serif text-[18px] leading-snug group-hover:text-[#783e42]">
                    {collection.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-5 text-[#756d63]">
                    {collection.subtitle}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
