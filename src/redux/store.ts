import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import logger from 'redux-logger';
const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
