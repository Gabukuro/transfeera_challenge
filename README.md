# CRUD de recebedores 

O objetivo deste projeto é realizar uma aplicação para cadastro de recebedores.

## 🧱 Construído com

O projeto foi desenvolvido com as seguintes ferramentas:

- [Docker](https://docs.docker.com/engine/install/)
- [NodeJs](https://nodejs.org/en/download/)
- [React.js](https://reactjs.org/)

## 📦 Instalando dependências

Inicie um contêiner com o banco de dados do projeto já configurado
```
$ docker-compose up -d
```

Instale as dependências do servidor
```
$ cd backend/
$ npm i 
```

Instale as dependências do frontend
```
$ cd frontend/
$ npm i
```

## 🚀 Iniciando o projeto

### Servidor
- <strong>Docker:</strong> <br>
    Se você já iniciou o cotainer com o comando `docker-compose up -d`, e não aconteceu nenhum erro, é provavel que você já tenha em mãos o gerenciador de bando de dados Adminer rodando na porta `8080` e bancos de dev e teste já criados, use o usuário `root` e a senha `changeme`.

- <strong>Testes:</strong> <br>
    Antes de rodar os testes rode o comando para realizar as migrações pendentes no ambiente de dev.
    ```
    $ npm run pretest
    ```
    A partir de agora você poderá rodar os comandos de testes de integração e unitários.
    ```
    // testes unitários
    $ npm run test:unit 

    // testes de integração
    $ npm run test:integration
    ```

- <strong>Start:</strong> <br>
    Para rodar as migrações e seed inicial da aplicação basta rodar os comandos:
    ```
    $ npm run db:migrate

    $ npm run db:seed
    ```
    Para rodar o servidor da aplicação basta rodar o seguinte comando:
    ```
    $ npm run dev
    ```

- [Documentação da API](https://documenter.getpostman.com/view/20776981/UyrGCaWs)

### Frontend
- <strong>Storybook:</strong> <br>
    O frontend possui um storybook para auxiliar na construção de componentes isolados do sistema, caso você queira acessá-lo basta rodar o seguinte comando dentro do diretório. 
    ```
    $ npm run storybook
    ```
    Ao rodar este comando o projeto do storybook irá compilar, e quando terminar será possível acessá-lo na porta `6006`.

- <strong>Start:</strong> <br>
    Para iniciar o frontend da aplicação é preciso rodar o comando:
    ```
    $ npm start
    ```