# Do servidor antigo para o novo: tabela de equivalência

Compara o seu `router` de `personagem` (CommonJS, tudo num arquivo) com o projeto atual (TypeScript, hexagonal).

## 1. Visão geral: onde cada pedaço do arquivo antigo foi parar

| Trecho do arquivo antigo | Onde está agora | Camada |
|---|---|---|
| `require("dotenv/config")` | Prisma lê o `.env` sozinho (CLI e client v6) | config |
| `require("express")` / `express.Router()` | `server.ts` (`express()` + `app.get/post`) | presentation/composição |
| `new PrismaClient({ adapter })` | `infra/database/prisma.ts` | infra |
| `z.object({...})` (validação) | **ainda não existe**. Entra no UseCase ou Controller (exercício) | application |
| `prisma.personagem.findMany()` dentro da rota | `PrismaUserRepository.findAll()` | infra |
| `prisma.personagem.create(...)` dentro da rota | `PrismaUserRepository.save()` | infra |
| Checar se já existe (você não fazia) | `CreateUserUseCase` (`findByEmail`) | application |
| `req.body`, `res.status().json()` | `CreateUserController` / `ListUsersController` | presentation |
| `model Personagem` | `model User` no `schema.prisma` | banco |
| `module.exports = router` | `export class ...` (ES Modules) | sintaxe |

Resumo: **antes a rota fazia tudo** (HTTP + validação + banco). **Agora cada camada faz uma coisa**, e a rota só liga as peças.

## 2. Sintaxe: CommonJS → ES Modules + TypeScript

| Antigo (JS/CommonJS) | Novo (TS/ESM) |
|---|---|
| `const express = require("express")` | `import express from "express"` |
| `const { PrismaClient } = require("...")` | `import { PrismaClient } from "@prisma/client"` |
| `require("./arquivo")` | `import ... from "./arquivo.js"` (com `.js`!) |
| `module.exports = router` | `export class X {}` / `export const x` |
| `function(req, res)` sem tipos | `(req: Request, res: Response)` |
| `"type"` ausente no package.json | `"type": "module"` |
| `node arquivo.js` / `nodemon` | `tsx watch src/server.ts` |
| `catch (error)` | `catch (error: any)` (TS exige decidir o tipo) |
| `const id = Number(req.params.id)` | igual (mas no TS o `id` do seu schema é `String` uuid, então não precisa de `Number`) |

## 3. Prisma: o que mudou e o que não mudou

| Antigo | Novo | Por quê |
|---|---|---|
| `./generated/prisma/client` | `@prisma/client` | Antes você usava o gerador novo (`prisma-client`, Prisma 7) com output próprio. Aqui é o `prisma-client-js` padrão (Prisma 6) |
| `PrismaBetterSqlite3({ url })` adapter | sem adapter | Prisma 7 **exige** adapter. Prisma 6 não |
| `new PrismaClient({ adapter })` | `new PrismaClient()` | idem |
| `id Int @id @default(autoincrement())` (provável) | `id String @id @default(uuid())` | `Number(req.params.id)` deixa de existir |
| `prisma.personagem.*` | `prisma.user.*` | nome do model em minúsculo |
| `findMany`, `create`, `update`, `delete` | **iguais** | a API de consulta é a mesma |

## 4. Rota por rota

### GET `/`: listar

Antigo:
```js
router.get("/", async (req, res) => {
  const todos = await prisma.personagem.findMany();
  res.status(201).json({ detalhe: todos.length, dados: todos });
});
```
Novo, 4 arquivos:
```
server.ts                    app.get("/users", ...)           → liga a rota
ListUsersController.ts       res.status(200).json(users)      → só HTTP
ListUsersUseCase.ts          repository.findAll()             → regra
PrismaUserRepository.ts      prisma.user.findMany()           → banco
```
Observação: seu antigo usava `201` no GET. O correto é `200` (`201` = "criado").

### POST `/`: criar

| Passo no arquivo antigo | Onde está agora |
|---|---|
| `mensagemSchema.parse(req.body)` (Zod) | falta. Seria no Controller (formato do body) |
| `prisma.personagem.create({ data })` | `PrismaUserRepository.save()` |
| `res.status(201).json(...)` | `CreateUserController` |
| `catch → res.status(400)` | `CreateUserController` (`catch`) |
| (novo) email duplicado | `CreateUserUseCase` lança `throw new Error` |

Ideia-chave: o antigo tinha **um bloco `try`** misturando tudo. O novo separa: o UseCase **lança** o erro, o Controller **converte em HTTP**.

### PUT / PATCH / DELETE

**Ainda não existem** no projeto novo. Para criar cada um, repita o ciclo (é sempre a mesma ordem):

1. **Porta**: adicione o método (`update`, `delete`) em `UserRepositoryPort.ts`.
2. **Infra**: implemente em `PrismaUserRepository.ts` (`prisma.user.update({ where: { id }, data })`).
3. **UseCase**: novo arquivo (`UpdateUserUseCase.ts`) com a regra (ex.: o usuário existe?).
4. **Controller**: novo arquivo, lê `req.params.id` e `req.body`.
5. **server.ts**: instancie e registre `app.put("/users/:id", ...)`.

## 5. Bugs no código antigo (para você não repetir)

| Trecho | Problema | Correção |
|---|---|---|
| `GET` com `status(201)` | 201 é para criação | `200` |
| `PUT` no `catch` com `status(201)` | erro respondendo "criado" | `400` ou `404` |
| `{ error: "Erro no put", error }` | chave `error` duplicada (a segunda sobrescreve) | `{ error: error.message }` |
| `PATCH` sem `where` | o `update` do Prisma **exige** `where`, vai dar erro | `where: { id }` |
| `PATCH` sem `res` no sucesso | a requisição fica pendurada | `res.json(...)` |
| `PATCH` lê `texto`, que não existe no model | campo inexistente | usar `nome` / `poder` |
| `DELETE` com `status(404)` no sucesso | 404 = não encontrado | `200` ou `204` |
| `DELETE` usa `idMsg` | variável não existe, vira erro | usar `id` |
| `POST` devolve `mensagemValidade` | devolve o input, não o que foi salvo | devolver `novoPerson` |
| `new PrismaClient` no arquivo da rota | cada arquivo criaria outra conexão | uma instância só (`infra/database/prisma.ts`) |

## 6. Zod: como encaixar no projeto novo

Seu `z.object({ nome: z.string().min(3), ... })` continua válido. Instale com `npm i zod`. Onde colocar:

- **Formato do body** (é string? tem tamanho mínimo?): no **Controller**, porque é validação de entrada HTTP.
- **Regras de negócio** (email já existe): no **UseCase**.

Exemplo no `CreateUserController`:
```ts
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3, "Nome precisa ter no mínimo 3 letras"),
  email: z.string().email("Email inválido"),
});

// dentro do handle:
const { name, email } = createUserSchema.parse(req.body);
```
Se `parse` falhar, cai no `catch` e responde `400`, igual ao seu antigo.

## 7. Modelo mental

```
ANTIGO                          NOVO
router.post("/", async ...      server.ts        → "qual URL chama quem"
  ├ zod.parse                   Controller       → "traduz HTTP, valida formato"
  ├ regra (nenhuma)             UseCase          → "regras do negócio"
  └ prisma.create               Repository       → "fala com o banco"
                                Port (interface) → "contrato entre UseCase e Repository"
                                Entity (User)    → "o dado puro"
```

Vantagem na prática: para trocar SQLite por Postgres, ou Prisma por outra coisa, você só mexe em `infra/`. No antigo, teria de reescrever cada rota.
