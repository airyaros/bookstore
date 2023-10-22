import { Request, Response } from "express";
import * as bookDAL from "../dals/Book.dal";
import { IBook } from "../models/Book";
import { formatError, formatSuccess } from "../utils/responseFormatter";
const cloudinary = require("../utils/cloudinary");

// create a new book
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookData = req.body

    const createdBook = await bookDAL.createBook(bookData);

    cloudinary.uploader.upload(
      req.file?.path,
      async (err: any, result: any) => {
        if (err) {
          console.log(err);
          return formatError(res, 500, "Error uploading image");
          // return res.status(500).json({
          //   success: false,
          //   message: "Error uploading image",
          // });
        }

        const updatedBook = bookDAL.updateBookById(createdBook._id, {
          imageUrl: {
            data: result.secure_url,
            contentType: result.format,
          },
        });

        if (!updatedBook) {
          return formatError(res, 500, "Error updating book with image URL");
        }
  
        // Append imageUrl to the createdBook
        const bookWithImage = { ...createdBook.toObject(), imageUrl: result.secure_url };
  
        formatSuccess(res, 201, bookWithImage);
        // res.status(200).json({
        //   success: true,
        //   message: "Book created successfully",
        //   data: createdBook,
        // });
      });
  } catch (error) {
    formatError(res,500, "Something went wrong");
    // res.status(500).json({
    //   error,
    //   message: "Something went wrong",
    // });
  }
};

// get a book by its ID
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await bookDAL.findBookByID(bookId);

    // if (!book) {
    //   res.status(404).json({ message: "Book not found" });
    // } else {
    //   res.status(200).json({ data: book });
    // }
    if (!book) {
      formatError(res, 404, "Book not found");
      return;
    }

    formatSuccess(res,200, book);

  } catch (error) {
    formatError(res, 500, "Something went wrong");
    //res.status(500).json({ error, message: "Something went wrong" });
  }
};

// update a book by its ID
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const updatedBookData: Partial<IBook> = req.body;
    const updatedBook = await bookDAL.updateBookById(bookId, updatedBookData);

    if (!updatedBook) {
      formatError(res, 404,  "Book not found");
      //res.status(404).json({ message: "Book not found" });
    } else {
      formatSuccess(res,200, updatedBook);
      // res
      //   .status(200)
      //   .json({ data: updatedBook, message: "Book updated successfully" });
    }
  } catch (error) {
    formatError(res, 500, "Something went wrong")
    //res.status(500).json({ error, message: "something went wrong" });
  }
};

// delete a book by its ID
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const deletedBook = await bookDAL.deleteBookById(bookId);

    if (!deletedBook) {
      formatError(res, 404, "Book not found")
      //res.status(404).json({ message: "Book not found" });
    } else {
      formatSuccess(res,200, null);
      // res
      //   .status(200)
      //   .json({ data: deletedBook, message: "Book deleted successfully" });
    }
  } catch (error) {
    formatError(res,500,"Something went wrong");
    //res.status(500).json({ error, message: "Something went wrong" });
  }
};

// get a list of all books
export const getAllBooks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await bookDAL.getAllBook();
    formatSuccess(res,200,books);
    //res.status(200).json({ data: books });
  } catch (error) {
    formatError(res,500, "Something went wrong");
   // res.status(500).json({ error, message: "something went wrong" });
  }
};

export const getBooksByRetailerId = async (req: Request, res: Response) => {
    try {
      // Extract retailer ID from the token
      const retailerId = req.userId;  // Assuming req.userId holds the retailer ID
  
      // Use the DAL to get books associated with the retailer ID
      if(retailerId){
        const books = await bookDAL.getBooksByRetailerId(retailerId);
        
        formatSuccess(res, 200, books);
      // res.status(200).json({
      //   books,
      //   message: 'Books retrieved successfully for the retailer.',
      // });
    }
    } catch (error) {
      console.error('Error:', error);
      formatError(res,500,"Something went wrong")
      // res.status(500).json({
      //   error,
      //   message: 'Something went wrong',
      // });
    }
  };
  
  export default { getBooksByRetailerId };
