# Integrantes

Gabryel Rodrigues Alves da Silva - 235394

Pedro Henrique Antoine Cortez Daccache - 251572

Lawrence Francisco Martins de Melo - 223480

André Rodrigues Alves da Silva - 231392

# Descrição do Projeto

É comum que os alunos de uma escola participem anualmente do interclasses, que é uma competição de futebol entre as turmas. Mas, além do futebol, essa tradicional competição poderia englobar diversos outros esportes também, assim como ocorre nas olimpíadas. Baseado nisso, o software nesse repositório é um sistema de simulação e gerenciamento de olimpíadas para escolas. Esse sistema tem como objetivo principal auxiliar professores e orientadores a organizar um “interclasses olímpico” dentro de seus colégios, bem como fornecer uma plataforma intuitiva para os alunos e funcionários acompanharem os resultados das competições.

# Instalação

Instale a versão 20.12.2 (LTS) do [NodeJS](https://nodejs.org/en/download) e [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) e a ultima versão do [Docker](https://docs.docker.com/engine/install/).
Clone o repositório

```
git clone git@github.com:phdaccache/Projeto_MC656.git && cd Projeto_MC656
```

```
git fetch && git checkout develop
```

Para inicializar o banco de dados, na raiz do projeto execute:

```
sudo docker compose up -d
```

Logo após isso, inicialize o servidor:

```
cd backend
npm install
npm run dev
```
