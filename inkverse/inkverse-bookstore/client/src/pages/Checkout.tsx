import { Footer } from "../components/footer/Footer";
import BillingDet from "../components/billing/BillingDet";
import OrderConfirmationCard from "../components/billing/OrderConfirmationCard";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../features/cart/CartSlice";

import MainNavBar from "../components/navbar/MainNavBar";
import { Helmet } from "react-helmet";
import {  AiOutlineArrowLeft } from "react-icons/ai";

const Checkout: React.FC = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  
  return (
    <><Helmet>
      <title>Checkout</title>
    </Helmet>
    <div className="flex flex-col justify-between space-y-10 font-mulish">
        <MainNavBar />
        <div className="flex justify-between items-center text-2xl font-bold pb-4 border-b-2 border-b-gray-300">
          <h1>Checkout</h1>
          <Link
            to="/orders"
            className="text-lg flex items-center gap-2 font-semibold"
          >
            <AiOutlineArrowLeft />
            Go back
          </Link>
        </div>
        <div className="flex flex-row wrap justify-between">
          <BillingDet />
          <OrderConfirmationCard
          books={cartItems}
          shippingPrice="Free"
          totalPrice={totalPrice} />  
        </div>
        <Footer />
      </div></>
  );
}

export default Checkout;
