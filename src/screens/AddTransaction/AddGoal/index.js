/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import {Button, ButtonWithImage, PrimaryHeader} from '../../../components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {images, colors, fonts, perfectSize, strings} from '../../../theme';
import CalendarPicker from 'react-native-calendar-picker';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//Categories data
const data = [
  {
    title: 'Food',
    image: images.food,
  },
  {
    title: 'Cash',
    image: images.cash,
  },
  {
    title: 'Transfer',
    image: images.transfer,
  },
  {
    title: 'Entertainment',
    image: images.entertainment,
  },
  {
    title: 'Fuel',
    image: images.fuel,
  },
  {
    title: 'Groceries',
    image: images.groceries,
  },
  {
    title: 'Investment',
    image: images.investment,
  },
  {
    title: 'Loans',
    image: images.loan,
  },
  {
    title: 'Medical',
    image: images.medical,
  },
  {
    title: 'Shopping',
    image: images.shopping,
  },
  {
    title: 'Travel',
    image: images.travel,
  },
  {
    title: 'Other',
    image: images.other,
  },
];

//Months for date picker
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

//Custom styles for date picker
const customDayHeaderStylesCallback = () => {
  return {
    textStyle: {
      color: colors.backgroundColor,
      fontSize: perfectSize(16),
      fontFamily: fonts.quicksandBold,
      opacity: 0.4,
    },
  };
};

//Custom styles for date picker
const customDatesStylesCallback = date => {
  let currentDate = new Date();
  let tempDate = new Date(date);
  let a = `${currentDate.getDate()} ${currentDate.getMonth()} ${currentDate.getFullYear()}`;
  let b = `${tempDate.getDate()} ${tempDate.getMonth()} ${tempDate.getFullYear()}`;
  if (a == b) {
    return {
      style: {
        backgroundColor: colors.backgroundColor,
        height: perfectSize(30),
        width: perfectSize(30),
      },
      textStyle: {
        color: colors.primaryLightColor,
      },
    };
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
  return {
    state: state.signupReducer,
  };
};
class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ammount: '',
      notes: '',
      selectedCat: {},
      isKeyboard: false,
      displayDate: '',
      modalDisplayDate: '',
      datePicker: false,
    };
  }

  //Animated values
  headerMarginTop = new Animated.Value(perfectSize(0));
  opacity = new Animated.Value(perfectSize(1));
  catMarginTop = new Animated.Value(perfectSize(0));
  inputWidth = new Animated.Value(perfectSize(360));
  notesInputHeight = new Animated.Value(perfectSize(0));
  ammountInputMarginTop = new Animated.Value(perfectSize(20));
  doneButtonRight = new Animated.Value(perfectSize(-100));
  datePickerMarginTop = new Animated.Value(perfectSize(950));

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );

    let today = new Date();
    let date = `${today.getDate()} ${months[
      today.getMonth()
    ].toUpperCase()}, ${today.getFullYear()}`;

    this.setState({
      displayDate: date,
      modalDisplayDate: date,
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({
      isKeyboard: true,
    });
    Animated.parallel([
      Animated.timing(this.headerMarginTop, {
        toValue: perfectSize(-250),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(600),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.inputWidth, {
        toValue: perfectSize(360),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.notesInputHeight, {
        toValue: perfectSize(300),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.ammountInputMarginTop, {
        toValue: perfectSize(Platform.OS == 'ios' ? 70 : 50),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.doneButtonRight, {
        toValue: perfectSize(20),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  keyboardDidHide = () => {
    setTimeout(() => {
      this.setState({
        isKeyboard: false,
      });
    }, 300);
    Animated.parallel([
      Animated.timing(this.headerMarginTop, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(1),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.inputWidth, {
        toValue: perfectSize(360),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.notesInputHeight, {
        toValue: perfectSize(0),
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(this.ammountInputMarginTop, {
        toValue: perfectSize(20),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.doneButtonRight, {
        toValue: perfectSize(-100),
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  renderCategories = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            selectedCat: item.title,
          });
        }}
        style={[
          styles.catContainer,
          {
            backgroundColor:
              this.state.selectedCat == item.title
                ? colors.primaryLightColor
                : colors.backgroundColor,
            marginLeft: index % 3 == 0 ? 0 : perfectSize(30),
          },
        ]}>
        <Image
          source={item.image}
          style={[
            styles.catImage,
            {
              tintColor:
                this.state.selectedCat == item.title
                  ? colors.primary
                  : colors.primaryLightColor,
            },
          ]}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.catTitle,
            {
              color:
                this.state.selectedCat == item.title
                  ? colors.primary
                  : colors.primaryLightColor,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  isActive = () => {
    const {ammount, selectedCat} = this.state;
    return ammount.trim() == '' || Object.keys(selectedCat).length == 0
      ? false
      : true;
  };

  onDateChange = date => {
    let today = new Date(date);
    let temp = `${today.getDate()} ${months[
      today.getMonth()
    ].toUpperCase()}, ${today.getFullYear()}`;

    this.setState({
      modalDisplayDate: temp,
    });
  };

  handleDateSubmit = () => {
    let date = this.state.modalDisplayDate;
    this.setState({
      displayDate: date,
    });
    this.handleDatePicker(false);
  };

  handleCancelDate = () => {
    this.handleDatePicker(false);
    let date = this.state.displayDate;
    this.setState({
      modalDisplayDate: date,
    });
  };

  handleDatePicker = type => {
    this.setState({
      datePicker: type,
    });
  };

  handleOnSubmit = async () => {
    const {ammount, notes, displayDate, selectedCat} = this.state;
    const expense = {
      ammount: ammount,
      notes: notes,
      displayDate: displayDate,
      selectedCat: selectedCat,
      createdAt: new Date(),
    };
    let uid = auth().currentUser.uid;
    await firestore()
      .collection('transactions')
      .doc(uid)
      .collection('expenses')
      .doc()
      .set(expense)
      .then(() => {
        console.log('Expense added');
      });
  };
  render() {
    const {
      headerTitle,
      ammountPlaceholder,
      notesPlaceholder,
      selectCat,
      buttonTitle,
    } = strings.addExpense;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={
            this.state.datePicker
              ? colors.modalBackgroundColor
              : colors.backgroundColor
          }
          barStyle="light-content"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Animated.View
              style={{
                marginTop: this.headerMarginTop,
                opacity: this.opacity,
              }}>
              <PrimaryHeader
                onPress={() => this.props.navigation.goBack()}
                title={headerTitle}
                leftImage={images.backArrow}
                rightImage={images.expense}
              />
              <Text
                style={styles.dateLabel}
                onPress={() => this.handleDatePicker(true)}>
                {this.state.displayDate}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.ammountInputContainer,
                {
                  width: this.inputWidth,
                  marginTop: this.ammountInputMarginTop,
                },
              ]}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primary}
                placeholder={ammountPlaceholder}
                keyboardType="decimal-pad"
                onChangeText={ammount =>
                  this.setState({ammount: ammount.trim()})
                }
                value={this.state.ammount}
                returnKeyType="next"
                onSubmitEditing={() => this.notesInput.focus()}
                blurOnSubmit={false}
                ref={input => {
                  this.ammountInput = input;
                }}
              />
            </Animated.View>
            {this.state.isKeyboard && (
              <Animated.View
                style={[
                  styles.notesInputContainer,
                  {
                    height: this.notesInputHeight,
                    width: this.inputWidth,
                  },
                ]}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  selectionColor={colors.primary}
                  placeholder={notesPlaceholder}
                  returnKeyType="next"
                  onChangeText={notes => this.setState({notes: notes.trim()})}
                  value={this.state.notes}
                  blurOnSubmit={false}
                  ref={input => {
                    this.notesInput = input;
                  }}
                  multiline
                  numberOfLines={5}
                />
              </Animated.View>
            )}
            <Animated.View
              style={{
                marginTop: this.catMarginTop,
                opacity: this.opacity,
              }}>
              <Text style={styles.selectCatLabel}>{selectCat}</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.catListContainer,
                {
                  opacity: this.opacity,
                },
              ]}>
              <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                contentContainerStyle={styles.catContentContainer}
                renderItem={({item, index}) =>
                  this.renderCategories(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </Animated.View>
            <Button
              title={buttonTitle}
              position="absolute"
              bottom={perfectSize(30)}
              active={this.isActive()}
              onPress={() => this.handleOnSubmit()}
              disabled={!this.isActive()}
            />
            <Animated.View
              style={{
                position: 'absolute',
                top: perfectSize(430),
                right: this.doneButtonRight,
              }}>
              <ButtonWithImage
                onPress={() => Keyboard.dismiss()}
                image={images.check}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={this.state.datePicker}
          style={styles.modal}
          transparent
          animationType="fade">
          <View style={styles.modalViewContainer}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeaderContainer}>
                <Text style={styles.datePickerHeaderLabel}>
                  {this.state.modalDisplayDate}
                </Text>
              </View>
              <CalendarPicker
                disabledDatesTextStyle={styles.disabledDatesTextStyle}
                selectedDayStyle={styles.selectedDayStyle}
                todayTextStyle={styles.todayTextStyle}
                todayBackgroundColor={colors.primary}
                textStyle={styles.textStyle}
                selectedDayTextColor={colors.primary}
                monthYearHeaderWrapperStyle={styles.monthYearHeaderWrapperStyle}
                yearTitleStyle={styles.yearTitleStyle}
                monthTitleStyle={styles.monthTitleStyle}
                dayLabelsWrapper={styles.dayLabelsWrapper}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                customDatesStyles={customDatesStylesCallback}
                dayShape="circle"
                onDateChange={this.onDateChange}
                width={perfectSize(320)}
                weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
                showDayStragglers
                selectedDayColor={colors.primaryLightColor}
                maxDate={new Date()}
                previousComponent={
                  <Image
                    source={images.leftArrow}
                    style={styles.previousComponent}
                  />
                }
                nextComponent={
                  <Image
                    source={images.rightArrow}
                    style={styles.nextComponent}
                  />
                }
              />
              <View style={styles.bottomViewContainer}>
                <ButtonWithImage
                  onPress={() => this.handleCancelDate()}
                  image={images.cross}
                />
                <ButtonWithImage
                  onPress={() => this.handleDateSubmit()}
                  image={images.check}
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal);
