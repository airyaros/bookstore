import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/RootReducer";
import { fetchBooks } from "../../features/book/bookSlice";
import HorizontalCard from "./Card";
import CardLoading from "../loading/CardLoading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="bg-[#237943] rounded-full p-2 absolute top-1/2 transform -translate-y-1/2 left-4"
    onClick={onClick}
  >
    <ChevronLeftIcon className="h-6 w-6 text-white" />
  </button>
);

const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="bg-[#237943] rounded-full p-2 absolute top-1/2 transform -translate-y-1/2 right-4"
    onClick={onClick}
  >
    <ChevronRightIcon className="h-6 w-6 text-white" />
  </button>
);

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

interface BookSectionProps {
  title: string;
  filterBy: string;
  showAddToCart: boolean;
}

const SliderView: React.FC<BookSectionProps> = ({
  title,
  showAddToCart,
  filterBy,
}) => {
  const books = useSelector((state: RootState) => state.book.books);
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBooks()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const loadingComponents = Array.from({ length: 3 }, (_, index) => (
    <CardLoading key={`loading-${index}`} />
  ));

  const filteredBooks = isLoading
    ? []
    : books.filter((book) =>
        book.title.toLowerCase().includes(filterBy.toLowerCase())
      );

  return (
    <div className="relative md:my-5 my-10">
      
      <div className="flex items-center justify-between font-mulish mx-5 mb-5">
        <h2 className="text-md md:text-xl font-bold">{title}</h2>
        {!isLoading && (
          <Link to="/search" className="text-green-600 font-bold">
            Show All
          </Link>
        )}
      </div>
      <Carousel
        responsive={responsive}
        rewind={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        transitionDuration={700}
        customLeftArrow={<CustomLeftArrow />} // Hide default arrows
        customRightArrow={<CustomRightArrow />}
        className="p-4 flex items-center"
      >
        {isLoading
          ? loadingComponents
          : filteredBooks.map((book) => (
              <HorizontalCard
                key={book.id}
                book={book}
                showAddToCart={showAddToCart}
              />
            ))}
      </Carousel>
    </div>
  );
};

export default SliderView;
