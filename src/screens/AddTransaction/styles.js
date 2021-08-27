import {StyleSheet} from 'react-native';
import {colors, fonts, height, perfectSize, width} from '../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(56),
    padding: perfectSize(23),
    backgroundColor: colors.backgroundColor,
  },
  cardContainer: {
    height: height / 5,
    width: (width * 85) / 100,
    alignSelf: 'center',
    borderRadius: perfectSize(10),
    marginTop: '10%',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
    },
    elevation: 24,
  },
  listContentContainer: {
    flex: 1,
  },
});
