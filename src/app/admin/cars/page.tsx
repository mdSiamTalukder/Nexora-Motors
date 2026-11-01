
import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Car } from "@/types/car";
import { CarInventory } from "@/components/admin/CarInventory";

export const dynamic = "force-dynamic";

export default async function ManageCarsPage() {
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

  const totalCars = cars.length;
  const availableCars = cars.filter(
    (car) => car.availability === "available",
  ).length;
  const soldCars = cars.filter(
    (car) => car.availability === "sold",
  ).length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            Manage Cars
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            Manage your showroom vehicle inventory.
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="btn btn-primary gap-2"
        >
          <Plus size={18} />
          Add New Car
        </Link>
      </div>

      {/* Inventory Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Total Cars</p>
          <p className="mt-2 text-2xl font-bold text-base-content">
            {totalCars}
          </p>
        </div>

        <div className="rounded-xl border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Available</p>
          <p className="mt-2 text-2xl font-bold text-success">
            {availableCars}
          </p>
        </div>

        <div className="rounded-xl border border-base-300 bg-base-100 p-5">
          <p className="text-sm text-base-content/60">Sold</p>
          <p className="mt-2 text-2xl font-bold text-base-content">
            {soldCars}
          </p>
        </div>
      </div>

      {/* Search, Filters and Car Inventory */}
      <CarInventory cars={cars} />
    </div>
  );
}
