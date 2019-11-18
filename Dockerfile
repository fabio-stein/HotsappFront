# The builder from node image
FROM node:10-jessie as builder

# build-time variables 
# prod|sandbox its value will be come from outside 
ARG env=prod

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json  /app/
RUN cd /app && npm install
COPY .  /app

# Build with $env variable from outside
RUN cd /app && npm run build:$env

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]