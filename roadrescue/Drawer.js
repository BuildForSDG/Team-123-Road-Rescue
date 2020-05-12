import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image
} from 'react-native';

import HomeScreen from './screens/HomeScreen.js';
import AboutScreen from './screens/AboutScreen.js';
import ContactScreen from './screens/ContactScreen.js';
import ReportCrash from './screens/ReportCrash.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SettingScreen from './screens/SettingScreen.js';
import EditProfile from './screens/EditProfile.js';
import medication from './assets/images/medication.png';
import mail from './assets/images/mail.png';
import alarm from './assets/images/alarm.png'; 
import sign from './assets/images/sign.png';  
import building from './assets/images/building.png';  
import profile from './assets/images/profile.png';  
import user from './assets/images/user.png';  
import setting from './assets/images/setting.png';  
import { DrawerItems, createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
 
 
class Drawer extends Component{
    render(){
        return(
            <App2 />
        );
      }
}
 

const CustomDrawerComponent = (props) => (
    <View>
      <SafeAreaView>
        <View style={{justifyContent:'center', height:100, padding:20}}>
           <Image 
           style={styles.drawerImage}
           source={medication}
           />
        </View>
        <View>
          <DrawerItems {...props } />
           
        </View>
      </SafeAreaView>
    </View>
  );
 
  const DrawerNavigator = createDrawerNavigator({

    Home:{
      screen:HomeScreen,
      navigationOptions:{
         drawerIcon:(
           <Image source={building} style={{width:25, height:25}}/>
         )
      }
    },
    
    'About us':{
     screen:AboutScreen,
  },
    'Register':{
     screen:RegisterScreen,
     navigationOptions:{
        drawerIcon:(
          <Image source={user} style={{width:25, height:25}}/>
        ),
    }
  },
    'Sign in':{
     screen:LoginScreen,
     navigationOptions:{
        drawerIcon:(
          <Image source={sign} style={{width:25, height:25}}/>
        ),
    }
  },
  'Report crash':{
   screen:ReportCrash,
   navigationOptions:{
      drawerIcon: (
        <Image source={alarm} style={{width:25, height:25}}/>
      ),
  }
 },
 'Contact us':{
   screen:ContactScreen,
   navigationOptions:{
      drawerIcon:(
        <Image source={mail} style={{width:25, height:25}}/>
      ),  
  }
 },
 'Settings':{
   screen:SettingScreen,
   navigationOptions:{
      drawerIcon:(
        <Image source={setting} style={{width:25, height:25}}/>
      ),  
  }
 },
 'Edit Profile':{
   screen:EditProfile,
 },
 
 
   Admin:{
   screen:ContactScreen,
   navigationOptions:{
      drawerIcon:(
        <Image source={profile} style={{width:25, height:25}}/>
      ),  
  }
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
   }
  },
  );
  
  const App2 = createAppContainer(DrawerNavigator);
 
 const styles = StyleSheet.create({
   container:{
        alignItems: 'center'
   },
   drawerImage:{
     height:100,
     width:100,
     alignSelf: 'center',
     padding:10
   },
   image:{
     width:50,
     height:50,
   },
   label:{
     padding:15,
     fontWeight: 'bold'
   }
 })
 
export default Drawer; 