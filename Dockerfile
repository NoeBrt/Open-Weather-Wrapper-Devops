# Step 1: Specify the base image
FROM node:alpine3.19

# It's good practice to handle non-root user for security purposes
# Step 2: Create a user to run your application (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Step 3: Set the working directory in the container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json before running npm install
# allows for Docker's layer caching to speed up builds, as dependencies
# will only be re-installed if these files change.
COPY package*.json ./

# Step 4: Install dependencies
# install the npm patch that correct the tar vulnerability
RUN npm install -g npm@10.5.2 && npm cache clean --force

# Step 5: Install system dependencies (if any)
RUN apk update && apk upgrade && apk add --no-cache openssl
# install tar 6.2.1 
RUN apk add --no-cache tar --version "6.2.1"

COPY . .
RUN npm install dotenv
# Step 6: Expose the port your app runs on
EXPOSE 3000
# Step 7: Use the non-root user to run your application

USER appuser
# Step 8: Define the command to run your app using CMD which defines your runtime
CMD ["node", "index.js"]
