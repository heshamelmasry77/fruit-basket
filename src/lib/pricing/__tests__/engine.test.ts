import { describe, it, expect } from "vitest";
import { calculateTotal, calculateItemSubtotal } from "../engine";
import { CATALOG } from "../fixtures";
import type { ItemCode } from "../types";

describe("calculateItemSubtotal", () => {
  it("returns 0 when item is not in catalog", () => {
    expect(calculateItemSubtotal("apple" as ItemCode, 1, [])).toBe(0);
  });

  it("applies multi-buy offer: apples 2 → 45", () => {
    expect(calculateItemSubtotal("apple", 2, CATALOG)).toBe(45);
  });

  it("applies bundles + remainder: apples 3 → 75 (2 for 45 + 1×30)", () => {
    expect(calculateItemSubtotal("apple", 3, CATALOG)).toBe(75);
  });

  it("no offer: peach 2 → 120", () => {
    expect(calculateItemSubtotal("peach", 2, CATALOG)).toBe(120);
  });

  it("banana 4 → 180 (3 for 130 + 1×50)", () => {
    expect(calculateItemSubtotal("banana", 4, CATALOG)).toBe(180);
  });
});

describe("calculateTotal", () => {
  it("empty basket → 0", () => {
    expect(calculateTotal({ apple: 0, banana: 0, peach: 0, kiwi: 0 }, CATALOG)).toBe(0);
  });

  it("single item: 2 apples → 45", () => {
    expect(calculateTotal({ apple: 2, banana: 0, peach: 0, kiwi: 0 }, CATALOG)).toBe(45);
  });

  it("combined basket adds correctly with offers", () => {
    const counts = { apple: 3, banana: 1, peach: 0, kiwi: 0 }; // 75 + 50 = 125
    expect(calculateTotal(counts, CATALOG)).toBe(125);
  });

  it("ignores unknown or negative items", () => {
    const weird = { apple: -1, banana: 3, unknown: 5, peach: 0, kiwi: 0 };
    expect(calculateTotal(weird, CATALOG)).toBe(130); // only banana 3 → 130
  });
});
