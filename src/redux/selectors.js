export const selectUserFirstName = state => state.auth.user.firstName;
export const selectUserEmail = state => state.auth.user.email;
export const selectUserToken = state => state.auth.user.token;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectAuthError = state => state.auth.error;

export const selectCurrency = state => state.currency.currencies;

export const selectTransactions = state => state.transactions.transactions;
export const selectTransactionsFilteredByCategory = state =>
  state.transactions.transactionsFilteredByCategory;
export const selectTransactionsFilteredByYearAndMonth = state =>
  state.transactions.transactionsFilteredByYearAndMonth;
export const selectTransactionsCategories = state => state.transactions.categories;
export const selectTransactionsCategory = state => state.transactions.category;
export const selectTransactionsYear = state => state.transactions.year;
export const selectTransactionsMonth = state => state.transactions.month;
export const selectTransactionsSelectedTransactionCategory = state =>
  state.transactions.selectedTransactionCategory;
export const selectTransactionsSelectedTransactionId = state =>
  state.transactions.selectedTransactionId;
export const selectTransactionsIncomesSum = state => state.transactions.incomesSum;
export const selectTransactionsExpanseSum = state => state.transactions.expansesSum;
export const selectTransactionsBalance = state => state.transactions.balance;
export const selectTransactionsIsLoading = state => state.transactions.isLoading;
export const selectTransactionsError = state => state.transactions.error;

export const selectGlobalIsLoading = state => state.global.isLoading;
export const selectGlobalIsModalLogoutOpen = state => state.global.isModalLogoutOpen;
export const selectGlobalIsModalAddTransactionOpen = state =>
  state.global.isModalAddTransactionOpen;
export const selectGlobalIsModalEditTransactionOpen = state =>
  state.global.isModalEditTransactionOpen;
export const selectGlobalIsListCategoriesOpen = state => state.global.isListCategoriesOpen;
export const selectGlobalIsListYearsOpen = state => state.global.isListYearsOpen;
export const selectGlobalIsListMonthsOpen = state => state.global.isListMonthsOpen;
export const selectGlobalIsUserPanelOpen = state => state.global.isUserPanelOpen;
