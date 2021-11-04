const strings = {
  launchScreen: {
    title: "Hola,\nI'm CoinSheet",
    subTitle: 'Track your money\nto achieve your financial',
    loginTitle: 'I ALREADY HAVE AN ACCOUNT',
    signupTitle: 'HI, COINSHEET!',
  },
  signupScreen: {
    title: 'Join\nCoinSheet',
    buttonTitle: 'SIGNUP',
  },
  loginScreen: {
    title: 'Welcome\nBack',
    buttonTitle: 'LOGIN',
  },
  tabBarLabels: {
    home: 'Dashboard',
    stat: 'Statistics',
    goal: 'Goal',
    account: 'Account',
  },
  addTransaction: {},
  addIncome: {
    headerTitle: 'Add Income',
    ammountPlaceholder: 'Amount',
    notesPlaceholder: 'Notes ...',
    buttonTitle: 'CONTINUE',
  },
  addExpense: {
    headerTitle: 'Add New \nExpense',
    ammountPlaceholder: 'Amount',
    payeePlaceholder: 'Payee',
    notesPlaceholder: 'Notes ...',
    selectCat: 'SELECT CATEGORY',
    buttonTitle: 'CONTINUE',
  },
  transactionSuccess: {
    successMessage: 'Your transaction is successfully \nadded to your account',
    transactionType: 'Transaction type',
    category: 'Category',
    date: 'Date',
    amountHeader: 'Amount',
    buttonTitle: 'CONTINUE',
    incomeHeader: 'Income',
    expenseHeader: 'Expense',
  },
  home: {
    headerTitle: 'Hey, ',
    myBalanceTitle: 'My balance',
    dashboardIncomeTitle: 'Income',
    dashboardExpenseTitle: 'Expense',
    topCatHeader: 'Top categories',
    seeAll: 'See all',
    recentTransactionsHeader: 'Recent transactions',
    filterOne: 'Overall',
    filterTwo: 'This month',
    filterThree: 'Custom',
    seeAllTransactions: 'See all transactions',
    selectDateError: 'Please select date range',
    overallEmptyDashboardTitle:
      'Oh! Looks like you do not have any transaction.',
    monthlyEmptyDashboardTitle:
      'Oh! Looks like you do not have any transaction in current month.',
    customEmptyDashboardTitle:
      'Oh! Looks like you do not have any transaction during selected time period.',
  },
  allExpenseCat: {
    headerTitle: 'All\nCategories',
    transactions: 'Transactions',
    transaction: 'Transaction',
    overallExpense: 'You are viewing overall transaction categories',
    monthlyExpense: 'You are viewing current month transaction categories',
    customExpense: 'You are viewing transaction categories for time period',
  },
  allTransactions: {
    headerTitle: 'All\nTransactions',
    transactions: 'Transactions',
    transaction: 'Transaction',
    overallExpense: 'You are viewing overall transactions',
    monthlyExpense: 'You are viewing current month transactions',
    customExpense: 'You are viewing transactions for time period',
    filterOne: 'Debit',
    filterTwo: 'Credit',
    emptyDebitList: 'Oh! Looks like you do not have any debit transaction.',
    emptyCreditList: 'Oh! Looks like you do not have any credit transaction.',
  },
};

export default strings;
