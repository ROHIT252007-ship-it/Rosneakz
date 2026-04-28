import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/cart/redux/cartSlice';
import productReducer from '../../features/product/redux/productSlice';
import { saveCartToStorage } from '../../features/cart/services/cartStorage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

let currentCartItems = store.getState().cart.items;
let saveTimer: ReturnType<typeof setTimeout>;

store.subscribe(() => {
  const previousCartItems = currentCartItems;
  currentCartItems = store.getState().cart.items;

  if (previousCartItems !== currentCartItems) {
    clearTimeout(saveTimer);

    saveTimer = setTimeout(() => {
      saveCartToStorage(currentCartItems);
    }, 300);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;