import Link from "next/link";

export default function JoinPage() {
  return (
    <main className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 sm:px-9 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
      <div>
        <p className="text-[9px] font-semibold tracking-[0.15em] text-[#783e42] uppercase">
          Join Lived
        </p>
        <h1 className="display-font mt-4 max-w-[600px] text-[44px] leading-[1.02] tracking-[-0.06em] sm:text-[58px]">
          Make room for work that means something.
        </h1>
        <p className="mt-5 max-w-[500px] text-[12px] leading-6 text-[#756d63]">
          A Lived account will let you build a maker profile, share original
          work, join conversations, and follow the people and practices you
          care about.
        </p>
        <div className="mt-8 flex flex-wrap gap-5">
          <Link href="/share" className="border-b border-[#783e42] pb-1 text-[10px] text-[#783e42] hover:text-[#29241f]">
            See how sharing will work
          </Link>
          <Link href="/about" className="border-b border-[#b4a99b] pb-1 text-[10px] text-[#625b52] hover:text-[#783e42]">
            Our authenticity standard
          </Link>
        </div>
      </div>

      <section className="self-start bg-[#eee7db] p-6 sm:p-8">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#68735b] uppercase">
          Membership is in development
        </p>
        <h2 className="display-font mt-3 text-[27px] leading-tight tracking-[-0.04em]">
          Accounts open when the foundations are ready.
        </h2>
        <p className="mt-3 text-[11px] leading-5 text-[#756d63]">
          We’re building secure sign-in, creator-owned profiles, and a
          human-led review process before opening membership.
        </p>
        <button
          type="button"
          disabled
          className="mt-6 w-full bg-[#a99d8d] px-4 py-3 text-[10px] font-medium text-[#f5f0e7] disabled:cursor-not-allowed"
        >
          Account creation is not open yet
        </button>
      </section>
    </main>
  );
}
