import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {styles} from './styles/Style';
import medication from '../assets/images/medication.png';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Madoka} from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
Icon.loadFont();

class ReportCrash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      loadingImage: false,
      show: true,
    };
  }

  ShowHideComponent = () => {
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  chooseFile = () => {
    var options = {
      title: 'Choose Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    this.setState({loadingImage: true});
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({loadingImage: false});
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        customAlert(response.customButton);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
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
              <Text style={styles.conText}>Report crash</Text>

              <View style={[styles.card2]}>
                {this.state.show ? (
                  <View style={styles.madokaContainer}>
                    <Icon name="user" size={30} style={styles.ImageStyle} />
                    <Madoka
                      style={styles.inputFlex2}
                      label={'full name'}
                      borderColor={'#fff'}
                      labelStyle={styles.madokaStyle}
                      inputStyle={styles.madokaStyle}
                    />
                  </View>
                ) : null}

                <View style={styles.madokaContainer}>
                  <Icon name="hospital-o" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'no of victims'}
                    borderColor={'#fff'}
                    labelStyle={styles.madokaStyle}
                    inputStyle={styles.madokaStyle}
                  />
                </View>

                <View style={styles.madokaContainer}>
                  <Icon name="map-marker" size={30} style={styles.ImageStyle} />
                  <Madoka
                    style={styles.inputFlex2}
                    label={'crash location'}
                    borderColor={'#fff'}
                    labelStyle={styles.madokaStyle}
                    inputStyle={styles.madokaStyle}
                  />
                </View>
                <Image
                  source={
                    this.state.loadingImage
                      ? {uri: this.state.filePath.uri}
                      : require('../assets/images/placeholder.png')
                  }
                  style={styles.placeholder}
                />

                <View style={styles.uploadBtn}>
                  <Button
                    style={styles.btnChoose}
                    title="Upload image"
                    onPress={this.chooseFile.bind(this)}
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
                <Text style={styles.loginText}>Report</Text>
              </TouchableOpacity>
              {this.state.show ? (
                <Text style={styles.logText} onPress={this.ShowHideComponent}>
                  Go Anonymous
                </Text>
              ) : (
                <Text style={styles.logText} onPress={this.ShowHideComponent}>
                  Go Live
                </Text>
              )}
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default ReportCrash;
