
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CarForm } from "@/components/admin/CarForm";

export const dynamic = "force-dynamic";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    notFound();
  }

  return (
    <CarForm
      initialCar={{
        id: car.id,
        year: car.year,
        make: car.make,
        model: car.model,
        trim: car.trim,
        price: car.price,
        mileage: car.mileage,
        transmission: car.transmission,
        fuelType: car.fuelType,
        availability: car.availability,
        image: car.image,
        imageAlt: car.imageAlt,
      }}
    />
  );
}
