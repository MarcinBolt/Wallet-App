// import { createSlice } from '@reduxjs/toolkit';
// import { fetchCurrency } from './currency.operations.js';

// const currencyInitialState = {
//   currencies: [],
//   isLoading: false,
//   error: null,
// };

// const handlePending = state => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const currencySlice = createSlice({
//   name: 'currency',
//   initialState: currencyInitialState,
//   extraReducers: {
//     [fetchCurrency.pending]: handlePending,
//     [fetchCurrency.rejected]: handleRejected,
//     [fetchCurrency.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.currencies = action.payload;
//     },
//   },
// });

// export const currencyReducer = currencySlice.reducer;
