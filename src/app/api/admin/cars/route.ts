
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";
import { carSchema } from "@/lib/car-validation";

export const runtime = "nodejs";

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
