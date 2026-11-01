import { Hero } from "@/components/home/Hero";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CallToAction } from "@/components/home/CallToAction";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <CallToAction />
    </main>
  );
}
