import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/RootReducer";
import { Book } from "../../types/types";

interface CartState {
  items: Book[];
  totalPrice: number;
  selectedProductId: string | null;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  selectedProductId: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, image } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
    
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity: 1,
          image,
          description: "",
          category: "",
        });
      }
    
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    
      console.log(action.payload);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      if (itemToRemove) {
        if (itemToRemove.quantity === 1) {
          state.totalPrice -= itemToRemove.price;
          state.items = state.items.filter((item) => item.id !== itemId);
        } else {
          itemToRemove.quantity -= 1;
          state.totalPrice -= itemToRemove.price;
        }
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const removedItem = state.items.find((item) => item.id === itemId);

      if (removedItem) {
        state.totalPrice -= removedItem.price * removedItem.quantity;
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },
    openProductDetailView: (state, action) => {
      state.selectedProductId = action.payload;
    },

    // New action to close the detailed view
    closeProductDetailView: (state) => {
      state.selectedProductId = null;
    },
  },
});

export const { addToCart, removeFromCart, removeItem } = CartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectSelectedProductId = (state: RootState) => state.cart.selectedProductId;

export default CartSlice.reducer;
