import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import notification from '../../utils/notification.js';

const backendBaseUrl = (import.meta.env.VITE_NODE_ENV = 'development'
  ? `http://127.0.0.1:3000`
  : `${import.meta.env.VITE_BACKEND_SERVER_URL}/#`);

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/users/signup`, credentials);
    notification.notifyUserEmailSenTSuccess(response.data.user.email);
    return response.data;
  } catch (error) {
    notification.notifyUserEmailSenTFailure();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const verify = createAsyncThunk('auth/verify', async (verificationToken, thunkAPI) => {
  try {
    const response = await axios.get(`${backendBaseUrl}/users/verify/${verificationToken}`);
    notification.notifyUserEmailVerifiedSuccess();
    return response.data;
  } catch (error) {
    notification.notifyUserEmailVerifiedFailure();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/users/login`, credentials);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    notification.notifyLoginFailure();
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post(`${backendBaseUrl}/users/logout`);
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  // Reading the token from the state via getState()
  const state = thunkAPI.getState();
  const persistedToken = state?.auth?.token;

  if (persistedToken === null) {
    // If there is no token, exit without performing any request
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    // If there is a token, add it to the HTTP header and perform the request
    setAuthHeader(persistedToken);
    const response = await axios.get('/users/current');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
