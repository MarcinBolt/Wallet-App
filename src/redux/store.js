import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { transactionsReducer } from './transactions/transactions.slice.js';
import { authReducer } from './auth/auth.slice.js';
import { globalReducer } from './global/global.slice.js';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const userPersistConfig = {
  key: 'user',
  storage,
  email: ['email'],
  // firstName: ['firstName'],
};

// const userTransactionsPersistConfig = {
//   key: 'transactions',
//   storage,
//   transactions: 'transactions',
// };

export const store = configureStore({
  reducer: {
    global: globalReducer,
    transactions: transactionsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    user: persistReducer(userPersistConfig, authReducer),
    // transactions: persistReducer(userTransactionsPersistConfig, transactionsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
