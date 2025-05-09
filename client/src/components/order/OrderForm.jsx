import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, LoaderCircle } from 'lucide-react';
import Button from '../shared/Button'; // Ensure the correct path for Button
import { jwtDecode } from 'jwt-decode';

export default function OrderForm({ onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null); // To store vendor data
  const [formData, setFormData] = useState({
    quantity: 1,
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null); // Declare customerId state

  // This effect will handle token validation and redirection
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You need to be logged in!');
      navigate('/login');  // Redirect to login page
      return;
    }

    // Decode the token and set customerId
    try {
      const decoded = jwtDecode(token);
      setCustomerId(decoded?.userId || decoded?._id);
    } catch (err) {
      alert('Invalid token.');
      navigate('/login'); // Navigate to login page if token is invalid
    }

    const fetchProduct = async () => {
      try {
        // Fetch the product data
        const productRes = await fetch(`http://localhost:5000/api/products/${id}`);
        const productData = await productRes.json();
        setProduct(productData.product); // Assuming the product data is in `product`

        // After getting product, fetch the vendor details using vendorId
        const vendorRes = await fetch(`http://localhost:5000/api/vendor/${productData.product.vendorId}`);
        const vendorData = await vendorRes.json();
        setVendor(vendorData.vendor); // Set vendor data

      } catch (err) {
        console.error("Error fetching product or vendor:", err);
      }
    };

    fetchProduct();
  }, [id, navigate]); // Only fetch the product if `id` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the quantity is greater than 0 and less than or equal to the available stock
    if (formData.quantity <= 0) {
      alert("Quantity cannot be zero or negative. Please enter a valid quantity.");
      return; // Prevent form submission
    }

    if (formData.quantity > product.quantity) {
      alert(`The quantity you entered exceeds the available stock (${product.quantity}). Please reduce the quantity.`);
      return; // Prevent form submission
    }

    // Validate pickup date and time
    if (!formData.pickupDate) {
      alert("Please select a pickup date.");
      return; // Prevent form submission
    }

    if (!formData.pickupTime) {
      alert("Please select a pickup time.");
      return; // Prevent form submission
    }

    if (!customerId) {
      alert('Please login to place an order.');
      navigate('/login'); // Navigate to login page if no customerId
      return; // Stop further execution of the function
    }

    const orderPayload = {
      customerId,
      vendorId: product.vendorId,
      productId: product._id || product.id,
      quantity: parseInt(formData.quantity),
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      notes: formData.notes
    };

    try {
      setLoading(true);

      console.log('Order Payload:', orderPayload); // Debugging line

      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the token in the Authorization header
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // Navigate to order history page upon successful order placement
        navigate('/order/history');
      } else {
        alert(data.message || 'Order failed');
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert('Something went wrong');
    }
  };

  const generateTimeOptions = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const baseHour = hour > 12 ? hour - 12 : hour;
      slots.push(`${baseHour}:00 ${period}`, `${baseHour}:30 ${period}`);
    }
    return slots;
  };

  const getTomorrowDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 mt-20">
      {product ? (
        <>
          {/* Product Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Product Information</h3>
            <p><strong>Product: </strong>{product.name}</p>
            <p><strong>Price: </strong>{product.price ? `Rs. ${product.price}` : 'Price not available'}</p>
          </div>

          {/* Vendor Information Section */}
          {vendor && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-medium text-gray-800 mb-4">Vendor Information</h3>
              <p><strong>Store Name: </strong>{vendor.storeName}</p>
              <p><strong>Store Address: </strong>{vendor.address}</p>
              <p><strong>Contact: </strong>{vendor.contact}</p>
            </div>
          )}
        </>
      ) : (
        <div>Loading product...</div>
      )}

      {/* Order Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity*</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={1}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pickup Date Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                min={getTomorrowDate()}
                className="w-full p-3 pl-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Pickup Time Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
            <div className="relative">
              <Clock size={18} className="absolute left-3 top-3 text-gray-400" />
              <select
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-md"
              >
                <option value="">Select time</option>
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Additional Notes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions..."
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center">
              <LoaderCircle className="animate-spin mr-2" size={18} />
              Submitting...
            </span>
          ) : (
            'Submit Order Request'
          )}
        </Button>
      </form>
    </div>
  );
}
