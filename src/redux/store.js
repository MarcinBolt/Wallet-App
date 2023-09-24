import { configureStore, createSelector } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { transactionsReducer, selectUserBalanceAfter } from './transactions/transactions.slice.js';
// import { filterReducer } from './filterSlice.js';
// import { authReducer } from './auth/authSlice.js';
import { authReducer, selectUserBalance } from './auth/auth.slice.js';
// import { modalReducer } from './modal/modalSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    // filter: filterReducer,
    // modal: modalReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const selectBalance = createSelector(
  [selectUserBalance, selectUserBalanceAfter],
  (balance, balanceAfter) => {
    return balanceAfter || balance;
  }
);