// weather.js
require('dotenv').config();
const axios = require('axios');

async function getWeatherData(lat, lon) {
  const apiKey = process.env.API_KEY;
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = getWeatherData;
