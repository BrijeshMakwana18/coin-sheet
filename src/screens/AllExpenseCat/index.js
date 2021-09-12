import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {PrimaryHeader} from '../../components';
import {strings, images} from '../../theme';
import styles from './styles';
export default class AllExpenseCat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {headerTitle} = strings.allExpenseCat;
    return (
      <View style={styles.container}>
        <PrimaryHeader
          onPress={() => this.props.navigation.goBack()}
          title={headerTitle}
          leftImage={images.backArrow}
          rightImage={images.expense}
        />
      </View>
    );
  }
}
