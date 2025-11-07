export type ItemCode = "apple" | "banana" | "peach" | "kiwi";

export type MultiBuyOffer = {
  kind: "multiBuy";
  qty: number; // e.g. 2
  bundlePrice: number; // e.g. 45
};

export type ItemPricing = {
  code: ItemCode;
  unitPrice: number; // simple integer for now
  offer?: MultiBuyOffer; // optional
};
