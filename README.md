# gestao-doacoes-voluntarios
Aplicação web Full-Stack para gestão de campanhas de doações e voluntariado em situações de enchentes, desenvolvida com Vue.js 3, Node.js e Express.js. Projeto acadêmico da UNIVALI.

📄 **[Documentação técnica completa](docs/DOCUMENTACAO.md)**: contexto social, telas e rotas, contrato da API e modelagem de dados.

## Pré-requisitos
- Node.js 20 ou superior
- npm

## Como executar

### Backend (porta 3000)
```bash
cd backend
npm install
npm start
```

### Frontend (porta 5173)
Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

Depois acesse http://localhost:5173.

## Endpoints da API

| Método | Rota | Descrição | Status |
|---|---|---|---|
| GET | `/api/campanhas` | Lista as campanhas | 200 |
| GET | `/api/campanhas/:id` | Detalhes de uma campanha | 200, 400, 404 |
| GET | `/api/doacoes` | Lista as doações registradas | 200 |
| POST | `/api/doacoes` | Registra uma doação | 201, 400, 404 |
| GET | `/api/voluntarios` | Lista os voluntários registrados | 200 |
| POST | `/api/voluntarios` | Registra um voluntário | 201, 400, 404 |

Os dados ficam em arrays na memória (pasta `backend/data`), então são perdidos ao reiniciar o servidor.

## Rotas do frontend

| Rota | Página |
|---|---|
| `/campanhas` | Listagem das campanhas |
| `/campanhas/:id` | Detalhes de uma campanha |
| `/ajudar/:id` | Formulário de doação ou voluntariado |
| `/doacoes` | Doações registradas |
| `/voluntarios` | Voluntários registrados |
