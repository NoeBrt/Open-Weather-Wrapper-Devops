# Meteo Checker App

The Meteo Checker App allows you to retrieve weather information using latitude and longitude coordinates via the OpenWeather API.

## Installation 

### Docker 
You can pull the Docker image with the following command:
```
docker pull noebrt/meteo_checker:latest
```

## Version
Node version: alpine3.19 
No vulnerabilities detected.

## How To Use 

To use the Meteo Checker App, follow these steps:

1. Make sure you have Docker installed on your system.

2. Run the Docker container with the following command, replacing the placeholders with your actual latitude, longitude, and OpenWeather API key:
```
docker run --env LAT="Your Latitude" --env LONG="Your Longitude" --env API_KEY="Your OpenWeather API Key" noebrt/meteo_checker:latest
```
## API Key 
Obtain an API key by signing up on the OpenWeather website [here](https://openweathermap.org/api).

## Example Queries

Here are some example queries you can use with the Meteo Checker App:

- Retrieve current weather for Villejuif:
  ```
  docker run --env LAT="48.7887654119804" --env LONG="2.3638803269592468" --env API_KEY="Your API Key" noebrt/meteo_checker:latest
  ```

- Get weather for Tours:
  ```
  docker run --env LAT="47.39563393240081" --env LONG="0.6901326836654383" --env API_KEY="Your API Key" noebrt/meteo_checker:latest
  ```
  Feel free to explore more queries based on your needs and geographic locations!



