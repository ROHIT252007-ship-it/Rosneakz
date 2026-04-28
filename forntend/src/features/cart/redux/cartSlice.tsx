import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../../shared/types/product.type';

export type CartItem = Readonly<{
  product: ProductType;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}>;

type CartState = Readonly<{
  items: CartItem[];
}>;

type CartPayload = Readonly<{
  product: ProductType;
  selectedSize: number;
  selectedColor: string;
}>;

type CartItemKeyPayload = Readonly<{
  productId: string;
  selectedSize: number;
  selectedColor: string;
}>;

const isSameItem = (
  item: CartItem,
  payload: CartItemKeyPayload
): boolean => {
  return (
    item.product._id === payload.productId &&
    item.selectedSize === payload.selectedSize &&
    item.selectedColor === payload.selectedColor
  );
};


const initialState: CartState = {
  items: [],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartPayload>) => {
      const { product, selectedSize, selectedColor } = action.payload;

      const existingItem = state.items.find(item =>
        isSameItem(item, {
          productId: product._id,
          selectedSize,
          selectedColor,
        })
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          quantity: 1,
          selectedSize,
          selectedColor,
        });
      }
    },

    increment: (state, action: PayloadAction<CartItemKeyPayload>) => {
      const item = state.items.find(i => isSameItem(i, action.payload));
      if (item) item.quantity += 1;
    },

    decrement: (state, action: PayloadAction<CartItemKeyPayload>) => {
      const item = state.items.find(i => isSameItem(i, action.payload));

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(i => !isSameItem(i, action.payload));
      }
    },

    removeItem: (state, action: PayloadAction<CartItemKeyPayload>) => {
      state.items = state.items.filter(i => !isSameItem(i, action.payload));
    },

    clearCart: state => {
      state.items = [];
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

/* ================= EXPORTS ================= */

export const {
  addToCart,
  increment,
  decrement,
  removeItem,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;