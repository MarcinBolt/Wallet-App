export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectUserName = state => state.auth.user.name;
export const selectUserEmail = state => state.auth.user.email;

//TODO
export const selectTransactions = state => state.transactions;
export const selectIsLoading = state => state.transactions.isLoading;
export const selectError = state => state.transactions.error;

export const selectFilter = state => state.filter;

export const selectCurrency = state => state.currency.currencies;
