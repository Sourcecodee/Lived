import { PageIntro } from "@/components/page-intro";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-9 sm:px-9 sm:py-14">
      <PageIntro
        eyebrow="The Lived standard"
        title="Authenticity is earned."
        description="Lived is a considered home for original work and first-hand knowledge—where the maker, the source, and the story behind a piece matter as much as the piece itself."
      />
      <div className="grid gap-10 py-9 sm:grid-cols-[0.7fr_1.3fr] sm:gap-16 sm:py-14">
        <p className="display-font text-[25px] leading-snug tracking-[-0.04em] text-[#783e42] sm:text-[30px]">
          Every original has a person, a process, and a point of origin.
        </p>
        <div className="space-y-5 text-[12px] leading-6 text-[#625b52]">
          <p>
            Art, music, craft, writing, code, and first-hand knowledge all carry
            a human point of view. Lived brings these forms together without
            flattening them into a popularity contest.
          </p>
          <p>
            Each work should lead back to its maker and the context in which it
            was created. We want discovery to feel generous and open, while
            keeping its sources close at hand.
          </p>
          <h2 className="display-font pt-3 text-[25px] tracking-[-0.04em] text-[#29241f]">
            How Lived review will work
          </h2>
          <p>
            A Lived authenticity review is planned to check creator identity,
            evidence of authorship, and the work’s provenance. Review decisions
            will be made by people, and the badge will describe what was
            checked—not promise that a work is beyond dispute.
          </p>
          <p>
            No community work has been reviewed yet. The account, submission,
            and review systems are still being built, so no work currently
            carries a Lived authenticity badge.
          </p>
          <p>
            Art Institute of Chicago records are externally sourced collection
            data. The museum’s record and rights details are linked on each
            item; this is separate from Lived’s planned creator review.
          </p>
        </div>
      </div>
      <section className="grid gap-6 bg-[#29241f] p-6 text-[#f5f0e7] sm:grid-cols-3 sm:p-8">
        {[
          ["01", "The maker", "Who created the work?"],
          ["02", "The making", "What evidence supports its authorship?"],
          ["03", "The origin", "Where did it come from, and what is its history?"],
        ].map(([number, title, copy]) => (
          <div key={number}>
            <p className="font-serif text-[11px] italic text-[#d3b88a]">{number}</p>
            <h2 className="mt-2 font-serif text-[19px]">{title}</h2>
            <p className="mt-1 text-[10px] leading-5 text-[#c8beb0]">{copy}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
