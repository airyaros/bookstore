import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Book {
  category: any;
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

interface BookState {
  loading: boolean;
  books: Book[];
  error: string;
}

const initialState: BookState = {
  loading: false,
  books: [],
  error: "",
};

export const fetchBooks = createAsyncThunk<Book[]>(
  "book/fetchBooks",
  async () => {
    const response = await axios.get<Book[]>(
      "https://fakestoreapi.com/products"
    );
    console.log("Fetched data:", response.data);
    return response.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
        state.error = "";
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.books = [];
        state.error = action.error.message as string;
      });
  },
});

export default bookSlice.reducer;
