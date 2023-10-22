import { Button } from "@material-tailwind/react"; // Import the Button component

interface Book {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface OrderConfirmationCardProps {
  books: Book[];
  shippingPrice: string;
  totalPrice: number;
}

function OrderConfirmationCard({
  books,
  shippingPrice,
  totalPrice,
}: OrderConfirmationCardProps) {
  return (
    <div className="w-1/3 bg-white p-6 border border-gray-300 shadow-md flex-shrink-0 font-mulish max-h-[650px] rounded-lg">
      <div className="text-zinc-800 text-3xl font-bold mb-4">Your Order</div>
      <div className="space-y-4 h-[300px] overflow-y-auto border border-gray-400 p-4 rounded-md scrollbar-thin scrollbar-thumb-[#237943] scrollbar-track-gray-100">
        {books.map((book) => (
          <div key={book.id} className="flex space-x-4">
            <img className="w-20 h-20" src={book.image} alt="" />
            <div>
              <div className="text-slate-900 font-bold">{book.title}</div>
              <div className="text-gray-500">${book.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-4 border-t" />
      <div className="flex justify-between">
        <div className="text-slate-900">Subtotal</div>
        <div className="text-slate-900">${totalPrice.toFixed(2)}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-slate-900">Shipping Price</div>
        <div className="text-slate-900">{shippingPrice}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-slate-900">VAT(20%)</div>
        <div className="text-slate-900">${(totalPrice * 0.2).toFixed(2)}</div>
      </div>
      <hr className="my-4 border-t" />
      <div className="flex justify-between font-bold text-lg">
        <div className="text-zinc-800">Total Price</div>
        <div className="text-zinc-800">
          ${(totalPrice * 0.2 + totalPrice).toFixed(2)}
        </div>
      </div>
      <div className="my-4 ">
        <Button className="bg-[#237943] font-mulish font-bold">Continue to Payment</Button>
      </div>
    </div>
  );
}

export default OrderConfirmationCard;
