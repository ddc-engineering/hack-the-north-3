FROM node:8-alpine AS build
COPY package.json /app/
COPY package-lock.json /app/
WORKDIR /app
RUN npm install
COPY public/ /app/public
COPY src/ /app/src
RUN npm run-script build

FROM nginx:mainline
COPY --from=build /app/build /usr/share/nginx/html
