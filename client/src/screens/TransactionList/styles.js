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
  filterContainer: {
    width: '80%',
    marginTop: perfectSize(23),
    justifyContent: 'space-between',
    marginBottom: '5%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  filterButtonContainer: {
    height: perfectSize(40),
    width: '45%',
    // backgroundColor: colors.primaryCardBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: perfectSize(10),
  },
  filterButtonTitle: {
    fontSize: perfectSize(15),
    color: colors.primaryLightColor,
    fontFamily: fonts.avenirHeavy,
    fontWeight: 'bold',
  },
  catListContainer: {
    width: '100%',
    // marginTop: '5%',
    alignSelf: 'center',
    borderRadius: perfectSize(20),
    justifyContent: 'center',
    paddingBottom: perfectSize(20),
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: perfectSize(10),
    marginTop: perfectSize(15),
    padding: '5%',
    backgroundColor: colors.secondaryCardBackgroundColor,
  },
  transactionImageContainer: {
    height: perfectSize(70),
    width: perfectSize(70),
    borderRadius: perfectSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  transactionDetailsContainer: {
    marginLeft: '5%',
  },
  transactionNotes: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    width: '70%',
  },
  transactionDate: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(15),
    fontFamily: fonts.quicksandBold,
    opacity: 0.7,
    marginTop: '6%',
  },
  transactionAmount: {
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
    right: '4%',
    position: 'absolute',
  },
});
