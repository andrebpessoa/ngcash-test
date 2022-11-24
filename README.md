# Processo Seletivo NG.Cash

## Para executar o projeto

Basta utilizar o Docker Compose

## Dependências globais

Você precisa ter duas principais dependências instaladas:

- Node.js LTS v16 ou v18
- Docker Engine v17.12.0 com Docker Compose v1.24.1

Na pasta raiz do projeto, basta executar o comando:

```bash
docker compose up
```

Após executar o comando, o Docker irá criar as intâncias do Frontend, Backend e um banco de dados Postgres na sua máquina local.

Para acessar, bastar entrar no link e logar ou criar sua conta:

```bash
http://localhost:3000/
```

Para derrubar todos os serviços, basta utilizar `CTRL+C`.

<!-- **Caso não seja possível executar o código localmente, ele também pode ser acessado por esse [link](https://ngcash-client-production.up.railway.app/)** -->

## Observações

Já existe uma conta padrão de admin criada automaticamente, para entrar nela, use as seguintes credenciais:

```json
"username": "admin",
"password": "SenhaAdmin123"
```
