FROM node:18.17.1-alpine

# Set the working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port that your Node.js app is running on
EXPOSE 8080

# Command to run your application
CMD ["node", "dist/server.js"]
