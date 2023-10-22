import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number): void => {
    onPageChange(newPage);
  };

  return (
    <ul className="flex items-center justify-center space-x-2 font-mulish">
      <li className="">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={
            currentPage === 1
              ? `text-[#E0E0E0] h-9 rounded-md flex items-center`
              : `text-black h-9 rounded-md flex items-center`
          }
        >
          <ChevronLeftIcon className=" w-7 h-7" />
        </button>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index}
          className={
            currentPage === index + 1
              ? "bg-primary text-white p-3 h-9 rounded-md flex items-center"
              : "p-3 h-9 rounded-md flex items-center"
          }
        >
          <button onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages
              ? `text-[#E0E0E0] h-9 rounded-md flex items-center`
              : `text-black h-9 rounded-md flex items-center`
          }
        >
          <ChevronRightIcon className=" w-7 h-7" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
