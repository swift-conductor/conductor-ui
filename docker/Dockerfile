#
# conductor:server - Combined Swift Conductor Server & UI
#
# ===========================================================================================================
# 0. Builder stage
# ===========================================================================================================
FROM alpine:3.19 AS builder

LABEL maintainer="Swift Software Group <hello@swiftsoftwaregroup.com>"

# ===========================================================================================================
# 0. Build Conductor Server
# ===========================================================================================================
ARG WF_SERVER
RUN echo $WF_SERVER

ENV WF_SERVER=$WF_SERVER

# Install dependencies
RUN apk add --update nodejs npm yarn
RUN apk add git

# Build UI
WORKDIR /

RUN mkdir ui-build
WORKDIR  ui-build

RUN git clone https://github.com/swift-conductor/conductor-ui.git
WORKDIR conductor-ui
RUN ls -ltr

# Include monaco sources into bundle (instead of using CDN)
ENV REACT_APP_MONACO_EDITOR_USING_CDN=false

# build
RUN npm install && cp -r node_modules/monaco-editor public/ && npm run build
RUN echo "Done building UI"

# ===========================================================================================================
# 1. Bin stage
# ===========================================================================================================
FROM alpine:3.19

LABEL maintainer="Swift Software Group <hello@swiftsoftwaregroup.com>"

RUN apk add nginx

# Copy compiled UI assets to nginx www directory
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /ui-build/conductor-ui/build .

# Copy nginx config
COPY docker/nginx/nginx.conf /etc/nginx/http.d/default.conf

# Startup files
RUN mkdir -p /app
COPY docker/bin /app
RUN chmod +x /app/startup.sh

CMD [ "/app/startup.sh" ]
ENTRYPOINT [ "/bin/sh"]