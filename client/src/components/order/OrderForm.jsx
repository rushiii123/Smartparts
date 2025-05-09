import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, LoaderCircle } from 'lucide-react';
import Button from '../shared/Button';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export default function OrderForm({ onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [formData, setFormData] = useState({
    quantity: 1,
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [countdown, setCountdown] = useState(5); // Countdown timer (in seconds)
  const [toastId, setToastId] = useState(null); // Track the toast ID for dismissal

  // Check if user is logged in by verifying the token
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    // Decode the token and set customerId
    try {
      const decoded = jwtDecode(token);
      setCustomerId(decoded?.userId || decoded?._id);
    } catch (err) {
      toast.error('Invalid token. Please log in again.');
      navigate('/login');
    }

    const fetchProduct = async () => {
      try {
        const productRes = await fetch(`http://localhost:5000/api/products/${id}`);
        const productData = await productRes.json();
        setProduct(productData.product);

        const vendorRes = await fetch(`http://localhost:5000/api/vendor/${productData.product.vendorId}`);
        const vendorData = await vendorRes.json();
        setVendor(vendorData.vendor);

      } catch (err) {
        console.error("Error fetching product or vendor:", err);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.quantity <= 0) {
      alert("Quantity cannot be zero or negative. Please enter a valid quantity.");
      return;
    }

    if (formData.quantity > product.quantity) {
      alert(`The quantity you entered exceeds the available stock (${product.quantity}). Please reduce the quantity.`);
      return;
    }

    if (!formData.pickupDate) {
      alert("Please select a pickup date.");
      return;
    }

    if (!formData.pickupTime) {
      alert("Please select a pickup time.");
      return;
    }

    if (!customerId) {
      alert('Please login to place an order.');
      navigate('/login');
      return;
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

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // Display success toast in the middle of the screen
        const id = toast.success(
          <div className="flex justify-between items-center">
            <div className="flex-grow">Order placed successfully!</div>
            <button
              onClick={() => {
                toast.dismiss(id);  // Dismiss the toast when clicked
                navigate('/order/history'); // Navigate immediately after clicking OK
              }}
              className="ml-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              OK
            </button>
          </div>,
          {
            position: "top-center",  // Position in the middle (top-center)
            autoClose: false,        // Prevent auto-close
            hideProgressBar: true,   // Hide the progress bar
            closeOnClick: false,     // Disable closing the toast by clicking anywhere
            closeButton: false,      // Hide the close (X) button
            style: {
              marginTop: '100px',    // Adjust to position the toast slightly down
              padding: '20px',       // Padding for the toast to make room for the button
              position: 'relative',  // Ensure the button is positioned relative to the toast
            }
          }
        );
        setToastId(id); // Store the toast ID to dismiss it later

        // Start countdown to navigate to the order history page
        const interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          toast.dismiss(id); // Dismiss the toast
          navigate('/order/history'); // Redirect to order history page after countdown
        }, 5000); // 5 seconds countdown
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
