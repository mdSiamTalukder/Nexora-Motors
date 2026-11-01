
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Car } from "@/types/car";
import { CarGrid } from "@/components/cars/CarGrid";
import { PageHeader } from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Browse Cars",
  description:
    "Browse the current Nexora Motors collection and compare the vehicles available at our showroom.",
};

export default async function CarsPage() {
  const databaseCars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const cars: Car[] = databaseCars.map((car) => ({
    ...car,
    transmission: car.transmission as Car["transmission"],
    fuelType: car.fuelType as Car["fuelType"],
    availability: car.availability as Car["availability"],
  }));

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader
        eyebrow="Our collection"
        title="Browse our cars."
        description="Explore the current Nexora Motors collection and compare the details that matter to you, from mileage and transmission to availability."
      >
        <Link href="/contact" className="btn btn-primary">
          Ask About a Car
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </PageHeader>

      <section
        className="bg-base-100 py-16 sm:py-20 lg:py-24"
        aria-labelledby="inventory-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-base-300 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="inventory-heading"
                className="font-heading text-2xl font-bold tracking-tight text-base-content sm:text-3xl"
              >
                Available inventory
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/70">
                Each vehicle includes the details you need to compare your options and
                plan your next step.
              </p>
            </div>

            <p className="text-sm font-medium text-base-content/60">
              {cars.length} vehicles in our collection
            </p>
          </div>

          <div className="mt-10">
            <CarGrid cars={cars} />
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-6 text-base-content/60">
            Availability and pricing are subject to confirmation. Contact us to arrange a
            showroom viewing or ask about a specific vehicle.
          </p>
        </div>
      </section>
    </main>
  );
}
