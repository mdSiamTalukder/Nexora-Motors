import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CallToAction } from "@/components/home/CallToAction";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nexora Motors, a single-dealer showroom focused on quality vehicles and a straightforward car-buying experience.",
};

const principles = [
  "A focused collection presented clearly",
  "Guidance without pressure",
  "A customer-first showroom experience",
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="About Nexora Motors"
        title="A showroom experience built around you."
        description="We bring together quality vehicles, clear information, and personal guidance so choosing your next car feels considered from start to finish."
      />

      <section className="bg-base-100 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
              A straightforward way to find your next car.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-base-content/70">
              <p>
                Nexora Motors is a single-dealer showroom built around a simple idea:
                choosing a car should feel clear, considered, and comfortable.
              </p>
              <p>
                We present a focused collection with the details that matter, then give you
                the space and support to compare your options at your own pace.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-center gap-3 text-sm font-medium text-base-content/80"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/showroom.jpg"
                alt="Nexora Motors showroom with a premium vehicle collection"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}
