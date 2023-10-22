import { ObjectId } from "mongodb";
import Book, { IBook } from "../models/Book";

// create a new book
export const createBook = async (bookData: IBook): Promise<IBook> => {
    return Book.create(bookData);
};

// find a book by its ID
export const findBookByID = async (bookId: string | ObjectId): Promise<IBook | null> => {
    return Book.findById(bookId).exec();
};

// update a book by its ID
export const updateBookById = async (
    bookId: string,
    updateBookData: Partial<IBook>,
): Promise<IBook | null> => {
    return Book.findByIdAndUpdate(bookId, updateBookData, { new: true }).exec();
};

// delete a book by its ID
export const deleteBookById = async (bookId: string): Promise<IBook | null> => {
    return Book.findByIdAndDelete(bookId).exec();
};

// get a list of all books
export const getAllBook = async (): Promise<IBook[]> => {
    return Book.find({}).exec();
};

// Get books associated with a retailer ID
export const getBooksByRetailerId = async (retailerId: string | null) => {
    return await Book.find({ retailerId });
  };
