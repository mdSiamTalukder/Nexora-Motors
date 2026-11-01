
import Link from "next/link";
import Image from "next/image";
import {
  CarFront,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ManageCarsPage() {
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-base-300 bg-base-100 p-4 sm:flex-row">
        <label className="input input-bordered flex flex-1 items-center gap-2">
          <Search size={18} className="text-base-content/45" />
          <input
            type="search"
            placeholder="Search cars by name..."
            disabled
            className="grow"
          />
        </label>

        <button
          type="button"
          disabled
          className="btn btn-outline gap-2"
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>

      {/* Car Inventory */}
      {cars.length === 0 ? (
        <div className="rounded-xl border border-base-300 bg-base-100 px-5 py-16 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-base-200 text-base-content/50">
            <CarFront size={27} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-base-content">
            No Cars Added Yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-base-content/55">
            Your vehicle inventory is currently empty. Add your first car
            to display it here.
          </p>

          <Link
            href="/admin/cars/new"
            className="btn btn-primary btn-sm mt-5"
          >
            Add Your First Car
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <article
              key={car.id}
              className="overflow-hidden rounded-xl border border-base-300 bg-base-100"
            >
              <div className="relative aspect-[16/10] bg-base-200">
                <Image
                  src={car.image}
                  alt={car.imageAlt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-base-content">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="text-sm text-base-content/60">
                    {car.trim}
                  </p>
                </div>

                <p className="text-xl font-bold text-base-content">
                  ৳{car.price.toLocaleString("en-BD")}
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-base-content/65">
                  <span className="rounded-md bg-base-200 px-2 py-1">
                    {car.mileage.toLocaleString("en-BD")} km
                  </span>
                  <span className="rounded-md bg-base-200 px-2 py-1">
                    {car.transmission}
                  </span>
                  <span className="rounded-md bg-base-200 px-2 py-1">
                    {car.fuelType}
                  </span>
                </div>

                <div className="border-t border-base-300 pt-3">
                  <span
                    className={`badge ${
                      car.availability === "available"
                        ? "badge-success"
                        : car.availability === "sold"
                          ? "badge-error"
                          : "badge-warning"
                    }`}
                  >
                    {car.availability.charAt(0).toUpperCase() +
                      car.availability.slice(1)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
