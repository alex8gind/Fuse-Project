import axios from 'axios';
import {store} from '../store/store';
import {handleApiError, handleAuthError } from '../store/userActions';
import { useUserContext } from '../contexts/user.context';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useInterceptors(){
  const {refreshToken, logout} = useUserContext();

  api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
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
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        console.log("DEBUG: refresh error", refreshError);
        store.dispatch(handleAuthError(refreshError.response.data));
        logout();
        return Promise.reject(refreshError);
      }
    }
    store.dispatch(handleApiError(error));
    return Promise.reject(error);
  }
  );
}
// export const register = async (userData) => {
//   try {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Full error object:', error);
//     console.error('Error response:', error.response);
//     if (error.response && error.response.status === 409) {
//       throw new Error('User already exists. Please use a different email or phone number.');
//     } else if (error.response && error.response.data && error.response.data.error) {
//       throw new Error(error.response.data.error);
//     } else {
//       throw new Error('An unexpected error occurred during registration');
//     }
//   }
// };

// export const login = async (credentials) => {
//   try {
//     // const response = await api.post('/auth/login', credentials);

//    return {}
//   } catch (error) {
//     console.error('Login error:', error.response?.data);
//     throw error;
//   }
// };

// Function to handle logout
// export const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('refreshToken');
//     // Redirect to login page
//     window.location.href = '/login';
//   };
  


// export const getUserProfile = async () => {
//   return await api.get('/users/profile');
// };

// export const updateUserProfile = async (userData) => {
//   return await api.put('/users/profile', userData);
// };

// export const changePassword = async (passwordData) => {
//   return await api.put('/users/change-password', passwordData);
// };

// export const forgotPassword = async (email) => {
//   return await api.post('/auth/forgot-password', { email });
// };

// export const resetPassword = async (token, newPassword) => {
//   return await api.post('/auth/reset-password', { token, newPassword });
// };

// export const verifyEmail = async (token) => {
//   return await api.post(`/auth/verify-email/${token}`);
// };


export default api;