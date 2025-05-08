import { useState } from 'react';
import { MapPin, Phone, ShoppingCart, Star, ExternalLink } from 'lucide-react';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [isHovering, setIsHovering] = useState(false);

  if (!product) return null;

  const vendor = {
    name: product?.vendor?.name || 'SmartParts Vendor',
    rating: product?.vendor?.rating || 4.2,
    distance: product?.vendor?.distance || 2.5,
    location: product?.vendor?.location || 'Colombo, Sri Lanka',
    phone: product?.vendor?.phone || '+94 77 123 4567',
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4"
        />
        {product.inStock === false || product.quantity <= 0 ? (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1">
            Out of Stock
          </div>
        ) : (
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1">
            In Stock
          </div>
        )}
        {product.condition && product.condition !== 'New' && (
          <div className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1">
            {product.condition}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          Part #: {product.partNumber || 'N/A'}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg text-blue-600">
            Rs. {product.price?.toLocaleString() || '0'}
          </span>

          <div className="flex items-center">
            <div className="flex mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < vendor.rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({vendor.rating.toFixed(1)})
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 mb-4">
          <h4 className="font-medium text-sm text-gray-900 mb-2">
            Available at:
          </h4>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700 font-medium">
              {vendor.name}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1" />
              <span>{vendor.distance.toFixed(1)} mi</span>
            </div>
          </div>

          <div className="flex items-start text-sm text-gray-600 mt-1">
            <MapPin size={14} className="mr-1 flex-shrink-0 mt-1" />
            <span>{vendor.location}</span>
          </div>

          <div
            className={`flex items-center text-sm text-gray-600 mt-1 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Phone size={14} className="mr-1" />
            <span>{vendor.phone}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link to={`/product/${product._id || product.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              icon={<ExternalLink size={16} />}
              fullWidth
            >
              View Details
            </Button>
          </Link>

          <Link to={`/order-request/${product._id || product.id}`} className="flex-1">
            <Button
              variant="primary"
              size="sm"
              icon={<ShoppingCart size={16} />}
              fullWidth
            >
              Request
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
