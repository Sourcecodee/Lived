import Link from "next/link";
import { PageIntro } from "@/components/page-intro";

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-10 sm:px-9 sm:py-16">
      <PageIntro
        eyebrow="Ideas, practice, and craft"
        title="Knowledge worth keeping."
        description="Thoughts, field notes, tutorials, and codebases—shared by the people who made or learned them."
      />
      <section className="mt-12 grid gap-8 bg-[#eee7db] px-6 py-9 sm:grid-cols-[1fr_auto] sm:items-end sm:px-10 sm:py-12">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#68735b] uppercase">
            A new collection is taking shape
          </p>
          <h2 className="display-font mt-3 max-w-[600px] text-[32px] leading-tight tracking-[-0.05em] sm:text-[40px]">
            Good ideas deserve a real author.
          </h2>
          <p className="mt-3 max-w-[550px] text-[11px] leading-5 text-[#756d63]">
            The library will open with original contributions and a clear trail
            to the person and process behind them.
          </p>
        </div>
        <Link
          href="/share"
          className="w-fit border-b border-[#783e42] pb-1 text-[10px] text-[#783e42] hover:text-[#29241f]"
        >
          Share an idea
        </Link>
      </section>
    </main>
  );
}
