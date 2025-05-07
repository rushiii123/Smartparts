import { useLocation } from 'react-router-dom';
import ProductCard from './search/ProductCard';

export default function ImageSearchResults() {
  const location = useLocation();
  const data = location.state?.recognitionData;

  const products = data?.products || [];
  const keywords = data?.keywords || [];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Image Search Results</h2>

    
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                vendor: {
                  name: 'SmartParts Vendor',
                  rating: 4.2,
                  distance: 2.5,
                  location: 'Colombo, Sri Lanka',
                  phone: '+94 77 123 4567',
                },
              }}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg mt-20">
          No search results found for this image.
        </div>
      )}
    </div>
  );
}
