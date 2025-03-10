# Nome do Projeto

Bem-vindo ao repositório do projeto [Nome do Projeto]! Este projeto consiste em uma aplicação full-stack, com um frontend desenvolvido em React usando TypeScript e um backend em .NET. Abaixo, você encontrará todas as instruções necessárias para configurar e rodar o projeto localmente.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)
- [.NET SDK](https://dotnet.microsoft.com/download) (v8 ou superior)

## Configuração do Projeto

### 1. Instalar Dependências do Frontend

Navegue até a pasta do frontend e instale as dependências necessárias:

cd frontend
pnpm install

### 2. Instalar Dependências do Backend

Navegue até a pasta da API e restaure as dependências do .NET:

cd ../api
dotnet restore

### 3. Configurar base de dados na API

Verifique a base esta configurada no arquivo appsettings.json!

Faça as migrations para criar as tabelas da base:

dotnet ef migrations add nome-da-migtarion
dotnet ef database update

## Executando o Projeto

### 1. Iniciar o Backend

Navegue até a pasta da API e verifique se esta tudo correto:

cd api
dotnet build

Execute o projeto:

dotnet run

### 2. Iniciar o Frontend

Navegue até a pasta do frontend e inicie o servidor de desenvolvimento:

cd ../frontend
pnpm run dev

## Estrutura do Projeto

/frontend: Contém o código-fonte do frontend em React com TypeScript.
    src/: Pasta principal do código React.
    public/: Arquivos estáticos como index.html.
/api: Contém o código-fonte da API em .NET.
    Controllers/: Controladores da API.
    Models/: Modelos de dados.
    appsettings.json: Configuração da base de dados.
    Program.cs: Ponto de entrada da aplicação.

## Comandos Úteis

Instalar dependências do frontend: pnpm install
Rodar o frontend em modo de desenvolvimento: pnpm run dev
Rodar a API: dotnet run
Restaurar dependências do .NET: dotnet restore

Feito com ❤️ por Obertan Barcellos