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

/**
 * Simple helper that returns the subtotal for a single item.
 */
export function calculateItemSubtotal(
  code: ItemCode,
  count: number,
  catalog: ItemPricing[]
): number {
  if (count <= 0) {
    return 0;
  }

  const item = catalog.find((i) => i.code === code);
  if (!item) {
    return 0;
  }

  if (item.offer && item.offer.kind === "multiBuy") {
    const bundles = Math.floor(count / item.offer.qty);
    const remainder = count % item.offer.qty;
    return bundles * item.offer.bundlePrice + remainder * item.unitPrice;
  }

  return count * item.unitPrice;
}
