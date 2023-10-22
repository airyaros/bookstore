import FilterSidebar from "../components/filterSideBar/FilterSidebar";
import MainNavBar from "../components/navbar/MainNavBar";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../app/RootReducer";
import { fetchBooks } from "../features/book/bookSlice";
import HorizontalCard from "../components/card/Card";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination/Pagination";
import { Footer } from "../components/footer/Footer";
import { Button } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import CardLoading from "../components/loading/CardLoading";

const Search = () => {
  const books = useSelector((state: RootState) => state.book.books);
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.navbar.searchValue
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filters = ["Filter 1", "Filter 2", "Filter 3", "Filter 4"];
  const filtersOthers = ["others", "someother", "another", "mother"];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const finalBooks = searchValue ? filteredBooks : books;
  function handleFilterChange(selectedFilters: string[]) {
    console.log("Selected filters:", selectedFilters);
    // You can update your main component's state or perform any other necessary actions here
  }
  const cardsPerPage = 4; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(finalBooks.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToShow = finalBooks.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const loadingComponents = Array.from({ length: 4 }, (_, index) => (
    <CardLoading key={`loading-${index}`} />
  ));
  return (
    <div className="font-mulish">
      <MainNavBar />
      <div className="flex w-full justify-start gap-12 mt-10 ">
        <div className="w-[25%] p-4 border-t border-r border-l border-blue-gray-50 rounded-md">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            title="Departments"
          />
          <FilterSidebar
            filters={filtersOthers}
            onFilterChange={handleFilterChange}
            title="Brands"
          />
          <Button
            // onClick={handleSubmit(onSubmit)}
            className="w-full bg-[#237943] mb-4 font-mulish font-bold text-sm"
          >
            Filter
          </Button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center text-2xl font-bold pb-4">
            <div className="flex justify-between w-full items-center  pb-4">
              <h1>
                {searchValue
                  ? `Result from "${searchValue}"`
                  : "Explore These Items"}
              </h1>
              <Link
                to="/"
                className="text-lg flex items-center gap-2 font-semibold"
              >
                <AiOutlineArrowLeft />
                Go back
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 w-full place-items-center">
            {filteredBooks.length === 0
              ? loadingComponents
              : cardsToShow.map((book, i) => (
                  // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <HorizontalCard key={i} book={book} showAddToCart={true} />
                ))}
          </div>

          <div className="flex justify-start my-8">
            {filteredBooks.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
