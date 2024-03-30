# Meteo Checker App

## Installation 

### docker 
You can pull the dockerimage with
```
docker push noebrt/meteo_checker:latest
```

## Version
Node version : alpine3.19 
no vulnerabilities

## How To Use 

```
docker run --env LAT="31.2504" --env LONG="-99.2506" --env API_KEY="Your Open Weather APi Key"   noebr/meteo_checker:latest
```

