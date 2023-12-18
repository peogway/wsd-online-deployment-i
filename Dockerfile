FROM denoland/deno:alpine-1.37.0

EXPOSE 7777

WORKDIR /app

COPY ["application example 1", "."]


RUN deno cache "application exemple 1"/dep.js

CMD [ "run","--allow-read", "--allow-env", "--allow-net", "--watch", "--unstable", "app.js" ]