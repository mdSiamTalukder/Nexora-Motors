export type CarAvailability = "available" | "reserved" | "sold";

export type Transmission = "Automatic" | "Manual";

export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";

export interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuelType: FuelType;
  availability: CarAvailability;
  image: string;
  imageAlt: string;
}
