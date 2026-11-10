import Link from "next/link";
import { MessageCircle, Music2, Palette, Sprout } from "lucide-react";
import { PageIntro } from "@/components/page-intro";

const topics = [
  { icon: Palette, label: "Art & making", detail: "Process, materials, and the choices behind a work." },
  { icon: Music2, label: "Music & listening", detail: "How a sound is made, shared, and heard." },
  { icon: Sprout, label: "Life & practice", detail: "Knowledge gathered through doing, caring, and trying again." },
];

export default function ConversationsPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-10 sm:px-9 sm:py-16">
      <PageIntro
        eyebrow="A place to exchange ideas"
        title="Good work starts conversations."
        description="A thoughtful community for questions, responses, and the ideas that grow when people meet around original work."
      />
      <section className="mt-10 grid gap-8 md:grid-cols-[1fr_0.8fr] md:gap-16">
        <div className="space-y-5">
          {topics.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="flex gap-4 py-2">
              <Icon size={17} strokeWidth={1.4} className="mt-1 shrink-0 text-[#783e42]" />
              <div>
                <h2 className="font-serif text-[18px] text-[#29241f]">{label}</h2>
                <p className="mt-1 text-[10px] leading-5 text-[#756d63]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-[#eee7db] p-6 sm:p-8">
          <MessageCircle size={20} strokeWidth={1.3} className="text-[#783e42]" />
          <h2 className="display-font mt-4 text-[28px] leading-tight tracking-[-0.04em]">
            The conversation space is being built.
          </h2>
          <p className="mt-3 text-[11px] leading-5 text-[#756d63]">
            Accounts and community guidelines come first. When discussions
            open, they’ll be tied to people and work—not engagement scores.
          </p>
          <Link href="/join" className="mt-6 inline-block border-b border-[#783e42] pb-1 text-[10px] text-[#783e42] hover:text-[#29241f]">
            Membership details
          </Link>
        </div>
      </section>
    </main>
  );
}
