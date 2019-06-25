# build
FROM node:10.15 as builder
# create dist
RUN mkdir -p /app
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/
RUN PUBLIC_URL=/app yarn build
RUN find /app -name '*.map' -delete
# craft final image
#FROM nginx
# sources
#WORKDIR /app
#COPY --from=builder /app/build/index.html /app/
#COPY --from=builder /app/build/static /app/app/static/
#COPY --from=builder /app/build/favicons /app/app/favicons/
#COPY default.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx", "-g", "daemon off;"]
CMD [ "npm", "start" ]
