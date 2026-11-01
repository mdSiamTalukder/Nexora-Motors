import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  href?: string;
  className?: string;
}

export function BrandLogo({ href, className }: BrandLogoProps) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-content"
      >
        <span className="font-heading text-xl font-extrabold leading-none">N</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-extrabold tracking-tight">Nexora</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-base-content/60">
          Motors
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn("inline-flex items-center gap-3", className)}
        aria-label="Nexora Motors home"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-3", className)} aria-label="Nexora Motors">
      {content}
    </div>
  );
}
