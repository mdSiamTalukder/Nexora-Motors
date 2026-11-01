import { z } from "zod";

export const carSchema = z.object({
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
