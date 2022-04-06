# O projeto

Este é um projeto desenvolvido para o desafio técnico do processo seletivo da empresa Lemon Energia. Se trata de um endpoint de uma API Rest que determina se possíveis clientes são elegíveis para receber os serviçoes da empresa. O endpoint recebe dados, no formato json, sobre o consumo de energia elétrica do cliente e emite um relatório de eligibilidade, também nesse formato.

# Funcionalidades

- Validação de dados de entrada
- Emissão de relatórios de eligibilidade
- Testes unitários e de integração cobrindo mais de 90% das linhas da pasta "src"

# Iniciando

## Pré-requisitos

Esta aplicação requer o pacote "NPM" e um cliente HTTP, como "Postman", "Insomnia" ou "HTTPie"

## Instalação

1. Primeiro, clone o repositório:
- `git clone git@github.com:LucianoAAP/teste-backend-lemon.git`
2. Depois, entre no repositório:
- `cd teste-backend-lemon`
4. Instale as dependências:
- `npm install`

## Iniciando a aplicação

1. Inicie a API com o comando `npm start`
2. Chame a api com o método POST e a url "localhost:3001/eligibility" com um cliente HTTP de sua escolha e uma entrada json válida no corpo da requisição
3. Um relatório de eligibilidade deverá ser criado

# Testando a aplicação

- Para rodar os testes, utilize o comando `npm test`
- Para ver a cobertura, utilize o comando `npm run test:coverage`

# Próximos passos

- Criar um banco de dados para armazenar os relatórios de eligibilidade e os dados dos clientes
- Criar demais rotas para interagir com o banco de dados

# Contato

## Luciano Almeida

- Linkedin: https://www.linkedin.com/in/lucianoaap/
- Github: https://www.linkedin.com/in/lucianoaap/
- Email: lucianoalmeidaap@gmail.com