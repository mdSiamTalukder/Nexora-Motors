import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST() {
  try {
    await destroyAdminSession();

    return NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to logout. Please try again.",
      },
      { status: 500 },
    );
  }
}