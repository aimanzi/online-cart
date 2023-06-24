import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState();

const cartSlice1 = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: cartAdapter.addOne,
    removeItem: cartAdapter.removeOne,
    updateItem: cartAdapter.updateOne,
    clearCart: cartAdapter.removeAll,
  },
});

// Export the reducer and actions
export const {
  addItem,
  removeItem,
  updateItem,
  clearCart,
} = cartSlice1.actions;
export default cartSlice1.reducer;
