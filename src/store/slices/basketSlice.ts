import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ItemCode = "apple" | "banana" | "peach" | "kiwi";

type BasketState = {
  counts: Record<ItemCode, number>;
};

const initialState: BasketState = {
  counts: { apple: 0, banana: 0, peach: 0, kiwi: 0 },
};

const basket = createSlice({
  name: "basket",
  initialState,
  reducers: {
    add(state, action: PayloadAction<ItemCode>) {
      state.counts[action.payload] += 1;
    },
    remove(state, action: PayloadAction<ItemCode>) {
      state.counts[action.payload] = Math.max(0, state.counts[action.payload] - 1);
    },
    clear(state) {
      state.counts = { apple: 0, banana: 0, peach: 0, kiwi: 0 };
    },
  },
});

export const { add, remove, clear } = basket.actions;
export default basket.reducer;
