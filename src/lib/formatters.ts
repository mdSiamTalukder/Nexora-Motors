const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

export function formatMileage(mileage: number) {
  return `${numberFormatter.format(mileage)} mi`;
}
