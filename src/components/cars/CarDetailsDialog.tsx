"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Settings2, X } from "lucide-react";
import { AvailabilityBadge } from "@/components/cars/AvailabilityBadge";
import { formatMileage, formatPrice } from "@/lib/formatters";
import type { Car } from "@/types/car";

interface CarDetailsDialogProps {
  car: Car | null;
  onClose: () => void;
}

export function CarDetailsDialog({ car, onClose }: CarDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (car && !dialog.open) {
      dialog.showModal();
    } else if (!car && dialog.open) {
      dialog.close();
    }
  }, [car]);

  const closeAndNavigate = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby={car ? "car-details-title" : undefined}
      onClose={onClose}
    >
      <div className="modal-box max-w-3xl p-0">
        {car ? (
          <>
            <form method="dialog" className="absolute right-4 top-4 z-10">
              <button
                type="submit"
                className="btn btn-circle btn-sm border border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                aria-label="Close car details"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </form>

            <div className="relative aspect-[16/9] bg-base-200">
              <Image
                src={car.image}
                alt={car.imageAlt}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <AvailabilityBadge availability={car.availability} />
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {car.make}
                  </p>
                  <h3
                    id="car-details-title"
                    className="mt-2 font-heading text-2xl font-bold tracking-tight text-base-content"
                  >
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="mt-1 text-sm text-base-content/60">{car.trim}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/55">
                    Price
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-primary">
                    {formatPrice(car.price)}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 gap-4 rounded-xl border border-base-300 bg-base-200/40 p-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-medium text-base-content/55">Mileage</dt>
                  <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-base-content">
                    <Gauge className="size-4 text-primary" aria-hidden="true" />
                    {formatMileage(car.mileage)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-base-content/55">
                    Transmission
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-base-content">
                    <Settings2 className="size-4 text-primary" aria-hidden="true" />
                    {car.transmission}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-base-content/55">Fuel type</dt>
                  <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-base-content">
                    <Fuel className="size-4 text-primary" aria-hidden="true" />
                    {car.fuelType}
                  </dd>
                </div>
              </dl>

              <p className="text-sm leading-6 text-base-content/70">
                Contact our team to confirm availability, request more details, or arrange
                a showroom viewing.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  onClick={closeAndNavigate}
                  className="btn btn-primary flex-1"
                >
                  Contact About This Car
                </Link>
                <form method="dialog" className="sm:w-auto">
                  <button type="submit" className="btn btn-outline w-full">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Close car details">
          close
        </button>
      </form>
    </dialog>
  );
}
