import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/RootReducer";
import { fetchBooks } from "../../features/book/bookSlice";
import HorizontalCard from "./Card";
import CardLoading from "../loading/CardLoading";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Book } from "../../types/types";

interface BookSectionProps {
  title: string;
  showAddToCart: boolean;
  books?: Book[];
}

const BookSection: React.FC<BookSectionProps> = ({
  title,
  showAddToCart,
  books,
}) => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const fetchedBooks = useSelector((state: RootState) => state.book.books);
  const [isLoading, setIsLoading] = useState(!books);

  // Fetch books if 'books' prop is not provided
  useEffect(() => {
    if (!books) {
      dispatch(fetchBooks()).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, books]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerSlide, (books || fetchedBooks).length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0));
  };

  const carouselItems = (books || fetchedBooks)
    .slice(currentIndex, currentIndex + itemsPerSlide)
    .map((book) => (
      <HorizontalCard key={book.id} book={book} showAddToCart={showAddToCart} />
    ));

  const showPreviousArrow = currentIndex > 0;
  const showNextArrow =
    currentIndex + itemsPerSlide < (books || fetchedBooks).length;

  return (
    <section className="mb-8 font-mulish">
      <div className="flex items-center justify-between mb-10 ">
        <h2 className="text-xl font-bold">{title}</h2>
        <a href="#" className="text-green-600 font-bold">
          Show All
        </a>
      </div>
      <div className="relative">
        <div className="flex space-x-4 items-center">
          {showPreviousArrow && (
            <button
              onClick={handlePrevious}
              className="carousel-button bg-[#237943] rounded-full p-2 transition duration-300 ease-in-out hover:bg-darkgreen-500 focus:outline-none"
            >
              <ChevronLeftIcon className="h-8 w-8 text-white" />
            </button>
          )}
          <div className="flex overflow-x-auto gap-4 p-4 mx-2">
            {isLoading
              ? Array.from({ length: 2 }, (_, index) => (
                  <CardLoading key={`loading-${index}`} />
                ))
              : carouselItems}
          </div>
          {showNextArrow && (
            <button
              onClick={handleNext}
              className="carousel-button bg-[#237943] rounded-full p-2 transition duration-300 ease-in-out hover:bg-darkgreen-500 focus:outline-none"
            >
              <ChevronRightIcon className="h-8 w-8 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookSection;
