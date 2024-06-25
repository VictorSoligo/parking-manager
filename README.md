# Gerenciamento de Estacionamento 

## Framework
<p align="center">
    <a href="https://codeigniter.com/" target="_blank">
        <img src="https://codeigniter.com/user_guide/_static/ci-logo-text.svg" width="300" alt="CodeIgniter Framework" />
    </a>
</p>

## Tech stack

<div align=center>
    
![CodeIgniter](https://img.shields.io/badge/CodeIgniter-%23EF4223.svg?style=for-the-badge&logo=codeIgniter&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TypeScrypt](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
</div>

# Overview CodeIgniter
</summary>
<br>
CodeIgniter é um framework de desenvolvimento web open-source para PHP, conhecido por sua simplicidade, desempenho e flexibilidade. Desenvolvido com a intenção de permitir que desenvolvedores criem projetos completos de forma rápida e eficiente, o CodeIgniter é ideal para quem deseja um framework leve, fácil de aprender e altamente customizável.

## Principais Características
- Leve e Rápido: CodeIgniter é um dos frameworks mais leves disponíveis para PHP. Com um núcleo pequeno, ele fornece uma base robusta sem sacrificar a velocidade.
 - Facilidade de Uso: Projetado para ser fácil de aprender, mesmo para aqueles que são novos no PHP. Sua documentação é extensa e clara, facilitando a curva de aprendizado.
 - Desempenho Elevado: CodeIgniter é otimizado para desempenho, garantindo que suas aplicações rodem de forma rápida e eficiente.
 - Alta Flexibilidade: Oferece uma estrutura flexível que permite ao desenvolvedor utilizar apenas o que é necessário, sem imposições rígidas de arquitetura.
 - Ampla Documentação e Comunidade: Possui uma vasta documentação oficial e uma comunidade ativa que contribui com tutoriais, fóruns e recursos adicionais.
 - Suporte a MVC: Adota o padrão de arquitetura Model-View-Controller (MVC), promovendo uma separação clara entre a lógica da aplicação e a apresentação.

## Benefícios no uso do CodeIgniter
- Configuração Mínima: Diferente de outros frameworks que requerem uma configuração extensa, o CodeIgniter funciona com pouca ou nenhuma configuração, o que acelera o início do desenvolvimento.
- Bibliotecas Integradas: Vem com uma série de bibliotecas integradas que facilitam tarefas comuns como manipulação de dados, envio de e-mails, gerenciamento de sessões, entre outras.
- Segurança: Oferece várias funcionalidades de segurança, incluindo proteção contra CSRF e XSS, validação de dados e hashing de senhas.
- Facilidade de Manutenção: A estrutura modular do CodeIgniter torna o código mais organizado e fácil de manter, facilitando a gestão de projetos complexos.
- Compatibilidade com PHP: Totalmente compatível com todas as versões mais recentes do PHP, garantindo que você possa aproveitar os últimos avanços e funcionalidades da linguagem.

## Casos de Uso
- Aplicações Web Dinâmicas: Ideal para o desenvolvimento de portais, blogs, e-commerce e outras aplicações que requerem conteúdo dinâmico e interação com o usuário.
- APIs RESTful: Permite a criação de APIs RESTful de forma simples e eficiente, facilitando a comunicação entre diferentes sistemas e plataformas.
- Sistemas de Gerenciamento de Conteúdo (CMS): Com sua flexibilidade e facilidade de uso, CodeIgniter é uma escolha popular para a criação de CMS personalizados.

CodeIgniter OverView (https://codeigniter.com/user_guide/concepts/index.html#)

## Docker (https://docs.docker.com/engine/install/)
Primeira instalação do docker, é possível executar o script auxiliar **oficial** para facilitar a instalação:

```bash
$ curl https://get.docker.com/ | sh
```
Depois de instalado, talvez seja necessário permitir que o Docker possa executar seus serviços, tradicionalmente através do *systemd*. 
  * [O que é o systemd?](https://learn.microsoft.com/pt-br/windows/wsl/systemd#what-is-systemd-in-linux)
  * [Habilitar systemd](https://learn.microsoft.com/pt-br/windows/wsl/systemd#how-to-enable-systemd)
O Docker inicialmente precisa de privilégio de super usuário, nesse sentido, siga as instruções para habilitar acesso ao seu usuario (https://askubuntu.com/a/477554).

```bash
$ sudo groupadd docker
$ sudo gpasswd -a $USER docker
$ docker run hello-world # Se esse comando funcionar corretamente sem 'sudo', parabéns! Está tudo devidamente configurado. 
```
# Configuração do Docker
## Dockerfile
O Dockerfile define a imagem do Docker para o ambiente PHP. Aqui está um exemplo de Dockerfile
```bash
FROM php:8.3.7-cli
RUN apt-get -y update \
  && apt-get install -y libicu-dev libzip-dev libxml2-dev zip vim iputils-ping nodejs npm tmux
RUN docker-php-ext-install intl mysqli pdo_mysql soap zip 
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
```
## Dockercompose.yml
Crie um arquivo chamado docker-compose.yml na raiz do projeto com o seguinte conteúdo:
```bash
services:
  app:
    build: .
    container_name: app
    init: true
    volumes:
      - ../:/app
    command: sleep infinity
    ports:
      - '3000:3000'
      - '8080:8080'
    depends_on:
      - mysql
  mysql:
    image: mysql:8.3.0
    container_name: mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=parkingmanager
    ports:
      - '3306:3306'
    expose:
      - '3306'
    volumes:
      - database:/var/lib/mysql
      
volumes:
  database:
```

