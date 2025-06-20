FROM node:alpine AS build
WORKDIR /app
COPY *.js *.ts *.json index.html ./
COPY ./src ./src
RUN npm install
RUN npm run build
RUN npm prune --production

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./src /usr/share/nginx/html

EXPOSE 80
