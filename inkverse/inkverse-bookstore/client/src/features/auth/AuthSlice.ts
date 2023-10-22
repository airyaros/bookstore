import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  checkbox: boolean;
}

interface AuthState {
  users: RegisterUserData[];
  // Other state properties if needed
}

const initialState: AuthState = {
  users: [],
  // Other initial state properties if needed
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<RegisterUserData>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
