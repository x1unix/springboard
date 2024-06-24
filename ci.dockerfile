FROM halverneus/static-file-server
ENV FOLDER=/var/www
ENV SHOW_LISTING=false
COPY build /var/www
VOLUME /var/www/config
