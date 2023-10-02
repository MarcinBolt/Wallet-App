export const selectUserFirstName = state => state.auth.user.firstName;
export const selectUserEmail = state => state.auth.user.email;
export const selectUserToken = state => state.auth.user.token;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectAuthError = state => state.auth.error;

export const selectTransactions = state => state.transactions.transactions;
export const selectTransactionsFilteredByCategory = state => state.transactions.transactionsFilteredByCategory;
export const selectTransactionsFilteredByYearAndMonth = state => state.transactions.transactionsFilteredByYearAndMonth;
export const selectTransactionsCategories = state => state.transactions.categories;
export const selectTransactionsFilterCategory = state => state.transactions.selectedFilterCategory;
export const selectTransactionId = state => state.transactions.selectedId;
export const selectTransactionFilterYear = state => state.transactions.selectedFilterYear;
export const selectTransactionFilterMonth = state => state.transactions.selectedFilterMonth;
export const selectTransactionsIncomesSum = state => state.transactions.incomesSum;
export const selectTransactionsExpanseSum = state => state.transactions.expansesSum;
export const selectTransactionsBalance = state => state.transactions.balance;
export const selectTransactionsIsLoading = state => state.transactions.isLoading;
export const selectTransactionsError = state => state.transactions.error;
export const selectIncomesSum = state => state.incomesSum;
export const selectExpensesSum = state => state.expansesSum;
export const selectBalance = state => state.balance

export const selectGlobalIsLoading = state => state.global.isLoading;
export const selectGlobalIsModalLogoutOpen = state => state.global.isModalLogoutOpen;
export const selectGlobalIsModalAddTransactionOpen = state => state.global.isModalAddTransactionOpen;
export const selectGlobalIsModalEditTransactionOpen = state => state.global.isModalEditTransactionOpen;
export const selectGlobalIsListCategoriesOpen = state => state.global.isListCategoriesOpen;
export const selectGlobalIsListYearsOpen = state => state.global.isListYearsOpen;
export const selectGlobalIsListMonthsOpen = state => state.global.isListMonthsOpen;
export const selectGlobalIsUserPanelOpen = state => state.global.isUserPanelOpen;
