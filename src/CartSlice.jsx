import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // each item: { id, name, price, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      // check if item already exists in cart
      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        // increase quantity if it already exists
        existingItem.quantity += newItem.quantity || 1;
      } else {
        // otherwise add new item with default quantity = 1
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },

    removeItem: (state, action) => {
      const id = action.payload;

      // remove item by filtering it out
      state.items = state.items.filter((item) => item.id !== id);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          // remove item if quantity is 0 or less
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          // update quantity
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
