<h1 align="center">ConSuS</h1>
<p align="center">Plataforma Web voltada para regulação de consultas e procedimentos especializados do Sistema Único de Saúde (SuS)</p>

<h1 align="center">
  <img alt="Consus" title="#" src="assets/logo.png" />
</h1>

![Badge](https://img.shields.io/github/issues/WalistonBelles/consus?color=green)
![Badge](https://img.shields.io/github/forks/WalistonBelles/consus)
![Badge](https://img.shields.io/github/stars/WalistonBelles/consus)
![Badge](https://img.shields.io/apm/l/vim-mode)

### Features

<img alt="Consus" title="#" src="assets/demo1.jpg" />

<img alt="Consus" title="#" src="assets/demo2.jpg" />

- [x] Tela Inicial
- [x] Cadastro de Usuário
- [x] Agenda
- [x] Cadastro de Consultas
- [x] Encaminhamento para Unidade Executante
- [x] Atendimento de Consulta pelo Médico
- [X] Restrição de Acesso baseado em Cargos
- [ ] Tela de Administração para Funcionários
- [ ] Tela de Administração para Médicos
- [ ] Tela de Administração para Administradores
- [ ] Encaminhamento para Fila de Espera
- [ ] Relatórios do Fluxo do Sistema
- [ ] Relatórios do Fluxo de demanda por Exame
- [ ] Relatórios do Fluxo de demanda por Exame

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### Backend
- [NodeJS](https://www.nodejs.org)
- [MYSQL](https://www.mysql.com)
- [Knex.JS](https://www.knexjs.org)
- [Express.JS](https://expressjs.com/pt-br/)
- [Axios](https://www.npmjs.com/package/axios)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Mysql2](https://www.npmjs.com/package/mysql2)

#### Frontend
- [Vue.JS](https://cli.vuejs.org)
- [Axios](https://www.npmjs.com/package/axios)
- [Luxon](https://www.npmjs.com/package/luxon)
- [Vue-Datetime](https://www.npmjs.com/package/vue-datetime-custom)
- [Vue-Chartjs](https://vue-chartjs.org/)
- [Vue-Transitions](https://www.npmjs.com/package/vue2-transitions)
- [Weekstart](https://www.npmjs.com/package/weekstart)



## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/) 
- [Mysql](https://dev.mysql.com/downloads/mysql/)
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)
<br>

```bash
# Clone este repositório
$ git clone <https://github.com/WalistonBelles/consus1>

# Acesse a pasta do projeto no terminal/cmd
$ cd consus

# Vá para a pasta API
$ cd API

# Instale as dependências
$ npm install

# Vá para a pasta database
$ cd database

# Configure suas credenciais de conexão com o banco de dados

connection: {
      host : '127.0.0.1',
      user : 'seuusuárioaqui',
      password : 'suasenhaaqui',
      database : 'nomedoseubancodedados'
    }

# Execute a aplicação
$ node index.js

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```
### 🎲 Rodando a API do Google Agenda
<br>

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd consus

# Vá para a pasta Aplicacao
$ cd API_Agenda

# Instale as dependências
$ npm install

# Acesse o link abaixo para ativar o Google Calander em sua Conta do Google e para gerar um arquivo credentials.json, caso ainda não tenha feito isso.
[API_Agenda](https://developers.google.com/calendar/quickstart/nodejs)

# Acesse a pasta Utility
$ cd Utility

# Coloque seu arquivo credentials.json aqui dentro

# Inicie o serviço:
$ node .

# Ele irá rodar na porta 8080
```

### 🎲 Rodando o Front End (servidor)
<br>

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd consus

# Vá para a pasta Aplicacao
$ cd Aplicacao

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run serve
```

### Autor
---

<a href="https://github.com/WalistonBelles/">
 <img style="border-radius: 50%;" src="assets/autor.jpg" width="100px;" alt=""/>
 <br />
 <sub><b>Waliston Belles</b></sub></a> <a href="https://www.facebook.com/waliston.belles">🚀</a>



[![Gmail Badge](https://img.shields.io/badge/-walistonbelles1@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:walistonbelles1@gmail.com)](mailto:walistonbelles1@gmail.com)