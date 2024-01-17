FROM denoland/deno:alpine-1.37.0

EXPOSE 7777

WORKDIR /app

COPY ["Course Project 2/drill-and-pracetice", "."]


CMD [ "run","--allow-read", "--allow-env", "--allow-net", "--watch", "--unstable", "app-launch.js" ]