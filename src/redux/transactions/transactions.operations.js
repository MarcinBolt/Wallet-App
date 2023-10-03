import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import notification from '../../utils/notification.js';

const backendBaseUrl = `${import.meta.env.VITE_BACKEND_SERVER_URL}/#`;
// const backendBaseUrl = (import.meta.env.VITE_NODE_ENV = 'development'
//   ? `http://127.0.0.1:3000`
//   : `${import.meta.env.VITE_BACKEND_SERVER_URL}/#`);

axios.defaults.baseURL = backendBaseUrl;

const fetchTransactions = createAsyncThunk('transactions/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/transactions');
    if (response.status !== 200) {
      return notification.notifyProcessFailure(response.data.message);
    }
    return response.data;
  } catch (e) {
    notification.notifyProcessFailure(e.response.data.message);
    return thunkAPI.rejectWithValue(e.message);
  }
});

const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async ({ date, year, month, type, category, comment, sum }, thunkAPI) => {
    try {
      const response = await axios.post('/transactions', {
        date,
        year,
        month,
        type,
        category,
        comment,
        sum,
      });
      if (response.status !== 201) {
        return notification.notifyProcessFailure(response.data.message);
      }
      return response.data;
    } catch (e) {
      notification.notifyProcessFailure(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

const deleteTransactionById = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const response = await axios.delete(`/transactions/${transactionId}`);
      if (response.status !== 200) {
        return notification.notifyProcessFailure(response.data.message);
      }
      return response.data;
    } catch (e) {
      notification.notifyProcessFailure(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

const updateTransactionById = createAsyncThunk(
  'transactions/editTransaction',
  async ({ id, date, year, month, type, category, comment, sum }, thunkAPI) => {
    try {
      const response = await axios.patch(`/transactions/${id}`, {
        date,
        year,
        month,
        type,
        category,
        comment,
        sum,
      });
      if (response.status !== 200) {
        return notification.notifyProcessFailure(response.data.message);
      }
      return response.data;
    } catch (e) {
      notification.notifyProcessFailure(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

const fetchTransactionsByCategory = createAsyncThunk(
  'transactions/fetchByCategory',
  async ({ category }, thunkAPI) => {
    try {
      const response = await axios.get(`/transactions/category/${category}`);
      if (response.status !== 200) {
        return notification.notifyProcessFailure(response.data.message);
      }
      return response.data;
    } catch (e) {
      notification.notifyProcessFailure(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

const fetchTransactionsByYearAndMonth = createAsyncThunk(
  'transactions/fetchByYearAndMonth',
  async ({ year, month }, thunkAPI) => {
    try {
      const response = await axios.get(`/transactions/statistics/${year}/${month}`);
      if (response.status !== 200) {
        return notification.notifyProcessFailure(response.data.message);
      }
      return response.data;
    } catch (e) {
      notification.notifyProcessFailure(e.response.data.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export {
  fetchTransactions,
  addTransaction,
  deleteTransactionById,
  updateTransactionById,
  fetchTransactionsByCategory,
  fetchTransactionsByYearAndMonth
};