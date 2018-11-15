FROM httpd:2.4

ARG VERSION
ARG REPOSITORY
ARG MICROSERVICE
ARG CHILDFOLDER=/

LABEL version="${VERSION}" \
      repository="${REPOSITORY}" \
      microservice="${MICROSERVICE}"

RUN mkdir -p /usr/local/apache2/htdocs/$CHILDFOLDER
COPY ./build/ /usr/local/apache2/htdocs/$CHILDFOLDER

WORKDIR /usr/local/apache2/

RUN chown -R daemon:daemon htdocs &&\
    chmod -R 755 htdocs
