// import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import {
  addToBag,
  updateProductSizeAndQty,
  deleteProduct,
} from "./cart-functions";

const initialCartData = { products: [], totalPrice: 0, totalReducedPrice: 0, totalDiscountPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartData,
  reducers: {
    addToBag,
    updateProductSizeAndQty,
    deleteProduct,
  },
});

const store = configureStore({
  reducer: cartSlice.reducer,
});

export default store;

export const cartActions = cartSlice.actions;
