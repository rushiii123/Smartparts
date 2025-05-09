import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from './search/ProductCard';

export default function TextSearchResults() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (keyword) {
      setLoading(true);
      fetch(`http://localhost:5000/api/products?search=${keyword}`)
        .then((res) => res.json())
        .then((data) => {
          const enriched = (data.products || []).map(product => ({
            ...product,
            vendor: {
              name: 'SmartParts Vendor',
              rating: 4.2,
              distance: 2.5,
              location: 'Colombo, Sri Lanka',
              phone: '+94 77 123 4567',
            },
          }));
          setProducts(enriched);
        })
        .catch((err) => console.error('Fetch error:', err))
        .finally(() => setLoading(false));
    }
  }, [keyword]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} viewMode="grid" />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No search results found for "<strong>{keyword}</strong>".
        </p>
      )}
    </div>
  );
}
