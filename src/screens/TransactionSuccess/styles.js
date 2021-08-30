import {StyleSheet} from 'react-native';
import {colors, fonts, height, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.backgroundColor,
  },
  successImage: {
    height: '30%',
    width: '90%',
    marginTop: '30%',
  },
  successMessage: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(20),
    textAlign: 'center',
    fontFamily: fonts.avenirHeavy,
    marginTop: '10%',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  detailsContainer: {
    width: '90%',
    padding: '10%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'green',
  },
  labelHeader: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(14),
    fontFamily: fonts.quicksandBold,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  labelTitle: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(25),
    fontFamily: fonts.quicksandBold,
    marginTop: '4%',
    fontWeight: 'bold',
  },
});
