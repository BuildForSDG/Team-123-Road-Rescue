const images = {
  Clear: require('../../assets/images/clear.jpeg'),
  Hail: require('../../assets/images/light-rain.jpeg'),
  'Heavy Cloud': require('../../assets/images/heavy-cloud.png'),
  'Light Cloud': require('../../assets/images/light-cloud.png'),
  'Heavy Rain': require('../../assets/images/light-rain.jpeg'),
  'Light Rain': require('../../assets/images/light-rain.jpeg'),
  Showers: require('../../assets/images/showers.jpeg'),
  Sleet: require('../../assets/images/snow.jpeg'),
  Snow: require('../../assets/images/snow.jpeg'),
  Thunder: require('../../assets/images/thunder.png'),
};

export default (weather) => images[weather];
