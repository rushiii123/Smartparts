import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import Button from '../components/shared/Button';
import OrderForm from '../components/order/OrderForm';

// Mock data for product results
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Alternator - Toyota Camry 2012-2015',
    price: 129.99,
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'AutoZone North',
      rating: 4.7,
      distance: 2.3,
      location: '123 Main St, Anytown, USA',
      phone: '(555) 123-4567',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'ALT-4589-TC',
  },
  {
    id: '2',
    name: 'Brake Pads - Honda Civic 2016-2020',
    price: 54.99,
    image: 'https://images.pexels.com/photos/6517323/pexels-photo-6517323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: "O'Reilly Auto Parts",
      rating: 4.5,
      distance: 3.1,
      location: '456 Oak Ave, Anytown, USA',
      phone: '(555) 234-5678',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'BP-2347-HC',
  },
  {
    id: '3',
    name: 'Fuel Pump - Ford F-150 2014-2018',
    price: 179.99,
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'NAPA Auto Parts',
      rating: 4.2,
      distance: 5.7,
      location: '789 Pine St, Anytown, USA',
      phone: '(555) 345-6789',
    },
    inStock: false,
    condition: 'New',
    partNumber: 'FP-7823-FF',
  },
  {
    id: '4',
    name: 'Timing Belt Kit - Volkswagen Golf 2013-2017',
    price: 89.99,
    image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'Advance Auto Parts',
      rating: 4.8,
      distance: 1.9,
      location: '101 Elm St, Anytown, USA',
      phone: '(555) 456-7890',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'TB-3481-VG',
  },
  {
    id: '5',
    name: 'Water Pump - BMW 3 Series 2012-2016',
    price: 149.99,
    image: 'https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'BMW Dealership',
      rating: 4.9,
      distance: 8.2,
      location: '222 Luxury Ln, Richtown, USA',
      phone: '(555) 567-8901',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'WP-9275-BMW',
  },
  {
    id: '6',
    name: 'Refurbished AC Compressor - Audi A4 2014-2017',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'European Auto Parts',
      rating: 4.6,
      distance: 4.5,
      location: '333 Continental Dr, Anytown, USA',
      phone: '(555) 678-9012',
    },
    inStock: true,
    condition: 'Refurbished',
    partNumber: 'AC-6142-AA',
  },
];

export default function OrderRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [orderState, setOrderState] = useState('form');
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);
    setProduct(foundProduct || null);

    document.title = foundProduct 
      ? `Order Request: ${foundProduct.name} | SmartParts`
      : 'Order Request | SmartParts';

    window.scrollTo(0, 0);
  }, [id]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setOrderState('confirmation');
    window.scrollTo(0, 0);
  };

  if (!product) {
    return (
      <div className="bg-white min-h-screen pt-24">
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for is not available.
          </p>
          <Button onClick={() => navigate('/search')}>
            Return to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <button
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          onClick={() => navigate('/search')}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Search Results
        </button>

        {orderState === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Request
                </h1>
                <OrderForm 
                  product={product}
                  onSubmit={handleFormSubmit}
                />
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="flex items-start mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-contain bg-white rounded border border-gray-200 mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Part #: {product.partNumber}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Vendor:</span>
                    <span className="font-medium text-gray-900">
                      {product.vendor.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md text-sm">
                  <p className="text-blue-800">
                    This is a request only. No payment will be collected now. The vendor will contact you to confirm availability and arrange payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-green-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Order Request Submitted!
              </h1>

              <p className="text-gray-600 mb-6">
                Your request for <span className="font-semibold">{product.name}</span> has been sent to {product.vendor.name}.
                They will contact you shortly at {formData?.email} to confirm availability and arrange pickup.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name:</p>
                    <p className="font-medium text-gray-900">{formData?.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Contact:</p>
                    <p className="font-medium text-gray-900">{formData?.email}</p>
                    <p className="font-medium text-gray-900">{formData?.phone}</p>
                  </div>

                  {(formData?.pickupDate || formData?.pickupTime) && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Preferred Pickup:</p>
                      <p className="font-medium text-gray-900">
                        {formData?.pickupDate} {formData?.pickupTime}
                      </p>
                    </div>
                  )}

                  {formData?.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Notes:</p>
                      <p className="font-medium text-gray-900">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  icon={<ArrowLeft size={18} />}
                  onClick={() => navigate('/search')}
                >
                  Return to Search
                </Button>

                <Button
                  variant="primary"
                  icon={<ShoppingCart size={18} />}
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
