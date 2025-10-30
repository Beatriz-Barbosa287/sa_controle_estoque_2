# SISTEMA DE CONTROLE DE ESTOQUE
## Almoxarifado Central Ltda. / DevSolutions

=========================================================================
## ESCOPO DO PROJETO
=========================================================================
MVP para gerenciamento de estoque de produtos de escritório:
- Controle de estoque
- Registro de movimentações
- Gestão de usuários (gestor e operador)
- Dashboard com visão geral
- Destaque visual de produtos abaixo da quantidade mínima

=========================================================================
## REQUISITOS FUNCIONAIS
=========================================================================
1. Autenticação de Usuários
   - Login via username e password
   - Redirecionamento baseado na role (gestor ou operador)
   - Criptografia de senhas com bcrypt

2. Gestão de Produtos
   - Cadastro, visualização, edição e exclusão de produtos
   - Campos: Nome, SKU, Quantidade mínima, Quantidade atual
   - Destaque visual para produtos abaixo da quantidade mínima

3. Gestão de Movimentações
   - Registro de entrada e saída de produtos
   - Atualização automática do estoque
   - Histórico completo de movimentações, com operador e data

4. Dashboard
   - Exibe resumo do estoque
   - Lista produtos críticos (quantidade abaixo do mínimo)
   - Total de movimentações realizadas

=========================================================================
## REQUISITOS NÃO FUNCIONAIS
=========================================================================
- Sistema deve ser desenvolvido em Next.js
- Banco de dados MongoDB com Mongoose
- Autenticação segura via JWT
- Senhas criptografadas usando bcrypt
- Scripts de seed para inicialização de usuários e produtos
- Interface simples e responsiva
- Proteção de rotas baseada em roles
- Performance adequada para até 1000 produtos e movimentações

=========================================================================
## FUNCIONALIDADES INCLUÍDAS
=========================================================================
1. Autenticação de Usuários
   - Tela de login com autenticação via JWT
   - Criptografia de senhas usando bcrypt
   - Redirecionamento baseado na role:
     * Gestor: Dashboard, Produtos, Movimentações
     * Operador: Movimentações apenas

2. Dashboard Principal
   - Visão geral dos produtos em estoque
   - Produtos abaixo da quantidade mínima destacados
   - Total de movimentações realizadas

3. Gestão de Produtos (CRUD)
   - Cadastro, visualização e exclusão de produtos
   - Campos: Nome, SKU, Quantidade mínima, Quantidade atual
   - Destaque visual para produtos críticos

4. Gestão de Movimentações (CRUD)
   - Registro de entrada/saída de produtos
   - Atualiza quantidade atual automaticamente
   - Histórico completo com operador e data

=========================================================================
## USUÁRIOS E ROLES
=========================================================================
Usuário   | Senha | Role     | Telas Acessíveis
--------- | ----- | ------- | -----------------------------
operador  | 123   | operador | Movimentações
gestor    | 456   | gestor   | Dashboard, Produtos, Movimentações

=========================================================================
## LÓGICA DE PROGRAMAÇÃO
=========================================================================
1. Login → validação via JWT → redirecionamento conforme role
2. Proteção de rotas → front-end e back-end
3. CRUD de Produtos / Movimentações
4. Dashboard → consulta dados → atualiza front-end
5. Destaques visuais e histórico de movimentações

=========================================================================
## DESAFIOS SOLUCIONADOS
=========================================================================
- Autenticação segura e redirecionamento por roles
- Atualização automática do estoque
- Scripts de seed para popular banco
- Criação de CRUDs integrados com front-end
- Construção de dashboard simples e funcional

=========================================================================
## DIAGRAMAS 
=========================================================================
``` mermaid

classDiagram

    class User {
        +String username
        +String password
        +String role
    }
    class Product {
        +String nome
        +String sku
        +Number quantidadeMinima
        +Number quantidadeAtual
    }
    class Movement {
        +String tipo
        +Number quantidade
        +Date data
        +String operador
        +Product produto
    }

    User --> Movement
    Product --> Movement
    
```

``` mermaid
classeDiagram

    actor Gestor
    actor Operador
    Gestor --> (Login)
    Operador --> (Login)
    Gestor --> (Gerenciar Produtos)
    Gestor --> (Registrar Movimentações)
    Gestor --> (Dashboard)
    Operador --> (Registrar Movimentações)
```
``` mermaid
flowchart TD

    A[Usuário abre sistema] --> B[Login: username + password]
    B --> C{Validação via JWT}
    C -->|Não| D[Erro: usuário ou senha inválidos]
    C -->|Sim| E{Role do usuário}
    E -->|Operador| F[Redireciona para /movements]
    E -->|Gestor| G[Redireciona para /dashboard]
    F --> H[Registrar entrada/saída de produtos]
    H --> I[Atualiza front-end e estoque]
    G --> J[Acessar dashboard, produtos, movimentações]
    J --> K[Atualiza front-end com tabelas e resumos]
```

========================================================================
## PROTÓTIPO PRETENDIDO E DIFICULDADES
========================================================================
O projeto inicial previa um protótipo visual detalhado no Figma, incluindo:

- Dashboard mais elaborado com gráficos
- Listagens detalhadas de produtos com filtros avançados
- Navegação visual intuitiva e estética mais próxima do layout ideal

Durante o desenvolvimento, enfrentamos dificuldades:

1. Limitação de tempo (50 minutos para MVP)
2. Adaptação do projeto-base existente em Next.js
3. Integração de autenticação e roles com todas as páginas
4. Ajustes de front-end sem frameworks de UI complexos
5. 
======================================================================== 
## PROTOTIPAÇÃO
========================================================================
https://www.figma.com/design/5Hz54O9qqHxzpCrNllEWnz/Untitled?node-id=0-1&t=38JQMILe9UZUbNhm-1
