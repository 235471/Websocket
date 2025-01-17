# Projeto WebSocket com Socket.io e JWT

Este projeto utiliza **WebSocket**, **Socket.io**, **JWT** (JSON Web Token) e **MongoDB Atlas** para criar uma aplicação de edição de documentos em tempo real. Usuários podem interagir com documentos, visualizar quem está online em cada um e acessar recursos com controle de acesso baseado em autenticação via JWT.

## Funcionalidades

- **Autenticação de Usuários**:

  - Cadastro de usuários com senha criptografada utilizando `crypto` para gerar hashes com sal.
  - Validação de login comparando a senha fornecida com a hash salva no MongoDB Atlas.
  - Geração de um token JWT para autenticação de usuários no frontend.
  - Armazenamento do token JWT no navegador como cookie.

- **WebSocket em Tempo Real**:
  - Uso de `Socket.io` para criar uma comunicação em tempo real entre o frontend e o backend.
  - Implementação de namespaces e middleware para restringir o acesso às páginas e funcionalidades.
  - Handshake de autenticação com token JWT durante a conexão WebSocket.
  - Criação e edição de documentos que podem ser manipulados por múltiplos usuários simultaneamente.
  - Exibição da lista de usuários conectados a cada documento.
  - Redirecionamento de todos os usuários conectados para a página inicial ao apagar um documento.
  - Prevenção para impedir que um usuário abra várias abas do mesmo documento.

## Tecnologias Utilizadas

- **Backend**:

  - `Node.js` com `Express.js`
  - `Socket.io` para WebSockets em tempo real
  - `JWT` para autenticação e gerenciamento de sessões
  - `crypto` para hashing de senhas com sal
  - `MongoDB Atlas` como banco de dados

- **Frontend**:
  - Comunicação com WebSockets via `Socket.io-client`
  - Cookies para armazenar e enviar o token JWT
