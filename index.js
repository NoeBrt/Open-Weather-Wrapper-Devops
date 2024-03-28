const getWeatherData = require('./OpenWeatherWrapper');



getWeatherData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
