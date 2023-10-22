import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { AiOutlineMinus, AiOutlineArrowLeft } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { Helmet } from "react-helmet";
import { Button } from "@material-tailwind/react";
import {
  selectCartItems,
  selectCartTotalPrice,
  removeFromCart,
  addToCart,
  removeItem,
} from "../features/cart/CartSlice";
import MainNavBar from "../components/navbar/MainNavBar";

const OrderedItems: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  console.log(cartItems);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddQuantity = (itemId: number) => {
    dispatch(addToCart({ id: itemId }));
  };

  const handleRemoveQuantity = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <MainNavBar />
      <div className="w-11/12 container mx-auto mt-8 font-mulish">
        <div className="flex justify-between items-center text-2xl font-bold pb-4 border-b-2 border-b-gray-300">
          <h1>Shopping Cart</h1>
          <Link
            to="/"
            className="text-lg flex items-center gap-2 font-semibold"
          >
            <AiOutlineArrowLeft />
            Go back
          </Link>
        </div>
        <div className="">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b-2 border-b-gray-300 p-4 rounded flex justify-between "
              >
                <div className="flex gap-4 w-full">
                  <img
                    src={item.image}
                    alt="image"
                    className="w-[100px] h-[100px]"
                  />
                  <div className="flex flex-col justify-between gap-3">
                    <p className="font-semibold text-lg">{item.title}</p>
                    <p className="bg-gray-200 text-green-700 font-semibold text-center rounded-md w-max px-2 py-1">
                      instock
                    </p>
                    <div
                      className="flex items-center gap-2 text-red-500 cursor-pointer"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <BsTrash className="" />
                      <p className="font-semibold">Remove</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <h1 className="text-xl font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h1>
                  <div className="flex items-center border-2 border-gray-400 rounded-md">
                    <button
                      onClick={() => handleRemoveQuantity(item.id)}
                      className="border-r-2 border-gray-400 text-black font-bold text-xl px-2 py-1"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="font-bold text-xl px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleAddQuantity(item.id)}
                      className="border-l-2 border-gray-400 text-black font-bold text-xl px-2 py-1"
                    >
                      <GrAdd />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="py-4 border-b-2 border-gray-400">
            <div className="flex justify-between">
              <p className="font-semibold">Subtotal</p>
              <p className="text-lg">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Quantity</p>
              <p className="text-lg">{totalQuantity}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Shipping</p>
              <p className="text-lg">Free</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">VAT(20%)</p>
              <p className="text-lg">${(totalPrice * 0.2).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <p className="font-bold text-2xl">Total</p>
            <p className="text-2xl">
              ${(totalPrice * 0.2 + totalPrice).toFixed(2)}
            </p>
          </div>
          <Link to={totalQuantity >= 1 ? "/checkout" : ""} className="my-4">
            <Button className="w-full bg-[#237943] mb-4 font-mulish font-bold text-sm">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderedItems;
