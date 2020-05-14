import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles/Style';

import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
Icon.loadFont();

class AboutScreen extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
  };
  render() {
    return (
      <SafeAreaView style={styles.aboutContainer}>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => this.props.navigation.openDrawer()}>
          <Icon name="bars" size={30} color="#cc5500" />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>About screen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default AboutScreen;
