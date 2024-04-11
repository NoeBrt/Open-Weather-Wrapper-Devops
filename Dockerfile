# Step 1: Specify the base image
FROM node:alpine3.19
# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

COPY . .

EXPOSE 3000

# Step 7: Define the command to run your app using CMD which defines your runtime
CMD [ "node", "index.js" ]
