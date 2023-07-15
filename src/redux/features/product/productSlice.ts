import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitState {
  priceRange: number;
  status: boolean;
}

const initialState: InitState = {
  priceRange: 150,
  status: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    togglestate: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { togglestate, setPriceRange } = productSlice.actions;
export default productSlice.reducer;
