import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";

const navigation = [
  { label: "Discover", href: "/materials" },
  { label: "Conversations", href: "/conversations" },
  { label: "About", href: "/about" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="relative z-30 bg-[#f5f0e7]">
        <div className="mx-auto flex min-h-[76px] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-9">
          <div className="flex min-w-0 items-center gap-5 sm:gap-12">
            <BrandMark />
            <nav
              aria-label="Main navigation"
              className="hide-scrollbar flex min-w-0 items-center gap-4 overflow-x-auto sm:gap-8"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 py-2 text-[10px] text-[#625b52] transition-colors hover:text-[#783e42] sm:text-[12px]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="/join"
              className="hidden text-[10px] text-[#625b52] hover:text-[#783e42] sm:block"
            >
              Join Lived
            </Link>
            <Link
              href="/share"
              className="bg-[#783e42] px-3 py-2.5 text-[9px] font-medium text-[#fffaf2] hover:bg-[#5e3034] sm:px-4 sm:text-[10px]"
            >
              Share your work
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="bg-[#eee7db]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 py-8 sm:px-9 md:flex-row md:items-center md:justify-between">
          <div>
            <BrandMark />
            <p className="mt-2 text-[11px] text-[#756d63]">
              A home for work made by people.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] text-[#756d63] hover:text-[#783e42]"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/share" className="text-[11px] text-[#756d63] hover:text-[#783e42]">
              Share your work
            </Link>
            <Link href="/join" className="text-[11px] text-[#756d63] hover:text-[#783e42]">
              Join
            </Link>
            <Link href="/developers/api" className="text-[11px] text-[#756d63] hover:text-[#783e42]">
              For developers
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
