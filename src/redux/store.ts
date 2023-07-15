import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import logger from 'redux-logger';
import productSlice from './features/product/productSlice';
const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
