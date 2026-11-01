import Image from "next/image";
import { ArrowRight, Fuel, Gauge, Settings2 } from "lucide-react";
import { AvailabilityBadge } from "@/components/cars/AvailabilityBadge";
import { formatMileage, formatPrice } from "@/lib/formatters";
import type { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

export function CarCard({ car, onViewDetails }: CarCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
        <Image
          src={car.image}
          alt={car.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-4 top-4">
          <AvailabilityBadge availability={car.availability} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {car.make}
          </p>
          <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-base-content">
            {car.year} {car.model}
          </h3>
          <p className="mt-1 text-sm text-base-content/60">{car.trim}</p>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-base-300 py-4">
          <div className="min-w-0">
            <dt className="sr-only">Mileage</dt>
            <dd className="flex items-center gap-1.5 text-xs font-medium text-base-content/70">
              <Gauge className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="truncate">{formatMileage(car.mileage)}</span>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="sr-only">Transmission</dt>
            <dd className="flex items-center gap-1.5 text-xs font-medium text-base-content/70">
              <Settings2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="truncate">{car.transmission}</span>
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="sr-only">Fuel type</dt>
            <dd className="flex items-center gap-1.5 text-xs font-medium text-base-content/70">
              <Fuel className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="truncate">{car.fuelType}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/55">
              Price
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-base-content">
              {formatPrice(car.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onViewDetails(car)}
            className="btn btn-outline btn-sm gap-1.5"
            aria-label={`View details for ${car.year} ${car.make} ${car.model}`}
          >
            View Details
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
