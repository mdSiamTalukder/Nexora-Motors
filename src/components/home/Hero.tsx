import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const trustPoints = [
  "Carefully selected inventory",
  "Transparent, upfront pricing",
];

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 border-b border-base-300 bg-base-100">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-6 bg-primary" aria-hidden="true" />
            Welcome to Nexora Motors
          </p>

          <h1 className="mt-5 max-w-xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-base-content sm:text-5xl xl:text-6xl">
            Your next great drive starts here.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-base-content/70 sm:text-lg sm:leading-8">
            Explore a carefully selected collection of quality vehicles, backed by clear
            guidance and a showroom experience built around you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/cars" className="btn btn-primary w-full sm:w-auto">
              Browse Inventory
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn btn-outline w-full sm:w-auto">
              Contact Us
            </Link>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm font-medium text-base-content/70"
              >
                <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-sm">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/showroom.jpg"
              alt="Nexora Motors showroom featuring a white sports car and a premium vehicle collection"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
