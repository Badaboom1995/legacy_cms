# # build
# FROM node:10.15 as builder
# # create dist
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json yarn.lock /app/
# RUN yarn install
# COPY . /app/
# RUN PUBLIC_URL=/app yarn build
# RUN find /app -name '*.map' -delete
# # craft final image
# #FROM nginx
# # sources
# #WORKDIR /app
# #COPY --from=builder /app/build/index.html /app/
# #COPY --from=builder /app/build/static /app/app/static/
# #COPY --from=builder /app/build/favicons /app/app/favicons/
# #COPY default.conf /etc/nginx/conf.d/default.conf
# #CMD ["nginx", "-g", "daemon off;"]
# CMD [ "npm", "start" ]



# build
FROM node:10.15 as builder
# create dist

# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json yarn.lock /app/

WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY ./ /app/
RUN npm run build

# COPY package*.json /app/
# RUN yarn install
# COPY ./ /app/
# RUN npm run build
# craft final image
FROM nginx
# sources
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/build/static /usr/share/nginx/html/b2t/constructor/static
RUN rm -rf /usr/share/nginx/html/static
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]

