export function truncate(str, n) {
  return str.length > n
    ? str.substring(0, n - 1) + "…"
    : str;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }
  ).format(amount);
}

export const AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export const TIME_SLOTS = Array.from(
  { length: 13 },
  (_, i) => {
    const hour = 8 + i;

    return `${String(hour).padStart(
      2,
      "0"
    )}:00`;
  }
);