"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SectionHeading } from "@/components/section-heading";
import { WorkCard } from "@/components/work-card";
import { categories, discoveryItems } from "@/data/discover";
import type { ContentCategory, DiscoveryKind } from "@/types/content";

const feature = discoveryItems[0];
const categoryFilters: Array<"All subjects" | ContentCategory> = [
  "All subjects",
  ...categories,
];

export function DiscoveryExperience() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categoryFilters)[number]>("All subjects");
  const [activeKind, setActiveKind] = useState<DiscoveryKind | "All">("All");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return discoveryItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All subjects" || item.category === activeCategory;
      const matchesKind = activeKind === "All" || item.kind === activeKind;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.summary} ${item.category} ${item.kind} ${item.creator.name} ${item.creator.handle}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesKind && matchesQuery;
    });
  }, [activeCategory, activeKind, query]);
  const experiences = filteredItems.filter((item) => item.kind === "Experience");
  const materials = filteredItems.filter((item) => item.kind === "Material");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[#e9e8e2] bg-[#f7f6f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-12">
            <BrandMark />
            <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
              <a href="#experiences" className="text-[13px] font-medium text-[#34352f]">
                Experiences
              </a>
              <a href="#materials" className="text-[13px] text-[#777970] transition-colors hover:text-[#34352f]">
                Materials
              </a>
              <a href="#verification" className="text-[13px] text-[#777970] transition-colors hover:text-[#34352f]">
                How we verify
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <label className="hidden h-10 w-[205px] items-center gap-2.5 rounded-full border border-[#e8e7e1] bg-white/70 px-3.5 focus-within:border-[#aaa99e] sm:flex">
              <Search size={16} className="shrink-0 text-[#88897f]" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find something real"
                aria-label="Search experiences, materials, creators, and subjects"
                className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#999a91]"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="text-[#88897f] hover:text-[#34352f]"
                >
                  <X size={14} />
                </button>
              )}
            </label>
            <button
              type="button"
              onClick={() => setJoined((value) => !value)}
              className="hidden rounded-full bg-[#282923] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#45483c] sm:block"
            >
              {joined ? "You’re on the list" : "Join the community"}
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-[#34352f] hover:bg-[#eeede7] md:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#e9e8e2] bg-[#f7f6f2] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
              {[
                ["Experiences", "#experiences"],
                ["Materials", "#materials"],
                ["How we verify", "#verification"],
                ["Our point of view", "#about"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-[#494a43] hover:bg-[#eeede7]"
                >
                  {label}
                </a>
              ))}
              <label className="mt-2 flex h-11 items-center gap-2.5 rounded-full border border-[#e8e7e1] bg-white px-3.5 sm:hidden">
                <Search size={16} className="shrink-0 text-[#88897f]" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Find something real"
                  aria-label="Search experiences, materials, creators, and subjects"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#999a91]"
                />
              </label>
              <button
                type="button"
                onClick={() => setJoined((value) => !value)}
                className="mt-2 rounded-full bg-[#282923] px-5 py-3 text-left text-sm font-medium text-white sm:hidden"
              >
                {joined ? "You’re on the list" : "Join the community"}
              </button>
            </div>
          </nav>
        )}
      </header>

      <main>
        <section
          id="experiences"
          className="mx-auto grid max-w-[1440px] gap-9 px-5 pt-9 pb-12 sm:px-8 sm:pt-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14 lg:px-12 lg:pt-[58px] lg:pb-[70px]"
        >
          <div className="max-w-[510px]">
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-[#737767] uppercase">
              <span className="size-1.5 rounded-full bg-[#788466]" />
              A place for verified human experiences and materials
            </div>
            <h1 className="display-font max-w-[500px] text-[55px] leading-[0.99] font-medium tracking-[-0.065em] sm:text-[68px] lg:text-[76px]">
              Discover what’s{" "}
              <span className="text-[#7a8069] italic">human.</span>
              <br />
              Know what’s{" "}
              <span className="text-[#d86645] italic">real.</span>
            </h1>
            <p className="mt-6 max-w-[410px] text-[15px] leading-[1.8] text-[#6e7068] sm:text-[16px]">
              A considered place for first-hand stories and human-made work,
              with evidence behind every Lived Verified mark.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#materials"
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#282923] px-5 text-[13px] font-medium text-white transition-colors hover:bg-[#45483c]"
              >
                Explore experiences
                <ArrowRight size={15} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-1.5 px-1 py-3 text-[13px] font-medium text-[#55574f] hover:text-[#d86645]"
              >
                Why Lived?
                <ArrowDownRight size={14} />
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-2">
                {discoveryItems.slice(0, 3).map((item) => (
                  <Image
                    key={item.creator.handle}
                    src={item.creator.avatar}
                    alt=""
                    width={31}
                    height={31}
                    sizes="31px"
                    className="size-[31px] rounded-full border-2 border-[#f7f6f2] object-cover"
                  />
                ))}
              </div>
              <p className="text-[11px] text-[#777970]">
              People, process, and provenance — made visible
              </p>
            </div>
          </div>

          <Link
            href="#materials"
            aria-label={`Explore ${feature.title} by ${feature.creator.name}`}
            className="image-zoom group relative block aspect-[1.18/1] min-h-[300px] overflow-hidden rounded-[6px] bg-[#d2cec4] sm:aspect-[1.35/1] lg:aspect-[1.16/1]"
          >
            <Image
              src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90"
              alt="A small boat floating on still water beneath a misty mountain"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/5" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
              <span className="rounded-full border border-white/50 bg-black/10 px-3 py-1.5 text-[10px] font-medium tracking-[0.1em] text-white uppercase backdrop-blur-sm">
                THE LIVED VERIFIED STANDARD
              </span>
              <span className="grid size-10 place-items-center rounded-full bg-white text-[#34352f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={17} />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
              <div>
                <p className="mb-2 text-[10px] font-medium tracking-[0.16em] text-white/75 uppercase">
                  Real experiences. Human-made materials.
                </p>
                <p className="display-font max-w-[380px] text-[31px] leading-[1.08] tracking-[-0.04em] sm:text-[38px]">
                  Know who made it — and how we know.
                </p>
                <p className="mt-2.5 text-[12px] text-white/80">
                  Evidence-led discovery, not an endless feed
                </p>
              </div>
              <span className="hidden pb-1 text-[11px] text-white/75 sm:block">
                How verification works
              </span>
            </div>
          </Link>
        </section>

        <section id="materials" className="border-y border-[#e9e8e2] bg-[#f2f1eb]">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="text-[10px] font-semibold tracking-[0.17em] text-[#85867d] uppercase">
                Browse by subject
              </span>
              <ChevronDown size={13} className="text-[#85867d]" />
            </div>
            <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5">
              {(["All", "Experience", "Material"] as const).map((kind) => {
                const active = activeKind === kind;
                return (
                  <button
                    key={kind}
                    type="button"
                    onClick={() => setActiveKind(kind)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-4 py-2 text-[12px] transition-colors ${
                      active
                        ? "bg-[#65704e] text-white"
                        : "border border-[#dfded7] bg-transparent text-[#62645b] hover:border-[#a9aa9f] hover:bg-white/60"
                    }`}
                  >
                    {kind === "All" ? "All paths" : `${kind}s`}
                  </button>
                );
              })}
              <span className="mx-1 hidden h-5 w-px bg-[#d8d7cf] sm:block" />
              {categoryFilters.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-4 py-2 text-[12px] transition-colors ${
                      active
                        ? "bg-[#65704e] text-white"
                        : "border border-[#dfded7] bg-transparent text-[#62645b] hover:border-[#a9aa9f] hover:bg-white/60"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pt-12 pb-14 sm:px-8 sm:pt-[58px] lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow=              {query ? "Search results" : "Curated, evidence-led discovery"}
              title={
                query
                  ? `A little more “${query}”`
                  : activeCategory === "All subjects"
                  ? activeKind === "All"
                    ? "Experiences and materials"
                    : `${activeKind}s worth exploring`
                  : `In ${activeCategory.toLowerCase()}`
              }
              action={
                !query && (
                  <a
                    href="#materials"
                    className="mb-1 hidden items-center gap-2 text-[12px] font-medium text-[#62645b] hover:text-[#d86645] sm:inline-flex"
                  >
                    Browse the collection
                    <ArrowRight size={14} />
                  </a>
                )
              }
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="space-y-12">
              {experiences.length > 0 && (
                <section aria-labelledby="experience-heading">
                  <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#e8e7e1] pb-3">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.17em] text-[#85867d] uppercase">
                        First person, first hand
                      </p>
                      <h3 id="experience-heading" className="display-font mt-1 text-[24px] tracking-[-0.04em]">
                        Lived experiences
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#85867d]">{experiences.length} stories</span>
                  </div>
                  <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-7">
                    {experiences.map((item) => <WorkCard key={item.id} item={item} />)}
                  </div>
                </section>
              )}
              {materials.length > 0 && (
                <section aria-labelledby="material-heading">
                  <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#e8e7e1] pb-3">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.17em] text-[#85867d] uppercase">
                        Made by people, with intention
                      </p>
                      <h3 id="material-heading" className="display-font mt-1 text-[24px] tracking-[-0.04em]">
                        Human-made materials
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#85867d]">{materials.length} works</span>
                  </div>
                  <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-7">
                    {materials.map((item) => <WorkCard key={item.id} item={item} />)}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-[#d9d8d0] px-6 py-16 text-center">
              <p className="display-font text-2xl">Nothing here just yet.</p>
              <p className="mt-2 text-sm text-[#777970]">
                Try another search or explore a different feeling.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All subjects");
                  setActiveKind("All");
                }}
                className="mt-5 rounded-full border border-[#d9d8d0] px-4 py-2 text-xs font-medium hover:bg-white"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All subjects");
                setActiveKind("All");
                setQuery("");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#d9d8d0] px-5 py-3 text-[12px] font-medium text-[#484a43] transition-colors hover:border-[#a9aa9f] hover:bg-white"
            >
              Discover something else
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        <section id="verification" className="border-y border-[#e8e7e1] bg-[#eeede7]">
          <div className="mx-auto grid max-w-[1440px] gap-7 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-12 lg:py-12">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e0e1d7] text-[#5d674a]">
                <Check size={19} />
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.17em] text-[#7b7d72] uppercase">
                  THE LIVED VERIFIED STANDARD
                </p>
                <h2 className="display-font mt-1.5 text-[22px] leading-tight tracking-[-0.04em] sm:text-[26px]">
                  Evidence first. Clear about what was checked.
                </h2>
                <p className="mt-2 max-w-[610px] text-[13px] leading-6 text-[#707269]">
                  A verified mark should link to a human-reviewed account of
                  the evidence: who created or experienced it, where it came
                  from, and what was checked. A creator’s declaration alone
                  is not verification.
                </p>
              </div>
            </div>
            <a
              href="#about"
              className="inline-flex items-center gap-2 pl-[60px] text-[12px] font-medium text-[#55574f] hover:text-[#d86645] md:pl-0"
            >
              The verification process
              <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-[72px] lg:px-12">
          <div className="grid gap-8 border-b border-[#e8e7e1] pb-12 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-14">
            <div className="max-w-[690px]">
              <p className="mb-3 text-[10px] font-semibold tracking-[0.17em] text-[#85867d] uppercase">
                Not another feed. A trusted record of human life and making.
              </p>
              <h2 className="display-font text-[38px] leading-[1.08] tracking-[-0.055em] sm:text-[52px]">
                Discover the experience.
                <br />
                <span className="text-[#7a8069] italic">Understand its origins.</span>
              </h2>
              <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-[#707269]">
                Explore first-hand human experiences and materials made by
                people. Every verification claim should explain its evidence
                and limits, so discovery is grounded in trust—not a scrolling
                feed or an impossible promise.
              </p>
            </div>
            <a
              href="mailto:hello@lived.world"
              className="inline-flex h-12 w-fit items-center gap-3 rounded-full border border-[#d9d8d0] px-5 text-[12px] font-medium transition-colors hover:border-[#9fa092] hover:bg-white"
            >
              A little more about us
              <ArrowUpRight size={15} />
            </a>
          </div>
          <footer className="flex flex-col gap-3 pt-5 text-[11px] text-[#82837a] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Lived. Made for the things that make us human.</p>
            <div className="flex gap-5">
              <a href="mailto:hello@lived.world" className="hover:text-[#34352f]">Contact</a>
              <a href="#about" className="hover:text-[#34352f]">Our principles</a>
              <a href="#experiences" className="hover:text-[#34352f]">Back to top</a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
