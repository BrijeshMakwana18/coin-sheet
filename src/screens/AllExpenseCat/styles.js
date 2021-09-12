import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(56),
    padding: perfectSize(20),
    backgroundColor: colors.backgroundColor,
  },
  transactionPeriodTitle: {
    marginTop: '5%',
    color: colors.primaryLightColor,
    opacity: 0.5,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(15),
  },
  catListContainer: {
    width: '100%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: perfectSize(20),
    justifyContent: 'center',
    paddingBottom: perfectSize(20),
  },
  catContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(15),
    padding: '5%',
    backgroundColor: colors.secondaryCardBackgroundColor,
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
  catDetailsContainer: {
    marginLeft: '5%',
  },
  catTitle: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
  },
  numberOfTransactions: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(15),
    fontFamily: fonts.quicksandBold,
    opacity: 0.7,
    marginTop: '6%',
  },
  totalAmmount: {
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    right: '4%',
    position: 'absolute',
  },
});
