import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, logIn, logOut, refreshUser, register, verify } from './auth.operations.js';

const initialState = {
  user: { firstName: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  error: null,
};

const handleFulfilledRegister = (state, action) => {
  state.user = action.payload.user;
};
const handleFulfilledVerify = (state, action) => {
  state.user = action.payload.user;
  state.user.isVerified = true;
};
const handleFulfilledLogIn = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModalLogout: (state, action) => {
      state.isModalLogoutOpen = true;
    },
    closeModalLogout: (state, action) => {
      state.isModalLogoutOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, handleFulfilledRegister)
      .addCase(verify.fulfilled, handleFulfilledVerify)
      .addCase(logIn.fulfilled, handleFulfilledLogIn)
      .addCase(logOut.fulfilled, state => {
        state.user = { firstName: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isModalLogoutOpen = false;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.user = { firstName: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isModalLogoutOpen = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action)  => {
        state.isRefreshing = false;
        state.error = action.message;
      })
      .addCase(register.rejected, (state, action)  => {
        state.error = action.message;
      })
      .addCase(logIn.rejected, (state, action)  => {
        state.error =  action.message;
      })
      .addCase(logOut.rejected, (state, action)  => {
        state.error =  action.message;
      })
      .addCase(deleteUser.rejected, (state, action)  => {
        state.error =  action.message;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { openModalLogout, closeModalLogout } = authSlice.actions;
