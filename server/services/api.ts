import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const products = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  search: async (query: string) => {
    const response = await api.get(`/products?search=${encodeURIComponent(query)}`);
    return response.data;
  },
};

export const orders = {
  getUserOrders: async () => {
    const response = await api.get('/orders/user');
    return response.data;
  },
  getVendorOrders: async () => {
    const response = await api.get('/orders/vendor');
    return response.data;
  },
  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export const imageSearch = {
  search: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post('/search/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};


export const vendors = {
  // Fetch vendor details by vendorId
  getById: async (vendorId: string) => {
    const response = await api.get(`/vendors/${vendorId}`);
    return response.data;
  },

  // Create a new vendor
  create: async (vendorData: any) => {
    const response = await api.post('/vendors', vendorData);
    return response.data;
  },

  // Update vendor details
  update: async (vendorId: string, vendorData: any) => {
    const response = await api.put(`/vendors/${vendorId}`, vendorData);
    return response.data;
  },

  // Delete a vendor
  delete: async (vendorId: string) => {
    const response = await api.delete(`/vendors/${vendorId}`);
    return response.data;
  },
};


// export const customers = {
//   // Fetch customer details by customerId
//   getById: async (customerId: string) => {
//     const response = await api.get(`/customers/${customerId}`);
//     return response.data;
//   },

//   // Create a new customer
//   create: async (customerData: any) => {
//     const response = await api.post('/customers', customerData);
//     return response.data;
//   },

//   // Update customer details
//   update: async (customerId: string, customerData: any) => {
//     const response = await api.put(`/customers/${customerId}`, customerData);
//     return response.data;
//   },

//   // Delete a customer
//   delete: async (customerId: string) => {
//     const response = await api.delete(`/customers/${customerId}`);
//     return response.data;
//   },
// };