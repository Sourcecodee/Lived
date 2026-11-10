import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function ExperiencesPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-10 sm:px-9 sm:py-16">
      <PageIntro
        eyebrow="First-hand knowledge"
        title="Stories, in the teller’s own words."
        description="Experiences shared by the people who lived them, with the context and care they deserve."
      />
      <section className="mt-12 bg-[#eee7db] px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#68735b] uppercase">
          The first stories are still to come
        </p>
        <h2 className="display-font mt-3 max-w-[600px] text-[32px] leading-tight tracking-[-0.05em] sm:text-[40px]">
          This space is for real experience, shared by real people.
        </h2>
        <p className="mt-3 max-w-[580px] text-[11px] leading-5 text-[#756d63]">
          We’re preparing a thoughtful way to contribute and review first-hand
          accounts before they are published.
        </p>
        <Link
          href="/share"
          className="mt-6 inline-block border-b border-[#783e42] pb-1 text-[10px] text-[#783e42] hover:text-[#29241f]"
        >
          Share your experience
        </Link>
      </section>
    </main>
  );
}
