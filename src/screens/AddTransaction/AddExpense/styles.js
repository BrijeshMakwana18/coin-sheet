import {StyleSheet} from 'react-native';
import {colors, fonts, perfectSize, width} from '../../../theme';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: perfectSize(56),
    padding: perfectSize(20),
    backgroundColor: colors.backgroundColor,
  },
  textInput: {
    padding: perfectSize(20),
    height: '100%',
    width: '100%',
    backgroundColor: colors.inputBackgroundColor,
    borderRadius: perfectSize(12),
    fontSize: perfectSize(23),
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowContainer: {
    height: perfectSize(25),
    width: perfectSize(25),
  },
  backArrow: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.primaryLightColor,
    opacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: perfectSize(10),
  },
  headerTitle: {
    color: colors.headerTitleColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(35),
  },
  headerImage: {
    height: perfectSize(170),
    width: perfectSize(200),
    top: perfectSize(-40),
    position: 'absolute',
    right: perfectSize(-20),
  },
  dateLabel: {
    textAlign: 'center',
    marginTop: '5%',
    color: colors.primaryLightColor,
    opacity: 0.5,
    fontFamily: fonts.quicksandBold,
    textDecorationLine: 'underline',
    fontSize: perfectSize(18),
  },
  ammountInputContainer: {
    width: '100%',
    height: perfectSize(80),
    alignSelf: 'center',
  },
  payeeInputContainer: {
    width: '100%',
    height: perfectSize(80),
    marginTop: perfectSize(20),
    alignSelf: 'center',
  },
  notesInputContainer: {
    width: '100%',
    marginTop: perfectSize(20),
    alignSelf: 'center',
  },
  selectCatLabel: {
    textAlign: 'center',
    marginTop: '5%',
    color: 'rgba(255,255,255,0.5)',
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
  },
  catListContainer: {
    marginLeft: perfectSize(-23),
    // marginTop: '5%',
    width: width,
    // backgroundColor: 'green',
  },
  catContentContainer: {
    padding: perfectSize(23),
  },
  //Category list styles
  catContainer: {
    height: perfectSize(200),
    width: perfectSize(150),
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: perfectSize(20),
  },
  catImageContainer: {
    marginTop: '10%',
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catImage: {
    marginTop: '10%',
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    // tintColor: colors.primaryLightColor,
  },
  catTitle: {
    marginTop: '20%',
    fontSize: perfectSize(18),
    fontFamily: fonts.quicksandBold,
  },
  //Date picker modal styles
  modal: {
    flex: 1,
    alignItems: 'center',
  },
  modalViewContainer: {
    flex: 1,
    backgroundColor: colors.modalBackgroundColor,
    alignItems: 'center',
  },
  datePickerContainer: {
    height: perfectSize(450),
    width: '85%',
    borderRadius: perfectSize(25),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: perfectSize(225),
  },
  datePickerHeaderContainer: {
    width: '80%',
    height: perfectSize(60),
    backgroundColor: colors.primaryLightColor,
    borderRadius: perfectSize(50),
    position: 'absolute',
    top: perfectSize(-30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerHeaderLabel: {
    textAlign: 'center',
    color: colors.primary,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
  },
  //Calendar picker styles
  disabledDatesTextStyle: {
    color: colors.backgroundColor,
    opacity: 0.4,
    fontSize: perfectSize(15),
  },
  selectedDayStyle: {
    backgroundColor: colors.primaryLightColor,
    height: perfectSize(30),
    width: perfectSize(30),
  },
  todayTextStyle: {},
  textStyle: {
    fontFamily: fonts.quicksandBold,
    color: colors.primaryLightColor,
    fontSize: perfectSize(13),
  },
  previousComponent: {
    height: perfectSize(20),
    width: perfectSize(20),
    resizeMode: 'contain',
    tintColor: colors.primaryTintColor,
    opacity: 0.5,
  },
  nextComponent: {
    height: perfectSize(20),
    width: perfectSize(20),
    resizeMode: 'contain',
    tintColor: colors.primaryTintColor,
    opacity: 0.5,
  },
  monthYearHeaderWrapperStyle: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  yearTitleStyle: {
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(16),
    opacity: 0.6,
  },
  monthTitleStyle: {
    color: colors.primaryLightColor,
    fontFamily: fonts.quicksandBold,
    fontSize: perfectSize(18),
    textTransform: 'uppercase',
  },
  dayLabelsWrapper: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  bottomViewContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: perfectSize(-30),
    width: '50%',
    justifyContent: 'space-between',
  },
});
