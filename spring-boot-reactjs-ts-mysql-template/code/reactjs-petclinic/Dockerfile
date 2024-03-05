#FROM node:14-alpine
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build:prod
#EXPOSE 3000

FROM node:16.10-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
RUN apk add git
RUN npm install
COPY . /app/
RUN npm run build:prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
