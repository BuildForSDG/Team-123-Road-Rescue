import React, {Component} from 'react';
import{
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
  Text,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { getNews } from '../src/components/News';
import Article from '../src/components/Article';
import crash from '../assets/images/crash.png';
 Icon.loadFont();

 class HomeScreen extends Component{
    constructor(props) {
        super(props);
        this.state = { articles: [], refreshing: true };
        this.fetchNews = this.fetchNews.bind(this);
      }
      componentDidMount() {
        this.fetchNews();
       }
    
      fetchNews() {
        getNews()
          .then(articles => this.setState({ articles, refreshing: false }))
          .catch(() => this.setState({ refreshing: false }));
      }
    
      handleRefresh() {
        this.setState(
          {
            refreshing: true
        },
          () => this.fetchNews()
        );
      }
     render(){
            return(
                <View>
                  <View style={{backgroundColor:"#8c231a", padding:10}}>
            <StatusBar barStyle="light-content" backgroundColor="#8c231a" />
            <View style={{alignSelf:'center', marginTop:10 ,padding:44}}>
              <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>Home</Text>
            </View>
            
            
               <TouchableOpacity 
                style={{ alignSelf:'flex-start', marginTop:-10, margin:18, }}
                onPress={()=>this.props.navigation.openDrawer()}>   
                <Icon name="bars" size={30} color="#fff"/>
                    </TouchableOpacity>

                    <View 
                    style={{height:150,padding:10,
                      borderTopLeftRadius:5,borderTopRightRadius:5,borderBottomLeftRadius:5,borderBottomRightRadius:5,
                      backgroundColor: '#F5FFFA',}}>
                         <Image
                        source={crash}
                        style={{alignSelf:'center',width:70,height:70}}
                        />
                        <TouchableOpacity
                        style={{alignSelf:'center', marginTop:10, backgroundColor:'#8c231a', 
                        width:150, padding:10}}
                        onPress={()=>this.props.navigation.navigate('Report crash')}> 
                        <Text style={{textAlign:'center',
                        color:'#fff',fontWeight:'bold', 
                        fontSize:18,borderTopLeftRadius:5,borderTopRightRadius:5,borderBottomLeftRadius:5,borderBottomRightRadius:5,}}>Report crash</Text>
                        </TouchableOpacity>
                    </View>

                    </View>
                    
                  
        <FlatList
        style={{width:'100%'}}
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
    </View>      
         )
     }
 }

 styles = StyleSheet.create({
      navBar: {
        backgroundColor: '#8c231c',
        height: 44,
        alignItems: 'center',
        padding:44,
        justifyContent: 'center',
        alignItems: 'center',
      }, 
      reportCard:{
        
      },
});

export default HomeScreen
