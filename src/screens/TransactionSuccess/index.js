/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';
import {images, colors, strings, perfectSize, height, width} from '../../theme';
import {Button} from '../../components';
import {Neomorph} from 'react-native-neomorph-shadows';
export default function TransactionSuccess({navigation, route}) {
  const handleOnSubmit = () => {
    navigation.navigate('AddTransaction');
  };
  let {
    successMessage,
    buttonTitle,
    transactionType,
    category,
    date,
    amountHeader,
    incomeHeader,
    expenseHeader,
  } = strings.transactionSuccess;
  let {isFromIncome, amount, notes, displayDate, isFromExpense, selectedCat} =
    route.params;
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={colors.backgroundColor}
        barStyle="light-content"
      />
      <Image
        source={images.transactionSuccess}
        style={styles.successImage}
        resizeMode="contain"
      />
      <Text style={styles.successMessage}>{successMessage}</Text>
      <View style={styles.detailsContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.labelHeader}>{transactionType}</Text>
            <Text style={styles.labelTitle}>
              {isFromIncome ? incomeHeader : expenseHeader}
            </Text>
          </View>
          <View>
            <Text style={styles.labelHeader}>{amountHeader}</Text>
            <Text style={[styles.labelTitle, {fontSize: perfectSize(30)}]}>
              {amount}
            </Text>
          </View>
        </View>
        <View style={{marginTop: '10%'}}>
          <Text style={styles.labelHeader}>{date}</Text>
          <Text style={styles.labelTitle}>{displayDate}</Text>
        </View>
      </View>
      <Button
        title={buttonTitle}
        position="absolute"
        bottom={perfectSize(30)}
        active={true}
        onPress={() => handleOnSubmit()}
      />
    </View>
  );
}
