
import { prisma } from "@/lib/prisma";
import type { Car } from "@/types/car";
import { CarGrid } from "@/components/cars/CarGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FeaturedCars() {
  const databaseCars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const cars: Car[] = databaseCars.map((car) => ({
    ...car,
    transmission: car.transmission as Car["transmission"],
    fuelType: car.fuelType as Car["fuelType"],
    availability: car.availability as Car["availability"],
  }));

  return (
    <section
      id="featured"
      className="scroll-mt-24 bg-base-100 py-16 sm:py-20 lg:py-24"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="featured-heading"
          eyebrow="Our collection"
          title="Featured cars"
          description="Explore a selection of vehicles and compare the details that matter to you."
        />

        {cars.length > 0 && (
          <p className="mt-4 text-sm font-medium text-base-content/60">
            {cars.length} vehicles in our collection
          </p>
        )}

        <div className="mt-10">
          <CarGrid id="featured-car-grid" cars={cars} />
        </div>
      </div>
    </section>
  );
}
