# build environment
FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm install dayjs
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build ./app/build /usr/share/nginx/html