import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLoading: false,
  isModalLogoutOpen: false,
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
  isListCategoriesOpen: false,
  isListYearsOpen: false,
  isListMonthsOpen: false,
  isUserPanelOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initState,
  reducers: {
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateIsModalLogoutOpen: (state, action) => {
      state.isModalLogoutOpen = action.payload;
    },
    updateIsModalAddTransactionOpen: (state, action) => {
      state.isModalAddTransactionOpen = action.payload;
    },
    updateIsModalEditTransactionOpen: (state, action) => {
      state.isModalEditTransactionOpen = action.payload;
    },
    updateIsListCategoriesOpen: (state, action) => {
      state.isListCategoriesOpen = action.payload;
    },
    updateIsListYearsOpen: (state, action) => {
      state.isListYearsOpen = action.payload;
    },
    updateIsListMonthsOpen: (state, action) => {
      state.isListMonthsOpen = action.payload;
    },
    updateIsUserPanelOpen: (state, action) => {
      state.isUserPanelOpen = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;

export const {
  updateIsLoading,
  updateIsModalLogoutOpen,
  updateIsModalAddTransactionOpen,
  updateIsModalEditTransactionOpen,
  updateIsListCategoriesOpen,
  updateIsListYearsOpen,
  updateIsListMonthsOpen,
  updateIsUserPanelOpen,
} = globalSlice.actions;
