
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const result = await prisma.inquiry.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { message: "Inquiry not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete inquiry error:", error);

    return NextResponse.json(
      { message: "Failed to delete inquiry." },
      { status: 500 },
    );
  }
}
