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
import {height} from '../../../theme';
// rgb(233,91,146)
// rgb(255,72,72)
// rgb(163,112,92)
// rgb(220,137,136)
//Categories data
const data = [
  {
    title: 'FOOD',
    image: images.food,
    backgroundColor: 'rgba(246,78,162,0.9)',
    tintColor: 'rgb(246,78,162)',
  },
  {
    title: 'CASH',
    image: images.cash,
    backgroundColor: 'rgba(255,72,72,0.9)',
    tintColor: 'rgb(255,72,72)',
  },
  {
    title: 'TRANSFER',
    image: images.transfer,
    backgroundColor: 'rgba(72,19,128,0.9)',
    tintColor: 'rgb(72,19,128)',
  },
  {
    title: 'ENTERTAINMENT',
    image: images.entertainment,
    backgroundColor: 'rgba(36,107,254,0.9)',
    tintColor: 'rgb(36,107,254)',
  },
  {
    title: 'FUEL',
    image: images.fuel,
    backgroundColor: 'rgba(246,78,162,0.9)',
    tintColor: 'rgb(246,78,162)',
  },
  {
    title: 'GROCERIES',
    image: images.groceries,
    backgroundColor: 'rgba(255,72,72,0.9)',
    tintColor: 'rgb(255,72,72)',
  },
  {
    title: 'INVESTMENT',
    image: images.investment,
    backgroundColor: 'rgba(36,107,254,0.9)',
    tintColor: 'rgb(36,107,254)',
  },
  {
    title: 'LOANS',
    image: images.loan,
    backgroundColor: 'rgba(72,19,128,0.9)',
    tintColor: 'rgb(72,19,128)',
  },
  {
    title: 'MEDICAL',
    image: images.medical,
    backgroundColor: 'rgba(246,78,162,0.9)',
    tintColor: 'rgb(246,78,162)',
  },
  {
    title: 'SHOPPING',
    image: images.shopping,
    backgroundColor: 'rgba(255,72,72,0.9)',
    tintColor: 'rgb(255,72,72)',
  },
  {
    title: 'TRAVEL',
    image: images.travel,
    backgroundColor: 'rgba(72,19,128,0.9)',
    tintColor: 'rgb(72,19,128)',
  },
  {
    title: 'OTHER',
    image: images.other,
    backgroundColor: 'rgba(36,107,254,0.9)',
    tintColor: 'rgb(36,107,254)',
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
class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ammount: '',
      // payee: '',
      notes: '',
      selectedCat: '',
      isKeyboard: false,
      displayDate: '',
      modalDisplayDate: '',
      datePicker: false,
      modalDate: '',
      selectedExpenseType: '',
    };
  }

  //Animated values
  headerMarginTop = new Animated.Value(perfectSize(0));
  opacity = new Animated.Value(perfectSize(1));
  catMarginTop = new Animated.Value(perfectSize(0));
  notesInputHeight = new Animated.Value(perfectSize(80));
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
      modalDate: today,
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
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(600),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.notesInputHeight, {
        toValue: perfectSize(200),
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
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.opacity, {
        toValue: perfectSize(1),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.catMarginTop, {
        toValue: perfectSize(0),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.notesInputHeight, {
        toValue: perfectSize(80),
        duration: 300,
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
          if (item.title == 'INVESTMENT') {
            this.setState({
              selectedExpenseType: 'investment',
            });
          }
          this.setState({
            selectedCat: item.title,
          });
        }}
        style={[
          styles.catContainer,
          {
            backgroundColor:
              this.state.selectedCat == item.title
                ? item.backgroundColor
                : colors.primaryCardBackgroundColor,
            marginLeft: index == 0 ? 0 : perfectSize(30),
          },
        ]}>
        <View style={[styles.catImageContainer]}>
          <Image source={item.image} style={styles.catImage} />
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.catTitle,
            {
              color:
                this.state.selectedCat == item.title
                  ? colors.primaryLightColor
                  : colors.primaryLightColor,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  isActive = () => {
    const {ammount, selectedCat, notes, selectedExpenseType} = this.state;
    return selectedExpenseType.trim() == '' ||
      selectedExpenseType.trim() == '' ||
      ammount.trim() == '' ||
      notes.trim() == '' ||
      Object.keys(selectedCat).length == 0
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
      modalDate: today,
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
    const {
      ammount,
      notes,
      displayDate,
      selectedCat,
      modalDate,
      selectedExpenseType,
    } = this.state;
    const expense = {
      type: 'debit',
      amount: parseFloat(ammount),
      // payee: payee,
      transactionDate: modalDate,
      notes: notes,
      displayDate: displayDate,
      selectedCat: selectedCat.toLowerCase(),
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    let uid = auth().currentUser.uid;
    await firestore()
      .collection('transactions')
      .doc(uid)
      .collection('expenses')
      .doc()
      .set(expense)
      .then(() => {
        this.props.navigation.navigate('TransactionSuccess', {
          isFromExpense: true,
          amount: parseFloat(ammount),
          notes: notes,
          displayDate: displayDate,
          selectedCat: selectedCat,
          expenseType: selectedExpenseType,
          // payee: payee,
        });
      });
  };
  render() {
    const {
      headerTitle,
      ammountPlaceholder,
      notesPlaceholder,
      selectCat,
      buttonTitle,
      expenseType,
      need,
      want,
      investment,
    } = strings.addExpense;
    const {selectedExpenseType, isKeyboard, selectedCat} = this.state;
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
                rightTintColorDisabled
                rightImageOpacity={1}
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
                  marginTop: this.ammountInputMarginTop,
                },
              ]}>
              <TextInput
                contextMenuHidden={true}
                style={[
                  styles.textInput,
                  Platform.OS == 'android' && {fontWeight: 'normal'},
                ]}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primary}
                placeholder={ammountPlaceholder}
                keyboardType="numeric"
                onChangeText={amount => this.setState({ammount: amount})}
                value={this.state.ammount}
                returnKeyType="next"
                onSubmitEditing={() => this.notesInput.focus()}
                blurOnSubmit={false}
                ref={input => {
                  this.ammountInput = input;
                }}
              />
            </Animated.View>
            {/* <Animated.View style={styles.payeeInputContainer}>
              <TextInput
                contextMenuHidden={true}
                style={[
                  styles.textInput,
                  Platform.OS == 'android' && {fontWeight: 'normal'},
                ]}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primary}
                placeholder={payeePlaceholder}
                onChangeText={payee => this.setState({payee: payee})}
                value={this.state.payee}
                returnKeyType="next"
                onSubmitEditing={() => this.notesInput.focus()}
                blurOnSubmit={false}
                ref={input => {
                  this.payeeInout = input;
                }}
              />
            </Animated.View> */}
            <Animated.View
              style={[
                styles.notesInputContainer,
                {
                  height: this.notesInputHeight,
                },
              ]}>
              <TextInput
                contextMenuHidden={true}
                style={[
                  styles.textInput,
                  Platform.OS == 'android' && {fontWeight: 'normal'},
                ]}
                placeholderTextColor="rgba(255,255,255,0.3)"
                selectionColor={colors.primary}
                placeholder={notesPlaceholder}
                returnKeyType="next"
                onChangeText={notes => this.setState({notes: notes})}
                value={this.state.notes}
                blurOnSubmit={false}
                ref={input => {
                  this.notesInput = input;
                }}
                multiline
                numberOfLines={5}
              />
            </Animated.View>
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
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.catContentContainer}
                renderItem={({item, index}) =>
                  this.renderCategories(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </Animated.View>
            <Animated.View style={styles.expenseTypeContainer}>
              <Text style={styles.expenseTypeLabel}>{expenseType}</Text>
              <View
                style={[
                  styles.expenseTypeButtonsContainer,
                  {
                    justifyContent:
                      selectedCat == 'INVESTMENT' ? 'center' : 'space-between',
                  },
                ]}>
                {selectedCat != 'INVESTMENT' ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedExpenseType: 'need',
                        })
                      }
                      style={[
                        styles.expenseTypeButtonContainer,
                        {
                          backgroundColor:
                            selectedExpenseType == 'need'
                              ? colors.primary
                              : colors.secondaryCardBackgroundColor,
                        },
                      ]}>
                      <Text style={styles.expenseTypeButtonTitle}>{need}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedExpenseType: 'want',
                        })
                      }
                      style={[
                        styles.expenseTypeButtonContainer,
                        {
                          backgroundColor:
                            selectedExpenseType == 'want'
                              ? colors.primary
                              : colors.secondaryCardBackgroundColor,
                        },
                      ]}>
                      <Text style={styles.expenseTypeButtonTitle}>{want}</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View
                    style={[
                      styles.expenseTypeButtonContainer,
                      {
                        backgroundColor: colors.primary,
                      },
                    ]}>
                    <Text style={styles.expenseTypeButtonTitle}>
                      {investment}
                    </Text>
                  </View>
                )}
              </View>
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
                top: perfectSize(350),
                right: this.doneButtonRight,
              }}>
              <ButtonWithImage
                onPress={() => Keyboard.dismiss()}
                image={images.confirm}
                animatedButton
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
                  image={images.cancel}
                  animatedButton
                />
                <ButtonWithImage
                  onPress={() => this.handleDateSubmit()}
                  image={images.confirm}
                  animatedButton
                />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
