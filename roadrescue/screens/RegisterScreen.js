import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import medication from '../assets/images/medication.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {Madoka} from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles/Style';
Icon.loadFont();

class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {hidePassword: true};
  }
  managePasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#D7816A', '#BD4F6C']}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="bars" size={30} color="#fff" />
          </TouchableOpacity>

          <ScrollView>
            <KeyboardAvoidingView style={styles.wrapper}>
              <View style={styles.cardStyle}>
                <Image style={styles.contactImage} source={medication} />
              </View>

              <Text style={styles.conText}>Welcome, Sign up</Text>

              <View style={[styles.card2]}>
                <View style={styles.madokaContainer}>
                  <Icon name="user" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'Full name'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}>
                  <Icon name="envelope" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'email'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}>
                  <Icon name="phone" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'phone'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}>
                  <Icon name="map-marker" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'Address'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}>
                  <Icon name="lock" size={30} style={styles.ImageStyle} />
                  <Madoka
                    secureTextEntry={this.state.hidePassword}
                    style={styles.inputFlex2}
                    label={'password'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
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
                <Text style={styles.loginText}>Register</Text>
              </TouchableOpacity>
              <Text
                style={styles.logText}
                onPress={() => this.props.navigation.navigate('Sign in')}>
                Already have an account? Sign in
              </Text>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default RegisterScreen;
