import React from 'react';
import {View, Linking, TouchableNativeFeedback} from 'react-native';
import {Text, Card, Divider} from 'react-native-elements';
import {styles} from '../../screens/styles/Style';
import moment from 'moment';

export default class Article extends React.Component {
  render() {
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      url,
    } = this.props.article;
    const {noteStyle, featuredTitleStyle} = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

    return (
      <TouchableNativeFeedback
        useForeground
        onPress={() => Linking.openURL(url)}>
        <Card
          featuredTitle={title}
          featuredTitleStyle={featuredTitleStyle}
          image={{uri: urlToImage || defaultImg}}>
          <Text style={styles.articleStyle}>
            {description || 'Read More..'}
          </Text>
          <Divider style={styles.dividerColor} />
          <View style={styles.newsStyle}>
            <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}
