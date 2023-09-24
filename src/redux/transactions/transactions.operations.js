import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendBaseUrl = (import.meta.env.VITE_NODE_ENV = 'development'
  ? `http://127.0.0.1:3000`
  : `${import.meta.env.VITE_BACKEND_SERVER_URL}/#`);


export const fetchTransactions = createAsyncThunk('transactions/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/transactions');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async ({ category, sum }, thunkAPI) => {
    try {
      const response = await axios.post('/transactions', { category, sum });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const response = await axios.delete(`/transactions/${transactionId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async ({ id, category, sum }, thunkAPI) => {
    try {
      const response = await axios.patch(`/transactions/${id}`, { category, sum });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
