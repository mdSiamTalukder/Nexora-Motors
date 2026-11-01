
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CarFront,
  Pencil,
  Search,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import type { Car } from "@/types/car";
import { DeleteCarButton } from "@/components/admin/DeleteCarButton";

interface CarInventoryProps {
  cars: Car[];
}

export function CarInventory({ cars }: CarInventoryProps) {
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesSearch =
        !query ||
        car.make.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.trim.toLowerCase().includes(query) ||
        String(car.year).includes(query);

      const matchesAvailability =
        availability === "all" || car.availability === availability;

      return matchesSearch && matchesAvailability;
    });
  }, [cars, search, availability]);

  const hasActiveFilters = search.trim() !== "" || availability !== "all";

  function clearFilters() {
    setSearch("");
    setAvailability("all");
  }

  if (cars.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-5">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-base-300 bg-base-100 p-4 sm:flex-row">
        <label className="input input-bordered flex flex-1 items-center gap-2">
          <Search size={18} className="text-base-content/45" />
          <input
            type="search"
            placeholder="Search cars by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="grow"
          />
        </label>

        <button
          type="button"
          onClick={() => setShowFilters((open) => !open)}
          aria-expanded={showFilters}
          className="btn btn-outline gap-2"
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="flex flex-col gap-3 rounded-xl border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center">
          <label className="flex items-center gap-3 text-sm font-medium text-base-content/70">
            Availability
            <select
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </label>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="btn btn-ghost btn-sm text-base-content/60 sm:ml-auto"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {filteredCars.length === 0 ? (
        <div className="rounded-xl border border-base-300 bg-base-100 px-5 py-16 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-base-200 text-base-content/50">
            <SearchX size={27} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-base-content">
            No Cars Found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-base-content/55">
            No cars match your current search or filters. Try adjusting
            your criteria.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="btn btn-primary btn-sm mt-5"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCars.map((car) => (
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

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-3">
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

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/cars/${encodeURIComponent(car.id)}/edit`}
                      aria-label={`Edit ${car.year} ${car.make} ${car.model}`}
                      className="btn btn-sm btn-outline gap-2"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>
                    <DeleteCarButton carId={car.id} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
