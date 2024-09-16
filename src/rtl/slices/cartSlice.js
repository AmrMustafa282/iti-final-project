import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 products: [],
};

export const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  addToCart: (state, action) => {
   if (state.products.find((item) => item.id === action.payload.id)) {
    state.products.forEach((item) => {
     item.id === action.payload.id && item.amount++;
    });
   } else {
    let product = action.payload;
    product.amount = 1;
    state.products = [product, ...state.products];
   }
  },
  decreaseAmount: (state, action) => {
   state.products.filter((item) => {
    if (item.id === action.payload) {
     item.amount > 1
      ? item.amount--
      : (state.products = state.products.filter(
         (i) => i.id !== action.payload
        ));
    }
   });
  },
  increaseAmount: (state, action) => {
   state.products.filter((item) => {
    if (item.id === action.payload) {
     item.amount < item.stock && item.amount++;
    }
   });
  },
  removeFromCart: (state, action) => {
   state.products = state.products.filter((item) => item.id !== action.payload);
  },
 },
});

export const { addToCart, removeFromCart, decreaseAmount, increaseAmount } =
 cartSlice.actions;

export default cartSlice.reducer;
