import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { Filter, XCircle } from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slider";

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderPrice, setSliderPrice] = useState([0, 50000]);

  // Using location to get the category and filter params from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "All";
  const condition = queryParams.get("condition") || "All";
  const minPrice = queryParams.get("minPrice") || sliderPrice[0];
  const maxPrice = queryParams.get("maxPrice") || sliderPrice[1];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${category}&condition=${condition}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const data = await response.json();
        
        console.log("Fetched Products Data:", data); // Debugging log

        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          setFilteredProducts([]); // If the data is not an array, fallback to an empty array
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, condition, minPrice, maxPrice]);

  const handleSliderChange = (value) => {
    setSliderPrice(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-400 border-solid mb-4"></div>
        <p className="text-xl font-semibold text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row p-4 pt-28">
      <aside className="w-full md:w-72 bg-white rounded-2xl shadow-md p-6 mb-6 md:mb-0 md:mr-8">
        <div>
          <h3 className="text-lg font-bold">Filter by Category</h3>
          <div>
            {/* Filtering options */}
            {['All', 'Automotive', 'Electronics', 'Machinery', 'Tools'].map((cat) => (
              <button
                key={cat}
                className={`block text-lg py-2 px-4 w-full text-left rounded hover:bg-gray-100 ${category === cat ? 'bg-gray-200' : ''}`}
                onClick={() => window.location.href = `/search-results?category=${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price slider */}
          <h3 className="text-lg font-bold mt-6">Filter by Price</h3>
          <Slider
            min={0}
            max={50000}
            value={sliderPrice}
            onChange={handleSliderChange}
            withBars
          />
        </div>
      </aside>

      <section className="flex-1">
        {Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <XCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-xl text-gray-600 font-semibold">No products found.</p>
          </div>
        ) : (
          Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <Carousel showThumbs={false} infiniteLoop autoPlay>
                    {product.images && product.images.length > 0 ? (
                      product.images.map((img, idx) => (
                        <img key={idx} src={img} alt={product.name} className="h-48 object-cover" />
                      ))
                    ) : (
                      <img src={product.image} alt={product.name} className="h-48 object-cover" />
                    )}
                  </Carousel>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    <p className="text-blue-600 font-bold text-lg mt-2">Rs {product.price.toLocaleString()}</p>
                    <span className={`text-xs inline-block mt-2 px-2 py-1 rounded-full ${product.condition === "New" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {product.condition}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xl text-gray-600 font-semibold">No products available.</p>
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default SearchResults;
