export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsModalLogoutOpen = state => state.auth.isModalLogoutOpen;

export const selectUserFirstName = state => state.auth.user.firstName;
export const selectUserEmail = state => state.auth.user.email;

//TODO
export const selectTransactions = state => state.transactions;
export const selectIsLoading = state => state.transactions.isLoading;
export const selectError = state => state.transactions.error;

export const selectFilter = state => state.filter;
