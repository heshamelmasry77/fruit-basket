import type { ItemPricing, ItemCode } from "./types";

/**
 * Calculate the **basket total** using a product catalog.
 *
 * How it works (simple):
 * - Look at each item in the basket (`counts`).
 * - Find its pricing info in `catalog`.
 * - If the item has a multi-buy offer (e.g. "2 for 45"):
 *    - apply as many full bundles as possible
 *    - add the remainder at the normal unit price
 * - Add everything together and return the sum.
 *
 * Notes:
 * - Missing items in the catalog are ignored.
 * - Zero or negative quantities are ignored.
 *
 * @param counts - Map of item code → quantity (e.g. `{ apple: 2, banana: 1 }`).
 * @param catalog - Array of item pricing definitions (unit price + optional offer).
 * @returns Total price as a plain number.
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
 * Calculate the **subtotal for a single item** with its offer applied.
 *
 * How it works:
 * - If there is a multi-buy offer, use bundles + remainder.
 * - Otherwise, multiply `count * unitPrice`.
 * - If the item is not in the catalog or `count <= 0`, return 0.
 *
 * @param code - Item code (e.g. `"apple"`).
 * @param count - Quantity for this single item.
 * @param catalog - Product catalog used for pricing.
 * @returns Subtotal for this item.
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
