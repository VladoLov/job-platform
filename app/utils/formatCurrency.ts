export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BAM",
    maximumFractionDigits: 0,
  }).format(amount);
}
