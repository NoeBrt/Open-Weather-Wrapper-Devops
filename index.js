// index.js
const express = require('express');
const getWeatherData = require('./OpenWeatherWrapper'); // Import the weather data fetching function
const app = express();
const apiKey=process.env.API_KEY;
const units="metter";
const port = process.env.PORT || 8081;

//setup prometheus
const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({ register });

//create a counter metrics
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [register]
});

//display total number of requests
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
  } catch (error) {
    res.status(500).send();
  }
});

app.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const data = await getWeatherData(lat, lon,apiKey,units);
    httpRequestCounter.inc(); // Increment the counter for each request
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


