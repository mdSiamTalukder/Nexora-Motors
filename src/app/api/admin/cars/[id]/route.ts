import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";
import { carSchema } from "@/lib/car-validation";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 },
      );
    }

    const { id } = await params;

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

    const result = await prisma.car.updateMany({
      where: { id },
      data: validation.data,
    });

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, message: "Car not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Car updated successfully.",
    });
  } catch (error) {
    console.error("Update car error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update car. Please try again.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const result = await prisma.car.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, message: "Car not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Car deleted successfully.",
    });
  } catch (error) {
    console.error("Delete car error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete car. Please try again.",
      },
      { status: 500 },
    );
  }
}
