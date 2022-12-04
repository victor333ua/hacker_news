# syntax=docker/dockerfile:1
# https://snyk.io/blog/choosing-the-best-node-js-docker-image/

FROM node:16.17.0-bullseye-slim AS build
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
# installation dependencies
RUN yarn
# src & prisma w/o migrations only
COPY . .
# @prisma/client updated due to schema
RUN yarn prisma generate
# RUN sed -i -e '26749i console.log(e);' node_modules/@prisma/client/runtime/index.js
# ts compilation
RUN yarn build 

FROM gcr.io/distroless/nodejs:16
WORKDIR /app
COPY --from=build /app .
#this files are neccessary for prisma
COPY --from=build /lib/x86_64-linux-gnu/libz.so.1 /lib/libz.so.1
COPY .env.docker .env
ENV CORS_ORIGIN=http://upper.com:3000 PORT=4000

#EXPOSE 4000 connect to arbitrary port in the host, docker ps - we can see to which
#VOLUME /prisma/db create anonimus volume, it's not convenient

CMD ["dist/index.js"]