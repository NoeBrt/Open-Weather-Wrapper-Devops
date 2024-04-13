// weather.js
require('dotenv').config();
const axios = require('axios');

async function getWeatherData(lat, lon,apiKey, units) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  try {
    const response = await axios.get(baseUrl, {
      params: {
          lat,
          lon,
          appid: apiKey,
          units
      }
  });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = getWeatherData;
