import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
  Text,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {getNews} from '../src/components/News';
import Article from '../src/components/Article';
import crash from '../assets/images/crash.png';
import sun from '../assets/images/sun.png';
import {styles} from './styles/Style';
Icon.loadFont();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {articles: [], refreshing: true};
    this.fetchNews = this.fetchNews.bind(this);
  }
  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then((articles) => this.setState({articles, refreshing: false}))
      .catch(() => this.setState({refreshing: false}));
  }

  handleRefresh() {
    this.setState({refreshing: true}, () => this.fetchNews());
  }

  render() {
    return (
      <View>
        <View style={styles.homeContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#8c231a" />
          <View style={styles.subHomeContainer}>
            <Text style={styles.containerText}>Home</Text>
          </View>

          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => this.props.navigation.openDrawer()}>
            <Icon name="bars" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={styles.container}>
            <Image source={crash} style={styles.imageIcon} />
            <TouchableOpacity
              style={styles.buttonTouch}
              onPress={() => this.props.navigation.navigate('Report crash')}>
              <Text style={styles.crashText}>Report crash</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weatherContainer}>
            <Image source={sun} style={styles.imageIcon} />
            <TouchableOpacity
              style={styles.buttonTouch}
              onPress={() => this.props.navigation.navigate('Weather')}>
              <Text style={styles.crashText}>Weather</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={this.state.articles}
          renderItem={({item}) => <Article article={item} />}
          keyExtractor={(item) => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
      </View>
    );
  }
}

export default HomeScreen;
