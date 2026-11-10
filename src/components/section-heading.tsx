import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-[10px] font-semibold tracking-[0.17em] text-[#818278] uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="display-font text-[27px] leading-tight font-medium tracking-[-0.045em] sm:text-[32px]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
