import React from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import HomeScreen from './screens/HomeScreen.js';
import AboutScreen from './screens/AboutScreen.js';
import ContactScreen from './screens/ContactScreen.js';
import ReportCrash from './screens/ReportCrash.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SettingScreen from './screens/SettingScreen.js';
import EditProfile from './screens/EditProfile.js';
import medication from './assets/images/medication.png';
import building from './assets/images/building.png';
import mail from './assets/images/mail.png';
import alarm from './assets/images/alarm.png';
import register from './assets/images/register.png';
import user from './assets/images/user.png';
import setting from './assets/images/setting.png';
import {DrawerItems, createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

class Drawer extends React.Component {
  render() {
    return <App2 />;
  }
}

const CustomDrawerComponent = (props) => (
  <View style={styles.container}>
    <View style={styles.drawSafe}>
      <View style={styles.imageCard}>
        <Image style={styles.drawerImage} source={medication} />
      </View>
    </View>
    <View style={styles.drawerBody}>
      <DrawerItems {...props} />
    </View>
  </View>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: <Image source={building} />,
      },
    },

    'About us': {
      screen: AboutScreen,
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        drawerIcon: <Image source={register} />,
      },
    },
    'Sign in': {
      screen: LoginScreen,
      navigationOptions: {
        drawerIcon: <Image source={user} />,
      },
    },
    'Report crash': {
      screen: ReportCrash,
      navigationOptions: {
        drawerIcon: <Image source={alarm} />,
      },
    },
    'Contact us': {
      screen: ContactScreen,
      navigationOptions: {
        drawerIcon: <Image source={mail} />,
      },
    },
    Settings: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: <Image source={setting} />,
      },
    },
    'Edit Profile': {
      screen: EditProfile,
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawerComponent,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: '#cc0000',
      inactiveTintColor: 'black',
      activeBackgroundColor: '#ccc',
    },
  },
);

const App2 = createAppContainer(DrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawSafe: {
    backgroundColor: '#8c231a',
    padding: 40,
  },
  imageCard: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    width: 100,
    height: 100,
    padding: 5,
    marginBottom: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#F5FFFA',
  },
  drawerBody: {
    backgroundColor: '#fff',
    marginTop: -10,
  },
  drawerImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    padding: 10,
  },
  myImage: {
    width: 25,
    height: 25,
  },
  label: {
    padding: 15,
    fontWeight: 'bold',
  },
});

export default Drawer;
