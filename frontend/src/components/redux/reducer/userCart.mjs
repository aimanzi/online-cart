import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "usercart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cartitem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (cartitem) {
        cartitem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item._id !== action.payload.id
      );
      if (removeItem) {
        state.cart = removeItem; //the new return array without item id
      }
    },

    incrementQuantity: (state, action) => {
      const cartitem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (cartitem) {
        cartitem.quantity++;
      }
    },

    decrementQuantity: (state, action) => {
      const cartitem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (cartitem.quantity === 1) {
        cartitem.quantity = 1;
      } else {
        cartitem.quantity--;
      }
    },

    resetdata: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  resetdata,
} = cartSlice.actions;
