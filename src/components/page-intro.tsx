import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: PageIntroProps) {
  return (
    <div className="flex flex-col gap-6 pb-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[740px]">
        <p className="mb-3 text-[12px] font-semibold tracking-[0.14em] text-[#783e42] uppercase">
          {eyebrow}
        </p>
        <h1 className="display-font text-[42px] leading-[1.04] tracking-[-0.06em] sm:text-[55px]">
          {title}
        </h1>
        <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#625b52]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
