# build
FROM node:10.15 as builder
# create dist
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# craft final image
FROM nginx
# sources
# COPY --from=builder /app/build/ /usr/share/nginx/html
# COPY --from=builder /app/build/static /usr/share/nginx/html/spa/static
# RUN rm -rf /usr/share/nginx/html/static
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
