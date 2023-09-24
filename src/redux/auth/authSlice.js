import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, register } from './operations.js';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  error: null,
};

const handleFulfilledRegisterAndLogIn = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, handleFulfilledRegisterAndLogIn)
      .addCase(logIn.fulfilled, handleFulfilledRegisterAndLogIn)
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.error = action.message;
      })
      .addCase(register.rejected, state => {
        state.error = action.message;
      })
      .addCase(logIn.rejected, state => {
        state.error =  action.message;
      })
      .addCase(logOut.rejected, state => {
        state.error =  action.message;
      });
  },
});

export const authReducer = authSlice.reducer;
