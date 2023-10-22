import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import {
  selectCartItems,
  addToCart,
  removeFromCart,
  removeItem,
} from "../../features/cart/CartSlice";
import { Book } from "../../types/types";
import { CheckIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

interface DetailProps {
  book: Book;
}
const addedMessage = () =>
  toast.success("You've added to the cart successfully!");
const removedMessage = () =>
  toast.error("You've removed the item successfully!");

const DetailView: React.FC<DetailProps> = ({ book }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = cartItems.some((item) => item.id === book.id);

  useEffect(() => {
    setIsAddedToCart(isInCart);
  }, [isInCart]);

  console.log("incoming books data: ", book);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    setIsAddedToCart(true);
    addedMessage();
  };

  const handleViewCart = () => {
    navigate("/orders");
  };


  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
    setIsAddedToCart(false);
    removedMessage();
  };

  const handleAddQuantity = (itemId: number) => {
    dispatch(addToCart({ id: itemId }));
  };

  const handleRemoveQuantity = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  // Helper function to get the quantity of the item in the cart
  const getCartItemQuantity = (itemId: number) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      <div className="flex h-750 ">
        <div className="w-1/6"></div>
        <div className="flex flex-row"></div>

        <div className="w-1/6 mr-10">
          <img src={book.image} alt={book.title} className=" w-full" />
        </div>
        <div className="w-3/6 p-4 flex flex-col">
          <Typography variant="h3" className="mb-6 font-bold font-mulish">
            {book.title}
          </Typography>
          <p className="bg-gray-200 text-green-700 font-semibold text-center rounded-md w-max px-2 py-1 mb-6">
            instock
          </p>
          <Typography
            color="green"
            className="mb-6 font-bold text-xl font-mulish"
          >
            ${book.price}
          </Typography>
          {isAddedToCart && (
            <div className="flex w-28 items-center border-2 border-gray-400 rounded-md mb-6">
              <button
                onClick={() => handleRemoveQuantity(book.id)}
                className="border-r-2 border-gray-400 text-black font-bold text-xl px-2 py-1"
              >
                <AiOutlineMinus />
              </button>
              <span className="font-bold text-xl px-2">
                {getCartItemQuantity(book.id)}
              </span>
              <button
                onClick={() => handleAddQuantity(book.id)}
                className="border-l-2 border-gray-400 text-black font-bold text-xl px-2 py-1"
              >
                <GrAdd />
              </button>
            </div>
          )}
          <div className="flex w-full gap-2 items-center">
            <Button
              className=" bg-[#237943] flex justify-center items-center gap-2 font-mulish font-bold mb-6 w-[70%]"
              onClick={isInCart ? handleViewCart : () => handleAddToCart(book)}
            >
              {isInCart ? "View in Cart" : "Add to Cart"}
              {isInCart && <CheckIcon className="w-5 h-5 font-bold" />}
            </Button>
            {isAddedToCart && (
              <Button
                color="indigo"
                className=" mb-6 bg-red-500 text-white font-mulish"
                onClick={() => handleRemoveItem(book.id)}
              >
                Remove
              </Button>
            )}
          </div>
          {/* <Button
            color="indigo"
            className="border mb-6 border-[#237943] bg-white text-[#237943] font-mulish"
            onClick={handleAddToWishlist}
          >
            Add to Wishlist
          </Button> */}
        </div>
        <div className="w-1/6"></div>
      </div>

      <div className="bg-white p-4 rounded-lg ">
        <Typography variant="h4" className="mb-4 font-semibold font-mulish">
          Details
        </Typography>
        <Typography className="text-black text-lg mb-4">
          {book.description}
        </Typography>
      </div>
    </>
  );
};

export default DetailView;
