/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type IProduct = {
  status: boolean;
  priceRange: number;
};

const initialState: IProduct = {
  status: true,
  priceRange: 150,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleStatus, setPriceRange } = productSlice.actions;
export default productSlice.reducer;
