import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'http://cors-anywhere.herokuapp.com/http://data.fixer.io/api/latest?access_key=12fecd94aef9d3d2e590b4453771d08f&symbols=EUR,USD,PLN',
    );
    return response.data.rates;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
