import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialCollections } from "@/data/collections";
import { DiscoveryFeed } from "@/components/discovery-feed";

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-[1360px] px-5 sm:px-9">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)] lg:gap-16">
        <DiscoveryFeed />

        <aside className="hidden pt-12 lg:block">
          <div className="sticky top-8">
            <p className="text-[12px] font-semibold tracking-[0.12em] text-[#68735b] uppercase">
              Editor’s paths
            </p>
            <h2 className="display-font mt-2 text-[28px] leading-tight tracking-[-0.05em]">
              Collections with a point of view.
            </h2>
            <div className="mt-5 border-t border-[#d9d0c3]">
              {editorialCollections.map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group block border-b border-[#d9d0c3] py-4"
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
            <Link
              href="/share"
              className="mt-6 inline-flex items-center gap-2 text-[14px] text-[#783e42] underline underline-offset-4 hover:text-[#29241f]"
            >
              Prepare to share your work <ArrowUpRight size={15} />
            </Link>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-[660px] border-t border-[#d9d0c3] py-7 lg:hidden">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-[#68735b] uppercase">
          Editor’s paths
        </p>
        <div className="mt-3 grid gap-3">
          {editorialCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group border-b border-[#d9d0c3] py-3"
            >
              <span className="block font-serif text-[19px] group-hover:text-[#783e42]">
                {collection.title}
              </span>
              <span className="mt-1 block text-[14px] text-[#756d63]">
                {collection.subtitle}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
