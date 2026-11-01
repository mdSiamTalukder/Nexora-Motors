import type { CarAvailability } from "@/types/car";
import { cn } from "@/lib/utils";

const availabilityStyles: Record<
  CarAvailability,
  { label: string; className: string }
> = {
  available: { label: "Available", className: "badge-success" },
  reserved: { label: "Reserved", className: "badge-warning" },
  sold: { label: "Sold", className: "badge-neutral" },
};

interface AvailabilityBadgeProps {
  availability: CarAvailability;
  className?: string;
}

export function AvailabilityBadge({
  availability,
  className,
}: AvailabilityBadgeProps) {
  const { label, className: variantClassName } = availabilityStyles[availability];

  return (
    <span
      className={cn(
        "badge badge-sm gap-1.5 border-0 font-semibold",
        variantClassName,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
