// ProductsPage.jsx

import React, { useEffect, useState } from "react";
import { ShoppingCart, BadgeCheck, AlertTriangle } from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // your API route
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl object-cover h-40 w-full mb-4"
            />
            <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-gray-700 font-bold mb-2">Rs. {product.price.toLocaleString()}</p>
            <div className="mt-auto flex items-center gap-2 text-sm">
              {product.condition === "New" ? (
                <BadgeCheck className="text-green-500 w-5 h-5" />
              ) : (
                <AlertTriangle className="text-yellow-500 w-5 h-5" />
              )}
              <span>{product.condition}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
