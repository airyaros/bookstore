import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  searchValue: string;
}

const initialState: NavbarState = {
  searchValue: "",
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = navbarSlice.actions;

export default navbarSlice.reducer;
