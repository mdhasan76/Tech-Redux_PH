import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICart {
  product: IProduct[];
  total: number;
}

const initialState: ICart = {
  product: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const doesExist = state.product.find(
        (prod) => prod._id === action.payload._id
      );
      if (doesExist) {
        doesExist.quantity = (doesExist.quantity as number) + 1;
      } else {
        state.product.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const doesExist = state.product.find(
        (prod) => prod._id === action.payload._id
      );
      if (doesExist && (doesExist.quantity as number) > 1) {
        doesExist.quantity = (doesExist.quantity as number) - 1;
        state.total -= action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.product = state.product.filter(
        (el) => el._id !== action.payload._id
      );
      state.total -= (action.payload.quantity as number) * action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
