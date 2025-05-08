import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <h1 className="text-xl font-bold">Customer Dashboard</h1>
        <button onClick={handleLogout} className="bg-white text-blue-500 px-4 py-2 rounded">Logout</button>
      </div>

      <div className="flex">
        <div className="w-64 bg-gray-100 min-h-screen p-4">
          <div className="mb-2 cursor-pointer" onClick={() => navigate('/profile')}>Profile</div>
          <div className="mb-2 cursor-pointer" onClick={() => navigate('/orders')}>Orders</div>
          <div className="mb-2 cursor-pointer" onClick={() => navigate('/settings')}>Settings</div>
        </div>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome back, [User Name]!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Here’s a summary of your activity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl mb-2">Total Orders</h3>
              <p className="text-lg font-bold">10</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl mb-2">Pending Orders</h3>
              <p className="text-lg font-bold">2</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl mb-2">Total Spend</h3>
              <p className="text-lg font-bold">$500</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
