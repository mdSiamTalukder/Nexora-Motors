const numberFormatter = new Intl.NumberFormat("en-US");

export function formatPrice(price: number) {
  return `৳ ${numberFormatter.format(price)}`;
}

export function formatMileage(mileage: number) {
  return `${numberFormatter.format(mileage)} mi`;
}
