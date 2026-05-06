import axios from 'axios';

const API_BASE = 'https://api.freeapi.app/api/v1/users';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Register a new user
 */
export const registerUser = async ({ email, password, username, role = 'USER' }) => {
  const res = await api.post('/register', { email, password, username, role });
  return res.data;
};

/**
 * Login an existing user
 */
export const loginUser = async ({ username, password }) => {
  const res = await api.post('/login', { username, password });
  // Store tokens from response
  const { accessToken, refreshToken } = res.data?.data || {};
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  return res.data;
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  const res = await api.post('/logout');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return res.data;
};

/**
 * Get the currently logged-in user
 */
export const getCurrentUser = async () => {
  const res = await api.get('/current-user');
  return res.data;
};
