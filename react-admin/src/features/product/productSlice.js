import { createSlice } from "@reduxjs/toolkit";
import { createBrand, getAllBrand } from "./productApiSlice";

//create user slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    brand: null,
    category: null,
    loader: null,
    error: null,
    message: null,
  },
  reducers: {
    setMessageEmpty: (state, payload) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrand.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.brand = action.payload;
        state.message = action.payload.message;
      })
      .addCase(createBrand.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
        state.loader = false;
      });
  },
});

//selectors
export const getAllProduct = (state) => state.product;

//actions
export const { setMessageEmpty } = productSlice.actions;

//export
export default productSlice.reducer;
