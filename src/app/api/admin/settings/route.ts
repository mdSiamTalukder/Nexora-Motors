
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";

export const runtime = "nodejs";

const settingsSchema = z.object({
  showroomName: z.string().trim().min(2).max(100),
  email: z.union([z.string().trim().email().max(254), z.literal("")]),
  phone: z.string().trim().max(30),
  address: z.string().trim().max(300),
  websiteUrl: z.union([z.string().trim().url().max(255), z.literal("")]),
});

export async function GET() {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 },
      );
    }

    const settings = await prisma.showroomSettings.upsert({
      where: { id: "default" },
      update: {},
      create: { id: "default" },
    });

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get showroom settings error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load showroom settings." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 },
      );
    }

    const body: unknown = await request.json();
    const validation = settingsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid showroom information.",
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    const settings = await prisma.showroomSettings.upsert({
      where: { id: "default" },
      update: data,
      create: {
        id: "default",
        ...data,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Showroom settings saved successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("Update showroom settings error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to save showroom settings." },
      { status: 500 },
    );
  }
}
