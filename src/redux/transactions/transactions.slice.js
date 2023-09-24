import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from './transactions.operations.js';

const initState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initState,

  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(addTransaction.pending, handlePending)
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(editTransaction.pending, handlePending)
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(editTransaction.rejected, handleRejected)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = action.payload;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.transactions.findIndex(
          transaction => transaction.id === action.payload.id,
        );
        state.transactions.splice(index, 1);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.transactions.findIndex(
          transaction => transaction.id === action.payload.id,
        );
        state.transactions[index] = action.payload;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
