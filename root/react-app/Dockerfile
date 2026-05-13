# Stage 1: Build 

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files 
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . . 

# Build the React app
RUN npm run build

# Stage 2: Runtime

FROM nginx:alpine

# 1. Install curl via apk
# 2. Create custom user and group named 'sairam'
# 3. Assign proper file ownership and permissions for NGINX to run as non-root
RUN apk update && apk add --no-cache curl && \
    addgroup -g 1001 -S sairam && \
    adduser -u 1001 -S sairam -G sairam && \
    chown -R sairam:sairam /usr/share/nginx/html && \
    chown -R sairam:sairam /var/cache/nginx && \
    chown -R sairam:sairam /var/log/nginx && \
    chown -R sairam:sairam /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R sairam:sairam /var/run/nginx.pid /run && \
    chmod -R 755 /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Switch to the custom non-root user
USER sairam

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
