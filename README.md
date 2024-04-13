# TP2 Devops : Meteo Checker App And auto-deployement on docker

The Meteo Checker App allows you to retrieve weather information using latitude and longitude coordinates via the OpenWeather API.


## Lab Aims

* We should use the app like and API
* **Run** the app docker images with ```docker run -p 8080:8080 --env API_KEY="YOUR API KEY" noebrt/meteo_checker```
* **Request** our app with a **CURL query** : ```curl "http://localhost:8080/?lat=48.75722028315804&lon=2.3261414356815058"```
* Automate the build and the push of a docker images after each push with a **Github Action Workflow**

## Languages Used

JavaScript (Node JS alpine3.19)

## Dependencies 

* Npm 10.5.2
* openssl 3.1.4-r6
* tar 1.35-r2
* dotenv 16.4.5 (Usage of env variable)
* express 4.19.2 (Creation of the API)

The choice of version is related to their lack of vulnerabilities.

## Security 

0 Vulnerabilities detected on Trivy or Docker Scout

### Trivy 

```sudo docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:0.18.3 noebrt/meteo_checker```
<img width="900" alt="Capture d’écran 2024-04-13 à 21 14 46" src="https://github.com/efrei-ADDA84/20230580/assets/94910317/4d6d82c8-0481-4631-91b3-32652f017234">


### Docker Scout

<img width="900" alt="Capture d’écran 2024-04-13 à 21 20 28" src="https://github.com/efrei-ADDA84/20230580/assets/94910317/4f900040-1df5-4aae-b25d-e3e34509e270">



## How To Use 

Two way of using the API

### Node js

* Install npm and Node js
* Load the dependencies seen above with npm install
* Run ```node index.js```
* Query the API with a curl request or in your browser : ```curl "http://localhost:8080/?lat=' your latitude '&lon=' your longitude '"```

### Docker



1. Make sure you have Docker installed on your system.
2. Pull the Docker image with the following command: ```docker pull noebrt/meteo_checker:latest```

3. Run the Docker container on the PORT 8080 with the following command, replacing the placeholders with your actual OpenWeather API key (We could also use a build ARG with my own API key, but can cause api request limit issue)
```docker run -p 8080:8080 --env API_KEY="YOUR API KEY" noebrt/meteo_checker```
4. Query the API with a curl request or in your browser : ```curl "http://localhost:8080/?lat=' your latitude '&lon=' your longitude '"```
   

## API Key 
Obtain an API key by signing up on the OpenWeather website [here](https://openweathermap.org/api).

## Example Queries

Here are some example queries you can use with the Meteo Checker App:

- Retrieve current weather for Villejuif:
  ```
  docker run --env LAT="48.7887654119804" --env LON="2.3638803269592468" --env API_KEY="Your API Key" noebrt/meteo_checker:latest
  ```

- Get weather for Tours:
  ```
  docker run --env LAT="47.39563393240081" --env LON="0.6901326836654383" --env API_KEY="Your API Key" noebrt/meteo_checker:latest
  ```

## Example Response
https://github.com/efrei-ADDA84/20230580
  ```
  docker run --env LAT="48.7887654119804" --env LON="2.3638803269592468" --env API_KEY="Your API Key" noebrt/meteo_checker:latest
  ```
Response :

```
{
  coord: { lon: 2.3639, lat: 48.7888 },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }
  ],
  base: 'stations',
  main: {
    temp: 10.28,
    feels_like: 9.45,
    temp_min: 9.26,
    temp_max: 11.95,
    pressure: 997,
    humidity: 80
  },
  visibility: 10000,
  wind: { speed: 3.09, deg: 160 },
  clouds: { all: 75 },
  dt: 1711805837,
  sys: {
    type: 1,
    id: 6548,
    country: 'FR',
    sunrise: 1711776701,
    sunset: 1711822671
  },
  timezone: 3600,
  id: 2968705,
  name: 'Villejuif',
  cod: 200
}
```
Feel free to explore more queries based on your needs and geographic locations!

## Automatisation & Github Workflow

`build_and_push.yml`
```
name: Build and Push Docker Image

on:
  push:
    branches:
      - Tp2

jobs:
  build_and_push:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    
    - name : Check Dockerfile with hadolint
      uses: hadolint/hadolint-action@v3.1.0
      with:
        dockerfile: "./Dockerfile"

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build Docker image
      run: docker build -t noebrt/meteo_checker:latest .

    - name: Push Docker image
      run: docker push noebrt/meteo_checker:latest
```



The Meteo_Checker app workflow is structured in few steps :



