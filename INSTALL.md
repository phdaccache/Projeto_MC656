# Instalação

Após instalar a versão 20.12.2 (LTS) do [NodeJS](https://nodejs.org/en/download) e [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) e a ultima versão do [Docker](https://docs.docker.com/engine/install/), clone o repositório:

```bash
git clone git@github.com:phdaccache/Projeto_MC656.git
cd Projeto_MC656
```

Alterando a branch para `develop` (para ter as alterações mais recentes):

```bash
git fetch
git checkout develop
```

A branch `main` também pode ser utilizada, e contém a versão recente mais estável:

```bash
git fetch
git checkout main
```

## Inicialização do Banco de Dados

O Banco de Dados está configurado para usar a porta `5432`.

Execute o seguinte comando na raiz do projeto para iniciar o Docker:

```bash
sudo docker compose up -d
```

Inicialize, também, as tabelas:

```bash
psql -d postgresql://backend_user:S3cret@localhost/olimpiada -f ./backend/src/tests/init-db.sql
```

> Observação: Certifique-se que o PostgreSQL está utilizando a encodificação UTF8 para que as tabelas sejam iniciadas corretamente. Uma maneira de ajustar isso "manualmente" é utilizando os seguintes comandos:
> ```bash
> psql -d postgresql://backend_user:S3cret@localhost/olimpiada
> \encoding UTF8
> \i ./backend/src/tests/init-db.sql
> ```

## Inicialização do servidor Backend

O Backend está configurado para usar a porta `3333`.

Inicializando:

```bash
cd backend
npm install
npm run dev
```

## Inicialização do servidor Frontend

O Frontend está configurado para usar a porta `3000`.

Inicializando:

```bash
cd ../frontend
npm install
npm start
```
