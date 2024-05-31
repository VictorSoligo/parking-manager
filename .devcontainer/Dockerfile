FROM php:8.3.7-cli

RUN apt-get -y update \
  && apt-get install -y libicu-dev libzip-dev libxml2-dev zip vim iputils-ping

RUN docker-php-ext-install intl mysqli pdo_mysql soap zip

COPY --from=composer:2.0 /usr/bin/composer /usr/local/bin/composer

WORKDIR /backend

COPY ./composer.* .
RUN composer install
RUN mkdir -p writable/cache

ENV CI_ENVIRONMENT=development

EXPOSE 8080

CMD ["php", "spark", "serve", "--host", "0.0.0.0"]