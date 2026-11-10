import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="Lived home"
      className="display-font text-[32px] leading-none font-bold tracking-[-0.09em]"
    >
      lived<span className="text-[#d86645]">.</span>
    </Link>
  );
}
