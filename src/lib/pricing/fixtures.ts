import type { ItemPricing } from "./types";

export const CATALOG: ItemPricing[] = [
  { code: "apple", unitPrice: 30, offer: { kind: "multiBuy", qty: 2, bundlePrice: 45 } },
  { code: "banana", unitPrice: 50, offer: { kind: "multiBuy", qty: 3, bundlePrice: 130 } },
  { code: "peach", unitPrice: 60 },
  { code: "kiwi", unitPrice: 20 },
];
