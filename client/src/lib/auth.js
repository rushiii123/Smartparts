import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (email, password, fullName, role) => {
  const { data } = await axios.post(`${API_URL}/register`, {
    email,
    password,
    fullName,
    role,
  });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  return data;
};
