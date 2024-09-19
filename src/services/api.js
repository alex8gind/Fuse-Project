import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
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

export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error response:', error.response);
    if (error.response && error.response.status === 409) {
      throw new Error('User already exists. Please use a different email or phone number.');
    } else if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('An unexpected error occurred during registration');
    }
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw error;
  }
};

// Function to handle logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Redirect to login page
    window.location.href = '/login';
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
  return await api.post(`/api/auth/verify-email/${token}`);
};


export default api;