import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },

  reducers: {
    addproduct: (state, action) => {
      console.log(action.payload);
    },

    removeproduct: (state, action) => {
      console.log(action.payload);
    },

    editproduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export default ProductSlice.reducer;
export const { addproduct, editproduct } = ProductSlice.actions;
