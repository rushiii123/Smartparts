import { useLocation } from 'react-router-dom';
import ProductCard from './search/ProductCard';

export default function ImageSearchResults() {
  const location = useLocation();
  const data = location.state?.recognitionData;

  if (!data || !data.products) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No search results found. Try another image.</p>
      </div>
    );
  }

  const products = data.products.map(product => ({
    ...product,
    vendor: {
      name: 'SmartParts Vendor',
      rating: 4.2,
      distance: 2.5,
      location: 'Colombo, Sri Lanka',
      phone: '+94 77 123 4567',
    },
  }));

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Image Search Results</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Matched Keywords: {data.keywords?.join(', ') || 'N/A'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}
