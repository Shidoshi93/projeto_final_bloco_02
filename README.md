# Projeto Final Bloco 02

Uma aplicação backend desenvolvida com **NestJS** e **TypeORM** para gerenciamento de categorias com suporte a múltiplos ambientes (dev e prod).

## 🚀 Tecnologias

- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript/JavaScript
- **PostgreSQL** - Banco de dados
- **Jest** - Framework de testes

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts          # Módulo principal da aplicação
├── main.ts                # Arquivo de entrada
└── data/
    └── service/
        ├── dev.service.ts  # Configuração para ambiente de desenvolvimento
        └── prod.service.ts # Configuração para ambiente de produção

src/category/             # Módulo de categorias
├── controller/           # Controladores
├── service/             # Lógica de negócio
├── entities/            # Entidades do banco de dados
└── dtos/               # Data Transfer Objects

test/                     # Testes e2e
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd projeto_final_bloco_02
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:

A aplicação utiliza variáveis de ambiente para diferentes ambientes (desenvolvimento, teste e produção). Você **PRECISA** criar os arquivos `.env` correspondentes ao seu ambiente:

```bash
# Para desenvolvimento
cp .env.example .env.development

# Para testes (opcional, usa SQLite em memória)
cp .env.test.example .env.test

# Para produção
cp .env.example .env.production
```

**⚠️ IMPORTANTE:** 
- Cada ambiente tem seu próprio arquivo `.env.<NODE_ENV>`
- A variável `NODE_ENV` determina qual arquivo será carregado
- Ambiente de **teste usa SQLite em memória** (não precisa de MySQL)
- Ambientes de **desenvolvimento e produção usam MySQL**

5. Crie o banco de dados:
```bash
npm run create-db
```

## ▶️ Rodando a Aplicação

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run start:prod
```

### Build
```bash
npm run build
```

## 🧪 Testes

### Testes unitários
```bash
npm test
```

### Testes e2e
```bash
npm run test:e2e
```

## 📚 API Endpoints

### Categorias

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/category` | Lista todas as categorias |
| GET | `/category/:id` | Busca categoria por ID |
| GET | `/category/name/:name` | Busca categorias por nome |
| GET | `/category/is-active/:isActive` | Busca categorias por status ativo/inativo |
| POST | `/category` | Cria uma nova categoria |
| PUT | `/category/:id` | Atualiza uma categoria |
| DELETE | `/category/:id` | Deleta uma categoria |

### Exemplos de Requisições

<details>
<summary><strong>GET - Listar todas as categorias</strong></summary>

```bash
GET http://localhost:3000/category
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "name": "Eletrônicos",
    "description": "Produtos eletrônicos em geral",
    "isActive": true,
    "createdAt": "2025-12-17T10:30:00Z",
    "updateAt": "2025-12-17T10:30:00Z"
  }
]
```
</details>

<details>
<summary><strong>GET - Buscar categoria por ID</strong></summary>

```bash
GET http://localhost:3000/category/1
```

**Resposta (200):**
```json
{
  "id": 1,
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos em geral",
  "isActive": true,
  "createdAt": "2025-12-17T10:30:00Z",
  "updateAt": "2025-12-17T10:30:00Z"
}
```
</details>

<details>
<summary><strong>GET - Buscar categorias por nome</strong></summary>

```bash
GET http://localhost:3000/category/name/eletrônicos
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "name": "Eletrônicos",
    "description": "Produtos eletrônicos em geral",
    "isActive": true,
    "createdAt": "2025-12-17T10:30:00Z",
    "updateAt": "2025-12-17T10:30:00Z"
  }
]
```
</details>

<details>
<summary><strong>GET - Buscar categorias por status (ativo/inativo)</strong></summary>

```bash
GET http://localhost:3000/category/is-active/false
```

**Resposta (200):**
```json
[
  {
    "id": 2,
    "name": "Descontinuado",
    "description": "Produtos descontinuados",
    "isActive": false,
    "createdAt": "2025-12-17T10:30:00Z",
    "updateAt": "2025-12-17T10:30:00Z"
  }
]
```
</details>

<details>
<summary><strong>POST - Criar nova categoria</strong></summary>

```bash
POST http://localhost:3000/category
Content-Type: application/json

{
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos em geral",
  "isActive": true
}
```

**Resposta (201):**
```json
{
  "id": 3,
  "name": "Eletrônicos",
  "description": "Produtos eletrônicos em geral",
  "isActive": true,
  "createdAt": "2025-12-17T10:30:00Z",
  "updateAt": "2025-12-17T10:30:00Z"
}
```
</details>

<details>
<summary><strong>PUT - Atualizar categoria</strong></summary>

```bash
PUT http://localhost:3000/category/1
Content-Type: application/json

{
  "name": "Eletrônicos Atualizados",
  "description": "Produtos eletrônicos - versão atualizada",
  "isActive": true
}
```

**Resposta (200):**
```json
{
  "id": 1,
  "name": "Eletrônicos Atualizados",
  "description": "Produtos eletrônicos - versão atualizada",
  "isActive": true,
  "createdAt": "2025-12-17T10:30:00Z",
  "updateAt": "2025-12-17T11:45:00Z"
}
```
</details>

<details>
<summary><strong>DELETE - Deletar categoria</strong></summary>

```bash
DELETE http://localhost:3000/category/1
```

**Resposta (204):**
```
No Content
```
</details>

## 📝 Scripts Disponíveis

- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia em modo desenvolvimento com hot-reload
- `npm run start:prod` - Inicia em modo produção
- `npm run build` - Compila o TypeScript
- `npm test` - Executa testes unitários
- `npm run test:e2e` - Executa testes end-to-end
- `npm run create-db` - Cria o banco de dados

## 👨‍💻 Autor
- Daniel Ribeiro

**Desenvolvido como projeto final do bloco 02.**
