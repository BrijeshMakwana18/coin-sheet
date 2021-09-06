import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
    paddingLeft: perfectSize(23),
  },
  headerTitleContainer: {},
  headerTitle: {
    color: colors.headerTitleColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(30),
  },
  userName: {
    color: colors.headerTitleColor,
    fontFamily: fonts.quicksandRegular,
    fontSize: perfectSize(23),
    marginTop: perfectSize(10),
    letterSpacing: perfectSize(1),
  },
  scrollContainer: {
    flex: 1,
    padding: perfectSize(23),
  },
  dashboardContainer: {
    width: '100%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: perfectSize(20),
    backgroundColor: colors.primaryCardBackgroundColor,
    justifyContent: 'center',
    padding: perfectSize(20),
  },
  dashboardHeader: {
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
  },
  dashboardInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  incomeContainer: {
    width: '48%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  expenseContainer: {
    width: '45%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  downArrowContainer: {
    height: perfectSize(50),
    width: perfectSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,237,153,0.2)',
    borderRadius: perfectSize(10),
  },
  downArrow: {
    height: perfectSize(25),
    width: perfectSize(25),
    resizeMode: 'contain',
    tintColor: 'rgb(128,237,153)',
  },
  upArrowContainer: {
    height: perfectSize(50),
    width: perfectSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(10),
    backgroundColor: 'rgba(255,179,25,0.2)',
  },
  upArrow: {
    tintColor: 'rgb(255,179,25)',
    height: perfectSize(25),
    width: perfectSize(25),
    resizeMode: 'contain',
  },
  dashboardIncomeHeaderStyle: {
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandRegular,
    fontSize: perfectSize(16),
    opacity: 0.7,
    letterSpacing: perfectSize(0.5),
  },
  dashboardExpenseHeaderStyle: {
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandRegular,
    fontSize: perfectSize(16),
    opacity: 0.7,
    letterSpacing: perfectSize(0.5),
  },
  dashboardIncomeStyle: {
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
  },
  dashboardExpenseStyle: {
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
  },
  topCatContainer: {
    marginTop: '7%',
  },
  topCatHeader: {
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
  },
  expenseCatContainer: {
    alignItems: 'center',
    backgroundColor: colors.primaryCardBackgroundColor,
  },
  //Category list styles
  catContainer: {
    height: perfectSize(200),
    width: '47.77%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(20),
  },
  catImageContainer: {
    height: perfectSize(70),
    width: perfectSize(70),
    borderRadius: perfectSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImage: {
    height: perfectSize(35),
    width: perfectSize(35),
    resizeMode: 'contain',
    tintColor: colors.primaryLightColor,
  },
  catTitle: {
    marginTop: '20%',
    fontSize: perfectSize(18),
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandBold,
  },
  catTotalExpense: {
    fontSize: perfectSize(18),
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandBold,
  },
  recentTransactionsListContainer: {
    width: '100%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: perfectSize(20),
    justifyContent: 'center',
    marginBottom: '20%',
  },
  recentTransactionsHeader: {
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
  },
  //Recent transactions style
  recentTransactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(15),
    padding: '5%',
  },
  recentTransactionsImageContainer: {
    height: perfectSize(70),
    width: perfectSize(70),
    borderRadius: perfectSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentTransactionsImage: {
    height: perfectSize(35),
    width: perfectSize(35),
    resizeMode: 'contain',
    tintColor: colors.primaryLightColor,
  },
  recentTransactionsDetailsContainer: {
    marginLeft: '5%',
  },
  recentTransactionsTitle: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
  },
  recentTransactionsDate: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(15),
    fontFamily: fonts.quicksandBold,
    opacity: 0.7,
    marginTop: '6%',
  },
  recentTransactionsAmount: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    right: '4%',
    position: 'absolute',
  },
});
