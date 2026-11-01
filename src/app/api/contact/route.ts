
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
  email: z.string().trim().email("Please provide a valid email address.").max(254),
  phone: z.string().trim().min(5, "Please provide a valid phone number.").max(30),
  subject: z.enum([
    "Vehicle Inquiry",
    "Pricing Information",
    "Test Drive",
    "Showroom Visit",
    "Other",
  ]),
  vehicle: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(3000),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your information and try again.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        vehicle: data.vehicle || null,
        message: data.message,
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        data: inquiry,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
