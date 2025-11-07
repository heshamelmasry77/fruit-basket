import type { ItemPricing, ItemCode } from "./types";

/**
 * Calculate total price for the basket.
 * Example:
 * counts = { apple: 2, banana: 1 }
 */
export function calculateTotal(counts: Record<ItemCode, number>, catalog: ItemPricing[]): number {
  let total = 0;

  for (const code in counts) {
    const quantity = counts[code as ItemCode];

    if (quantity <= 0) {
      continue;
    }

    const item = catalog.find((i) => i.code === code);

    if (!item) {
      continue;
    }

    if (item.offer && item.offer.kind === "multiBuy") {
      const offerQty = item.offer.qty;
      const offerPrice = item.offer.bundlePrice;

      const bundles = Math.floor(quantity / offerQty);
      const remainder = quantity % offerQty;

      total += bundles * offerPrice + remainder * item.unitPrice;
    } else {
      total += quantity * item.unitPrice;
    }
  }

  return total;
}
