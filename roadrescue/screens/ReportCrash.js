import React, {Component} from 'react';
import{
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button,
  ScrollView,
  SafeAreaView
} from 'react-native';
import medication from '../assets/images/medication.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Madoka } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from "react-native-linear-gradient";
 Icon.loadFont();
 

 class ReportCrash extends Component{
    constructor(props) {
        super(props);
        this.state = {
          filePath: {},
          loadingImage : false,
          show: true,
        };
      }

      ShowHideComponent = () => {
        if (this.state.show == true) {
          this.setState({ show: false});
        } else {
          this.setState({ show: true });
        }
      };


      chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        this.setState({ loadingImage: true });
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
              this.setState({ loadingImage: false });
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              let source = response;
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                filePath: source,
              });
            }
          });
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
                        style={{width:70,
                          height: 70,
                          marginTop: 20,
                          padding:20,}}
                        source={medication}
                    />
                    </View>
                <Text style={styles.conText}>
                    Report crash
                </Text>
                 
        <View style={[styles.card2]}>   
        {this.state.show ? (
        <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
        <Icon name="user" size={30} style={{padding:10, marginTop:10, color:'#fff'}}  /> 
        <Madoka
          style={styles.inputFlex2}
          label={"full name"}
          borderColor={"#fff"}
          labelStyle={{ color: "#fff" }}
          inputStyle={{ color: "#fff" }}
        />
        </View>
         ): null }
        

        <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
        <Icon name="hospital-o" size={30} style={{padding:10, marginTop:10, color:'#fff'}}  /> 
        <Madoka
          style={styles.inputFlex2}
          label={"no of victims"}
          borderColor={"#fff"}
          labelStyle={{ color: "#fff" }}
          inputStyle={{ color: "#fff" }}
        />
        </View>
         

        <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
        <Icon name="map-marker" size={30} style={{padding:10, marginTop:10, color:'#fff'}}  /> 
        <Madoka
          style={styles.inputFlex2}
          label={"crash location"}
          borderColor={"#fff"}
          labelStyle={{ color: "#fff" }}
          inputStyle={{ color: "#fff" }}
        />
        </View>
           <Image 
          source = { this.state.loadingImage 
          ? 
          { uri: this.state.filePath.uri }
          : 
          require('../assets/images/placeholder.png')}
          style={{width:100, height:100, resizeMode : 'stretch', marginTop:10, alignSelf:'center' }} 
          />
           
           <View style={{alignSelf:'center',justifyContent:'center' }}>
          <Button style={{color:'#fff'}} title="Upload image" onPress={this.chooseFile.bind(this)}>Upload image</Button>
            </View>
                </View>
                    <TextInput 
                    style={styles.msgBox}
                    placeholder="Message"
                    numberOfLines={10}
                    multiline={true}
                    numberOfLines={10}
                    placeholderTextColor="#fff"
                    underlineColorAndroid = 'transparent'    
                />
                
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.loginText}> 
                         Report
                    </Text>
                    </TouchableOpacity>
                    {this.state.show ? (
                    <Text style={styles.logText}
                    onPress={this.ShowHideComponent}>
                   Go Anonymous
                </Text>
                ): <Text style={styles.logText}
                    onPress={this.ShowHideComponent}
                    >Go Live</Text>}
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
    textInput:{
        alignSelf: 'stretch',
        borderColor: '#36c',
        height: 45,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderTopLeftRadius:1,
        borderTopRightRadius:1,
        borderBottomRightRadius:1,
        borderBottomLeftRadius:1,
        padding: 10,
        fontSize: 16
    },
    conText:{
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20
    },
    msgBox:{
        alignSelf: 'stretch',
        borderColor: '#fff',
        color: '#000',
        height: 130,
        borderWidth: 2,
        borderTopLeftRadius:2,
        borderTopRightRadius:2,
        borderBottomRightRadius:2,
        borderBottomLeftRadius:2,
        marginTop: 20,
        padding:10,
        textAlignVertical: 'top'
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

export default ReportCrash
