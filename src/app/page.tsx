import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, AudioLines, BookOpen, Fingerprint, MessageCircle, Palette } from "lucide-react";
import { FeaturedMaterials } from "@/components/featured-materials";

const paths = [
  {
    icon: Palette,
    title: "Art & objects",
    description: "See the hand, material, and history behind a piece.",
    href: "/materials",
  },
  {
    icon: AudioLines,
    title: "Music & sound",
    description: "A home for recordings, compositions, and the stories behind them.",
    href: "/share",
  },
  {
    icon: BookOpen,
    title: "Notes & ideas",
    description: "Keep thoughtful work connected to the person who made it.",
    href: "/resources",
  },
  {
    icon: MessageCircle,
    title: "Conversations",
    description: "Exchange perspectives with care and curiosity.",
    href: "/conversations",
  },
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-[1320px] px-5 pt-12 pb-12 sm:px-9 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-[76px]">
        <p className="mb-5 text-[9px] font-medium tracking-[0.17em] text-[#783e42] uppercase">
          A home for work made by people
        </p>
        <div className="grid gap-7 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-12">
          <h1 className="display-font max-w-[820px] text-[48px] leading-[0.96] tracking-[-0.065em] sm:text-[70px] lg:text-[88px]">
            Good work has a{" "}
            <span className="text-[#783e42] italic">human story.</span>
          </h1>
          <div className="max-w-[410px] pb-1">
            <p className="text-[13px] leading-6 text-[#625b52] sm:text-[14px]">
              Discover original art, music, ideas, and lived knowledge—with
              the people, places, and process behind each one kept in view.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/materials"
                className="inline-flex items-center gap-1.5 border-b border-[#783e42] pb-1.5 text-[11px] font-medium text-[#783e42] hover:text-[#29241f]"
              >
                Explore the collection <ArrowDownRight size={14} />
              </Link>
              <Link
                href="/share"
                className="text-[11px] text-[#625b52] underline decoration-[#b4a99b] underline-offset-4 hover:text-[#783e42]"
              >
                Share your work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eee7db]">
        <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-9 sm:py-14 lg:py-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.15em] text-[#68735b] uppercase">
                Open collection · source attributed
              </p>
              <h2 className="display-font mt-2 text-[31px] leading-tight tracking-[-0.05em] sm:text-[40px]">
                Made by hand. Kept in context.
              </h2>
            </div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-1 text-[10px] text-[#783e42] hover:text-[#29241f]"
            >
              Enter the collection <ArrowUpRight size={13} />
            </Link>
          </div>
          <FeaturedMaterials />
          <p className="mt-5 max-w-[680px] text-[10px] leading-5 text-[#817669]">
            From the Art Institute of Chicago Open Access collection. Each work
            links back to its museum record; a collection source is not the same
            as a Lived authenticity review.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 py-14 sm:px-9 sm:py-20 lg:py-24">
        <div className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="max-w-[360px]">
            <p className="text-[9px] font-semibold tracking-[0.16em] text-[#783e42] uppercase">
              More than a gallery
            </p>
            <h2 className="display-font mt-3 text-[38px] leading-[1.02] tracking-[-0.055em] sm:text-[48px]">
              A world of original work.
            </h2>
            <p className="mt-4 text-[12px] leading-6 text-[#756d63]">
              From a song made in a bedroom to a practice shaped over a
              lifetime. Find the form that feels like yours.
            </p>
          </div>
          <div className="grid gap-x-10 sm:grid-cols-2">
            {paths.map(({ icon: Icon, ...path }) => (
              <Link
                key={path.title}
                href={path.href}
                className="group flex gap-4 py-4 sm:py-5"
              >
                <Icon
                  size={17}
                  strokeWidth={1.4}
                  className="mt-1 shrink-0 text-[#783e42]"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-serif text-[19px] text-[#29241f] group-hover:text-[#783e42]">
                    {path.title}
                  </span>
                  <span className="mt-1 block max-w-[290px] text-[10px] leading-5 text-[#756d63]">
                    {path.description}
                  </span>
                </span>
                <ArrowUpRight
                  size={13}
                  className="ml-auto mt-1 shrink-0 text-[#a99d8d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241f] text-[#f5f0e7]">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-11 sm:px-9 sm:py-16 md:grid-cols-[1fr_auto] md:items-end lg:py-[72px]">
          <div className="max-w-[720px]">
            <Fingerprint size={22} strokeWidth={1.3} className="mb-5 text-[#d3b88a]" />
            <p className="text-[9px] font-medium tracking-[0.16em] text-[#d3b88a] uppercase">
              The Lived standard
            </p>
            <h2 className="display-font mt-3 text-[34px] leading-[1.04] tracking-[-0.05em] sm:text-[46px]">
              Originality deserves more than a label.
            </h2>
            <p className="mt-4 max-w-[620px] text-[11px] leading-6 text-[#c8beb0] sm:text-[12px]">
              Lived is being built around creator identity, authorship, and
              source review by people. A work earns its place through its
              provenance—not through popularity.
            </p>
          </div>
          <Link
            href="/about"
            className="w-fit border-b border-[#c6b392] pb-1.5 text-[10px] text-[#e8d9bf] hover:text-white"
          >
            How the standard works
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-8 px-5 py-14 sm:px-9 sm:py-20 md:grid-cols-2 md:gap-16 lg:py-24">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.15em] text-[#68735b] uppercase">
            For makers and thinkers
          </p>
          <h2 className="display-font mt-3 max-w-[480px] text-[36px] leading-[1.03] tracking-[-0.05em] sm:text-[44px]">
            Put your work where its story can travel.
          </h2>
          <p className="mt-4 max-w-[440px] text-[11px] leading-6 text-[#756d63]">
            Share a painting, a track, a codebase, a question, or the thing
            you learned the hard way. Keep your name and process attached.
          </p>
          <Link
            href="/share"
            className="mt-6 inline-flex items-center gap-2 bg-[#783e42] px-5 py-3 text-[10px] font-medium text-[#fffaf2] transition-colors hover:bg-[#5e3034]"
          >
            Prepare a submission <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="flex flex-col justify-center bg-[#eee7db] p-6 sm:p-8">
          <p className="text-[9px] font-semibold tracking-[0.13em] text-[#783e42] uppercase">
            A community with room to talk
          </p>
          <h3 className="display-font mt-3 text-[28px] leading-tight tracking-[-0.045em] sm:text-[34px]">
            Good conversations start with real people.
          </h3>
          <p className="mt-3 max-w-[450px] text-[11px] leading-5 text-[#756d63]">
            Share ideas, ask questions, and respond to work with generosity.
            Accounts and conversations are part of the next platform build.
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            <Link
              href="/conversations"
              className="border-b border-[#783e42] pb-1 text-[10px] text-[#783e42] hover:text-[#29241f]"
            >
              Explore conversations
            </Link>
            <Link
              href="/join"
              className="border-b border-[#a99d8d] pb-1 text-[10px] text-[#625b52] hover:text-[#783e42]"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
