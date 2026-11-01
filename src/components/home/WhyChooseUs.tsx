import {
  BadgeDollarSign,
  HeartHandshake,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

const benefits: Benefit[] = [
  {
    title: "Quality Vehicles",
    description:
      "Each vehicle in our collection is presented with the details you need to make a confident choice.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear, straightforward pricing with no surprises, so you can compare vehicles with confidence.",
    icon: BadgeDollarSign,
  },
  {
    title: "Trusted Service",
    description:
      "Friendly guidance from your first question through to the keys in your hand.",
    icon: Wrench,
  },
  {
    title: "Customer Satisfaction",
    description:
      "A calm, customer-first experience built around your needs and your schedule.",
    icon: HeartHandshake,
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-base-300 bg-base-200/40 py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="about-heading"
          eyebrow="The Nexora difference"
          title="Why choose Nexora Motors"
          description="We keep the process simple, informed, and comfortable from your first visit to your next drive."
          align="center"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-base-content">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-base-content/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
