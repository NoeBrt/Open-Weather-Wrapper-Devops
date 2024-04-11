# Step 1: Specify the base image
FROM node:alpine3.19

# Step 2: Create a user to run your application (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Step 3: Set the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

# Step 4: Install dependencies
RUN npm install && npm cache clean --force

# Step 5: Install system dependencies (if any)
RUN apk update && apk upgrade && apk add --no-cache openssl

# Copy the rest of your application code
COPY . .

# Step 6: Expose the port your app runs on
EXPOSE 3000

# Step 7: Use the non-root user to run your application
USER appuser

# Step 8: Define the command to run your app using CMD which defines your runtime
CMD ["node", "index.js"]
