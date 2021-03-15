FROM node:15-alpine as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install -g npm@7.6.3 && mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

RUN npm run build


# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.17.2-alpine
COPY --from=builder /react-frontend/build /var/www/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
RUN mkdir -p /etc/letsencrypt/live/bmstu-romanov.xyz
COPY certs/ /etc/letsencrypt/live/bmstu-romanov.xyz
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
