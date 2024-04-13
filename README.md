# TP2 DevOps: Meteo Checker App And Auto-deployment on Docker

The Meteo Checker App allows you to retrieve weather information using latitude and longitude coordinates via the OpenWeather API.

## Table of Contents

- [TP2 DevOps: Meteo Checker App And Auto-deployment on Docker](#tp2-devops-meteo-checker-app-and-auto-deployment-on-docker)
  - [Table of Contents](#table-of-contents)
  - [Lab Aims](#lab-aims)
  - [Languages Used](#languages-used)
  - [Dependencies](#dependencies)
  - [Application Structure](#application-structure)
  - [Security](#security)
    - [Trivy](#trivy)
    - [Docker Scout](#docker-scout)
  - [How To Use](#how-to-use)
    - [Node.js](#nodejs)
    - [Docker](#docker)
  - [API Key](#api-key)
  - [Example Queries](#example-queries)
  - [Example Response](#example-response)
  - [Automation \& GitHub Workflow](#automation--github-workflow)
    - [Steps](#steps)
  - [Conclusion](#conclusion)
## Lab Aims

* We should use the app as an API ✓
* **Run** the app Docker image with `docker run -p 8080:8080 --env API_KEY="YOUR API KEY" noebrt/meteo_checker` ✓
* **Request** our app with a **cURL query**: `curl "http://localhost:8080/?lat=48.75722028315804&lon=2.3261414356815058"` ✓
* Automate the build and the push of a Docker image after each push with a **GitHub Action Workflow** ✓
* No sensitive variables should be stored in the app files ✓
* The Dockerfile should be checked with Hadolint before Docker build ✓

## Languages Used

JavaScript (Node JS Alpine 3.19)

## Dependencies

* Npm 10.5.2
* Openssl 3.1.4-r6
* Tar 1.35-r2
* Dotenv 16.4.5 (Usage of environment variables)
* Express 4.19.2 (Creation of the API)

The choice of versions is related to their lack of vulnerabilities.

## Application Structure
The application is composed of two JavaScript scripts:
* **OpenWeatherAPIWrapper.js** : contains a method that sends a request to OpenWeatherAPI with four parameters: lat, lon, appid, and metrics
* **Index.js** : contains the methods for **our** API: "/" path with lat and lon parameter uses OpenWeatherAPIWrapper.js method to return the response
  - if one of the parameters is not selected or there is any error with the request, a code 500 error message is displayed
* **A Dokerfile** Contain the instruction for the creation of an Docker Image
* ***A Github Workflow*** : build_and_push.yml contains the instructions to execute in a virtual machine during a github push.  
 

## Security

0 Vulnerabilities detected on Trivy or Docker Scout

### Trivy

```sudo docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:0.18.3 noebrt/meteo_checker```
<img width="900" alt="Capture d’écran 2024-04-13 à 21 14 46" src="https://github.com/efrei-ADDA84/20230580/assets/94910317/4d6d82c8-0481-4631-91b3-32652f017234">

### Docker Scout

<img width="900" alt="Capture d’écran 2024-04-13 à 21 20 28" src="https://github.com/efrei-ADDA84/20230580/assets/94910317/4f900040-1df5-4aae-b25d-e3e34509e270">

## How To Use

Two ways of using the API

### Node.js

* Install npm and Node.js
* Load the dependencies seen above with npm install
* Add your API key as an API_KEY variable in a .env file
* Run `node index.js`
* Query the API with a cURL request or in your browser: `curl "http://localhost:8080/?lat=' your latitude '&lon=' your longitude '"`

### Docker

1. Make sure you have Docker installed on your system.
2. Pull the Docker image with the following command: `docker pull noebrt/meteo_checker:latest`
3. Run the Docker container on the PORT 8080 with the following command, replacing the placeholders with your actual OpenWeather API key (We could also use a build ARG with my own API key, but it can cause API request limit issues):
```
docker run -p 8080:8080 --env API_KEY="YOUR API KEY" noebrt/meteo_checker
```
4. Query the API with a cURL request or in your browser: `curl "http://localhost:8080/?lat=' your latitude '&lon=' your longitude '"`

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
Response:

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

## Automation & GitHub Workflow

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

The workflows use some GitHub actions to build and publish a Docker image on DockerHub.

**NO SENSITIVE VARIABLE ARE ACCESSIBLE OR STORED, DOCKER CREDENTIALS AND API KEY IS STORED IN GITHUB SECRETS ENV**

### Steps

The Meteo_Checker app workflow is structured in a few steps:

* Checkout the repository
* Check the conformity of the Dockerfile with **Hadolint**, if not, the action is **aborted**
* Login to Docker Hub with the credentials store
 as **GitHub Secrets Variables**
* Build the Docker image as noebrt/meteo_checker:latest
* Push the image on noebrt/meteo_checker:latest DockerHub Repository

## Conclusion 

This lab showed me the importance of having a smooth process to deploy our applications. It's going to be really helpful for my Edge AI work at Ecole Polytechnique. We need to figure out how to set up a Nvidia Deepstream Computer Vision app on a bunch of Nvidia Jetson Nano devices, and there are a lot of Nvidia Dependancies to deal with. Having a solid way to get things up and running is key, and what I learned here will be super useful for that. It's my first step toward setting up a real CI/CD pipeline.

