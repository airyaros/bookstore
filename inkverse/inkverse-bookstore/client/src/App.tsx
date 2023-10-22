// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OrderedItems from "./pages/OrderedItems";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import Offline from "./pages/Offline";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

const App = () => {
  const isOnline = useOnlineStatus();

  // const [isLogged, setIsLogged] = useState(true);

  return (
    <div className="w-11/12 mx-auto my-8">
      <Toaster position="top-right" reverseOrder={false} />
      {isOnline ? (
        <Routes>
          <Route
            path="/"
            element={true ? <Home /> : <Navigate to="/login" replace={true} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrderedItems />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Offline />
      )}
    </div>
  );
};

export default App;
