import { configureStore } from "@reduxjs/toolkit";
import basket from "@/store/slices/basketSlice";

export const store = configureStore({
  reducer: { basket },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
