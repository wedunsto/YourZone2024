# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
