import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../features/cart/CartSlice";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Book } from "../../types/types";


interface BookCardProps {
  book: Book;
  showAddToCart: boolean;
}

const message = () => toast.success("You've added to the cart successfully!");

const HorizontalCard: React.FC<BookCardProps> = ({ book, showAddToCart }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isInCart = cartItems.some((item) => item.id === book.id);

  const handleAddToCart = () => {
    dispatch(addToCart(book));
    message();
  };

  const handleViewCart = () => {
    if (isInCart) {
      navigate("/orders");
    } else {
      handleAddToCart();
    }
  };

  const truncatedTitle =
    // rome-ignore lint/style/useTemplate: <explanation>
    book.title.length > 32 ? book.title.substring(0, 32) + "..." : book.title;
  return (
    <>
      <Card className="flex flex-col w-50 md:w-96 max-w-[28rem] p-4 md:flex-row items-center justify-center">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-1/2 md:w-2/5 shrink-0 rounded-r-none flex items-center"
        >
          <Link to={`/product/${book.id}`}>
            <img
              src={book.image}
              alt={book.title}
              className="h-[70%] w-full object-cover "
            />
          </Link>
        </CardHeader>
        <CardBody className="flex flex-col justify-between">
          <div className="text-center md:text-start">
            <Link to={`/product/${book.id}`}>
              <Typography
                color="blue-gray"
                className="mb-2 font-mulish w-full font-bold text-sm md:text-md"
              >
                {truncatedTitle}
              </Typography>
            </Link>
            <Typography
              color="gray"
              className="mb-4 text-sm md:text-md font-mulish"
            >
             {book.category}
            </Typography>
          </div>

          <div className="flex items-center justify-center md:justify-start w-full mb-4 font-mulish">
            <Rating value={4} readonly />
          </div>
          <Typography className="mb-4 text-sm md:text-md text-center md:text-start font-mulish font-bold text-[#237943]">
            ${book.price}
          </Typography>

          <div className="flex justify-center md:justify-start items-center gap-2">
            {showAddToCart && (
              <Button
                className=" bg-[#237943] flex items-center gap-2 font-mulish font-bold "
                onClick={isInCart ? handleViewCart : handleAddToCart}
              >
                <h1 className="">{isInCart ? "View" : "Add to Cart"}</h1>
                {isInCart && <CheckIcon className="w-5 h-5 font-bold" />}
              </Button>
            )}
            {/* <HeartIcon className="w-6 h-6"/> */}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default HorizontalCard;
