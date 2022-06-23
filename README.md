### Usando Docker

    - Após clonar o repositório em algum diretório em seu computador, abra um terminal e vá até a pasta em que se encontra o repositório.
    - No terminal rode o comando para instalar as dependencias:
        - yarn
    - Renomeie o arquivo .env.example para .env e coloque as váriaveis de ambiente de acordo com sua preferência.
    - Execute o comando docker-compose up --build para montar os containers, rodar as migrations e a aplicação.
    - Abra um novo terminal na pasta do repositório se preferir, e execute os comandos: docker exec -it app_imdb yarn seed:admin e docker exec -it app_imdb yarn seed:users  para popular o banco de dados
    - Caso de algum erro, tente rodar a aplicação localmente por favor ou entre em contato comigo por e-mail ou  telegram se preferir.

### Usando localmente

    - Após clonar o repositório em algum diretório em seu computador, abra um terminal e vá até a pasta em que se encontra o repositório.
    - No terminal rode o comando para instalar as dependencias:
        - yarn
    - Renomei o arquivo .env.example para .env e coloque as váriaveis de ambiente de acordo com sua preferência.
    - Altere o campo "host" no arquivo ormconfig.json para "localhost"
    - No terminal rode os comandos:
        - Para criar o banco de dados: yarn seed:database
        - Para criar as tabelas: yarn migration:run
        - Para criar os usuarios: yarn seed:users
        - Para popular o banco de dados: yarn seed:data
        - Para rodar a aplicação: yarn start:dev ou yarn start
