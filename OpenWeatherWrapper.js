require('dotenv').config();
const axios = require('axios');

const getWeatherData = async () => {
  const apiKey = process.env.API_KEY;
  const latitude = process.env.LAT;
  const longitude = process.env.LON;
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; // or handle the error as you see fit
  }
};

module.exports = getWeatherData;
