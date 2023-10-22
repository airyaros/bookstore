import React from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../features/cart/CartSlice";
import { useSelector } from "react-redux";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <div
      className={`fixed inset-y-0 z-50 right-0 w-64 bg-white transform transition-transform ease-in-out duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <ul>
          <li className="mb-2">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Signin
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/wishlist"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Wishlist
            </Link>
          </li>
          <li className="mb-2 flex gap-2">
            <span className=" bg-red-600 px-1 py-[.1rem] text-center text-sm rounded-full text-white">
              {totalQuantity}
            </span>
            <Link
              to="/orders"
              className="relative text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cart ${totalPrice.toFixed(2)}
            </Link>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
