interface Book {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

const bookData: { featured: Book[]; bestSellers: Book[] } = {
  featured: [
    {
      id: 1,
      title: "The Great Novel",
      imageUrl: "../../assets/images.jpeg",
      price: 15.99,
    },
    {
      id: 2,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
    {
      id: 3,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
    {
      id: 4,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
    {
      id: 5,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
    {
      id: 6,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
    {
      id: 7,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
  ],
  bestSellers: [
    {
      id: 101,
      title: "Thrilling Suspense",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 18.99,
    },
    {
      id: 102,
      title: "Fantasy Quest",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 14.99,
    },
    {
      id: 103,
      title: "The Great Novel",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 15.99,
    },
    {
      id: 104,
      title: "Mystery Adventures",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 12.49,
    },
    {
      id: 105,
      title: "Fantasy Quest",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 14.99,
    },
    {
      id: 106,
      title: "Fantasy Quest",
      imageUrl: "https://covers.openlibrary.org/b/id/240727-S.jpg",
      price: 14.99,
    },
    {
      id: 107,
      title: "Fantasy Quest",
      imageUrl: "",
      price: 14.99,
    },
    // ...more best sellers
  ],
};

export default bookData;
