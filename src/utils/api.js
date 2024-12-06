import axios from 'axios';

// Base URL for the Reqres API
const API_BASE_URL = 'https://reqres.in/api';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to add token to requests if authenticated
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to handle login
export const login = (email, password) => {
  return apiClient.post('/login', { email, password });
};

// Function to fetch users (with pagination)
export const fetchUsers = (page = 1) => {
  return apiClient.get(`/users?page=${page}`);
};

// Function to update a user
export const updateUser = (id, data) => {
  return apiClient.put(`/users/${id}`, data);
};

// Function to delete a user
export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

export default apiClient;
