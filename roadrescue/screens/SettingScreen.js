import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import user from '../assets/images/user.png';
import history from '../assets/images/history.png';
import curve from '../assets/images/curve.png';
import bell from '../assets/images/bell.png';
import terms from '../assets/images/terms.png';
import privacy from '../assets/images/privacy.png';
import {SettingsScreen} from 'react-native-settings-screen';

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif';

const renderHero = () => (
  <View style={styles.heroContainer}>
    <Image
      source={require('../assets/images/medication.png')}
      style={styles.heroImage}
    />
    <View style={{flex: 1}}>
      <Text style={styles.heroTitle}>Road Rescue</Text>
      <Text style={styles.heroSubtitle}>Reduce road injuries and deaths</Text>
    </View>
  </View>
);

export default class SettingScreen extends React.Component {
  state = {
    refreshing: false,
  };

  settingsData = [
    {type: 'CUSTOM_VIEW', key: 'hero', render: renderHero},
    {
      type: 'SECTION',
      header: 'Personal Details'.toUpperCase(),

      rows: [
        {
          title: (
            <Text
              style={styles.textPadding}
              onPress={() => this.props.navigation.navigate('Edit Profile')}>
              Edit Profile
            </Text>
          ),
          renderAccessory: () => (
            <Image source={user} style={styles.imageStyle} />
          ),
        },
        {
          title: <Text style={styles.textPadding}>Traffic report history</Text>,
          renderAccessory: () => (
            <Image source={history} style={styles.imageStyle} />
          ),
        },
      ],
    },

    {
      type: 'SECTION',
      header: 'Application details'.toUpperCase(),
      rows: [
        {
          title: (
            <Text
              style={styles.textPadding}
              onPress={() => this.props.navigation.navigate('About us')}>
              About us
            </Text>
          ),
          renderAccessory: () => (
            <Image source={curve} style={styles.imageStyle} />
          ),
        },
        {
          title: <Text style={styles.textPadding}>Notifications</Text>,
          renderAccessory: () => (
            <Image source={bell} style={styles.imageStyle} />
          ),
        },
        {
          title: <Text style={styles.textPadding}>Privacy policy</Text>,
          renderAccessory: () => (
            <Image source={terms} style={styles.imageStyle} />
          ),
        },
        {
          title: <Text style={styles.textPadding}>Terms of use</Text>,
          renderAccessory: () => (
            <Image source={privacy} style={styles.imageStyle} />
          ),
        },
      ],
    },
  ];

  render() {
    return (
      <View style={styles.SettingsWrapper}>
        <StatusBar barStyle="light-content" backgroundColor="#8c231a" />
        <View style={styles.navBar}>
          <Text style={styles.navBarTitle}>Settings</Text>
        </View>
        <TouchableOpacity
          style={styles.menuSettings}
          onPress={() => this.props.navigation.openDrawer()}>
          <Icon
            name={Platform.OS === 'ios' ? 'bars' : 'bars'}
            size={30}
            color="#8c231a"
          />
        </TouchableOpacity>
        <SettingsScreen
          data={this.settingsData}
          globalTextStyle={{fontFamily}}
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({refreshing: true});
                  setTimeout(() => this.setState({refreshing: false}), 3000);
                }}
              />
            ),
          }}
        />
      </View>
    );
  }
}

const statusBarHeight = Platform.OS === 'ios' ? 35 : 0;

const styles = StyleSheet.create({
  SettingsWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#8c231c',
    height: 44 + statusBarHeight,
    alignSelf: 'stretch',
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: 'white',
    fontSize: 17,
  },
  heroContainer: {
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  heroImage: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
  },
  heroTitle: {
    color: 'black',
    fontSize: 24,
  },
  heroSubtitle: {
    color: '#999',
    fontSize: 14,
  },
  imageStyle: {
    width: 25,
    height: 25,
  },
  textPadding: {
    padding: 10,
  },
  menuSettings: {
    alignItems: 'flex-start',
    margin: 18,
  },
});
