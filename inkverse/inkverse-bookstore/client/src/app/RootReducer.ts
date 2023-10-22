import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";
import bookReducer from "../features/book/bookSlice";
import navbarReducer from "../features/navbar/navabarSlice";
import authReducer from "../features/auth/AuthSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  book: bookReducer,
  navbar: navbarReducer,
  auth: authReducer,
  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
