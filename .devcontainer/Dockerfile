FROM php:8.3.7-cli

RUN apt-get -y update \
  && apt-get install -y libicu-dev libzip-dev libxml2-dev zip vim iputils-ping nodejs npm tmux

RUN docker-php-ext-install intl mysqli pdo_mysql soap zip 

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
