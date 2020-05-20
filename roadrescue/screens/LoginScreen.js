import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './styles/Style';
import medication from '../assets/images/medication.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {Madoka} from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
Icon.loadFont();

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {hidePassword: true};
  }
  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  render() {
    return (
      <LinearGradient
        style={styles.aboutContainer}
        colors={['#D7816A', '#BD4F6C']}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="bars" size={30} color="#fff" />
          </TouchableOpacity>

          <ScrollView>
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
              <View style={styles.cardStyle}>
                <Image style={styles.contactImage} source={medication} />
              </View>
              <Text style={styles.conText}>Welcome back, sign in</Text>

              <View style={[styles.card2]}>
                <View style={styles.madokaContainer}>
                  <Icon name="envelope" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'email'}
                    borderColor={'#fff'}
                    labelStyle={styles.madokaStyle}
                    inputStyle={styles.madokaStyle}
                  />
                </View>

                <View style={styles.madokaContainer}>
                  <Icon name="lock" size={30} style={styles.ImageStyle} />
                  <Madoka
                    secureTextEntry={this.state.hidePassword}
                    style={styles.inputFlex2}
                    label={'password'}
                    borderColor={'#fff'}
                    labelStyle={styles.madokaStyle}
                    inputStyle={styles.madokaStyle}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.visibilityBtn}
                    onPress={this.managePasswordVisibility}>
                    <Image
                      source={
                        this.state.hidePassword
                          ? require('../assets/images/show.png')
                          : require('../assets/images/hide.png')
                      }
                      style={styles.btnImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.loginText}>sign in</Text>
              </TouchableOpacity>
              <Text
                style={styles.logText}
                onPress={() => this.props.navigation.navigate('Register')}>
                Don't have an account? Sign up
              </Text>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default LoginScreen;
