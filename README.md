# TP3 DevOps: Meteo Checker App And Auto-push on Azure Container Registery then deployed as an Azure Container Instance

The Meteo Checker App allows you to retrieve weather information using latitude and longitude coordinates via the OpenWeather API.


## Table of Contents

- [TP3 DevOps: Meteo Checker App And Auto-push on Azure Container Registery then deployed as an Azure Container Instance](#tp3-devops-meteo-checker-app-and-auto-push-on-azure-container-registery-then-deployed-as-an-azure-container-instance)
  - [Table of Contents](#table-of-contents)
  - [Lab Aims](#lab-aims)
  - [Languages Used](#languages-used)
  - [Dependencies](#dependencies)
  - [Application Structure](#application-structure)
  - [Security](#security)
    - [Trivy](#trivy)
  - [How To Use](#how-to-use)
  - [Example Queries](#example-queries)
  - [Example Response](#example-response)
  - [Automation \& GitHub Workflow](#automation--github-workflow)
    - [Steps](#steps)
  - [Conclusion](#conclusion)

## Lab Aims

* We should use the app as an API ✓
* **Deploy** our app trought a Azure Container Instance at the endpoint [http://devops-20230580.francesouth.azurecontainer.io:8081/?lat=5.902785&lon=102.754175](http://devops-20230580.francesouth.azurecontainer.io:8081/?lat=5.902785&lon=102.754175) ✓
* Automate the build and the push of a Docker image after each push on ACR with a **GitHub Action Workflow** ✓
* No sensitive variables should be stored in the app files ✓
* The Dockerfile should be checked with Hadolint before Docker build ✓
* Use prometheus to monitor the app at the endpoint **/metrics** : [check here](http://devops-20230580.francesouth.azurecontainer.io:8081/metrics) ✓

## Languages Used

JavaScript (Node JS Alpine 3.19)

## Dependencies

* Npm 10.5.2
* Openssl 3.1.4-r6
* Tar 1.35-r2
* Dotenv 16.4.5 (Usage of environment variables)
* Express 4.19.2 (Creation of the API)
* Prom-client 13.0.0 (Prometheus client for Node.js)

The choice of versions is related to their lack of vulnerabilities.

## Application Structure
The application is composed of two JavaScript scripts:
* **OpenWeatherAPIWrapper.js** : contains a method that sends a request to OpenWeatherAPI with four parameters: lat, lon, appid, and metrics
* **Index.js** : contains the methods for **our** API: "/" path with lat and lon parameter uses OpenWeatherAPIWrapper.js method to return the response and increment the http_requests_total variable of prometeus metrics
  - if one of the parameters is not selected or there is any error with the request, a code 500 error message is displayed
  - "/metrics" for visualise metrics of the api, like http_requests_total for the number of request.
* **A Dokerfile** Contain the instruction for the creation of an Docker Image
* ***A Github Workflow*** : build_and_push.yml contains the instructions to execute in a virtual machine during a github push.  
 

## Security

0 Vulnerabilities detected on Trivy or Docker Scout

### Trivy

```sudo docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:0.18.3 meteo_checker```

![image](https://github.com/efrei-ADDA84/20230580/assets/94910317/c6e5379a-90fc-48c4-b296-f83128f78a63)

## How To Use

Query the API with the ACI Endpoint or in your browser: ```http://devops-20230580.francesouth.azurecontainer.io:8081/?lat=' your latitude '&lon=' your longitude '"```

Check the metrics like the number of request: ```http://devops-20230580.francesouth.azurecontainer.io:8081/metrics```

## Example Queries

Here are some example queries you can use with the Meteo Checker App:

- Retrieve current weather for Villejuif:

  [http://devops-20230580.francesouth.azurecontainer.io:8081/?lat=48.7887654119804&lon=2.3638803269592468](http://devops-20230580.francesouth.azurecontainer.io:8081/?lat=48.7887654119804&lon=2.3638803269592468)

- Get metrics

  [http://devops-20230580.francesouth.azurecontainer.io:8081/metrics](http://devops-20230580.francesouth.azurecontainer.io:8081/metrics)


## Example Response
```
http://devops-20230580.francesouth.azurecontainer.io:8081/?lat=48.7887654119804&lon=2.3638803269592468
```
Response:

![image](https://github.com/efrei-ADDA84/20230580/assets/94910317/19a885f6-999a-48c1-84af-1a47ae88d5cf)

Feel free to explore more queries based on your needs and geographic locations!

## Automation & GitHub Workflow

`build_and_push.yml`
```
name: Build and Push Docker Image

on:
  push:
    branches:
      - Tp3

jobs:
  build_and_push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: 'Login via Azure CLI'
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Check Dockerfile with hadolint
        uses: hadolint/hadolint-action@v3.1.0
        with:
          dockerfile: "./Dockerfile"

      - name: 'Docker Login'
        uses: docker/login-action@v3
        with:
          registry: ${{ secrets.REGISTRY_LOGIN_SERVER }}
          username: ${{ secrets.REGISTRY_USERNAME }}  # You need to define or add this secret if not already done
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: 'Build and Push Image'
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: ${{ secrets.REGISTRY_LOGIN_SERVER }}/20230580:${{ github.sha }}

      - name: 'Deploy to Azure Container Instances'
        uses: 'azure/aci-deploy@v1'
        with:
          resource-group: ${{ secrets.RESOURCE_GROUP }}
          dns-name-label: devops-20230580
          image: ${{ secrets.REGISTRY_LOGIN_SERVER }}/20230580:${{ github.sha }}
          registry-login-server: ${{ secrets.REGISTRY_LOGIN_SERVER }}
          registry-username: ${{ secrets.REGISTRY_USERNAME }}
          registry-password: ${{ secrets.REGISTRY_PASSWORD }}
          name: 20230580
          secure-environment-variables: API_KEY=${{secrets.OPENWEATHER_API_KEY}}
          location: 'francesouth'
          ports: 8081

```

The workflows use some GitHub actions to build an docker image and deploy it as an ACI.

**NO SENSITIVE VARIABLE ARE ACCESSIBLE OR STORED, DOCKER CREDENTIALS AND API KEY IS STORED IN GITHUB SECRETS ENV**

### Steps

The Meteo_Checker app workflow is structured in a few steps:

* Checkout the repository
* Check the conformity of the Dockerfile with **Hadolint**, if not, the action is **aborted**
* Login to Docker with the ACR credentials stored
 as **GitHub Secrets Variables**
* Build and push Docker image on the ACR
* Deploy an ACI that contains the built image with an API_KEY parameter equals to the secret Openweather api variable 

## Conclusion 

Same as the tp2, This lab showed me the importance of having a smooth process to deploy our applications. It's going to be really helpful for my Edge AI work at Ecole Polytechnique. We need to figure out how to set up a Nvidia Deepstream Computer Vision app on a bunch of Nvidia Jetson Nano devices, and there are a lot of Nvidia Dependancies to deal with. Having a solid way to get things up and running is key, and what I learned here will be super useful for that. It's my first step toward setting up a real CI/CD pipeline. The push and deployement on ACR and as ACI show me a new way to store app images but also to use app directly on a cloud.
