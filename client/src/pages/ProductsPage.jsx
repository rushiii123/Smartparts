import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapPin, Star } from 'lucide-react';

export default function ProductDetailsPage() {
  const { id  } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        console.log('Product data:', data);
        setProduct(data.product);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-20 text-gray-600">Loading...</div>;
  }

  const vendor = product.vendor || {
    name: 'SmartParts Vendor',
    rating: 4.2,
    location: 'Colombo, Sri Lanka',
    phone: '+94 77 123 4567',
  };

  const isOutOfStock = product.quantity <= 0; // Check if product is out of stock

  return (
    <div className="bg-gray-50 min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full h-64 object-contain bg-gray-100"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600 mb-1">Part #: {product.partNumber || 'N/A'}</p>
            <p className="text-blue-600 font-bold text-xl mb-4">Rs. {product.price.toLocaleString()}</p>

            <div className="mb-4 flex items-center text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < vendor.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              ))}
              <span className="ml-2 text-gray-600">({vendor.rating})</span>
            </div>

            <p className="text-sm text-gray-700 mb-2"><strong>Condition:</strong> {product.condition}</p>
            <p className="text-sm text-gray-700 mb-4"><strong>Availability:</strong> {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>

            <div className="border-t pt-4 mt-4 text-sm text-gray-700">
              <p><strong>Vendor:</strong> {vendor.name}</p>
              <p><strong>Location: </strong> <MapPin size={14} className="inline mr-1" /> {vendor.location}</p>
              <p><strong>Phone:</strong> {vendor.phone}</p>
            </div>

            {/* Request Button */}
            <button
              disabled={isOutOfStock} // Disable button if out of stock
              className={`w-full mt-4 py-2 rounded-md text-white ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isOutOfStock ? 'Out of Stock' : 'Request Product'}
            </button>
          </div>
        </div>

        {product.description && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 text-sm">{product.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
