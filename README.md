# Artefact Tasks

[English](#english) · [Português](#português)

## English

Fullstack task manager built with Next.js (App Router) and tRPC. Tasks are kept in memory on the server, with no database.

**Features:** create, list, edit and delete tasks, with infinite scroll on the list (newest first).

### Stack

Next.js 16 · React 19 · tRPC 11 · TanStack Query 5 · Zod 4 · Tailwind CSS 4 · shadcn/ui (Base UI)

### How it works

```
src/
  app/                    page and tRPC Route Handler (/api/trpc)
  components/tasks/       task UI components
  lib/task.ts             task Zod schema (shared by client and server)
  server/                 in-memory repository
  trpc/                   tRPC setup and routers
```

- **Model:** each task has an `id` (UUID generated on the server), `title` (required, up to 100 characters), `description` (optional, up to 500) and `createdAt`. The fields from the challenge were named in English: `titulo` → `title`, `descricao` → `description`, `dataCriacao` → `createdAt`.
- **API:** the `task` router exposes `list`, `getById`, `create`, `update` and `delete`. Inputs are validated with the same Zod schema used by the form. Unknown ids return `NOT_FOUND`.
- **Storage:** a `Map` stored on `globalThis`. Next loads the module more than once (Route Handler and Server Components) and reloads it on hot reload. `globalThis` makes all of them share the same list. Data is lost when the server restarts.
- **Pagination:** cursor-based (`createdAt` plus `id` as a tiebreaker). Unlike offset pagination, it doesn't repeat or skip tasks when others are created or deleted while scrolling.
- **Rendering:** the first page is fetched on the server and sent ready to the client, which handles further pages and mutations with TanStack Query. `superjson` preserves the `Date` type between server and client.

### Running

Requirements: Node.js 20.9+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

To run the production build:

```bash
pnpm build
pnpm start
```

---

## Português

Gerenciador de tarefas fullstack feito com Next.js (App Router) e tRPC. As tarefas ficam em memória no servidor, sem banco de dados.

**Funcionalidades:** criar, listar, editar e excluir tarefas, com scroll infinito na listagem (mais novas primeiro).

### Stack

Next.js 16 · React 19 · tRPC 11 · TanStack Query 5 · Zod 4 · Tailwind CSS 4 · shadcn/ui (Base UI)

### Como funciona

```
src/
  app/                    página e Route Handler do tRPC (/api/trpc)
  components/tasks/       componentes da interface de tarefas
  lib/task.ts             schema Zod da tarefa (compartilhado entre client e server)
  server/                 repositório em memória
  trpc/                   configuração do tRPC e routers
```

- **Modelo:** cada tarefa tem `id` (UUID gerado no servidor), `title` (obrigatório, até 100 caracteres), `description` (opcional, até 500) e `createdAt`. Os campos do enunciado foram nomeados em inglês: `titulo` → `title`, `descricao` → `description`, `dataCriacao` → `createdAt`.
- **API:** o router `task` expõe `list`, `getById`, `create`, `update` e `delete`. As entradas são validadas com o mesmo schema Zod usado no formulário. Ids inexistentes retornam `NOT_FOUND`.
- **Armazenamento:** um `Map` guardado em `globalThis`. O Next carrega o módulo mais de uma vez (Route Handler e Server Components) e o recarrega no hot reload. O `globalThis` garante que todos usem a mesma lista. Os dados são perdidos ao reiniciar o servidor.
- **Paginação:** baseada em cursor (`createdAt` + `id` como desempate). Diferente do offset, não repete nem pula tarefas quando outras são criadas ou excluídas durante a rolagem.
- **Renderização:** a primeira página é buscada no servidor e enviada já pronta ao client, que continua a paginação e as mutations com TanStack Query. O `superjson` preserva o tipo `Date` entre servidor e client.

### Como executar

Requisitos: Node.js 20.9+ e pnpm.

```bash
pnpm install
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Para rodar a versão de produção:

```bash
pnpm build
pnpm start
```
