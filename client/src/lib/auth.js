import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Register a user (either customer or vendor)
export const registerUser = async ({ email, password, fullName, role, address, storeName, contact }) => {
  try {
    // Prepare the data to send based on the role
    const userData = {
      email,
      password,
      fullName,
      role,
      address,
    };

    // Add vendor-specific fields if the role is 'vendor'
    if (role === 'vendor') {
      userData.storeName = storeName;
      userData.contact = contact;
    }

    // Send POST request to backend API with the user data
    const { data } = await axios.post(`${API_URL}/register`, userData);

    return data; // Return the response from the backend
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error during registration');
  }
};

// Login user function
export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    return data; // Return the response containing the user and token
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error during login');
  }
};
