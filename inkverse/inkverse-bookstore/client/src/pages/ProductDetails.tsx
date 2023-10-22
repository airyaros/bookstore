// ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/RootReducer';
import MainNavBar from '../components/navbar/MainNavBar'
import { Footer } from '../components/footer/Footer';
import BookSection from '../components/card/BookSection';
import { Helmet } from 'react-helmet';
import DetailView from '../components/card/ProductDet';
import { Book } from '../types/types';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const books = useSelector((state: RootState) => state.book.books);

  useEffect(() => {
    const selectedProduct = books.find((book) => book.id.toString() === productId);
    setProduct(selectedProduct || null);
  }, [productId, books]);

  console.log("products: ", product)

  if (!product) {
    return <div>Loading...</div>;
  }

   const relatedItems = books.filter((book) => book.category === product.category);

  return (
    <>
    <Helmet>
      <title>{product.title}</title>
    </Helmet>
    <div className="flex flex-col space-y-10">
      <MainNavBar />
      <div className=''>
      <DetailView book={product} />
      </div>
      <div className="p-8">
        <BookSection title="Related Items" books={relatedItems as Book[]} showAddToCart={false} />
        <BookSection title="Best Sellers" showAddToCart={true} />
      </div>
      <Footer />


    </div>
  </>
  );
};

export default ProductDetails;
