FROM node:22.7.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD npm run preview
