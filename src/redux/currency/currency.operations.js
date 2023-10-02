// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'http://api.nbp.pl/api/exchangerates/rates/';

// export const fetchCurrency = createAsyncThunk(
//   'currency/fetchCurrency',
//   async (date = 'latest', thunkAPI) => {
//     console.log(date);
//     console.log(axios.get(`c/usd/2016-04-04/?format=json`));
//     try {
//       const response = await axios.get(
//         `c/usd/2016-04-04/?format=json`,
//         );
//         // `https://api.nbp.pl/api/exchangerates/rates/c/${currency}/last/?format=json`,
      
//       console.log(response);
//       return response.data.rates;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

// export const fetchCurrency = createAsyncThunk('currency/fetchCurrency', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get(
//       'http://cors-anywhere.herokuapp.com/http://data.fixer.io/api/latest?access_key=12fecd94aef9d3d2e590b4453771d08f&symbols=EUR,USD,PLN',
//     );
//     return response.data.rates;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
