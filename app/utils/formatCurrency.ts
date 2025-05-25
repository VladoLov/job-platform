export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",

    maximumFractionDigits: 0,
  }).format(amount);
}
