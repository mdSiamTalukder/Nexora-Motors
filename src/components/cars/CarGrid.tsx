
"use client";

import { useState } from "react";
import { CarFront } from "lucide-react";
import { CarCard } from "@/components/cars/CarCard";
import { CarDetailsDialog } from "@/components/cars/CarDetailsDialog";
import type { Car } from "@/types/car";

interface CarGridProps {
  cars: Car[];
  id?: string;
}

export function CarGrid({ cars, id }: CarGridProps) {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  if (cars.length === 0) {
    return (
      <div
        id={id}
        className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-200/40 px-6 py-16 text-center sm:py-20"
      >
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-base-300 text-base-content/60">
          <CarFront className="size-8" aria-hidden="true" />
        </div>

        <h3 className="font-heading text-xl font-bold text-base-content sm:text-2xl">
          No Cars Available
        </h3>

        <p className="mt-3 max-w-md text-sm leading-6 text-base-content/60">
          Our vehicle collection is currently being updated. Please check back
          soon or contact our showroom for more information.
        </p>
      </div>
    );
  }

  return (
    <>
      <div id={id} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} onViewDetails={setSelectedCar} />
        ))}
      </div>

      <CarDetailsDialog car={selectedCar} onClose={() => setSelectedCar(null)} />
    </>
  );
}
