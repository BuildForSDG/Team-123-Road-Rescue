import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
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
Icon.loadFont();

class ContactScreen extends Component {
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
                <Image style={styles.contactImage} source={medication} />
              </View>
              <Text style={styles.conText}>Contact us</Text>

              <View style={[styles.card2]}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                  }}>
                  <Icon
                    name="user"
                    size={30}
                    style={{padding: 10, marginTop: 10, color: '#fff'}}
                  />
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
                  <Icon
                    name="envelope"
                    size={30}
                    style={{padding: 10, marginTop: 10, color: '#fff'}}
                  />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'email'}
                    borderColor={'#fff'}
                    labelStyle={{color: '#fff'}}
                    inputStyle={{color: '#fff'}}
                  />
                </View>
              </View>
              <TextInput
                style={styles.msgBox}
                placeholder="Message"
                numberOfLines={10}
                multiline={true}
                numberOfLines={10}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  safeArea: {
    flex: 1,
  },
  textInput: {
    alignSelf: 'stretch',
    borderColor: '#36c',
    height: 45,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 1,
    padding: 10,
    fontSize: 16,
  },
  conText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
  },
  msgBox: {
    alignSelf: 'stretch',
    borderColor: '#fff',
    color: '#fff',
    height: 130,
    borderWidth: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 2,
    marginTop: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  loginText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  btn: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#A40606',
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 14,
    alignSelf: 'stretch',
    marginTop: 20,
  },
  input: {
    marginTop: 4,
  },
  inputFlex: {
    marginTop: 4,
    alignSelf: 'stretch',
    width: 150,
  },
  inputFlex2: {
    alignSelf: 'stretch',
    width: 250,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#fff',
  },
  logText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contactImage: {
    width: 80,
    height: 70,
    marginTop: 20,
    padding: 10,
  },
});

export default ContactScreen;
