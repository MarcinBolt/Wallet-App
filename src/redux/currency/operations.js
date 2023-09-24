import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://api.exchangerate.host/latest?base=PLN&symbols=USD,EUR&places=2&source=ecb');
    return response.data.rates;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
