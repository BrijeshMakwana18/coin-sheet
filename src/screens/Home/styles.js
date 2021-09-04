import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: perfectSize(23),
    backgroundColor: colors.backgroundColor,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(10),

    // backgroundColor: 'green',
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
  dashboardContainer: {
    height: '17%',
    width: '100%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: perfectSize(20),
    backgroundColor: colors.primaryCardBackgroundColor,
    // alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    padding: perfectSize(20),
  },
  dashboardHeader: {
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
  },
  incomeContainer: {
    height: '100%',
    width: '45%',
    borderRadius: perfectSize(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  expenseContainer: {
    height: '100%',
    width: '45%',
    borderRadius: perfectSize(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  arrowContainer: {
    height: perfectSize(50),
    width: perfectSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,237,153,0.2)',
    borderRadius: perfectSize(10),
  },
  arrow: {
    height: perfectSize(25),
    width: perfectSize(25),
    resizeMode: 'contain',
    tintColor: 'rgb(128,237,153)',
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
});
