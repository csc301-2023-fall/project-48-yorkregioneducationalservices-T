# Use an official base image
FROM nginx:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the docker-compose.yml from the build context to the /app directory in the container
COPY docker-compose.yml /app/

# Install Docker Compose
RUN apt-get update && \
    apt-get install -y docker-compose

# Start the services defined in docker-compose.yml when the container starts
CMD ["docker-compose", "-f", "/app/docker-compose.yml", "up", "-d"]
