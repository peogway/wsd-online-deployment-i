FROM denoland/deno:alpine-1.37.0

EXPOSE 7777

WORKDIR /app

COPY ["handling binary content", "."]


RUN deno cache deps.js

CMD [ "run","--allow-read", "--allow-env", "--allow-net", "--watch", "--unstable", "app.js" ]