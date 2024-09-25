import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, clearUser, setLoading, setError } from './userSlice';
import api, { register, login, logout as apiLogout } from '../services/api';


// Action creator for handling API errors
const handleApiError = (error) => (dispatch) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        dispatch(setError('Bad Request: ' + error.response.data.error));
        break;
      case 401:
        dispatch(handleAuthError(error.response.data));
        break;
      case 403:
        dispatch(setError('Forbidden: ' + error.response.data.error));
        break;
      case 404:
        dispatch(setError('Not Found: ' + error.response.data.error));
        break;
      case 409:
        dispatch(setError('Conflict: ' + error.response.data.error));
        break;
      case 422:
        dispatch(setError('Validation Error: ' + error.response.data.error));
        break;
      case 429:
        dispatch(setError('Too Many Requests: Please try again later'));
        break;
      case 500:
        dispatch(setError('Server Error: Please try again later'));
        break;
      default:
        dispatch(setError('An unexpected error occurred'));
    }
  } else if (error.request) {
    dispatch(setError('No response received from server'));
  } else {
    dispatch(setError('Error: ' + error.message));
  }
};

// Action creator for handling authentication errors
const handleAuthError = (errorData) => (dispatch) => {
  if (errorData.error === 'Token expired') {
    dispatch(refreshToken());
  } else {
    dispatch(setError('Authentication failed: ' + errorData.error));
    dispatch(logoutUser());
  }
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { dispatch }) => {
    try {
      const response = await register(userData);
      dispatch(setUser(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);


export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch }) => {
    try {
      const response = await login(credentials);
      dispatch(setUser(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    apiLogout();
    dispatch(clearUser());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { dispatch }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      const response = await apiRefreshToken(refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(logoutUser());
      throw error;
    }
  }
);

export { handleApiError, handleAuthError };