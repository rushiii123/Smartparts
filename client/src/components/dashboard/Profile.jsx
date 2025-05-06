import React, { useState } from 'react';

const Profile = () => {
  // Assume userType is passed as a prop or is determined via context
  const [userType, setUserType] = useState('customer'); // 'customer' or 'vendor'

  // Sample customer and vendor data
  const customerData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
    preferences: ['Electric Cars', 'Engine Parts']
  };

  const vendorData = {
    name: 'ABC Auto Parts',
    email: 'contact@abcautoparts.com',
    storeName: 'ABC Auto Parts Store',
    location: '456 Auto Blvd, Anytown, USA',
    contactNumber: '987-654-3210',
    products: ['Brake Pads', 'Air Filters', 'Headlights']
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">{userType === 'customer' ? 'Customer Profile' : 'Vendor Profile'}</h1>

      {/* Customer profile */}
      {userType === 'customer' ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Name: {customerData.name}</h2>
          <p>Email: {customerData.email}</p>
          <p>Address: {customerData.address}</p>
          <p>Phone: {customerData.phone}</p>
          <h3 className="mt-4 text-lg">Preferences:</h3>
          <ul className="list-disc pl-6">
            {customerData.preferences.map((pref, index) => (
              <li key={index}>{pref}</li>
            ))}
          </ul>
        </div>
      ) : (
        // Vendor profile
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl mb-2">Store Name: {vendorData.storeName}</h2>
          <p>Email: {vendorData.email}</p>
          <p>Store Location: {vendorData.location}</p>
          <p>Contact Number: {vendorData.contactNumber}</p>
          <h3 className="mt-4 text-lg">Products Offered:</h3>
          <ul className="list-disc pl-6">
            {vendorData.products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Toggle between customer and vendor profiles */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setUserType(userType === 'customer' ? 'vendor' : 'customer')}
        >
          Switch to {userType === 'customer' ? 'Vendor' : 'Customer'} Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
