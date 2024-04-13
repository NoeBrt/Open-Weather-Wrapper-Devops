// index.js
const express = require('express');
const getWeatherData = require('./OpenWeatherWrapper'); // Import the weather data fetching function
const app = express();
const apiKey=process.env.API_KEY;
const units="metter";
const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const data = await getWeatherData(lat, lon,apiKey,units);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
