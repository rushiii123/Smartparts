import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate hook

import { Edit, Trash2, Search, Plus } from 'lucide-react'; // Icon imports
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function OrderHistoryPage() {

  const navigate = useNavigate();  // Using useNavigate for redirection

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.userId;
  const role = decoded?.role;

  // Fetch orders history based on the role
  useEffect(() => {
    if (!token) {
      alert('Please log in to view your order history.');
      navigate('/login');  // Redirect to login if no token
    } else {
      async function fetchOrderHistory() {
        try {
          let url = `http://localhost:5000/api/orders/history/customer/${userId}`;

          if (role === 'vendor') {
            url = `http://localhost:5000/api/orders/history/vendor/${userId}`;
          }

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const res = await axios.get(url, config); // Send token in the request header
          setOrders(res.data); // Assuming res.data contains the orders array
        } catch (err) {
          if (err.response && err.response.status === 401) {
            alert('Session expired. Please log in again.');
            navigate('/login'); // Redirect to login on 401 error
          }
          console.error('Failed to fetch orders', err);
        }
      }

      fetchOrderHistory();
    }
  }, [userId, role, token, navigate]);


  // Filter orders based on search term (Order ID) and selected status
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id.toString().includes(searchTerm.toLowerCase()); // Search by Order ID (_id)

    const matchesStatus =
      selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      };

      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        config
      );

      if (res.status === 200) {
        // Update the local state with the new status
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating status', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
            <p className="text-gray-600">View the status and details of your past orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders by Order ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              {role === 'vendor' && <option value="accepted">Accepted</option>} {/* Added Accepted for vendor */}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
                {role === 'vendor' && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td> {/* Display Order ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={order.productId.image} // Assuming `image` is the field that contains the image URL
                          alt={order.productId.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.productId.name}</div>  {/* Product Name */}
                          <div className="text-sm text-gray-500">{order.productId.category}</div>  {/* Product Category */}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">{order.productId.partNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">Rs. {Number(order.productId.price).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.pickupDate).toLocaleDateString()}</td>
                    {role === 'vendor' && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-green-600 hover:text-green-900 mr-3"
                          onClick={() => handleStatusChange(order._id, 'Completed')}
                        >
                          Deliver
                        </button>
                        <button
                          className="text-yellow-600 hover:text-yellow-900"
                          onClick={() => handleStatusChange(order._id, 'Accepted')}
                        >
                          Accept
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
