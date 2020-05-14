import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {styles} from './styles/Style';
import user from '../assets/images/user.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-navigation';
import {Madoka} from 'react-native-textinput-effects';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
Icon.loadFont();

class EditProfile extends Component {
  static navigationOptions = {
    drawerLabel: () => null,
  };
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
            style={{alignItems: 'flex-start', margin: 18}}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="bars" size={30} color="#fff" />
          </TouchableOpacity>

          <ScrollView>
            <KeyboardAvoidingView style={styles.wrapper}>
              <View style={styles.cardStyle}>
                <Image style={styles.editImage} source={user} />
              </View>

              <Text style={styles.conText}>Edit your profile</Text>

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
                <View style={styles.madokaContainer}>
                  <Icon name="envelope" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'email'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
                <View style={styles.madokaContainer}>
                  <Icon name="phone" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'phone'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
                <View style={styles.madokaContainer}>
                  <Icon name="map-marker" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'address'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>

                <View style={styles.madokaContainer}>
                  <Icon name="lock" size={30} style={styles.ImageStyle} />
                  <Madoka
                    secureTextEntry={this.state.hidePassword}
                    style={styles.inputFlex2}
                    label={'password'}
                    borderColor={'#fff'}
                    labelStyle={styles.labelColor}
                    inputStyle={styles.labelColor}
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
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default EditProfile;
