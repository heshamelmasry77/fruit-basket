import { describe, it, expect } from "vitest";
import reducer, { add, remove, clear } from "../basketSlice";

const start = { counts: { apple: 0, banana: 0, peach: 0, kiwi: 0 } };

describe("basketSlice", () => {
  it("returns initial state when passed an unknown action", () => {
    const next = reducer(undefined, { type: "unknown" });
    expect(next).toEqual(start);
  });

  it("add increases the count for an item", () => {
    const next = reducer(start, add("apple"));
    expect(next.counts.apple).toBe(1);
    expect(next.counts.banana).toBe(0);
  });

  it("remove decreases the count but never below 0", () => {
    const oneApple = reducer(start, add("apple"));
    const zeroApple = reducer(oneApple, remove("apple"));
    const stillZero = reducer(zeroApple, remove("apple"));
    expect(zeroApple.counts.apple).toBe(0);
    expect(stillZero.counts.apple).toBe(0);
  });

  it("clear resets all counts to zero", () => {
    let s = start;
    s = reducer(s, add("apple"));
    s = reducer(s, add("banana"));
    s = reducer(s, add("banana"));
    const cleared = reducer(s, clear());
    expect(cleared).toEqual(start);
  });

  it("handles multiple operations in sequence", () => {
    let s = start;
    s = reducer(s, add("banana")); // 1
    s = reducer(s, add("banana")); // 2
    s = reducer(s, add("banana")); // 3
    s = reducer(s, remove("banana")); // 2
    s = reducer(s, add("kiwi")); // kiwi:1
    expect(s.counts).toEqual({ apple: 0, banana: 2, peach: 0, kiwi: 1 });
  });

  it("does not mutate previous state object (immer safety)", () => {
    const prev = start;
    const next = reducer(prev, add("peach"));
    expect(prev).not.toBe(next); // new object
    expect(prev.counts.peach).toBe(0);
    expect(next.counts.peach).toBe(1);
  });
});
