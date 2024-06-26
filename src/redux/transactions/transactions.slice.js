import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  addTransaction,
  deleteTransactionById,
  updateTransactionById,
  fetchTransactionsByCategory,
  fetchTransactionsByYearAndMonth,
} from './transactions.operations.js';

const initState = {
  transactions: [],
  transactionsFilteredByCategory: [],
  transactionsFilteredByYearAndMonth: [],
  categories: [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Entertainment',
    'Other expenses',
  ],
  selectedFilterCategory: 'All',
  selectedId: '',
  selectedFilterYear: new Date().getFullYear(),
  selectedFilterMonth: new Date().toLocaleString('en-us', { month: 'long' }),
  incomesSum: 0,
  expansesSum: 0,
  balance: 0,
  userCurrency: '₴',
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
  reducers: {
    updateSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    updateSelectedCategory: (state, action) => {
      state.selectedFilterCategory = state.payload;
    },
    updateIncomesSum: (state, action) => {
      state.incomesSum = action.payload;
    },
    updateExpensesSum: (state, action) => {
      state.expansesSum = action.payload;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, handlePending)
      .addCase(addTransaction.pending, handlePending)
      .addCase(deleteTransactionById.pending, handlePending)
      .addCase(updateTransactionById.pending, handlePending)
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransactionById.rejected, handleRejected)
      .addCase(updateTransactionById.rejected, handleRejected)
      .addCase(fetchTransactionsByCategory.rejected, handleRejected)
      .addCase(fetchTransactionsByYearAndMonth.rejected, handleRejected)
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = action.payload.transactions;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions.push(action.payload.transaction);
      })
      .addCase(deleteTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const filteredTransactions = [...state.transactions].filter(
          transaction => transaction._id !== action.payload.transaction.id,
        );
        state.transactions = filteredTransactions;
      })
      .addCase(updateTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedTransactions = state.transactions.map(transaction =>
          transaction._id === action.payload.transaction._id
            ? action.payload.transaction
            : transaction,
        );
        state.transactions = updatedTransactions;
      })
      .addCase(fetchTransactionsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactionsFilteredByCategory = action.payload.transactions;
      })
      .addCase(fetchTransactionsByYearAndMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactionsFilteredByYearAndMonth = action.payload.transactions;
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const {
  updateSelectedId,
  updateSelectedCategory,
  updateIncomesSum,
  updateExpensesSum,
  updateBalance,
} = transactionsSlice.actions;
