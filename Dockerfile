FROM node:16-alpine as builder

# install and cache app dependencies
COPY package.json yarn.lock ./
RUN yarn install && mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

RUN yarn build


# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.17.2-alpine
COPY --from=builder /react-frontend/build /var/www/html
RUN rm /etc/nginx/conf.d/default.conf && rm /etc/nginx/nginx.conf
#копируем два файла конфигов, можно только один
COPY nginx/default.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx
RUN mkdir -p /etc/letsencrypt/live/bmstu-romanov.xyz
COPY certs/ /etc/letsencrypt/live/bmstu-romanov.xyz
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
