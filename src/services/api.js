import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/api/auth/refresh-token', { refreshToken });
        localStorage.setItem('token', response.data.token);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, log the user out
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response;
};

// Function to handle logout
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Redirect to login page
    window.location.href = '/login';
  };
  

export const register = async (userData) => {
  return await api.post('/api/auth/register', userData);
};

export const getUserProfile = async () => {
  return await api.get('/api/users/profile');
};

export const updateUserProfile = async (userData) => {
  return await api.put('/api/users/profile', userData);
};

export const changePassword = async (passwordData) => {
  return await api.put('/api/users/change-password', passwordData);
};

export const forgotPassword = async (email) => {
  return await api.post('/api/auth/forgot-password', { email });
};

export const resetPassword = async (token, newPassword) => {
  return await api.post('/api/auth/reset-password', { token, newPassword });
};

export const verifyEmail = async (token) => {
  return await api.get(`/api/auth/verify-email/${token}`);
};

export { logout };

export default api;