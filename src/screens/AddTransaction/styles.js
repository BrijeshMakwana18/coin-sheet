import {StyleSheet} from 'react-native';
import {colors, fonts, height, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(56),
    backgroundColor: colors.backgroundColor,
  },
  listContentContainer: {
    flex: 1,
  },
  cardContainer: {
    alignSelf: 'center',
    borderRadius: perfectSize(10),
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
    // shadowOffset: {
    //   height: 10,
    // },
    // elevation: 24,
  },
  innerCardContainer: {
    shadowOpacity: 0.3,
    shadowRadius: 10,
    height: height / 5,
    width: (width * 85) / 100,
    alignSelf: 'center',
    borderRadius: perfectSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailsContainer: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    paddingLeft: perfectSize(20),
  },
  cardTitle: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(25),
    fontWeight: 'bold',
    fontFamily: fonts.avenirHeavy,
    textAlign: 'justify',
  },
  cardDescription: {
    color: colors.primaryLightColor,
    fontSize: perfectSize(14),
    fontFamily: fonts.quicksandRegular,
    textAlign: 'justify',
    marginTop: perfectSize(10),
  },
  cardImage: {
    height: '70%',
    width: '30%',
    alignSelf: 'center',
  },
});
