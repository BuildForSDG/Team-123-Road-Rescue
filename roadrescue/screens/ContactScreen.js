import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
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

class ContactScreen extends Component {
  render() {
    return (
      <LinearGradient style={{flex: 1}} colors={['#D7816A', '#BD4F6C']}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="bars" size={30} color="#fff" />
          </TouchableOpacity>

          <ScrollView>
            <KeyboardAvoidingView style={styles.wrapper}>
              <View style={styles.cardStyle}>
                <Image style={styles.contactImage} source={medication} />
              </View>
              <Text style={styles.conText}>Contact us</Text>

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
                    labelStyle={styles.madokaStyle}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
              </View>
              <TextInput
                style={styles.msgBox}
                placeholder="Message"
                numberOfLines={10}
                multiline={true}
                placeholderTextColor="#fff"
                underlineColorAndroid="transparent"
              />

              <TouchableOpacity style={styles.btn}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default ContactScreen;
