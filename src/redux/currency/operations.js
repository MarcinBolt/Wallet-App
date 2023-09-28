import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'http://api.exchangerate.host/live?access_key=45fc1490434b417a0ef3271607020393&currencies=EUR,PLN',
    );
    return response.data.quotes;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
