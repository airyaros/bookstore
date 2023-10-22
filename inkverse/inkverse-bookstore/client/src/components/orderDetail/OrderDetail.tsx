import React from "react";

interface OrderDetailProps {
  orderId: string;
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
  total: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, items, total }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <h2 className="text-lg font-semibold">Order Details</h2>
      <p>Order ID: {orderId}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span className="font-semibold">{item.title}:</span> {item.quantity}{" "}
            x ${item.price}
          </li>
        ))}
      </ul>
      <p className="font-semibold">Total: ${total}</p>
    </div>
  );
};

export default OrderDetail;
