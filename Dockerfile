FROM debian:latest as zola-base
RUN apt-get update && apt-get install -y wget
RUN wget -c https://github.com/getzola/zola/releases/download/v0.10.0/zola-v0.10.0-x86_64-unknown-linux-gnu.tar.gz -O - | tar -xz
RUN mv zola /usr/bin
RUN mkdir /site
WORKDIR /site

FROM zola-base as builder
COPY . /site
RUN ls -la
RUN zola build
RUN ls -la /site/public

FROM nginx:stable-alpine
COPY --from=builder /site/public/ /usr/share/nginx/html/
EXPOSE 80
