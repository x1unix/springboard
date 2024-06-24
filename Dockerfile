FROM node:20-alpine AS build
ENV NODE_ENV=production
ENV REACT_APP_BUILD_MODE=docker
WORKDIR /work
COPY . /work
RUN npm ci --silent && npm run build

FROM halverneus/static-file-server
ENV FOLDER=/var/www
ENV SHOW_LISTING=false

COPY --from=build /work/build /var/www
