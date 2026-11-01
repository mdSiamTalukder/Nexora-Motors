
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

const carSchema = z.object({
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  make: z.string().trim().min(1).max(60),
  model: z.string().trim().min(1).max(80),
  trim: z.string().trim().max(100),
  price: z.number().int().positive(),
  mileage: z.number().int().min(0),
  transmission: z.enum(["Automatic", "Manual"]),
  fuelType: z.enum(["Petrol", "Diesel", "Hybrid", "Electric"]),
  availability: z.enum(["available", "reserved", "sold"]),
  image: z.string().url().max(2048),
  imageAlt: z.string().trim().min(5).max(200),
});

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const validation = carSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the car information.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.log("PRISMA RUNTIME CHECK:", {
  constructor: prisma.constructor?.name,
  carType: typeof prisma.car,
  prototypeKeys: Object.getOwnPropertyNames(
    Object.getPrototypeOf(prisma),
  ),
});

    const car = await prisma.car.create({
      data: validation.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Car added successfully.",
        data: car,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create car error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to add car. Please try again.",
      },
      { status: 500 },
    );
  }
}
