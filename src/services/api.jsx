import axios from 'axios';
import {store} from '../store/store';
import {handleApiError, handleAuthError } from '../store/userActions';
import { useUserContext } from '../contexts/user.context';
import { CloudCog } from 'lucide-react';
import { Outlet } from 'react-router-dom';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useInterceptors(){
  const {refreshToken, logout} = useUserContext();
  console.log("USING INTERCEPRTORS");
  api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log("EXTRACTEDCTOKEN:", token);
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

export function RegisterInterceptors ({children}) {
  useInterceptors();
  return <Outlet/>
}

export default api;