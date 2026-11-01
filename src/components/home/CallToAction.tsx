import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section id="contact" className="scroll-mt-24 bg-base-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral px-6 py-12 text-center text-neutral-content sm:px-10 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-content/70">
            Visit the showroom
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to find your next car?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-content/70 sm:text-base">
            Browse our current inventory or get in touch to ask about availability,
            pricing, and arranging a viewing.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/cars" className="btn btn-primary">
              Browse Inventory
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="btn border-neutral-content/30 bg-transparent text-neutral-content hover:border-neutral-content hover:bg-neutral-content hover:text-neutral"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
