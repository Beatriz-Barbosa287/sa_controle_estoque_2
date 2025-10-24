
# Sistema de Controle de Estoque - Almoxarifado Central Ltda.

## Descrição do Projeto
Este projeto foi desenvolvido como um MVP (Produto Mínimo Viável) para gerenciar o estoque de produtos de escritório de forma eficiente, substituindo planilhas manuais. O sistema permite registrar produtos, movimentações de entrada e saída, além de fornecer uma visão geral do estoque para gestores e operadores.

O projeto foi construído com **Next.js** (App Router), **MongoDB** com Mongoose, autenticação com **JWT** e senha simples para dois usuários (gestor e operador), e estilização simples em HTML/JSX.



## Estrutura de Pastas

```

/estoque
│
├─ app/
│   ├─ login/page.tsx                # Tela de login
│   ├─ dashboard/page.tsx            # Dashboard gestor
│   ├─ gestaoestoque/page.tsx        # Tela de gestão de estoque
│   ├─ products/page.tsx             # CRUD de produtos (gestor)
│   └─ movements/page.tsx            # Movimentações (operador e gestor)
│
├─ app/api/
│   ├─ login/route.ts                # Autenticação
│   ├─ products/route.ts             # API produtos
│   ├─ movements/route.ts            # API movimentações
│   └─ gestaoestoque/route.ts        # API resumo estoque
│
├─ lib/
│   └─ auth.ts                       # Função utilitária para extrair usuário do token
│
├─ models/
│   ├─ User.ts
│   ├─ Product.ts
│   └─ Movement.ts
│
├─ controllers/
│   ├─ productController.ts
│   ├─ movementController.ts
│   ├─ usuarioController.ts
│   └─ gestaoEstoqueController.ts
│
├─ scripts/
│   ├─ products-seed.js
│   ├─ movements-seed.js
│   └─ initUsuario.js
│
├─ package.json
└─ .env.local

```


## Bibliotecas Utilizadas

- **Next.js**: Framework React para desenvolvimento Fullstack
- **React**: Construção de interfaces do usuário
- **MongoDB + Mongoose**: Banco de dados NoSQL e modelagem de dados
- **jsonwebtoken (JWT)**: Autenticação baseada em token
- **Node.js / npm**: Execução do servidor e instalação de dependências


## Usuários e Roles

| Usuário   | Senha | Role     | Telas Acessíveis            |
|-----------|-------|----------|-----------------------------|
| operador  | 123   | operador | Movimentações              |
| gestor    | 456   | gestor   | Dashboard, Produtos, Movimentações, Gestão de Estoque |


## Funcionalidades Implementadas

### Login
- Autenticação via JWT
- Redirecionamento automático:
  - Gestor → `/dashboard` → acesso a `/products`, `/movements`, `/gestaoestoque`
  - Operador → `/movements`
- Token válido por 1 hora
- Front-end protege páginas sensíveis baseado na role

### Produtos (Gestor)
- CRUD completo: criar, listar, editar (não implementado edição simples), deletar (opcional)
- Destaque visual para produtos abaixo da quantidade mínima (vermelho)
- Listagem completa com nome, SKU, quantidade atual e mínima

### Movimentações (Operador e Gestor)
- Registro de entrada e saída de produtos
- Seleção de produto e quantidade
- Atualiza automaticamente a quantidade atual do produto
- Histórico completo de movimentações com operador e data

### Gestão de Estoque / Dashboard (Gestor)
- Resumo do estoque:
  - Total de produtos
  - Produtos abaixo do mínimo
  - Total de movimentações
- Botões de navegação para todas as áreas de gestão


## Scripts de Inicialização

1. **Criar usuários**: `node scripts/initUsuario.js`
2. **Popular produtos**: `node scripts/products-seed.js`
3. **Popular movimentações**: `node scripts/movements-seed.js`


## Lógica de Programação

1. **Login**
   - Usuário envia `username` e `password` → API valida → gera JWT
   - Front-end guarda token → redireciona de acordo com role
2. **Proteção de rotas**
   - Front-end: verifica token e role antes de renderizar página
   - Back-end: valida token em rotas sensíveis (`products`, `movements`, `gestaoestoque`)
3. **Produtos**
   - CRUD básico usando Mongoose
   - Destaque visual de produtos críticos
4. **Movimentações**
   - Criação de movimentação → atualiza quantidade atual do produto
   - Histórico completo disponível
5. **Gestão de estoque / Dashboard**
   - Consulta produtos e movimentações
   - Calcula totais e produtos críticos


## Desafios Solucionados

- Implementar **login simples com roles** e redirecionamento correto
- Atualizar quantidade do produto automaticamente ao registrar movimentações
- Criar **API genérica protegida com JWT**
- Gerenciar **usuários, produtos e movimentações** de forma integrada
- Criar **scripts de seed** para popular o banco rapidamente
- Construir **front-end funcional e simples** sem dependências complexas de CSS/Frameworks


## Diagrama de Fluxo da Lógica de Programação

```

[Usuário abre sistema]
|
v
[Login: username + password]
|
v
[Validação Login via JWT]
|
+--> [Token válido?] --Não--> [Erro: usuário ou senha inválidos]
|
Sim
|
+--> [Role: operador?] --Sim--> [Redireciona /movements]
|                           |
|                           v
|                     [Registrar movimentações]
|
+--> [Role: gestor?] --Sim--> [Redireciona /dashboard]
|
v
[Acessa dashboard, produtos, gestaoestoque, movimentações]
|
v
[Consultar produtos / registrar movimentações / atualizar estoque]
|
v
[Front-end atualiza tabela e cores]
|
v
[Usuário logado e token válido]

```


## Observações Finais

- Projeto é **MVP funcional**: login, produtos, movimentações e gestão de estoque
- **Front-end simples** usando HTML/JSX puro com Next.js
- **Banco de dados** MongoDB com Mongoose
- **Autenticação segura** com JWT
- Código organizado em **models, controllers, scripts e APIs**
- Fácil de expandir futuramente para: edição de produtos, gráficos no dashboard, múltiplos usuários, etc.



