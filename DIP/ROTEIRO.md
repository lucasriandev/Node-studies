# Roteiro de estudo: Arquitetura Hexagonal + DIP

Leia **na ordem**. Cada etapa só depende das anteriores. Abra o arquivo citado ao lado do roteiro.

## Mapa mental

```
HTTP (Postman)
   │
   ▼
presentation/  Controller      "traduz" HTTP para chamada de função
   │ chama
   ▼
application/   UseCase         regra de negócio
   │ usa (só o contrato)
   ▼
domain/        Port (interface)  <── contrato
   ▲ implementa
   │
infra/         PrismaUserRepository  fala com o banco
```

**Regra de ouro (DIP):** as setas de *código* (imports) apontam sempre para dentro, em direção ao `domain`.
O `domain` não importa nada de ninguém. O `UseCase` não sabe que Prisma existe.

---

## Etapa 1: Banco de dados (`prisma/schema.prisma`)

É a base. Define **como os dados são guardados**.

- `generator client`: manda o Prisma gerar o código `PrismaClient` em `node_modules`, com tipos TypeScript.
- `datasource db`: qual banco (`sqlite`) e onde (`env("DATABASE_URL")` lê do `.env`).
- `model User`: vira a tabela `User`.
  - `@id`: chave primária.
  - `@default(uuid())`: gera um id aleatório se você não passar um.
  - `@unique`: não permite dois emails iguais (o banco recusa).

Comandos:
- `npx prisma db push`: cria/atualiza as tabelas conforme o schema.
- `npx prisma generate`: gera o `PrismaClient` tipado.
- `npx prisma studio`: interface visual do banco.

## Etapa 2: Entidade (`src/domain/User.ts`)

O objeto "usuário" **puro**, sem banco e sem HTTP.

```ts
constructor(
  public readonly id: string,
  ...
) {}
```
- `public` no parâmetro do construtor: cria a propriedade e já atribui o valor (atalho de TS).
- `readonly`: depois de criada, não pode ser alterada.
- `: string`: anotação de tipo. O TS só confere isso na compilação e depois apaga.

## Etapa 3: Porta (`src/domain/UserRepositoryPort.ts`)

O **contrato**: "quem quiser guardar usuários tem que saber fazer isto".

- `interface`: só descreve a forma (nomes, parâmetros, retornos). Não tem código e some no JS final.
- `Promise<void>`: função assíncrona que não devolve valor.
- `Promise<User | null>`: devolve um `User` ou `null` (não achou). O `|` significa "ou".
- `import type`: importa só para checar tipos. Não existe em tempo de execução.

Por que vem antes do Prisma? Porque o caso de uso (Etapa 4) depende **deste contrato**, não do banco.

## Etapa 4: Caso de uso (`src/application/use-cases/`)

Aqui fica a **regra de negócio**.

`CreateUserUseCase.ts`:
- `constructor(private userRepository: UserRepositoryPort) {}`: recebe **qualquer coisa que cumpra o contrato**. Esta é a *injeção de dependência*. O tipo é a interface, não o Prisma.
- `async execute(name, email)`: o método que faz o trabalho.
- `await`: espera a Promise terminar antes de seguir.
- Fluxo: busca por email → se existe, `throw new Error(...)` → cria `new User(crypto.randomUUID(), ...)` → `save` → devolve.
- `throw`: interrompe e "joga" o erro para quem chamou (o controller captura).

`ListUsersUseCase.ts`: só repassa para `findAll()`.

## Etapa 5: Adaptador de infra (`src/infra/`)

Aqui o contrato **vira realidade** com o Prisma.

- `database/prisma.ts`: cria **uma** instância de `PrismaClient` (cada instância abre conexões).
- `repositories/PrismaUserRepository.ts`:
  - `implements UserRepositoryPort`: o compilador exige todos os métodos do contrato.
  - `this.prisma.user.create({ data })`: INSERT.
  - `findUnique({ where: { email } })`: SELECT por campo único. Retorna objeto ou `null`.
  - `findMany()`: SELECT de todos.
  - `new User(...)`: **traduz** o objeto do Prisma para a entidade do domínio, para o resto do sistema não depender do formato do Prisma.

## Etapa 6: Controller (`src/presentation/controllers/`)

Traduz **HTTP ↔ caso de uso**. Não tem regra de negócio.

- `Request` / `Response`: tipos do Express. `req.body` é o JSON enviado; `res` é como você responde.
- `const { name, email } = req.body;`: desestruturação, pega as duas propriedades do objeto.
- `res.status(201).json(user)`: define o código HTTP e envia JSON.
- `try / catch`: se o caso de uso lançar erro, vira resposta `400` (ou `500` na listagem).

Códigos: `200` ok, `201` criado, `400` erro do cliente, `404` rota não existe, `500` erro do servidor.

## Etapa 7: Composição (`src/server.ts`)

O **único lugar** que conhece todas as peças e as conecta. Leia de baixo pra cima da dependência:

```
prisma → PrismaUserRepository(prisma) → CreateUserUseCase(repo) → CreateUserController(useCase)
```
1. `express()` cria o app.
2. `app.use(express.json())`: middleware que lê o body JSON e preenche `req.body`. Sem ele, `req.body` é `undefined`.
3. Monta a corrente de objetos acima (cada um recebe o anterior no construtor).
4. `app.post("/users", (req, res) => controller.handle(req, res))`: "quando chegar POST em /users, chame isto". `app.get` é igual, para GET.
5. `app.listen(3000, ...)`: começa a escutar na porta.

Por que a arrow function `(req, res) => ...`? Para manter o `this` do controller correto. Passar `controller.handle` direto perderia o `this`.

---

## Sintaxes que mais confundem

| Sintaxe | Significa |
|---|---|
| `import x from "a"` | importa o export **default** |
| `import { x } from "a"` | importa o export **nomeado** |
| `export class X` | torna a classe importável |
| `.js` nos imports | exigência do `NodeNext`, mesmo o arquivo sendo `.ts` |
| `async/await` | trabalhar com Promises como se fosse código sequencial |
| `private x` no construtor | cria o atributo privado e atribui |
| `x?.y`, `x ?? 3000` | acesso seguro / valor padrão se `null` ou `undefined` |
| `error: any` | desliga a checagem de tipo (use com cuidado) |

## Fluxo completo de um `POST /users`

1. Postman envia JSON → `express.json()` preenche `req.body`.
2. Rota chama `controller.handle`.
3. Controller extrai `name`, `email` e chama `useCase.execute`.
4. UseCase chama `repository.findByEmail` (via **interface**).
5. A implementação Prisma faz o SELECT. Se achou, o UseCase lança erro → controller responde `400`.
6. Se não achou, cria `User`, chama `save` → Prisma faz o INSERT.
7. Controller responde `201` com o usuário.

## Exercícios (na ordem)

1. Em `server.ts`, troque `3000` por `process.env.PORT ?? 3000`. Rode.
2. Faça o `POST` com `name` vazio. Hoje ele aceita. Valide no **UseCase** e lance erro.
3. Adicione `GET /users/:id`. Siga as etapas: porta (`findById`) → Prisma → UseCase → Controller → rota. Use `req.params.id`.
4. Crie `InMemoryUserRepository` (um array) que implementa a mesma porta e troque no `server.ts`. Nada mais deve mudar. **Esse é o DIP na prática.**
5. Tente importar `PrismaClient` dentro de `domain/`. Pergunte-se por que isso quebraria a arquitetura.
