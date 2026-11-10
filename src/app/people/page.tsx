import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function PeoplePage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-10 sm:px-9 sm:py-16">
      <PageIntro
        eyebrow="The people behind the work"
        title="Meet the makers."
        description="A directory of artists, musicians, writers, and makers is taking shape. Every profile will belong to a real contributor and link to their original work."
      />
      <section className="mt-12 bg-[#eee7db] px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#68735b] uppercase">
          The directory is opening soon
        </p>
        <h2 className="display-font mt-3 max-w-[560px] text-[32px] leading-tight tracking-[-0.05em] sm:text-[40px]">
          A name should lead to the person—and the work.
        </h2>
        <p className="mt-3 max-w-[600px] text-[11px] leading-5 text-[#756d63]">
          Profiles will be created by their owners, with clear authorship and a
          human review process.
        </p>
        <Link
          href="/join"
          className="mt-6 inline-block border-b border-[#783e42] pb-1 text-[10px] text-[#783e42] hover:text-[#29241f]"
        >
          Get an account
        </Link>
      </section>
    </main>
  );
}
