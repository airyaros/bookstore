import { Router } from "express";
import * as bookController from "../controllers/Book.controller";
import * as authMiddleware from "../middlewares/auth.middleware";
import { extractUserId } from "../middlewares/auth.middleware";
import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


const router = Router();

// Add the middleware to extract the user ID from the token
router.use(extractUserId);

// Endpoint to get books associated with the retailer using their ID
router.get('/books/retailer', bookController.getBooksByRetailerId);

router.post(
  "/books",
  authMiddleware.protect,
  upload.single("imageUrl"),
  bookController.createBook
);
router.get(
  "/books/:bookId",
  authMiddleware.protect,
  bookController.getBookById
);
router.put("/books/:bookId", authMiddleware.protect, bookController.updateBook);
router.delete(
  "/books/:bookId",
  authMiddleware.protect,
  bookController.deleteBook
);
router.get("/books", authMiddleware.protect, bookController.getAllBooks);

export default router;
