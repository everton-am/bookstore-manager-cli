# BookStore Manager CLI

Sistema de gerenciamento de livraria desenvolvido em 
ambiente de linha de comando (CLI), utilizando
 arquitetura em camadas, persistência em banco de dados 
 relacional PostgreSQL e tipagem estática com TypeScript.


## 🎯 Objetivo
O projeto tem como objetivo aplicar conceitos de 
desenvolvimento backend, modelagem 
de dados relacional, controle de versão (GitFlow/Commits), 
manipulação assíncrona de dados e construção de 
interfaces interativas via terminal.


## Tecnologias Utilizadas
**Node.js** - Ambiente de execução JavaScript/TypeScript
**TypeScript** - Superset JavaScript com tipagem estática
**PostgreSQL** - Sistema de Gerenciamento de Banco de Dados Relacional
**pg** - Cliente PostgreSQL para Node.js
* **readline-sync** - Biblioteca para entrada de dados síncrona via terminal


##  Requisitos para Execução
Antes de começar, certifique-se de ter instalado:
* Node.js (https://nodejs.org/) (versão 18 ou superior recomendada)
* PostgreSQL (https://www.postgresql.org/) rodando localmente ou em servidor remoto
* Gerenciador de pacotes `npm` (já incluso no Node.js)


##  Configuração do Banco de Dados
1. Crie uma base de dados no seu PostgreSQL (ex: `bookstore_db`).
2. Execute o script SQL estrutural (`schema.sql`) para criar as tabelas necessárias (`autores`, `livros`, `clientes`, `emprestimos`) com as restrições de integridade e cascata (`ON DELETE CASCADE`).
3. Configurar as variáveis de ambiente do banco de dados na aplicação (via arquivo `.env` ou objeto de conexão no diretório `src/database/connection.ts`), informando:
   * `DB_HOST`
   * `DB_USER`
   * `DB_PASSWORD`
   * `DB_NAME`
   * `DB_PORT`


##  Instalação
Clone o repositório e instale as dependências do projeto:

```bash
git clone [https://github.com/everton-am/bookstore-manager-cli.git](https://github.com/everton-am/bookstore-manager-cli.git)
cd Bookstore Manager CLI
npm install

## Execução

*Para compilar o código TypeScript para JavaScript e
 iniciar a aplicação CLI:

* npm run dev (Para executar a aplicação durante o 
 desenvolvimento com recompilação automática)

* npm run build (Para compilar o código TypeScript em JavaScript e iniciar a aplicação compilada)
npm start 

##  Arquitetura do Projeto

* O projeto segue o padrão MVC (Model-View-Controller) 
combinado com o padrão Repository para isolar a regra de 
negócio da camada de acesso a dados:


* Models: Definição das classes/tipos de entidades (Autor, 
Livro, Cliente, Emprestimo).

* Repositories: Comunicação direta com o banco de dados 
PostgreSQL (pool.query).

* Controllers: Regras de negócio intermediárias entre as 
entradas da CLI e os repositórios.

* Views / Menus: Interface de interação textual via 
terminal (readline-sync).

## Funcionalidades Implementadas

* Cadastro e Listagem de Autores (CRUD completo com suporte a exclusão em cascata).

* Cadastro e Listagem de Livros (Gerenciamento de estoque total e disponível).

* Cadastro e Listagem de Clientes.

* Realização de Empréstimos e Devoluções (Controle automático de disponibilidade de livros).

* Relatórios Gerenciais (Consulta avançada utilizando SQL JOIN entre livros e autores).

* Exclusão de Registros por ID para Autores, Livros e Clientes.

## Estrutura de Pastas

src/
├── controllers/       # Controladores com as regras de negócio
├── database/          # Configuração da conexão com o PostgreSQL
├── models/            # Interfaces e classes das entidades
├── repositories/      # Consultas SQL e persistência de dados
├── menus/             # Interface interativa da CLI
├── utils/             # Utilitários de entrada de dados
└── main.ts            # Ponto de entrada da aplicação

## Exemplos de Utilização

* Ao iniciar a aplicação, o menu principal será exibido no terminal:

=========================================
        BOOKSTORE MANAGER CLI
=========================================
1. Cadastrar Autor
2. Listar Autores
-----------------------------------------
3. Cadastrar Livro
4. Listar Livros
-----------------------------------------
5. Cadastrar Cliente
6. Listar Clientes
-----------------------------------------
7. Realizar Empréstimo
8. Registrar Devolução
9. Listar Empréstimos
-----------------------------------------
10. Relatórios Gerenciais
11. Deletar Livro por ID
12. Deletar Cliente por ID
13. Deletar Autor por ID
0.  Sair
=========================================
Escolha uma opção:

## Integrantes da Equipe

** Everton Atanasio de Melo

Link do Kanban

https://trello.com/invite/b/6acaf4c87c4018d98909459d/ATTI544555c97c67c953f63707d51afbb5c671E89BA0/bookstore-manager-cli