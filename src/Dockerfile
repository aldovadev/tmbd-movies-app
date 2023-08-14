# Stage 1: Build
FROM node:14.17.0 as build

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the entire project content to the working directory
COPY . .

# Build the Angular application
RUN npm run build

# Stage 2: Run
FROM nginx:1.21.1-alpine

# Copy Nginx configuration to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular application to the Nginx root directory
COPY --from=build /usr/src/app/dist/aldova-movies-app /usr/share/nginx/html

# Expose port 80 for incoming connections
EXPOSE 80

# Start Nginx in daemon mode
CMD ["nginx", "-g", "daemon off;"]
