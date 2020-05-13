import React, {Component} from 'react';
import{
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
 Icon.loadFont();

 class AboutScreen extends Component {
        static navigationOptions = {
            drawerLabel:() => null
       }
     render() {
         return(
             <SafeAreaView style={styles.container}>
               <TouchableOpacity style={{alignItems:'flex-start', margin:18}} onPress={()=>this.props.navigation.openDrawer()}>   
                <Icon name="bars" size={30} color="#cc5500"/>
                </TouchableOpacity>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text>About screen</Text>
                    </View>
             </SafeAreaView>
         );
     }
 }

 const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    safeArea:{
        flex:1,
    },    
});

export default AboutScreen
