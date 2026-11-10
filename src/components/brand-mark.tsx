import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="Lived home"
      className="display-font text-[33px] leading-none font-bold tracking-[-0.09em] text-[#29241f]"
    >
      lived<span className="text-[#783e42]">.</span>
    </Link>
  );
}
