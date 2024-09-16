import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 products: [],
};

export const wishlistSlice = createSlice({
 name: "wishlist",
 initialState,
 reducers: {
  addToWishlist: (state, action) => {
   if (!state.products.find((item) => item.id === action.payload.id))
    state.products = [action.payload, ...state.products];
   else
    state.products = state.products.filter(
     (item) => item.id !== action.payload.id
    );
  },

  removeFromWishlist: (state, action) => {
   state.products = state.products.filter((item) => item.id !== action.payload);
  },
 },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
