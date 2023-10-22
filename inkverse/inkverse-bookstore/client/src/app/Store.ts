import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootReducer";

const store = configureStore({
  reducer: RootReducer,
  // You can also include other configuration options here if needed
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
