import React, {Component} from 'react';
import{
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView
} from 'react-native';
import medication from '../assets/images/medication.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
import { Madoka } from 'react-native-textinput-effects';
import LinearGradient from "react-native-linear-gradient";
 Icon.loadFont();
 

 class LoginScreen extends Component{
  constructor()
  {
    super();
    this.state = { hidePassword: true }
  }
  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

     render(){
         return(
            <LinearGradient
            style={{flex:1}}
            colors={[
              "#D7816A",
              "#BD4F6C"
            ]}
          >
                 <SafeAreaView style={styles.safeArea}>
               <TouchableOpacity 
                style={{alignItems:'flex-start', margin:18}}
                onPress={()=>this.props.navigation.openDrawer()}>   
                <Icon name="bars" size={30} color="#fff"/>
                    </TouchableOpacity>
                   
                    <ScrollView>
                    <KeyboardAvoidingView behavior='padding'
                    style={styles.wrapper}>
                       <View style={styles.cardStyle}> 
                         <Image
                        style={{ width:70,height: 70,
                          marginTop: 20,padding:20,}}
                        source={medication}
                       />
                    </View>
                <Text style={styles.conText}>
                    Welcome back, sign in
                </Text>
                 
        <View style={[styles.card2]}>   
        <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
        <Icon name="envelope" size={30} style={{padding:10, marginTop:10, color:'#fff'}}  /> 
        <Madoka
          style={styles.inputFlex2}
          label={"email"}
          borderColor={"#fff"}
          labelStyle={{ color: "#fff" }}
          inputStyle={{ color: "#fff" }}
        />
        </View>

        <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
        <Icon name="lock" size={30} style={{padding:10, marginTop:10, color:'#fff'}}  /> 
        <Madoka
            secureTextEntry={this.state.hidePassword}
          style={styles.inputFlex2}
          label={"password"}
          borderColor={"#fff"}
          labelStyle={{ color: "#fff" }}
          inputStyle={{ color: "#fff" }}
        />
         <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
            <Image source = { ( this.state.hidePassword ) ? require('../assets/images/show.png') : require('../assets/images/hide.png') }
             style = { styles.btnImage } />
          </TouchableOpacity>
        </View>

                </View>
                     
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.loginText}> 
                        sign in
                    </Text>
                    </TouchableOpacity>
                    <Text style={styles.logText}
                    onPress={()=>this.props.navigation.navigate('Register')}>
                   Don't have an account? Sign up
                </Text>
                    </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
                </LinearGradient>
         )
     }
 }

 styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },

    safeArea:{
        flex:1,
    },
    conText:{
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20
    },

    loginText:{
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase'
   },
   ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
   btn:{
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderRadius:25,
    backgroundColor: '#A40606'
    
},
content: {
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 14,
    alignSelf: 'stretch',
    marginTop: 20
  },
  input: {
    marginTop: 4,
  },
  inputFlex: {
    marginTop: 4,
    alignSelf:'stretch',
    width: 150
  },
  inputFlex2: {
    alignSelf:'stretch',
    width: 250
  },
  title: {
    paddingBottom: 16,
    textAlign: "center",
    color: "#404d5b",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8,
  },
  visibilityBtn:{
    position: 'absolute',
    right: 15,
    height: 40,
    width: 35,
    padding: 3
  },
  btnImage:{
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    marginTop:7,
  },
  cardStyle:{
    flex:1,
    alignItems:'center',
    width:100,
    height:100,
     borderTopLeftRadius:100,
     borderTopRightRadius:100,
     borderBottomLeftRadius:100,
     borderBottomRightRadius:100,
    backgroundColor: '#fff'
  },
  logText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20
},
 
     
});

export default LoginScreen
