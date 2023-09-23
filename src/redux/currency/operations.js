import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {
  try {
    const response = await axios.get('https://api.exchangerate.host/latest');
    return response.data.rates;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
