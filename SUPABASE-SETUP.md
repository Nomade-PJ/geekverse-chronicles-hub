# Configuração do Supabase para o Top Nerd Universe

Este guia explica como configurar o Supabase para funcionar com o portal Top Nerd Universe.

## 1. Criar uma conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com) e crie uma conta gratuita
2. Após fazer login, clique em "New Project"
3. Dê um nome ao seu projeto (ex: "top-nerd-universe")
4. Defina uma senha forte para o banco de dados
5. Escolha uma região próxima à sua localização
6. Clique em "Create New Project"

## 2. Configurar o banco de dados

Uma vez que o projeto esteja pronto (pode levar alguns minutos), você precisa criar as tabelas e políticas de segurança:

1. No painel do Supabase, vá para a seção "SQL Editor"
2. Clique em "New Query"
3. Cole o conteúdo do arquivo `supabase-schema.sql` que criamos
4. Clique em "Run" para executar o script SQL

Este script irá:
- Criar tabelas para posts, categorias, autores e perfis de usuário
- Configurar políticas de segurança (RLS)
- Criar triggers para gerenciar automaticamente os perfis de usuário
- Inserir alguns dados iniciais para categorias e autores

## 3. Configurar autenticação

1. No painel do Supabase, vá para a seção "Authentication"
2. Em "Providers", certifique-se de que "Email" está habilitado
3. Em "URL Configuration", adicione a URL do seu site (ex: http://localhost:5173)

## 4. Criar um usuário administrador

1. No painel do Supabase, vá para a seção "Authentication" e depois "Users"
2. Clique em "Invite" para convidar um novo usuário
3. Insira seu email e clique em "Invite"
4. Verifique seu email e siga as instruções para criar uma conta
5. Depois de criar a conta, vá para a seção "SQL Editor" novamente
6. Execute o seguinte SQL para promover seu usuário a administrador (substitua USER_ID pelo ID do usuário):

```sql
UPDATE profiles 
SET role = 'admin'
WHERE id = 'USER_ID';
```

Para encontrar seu USER_ID, vá para "Authentication" > "Users" e copie o ID do seu usuário.

## 5. Obter as credenciais da API

1. No painel do Supabase, vá para a seção "Project Settings" (ícone de engrenagem)
2. Clique em "API"
3. Você verá:
   - Project URL: Copie para `VITE_SUPABASE_URL`
   - anon/public key: Copie para `VITE_SUPABASE_ANON_KEY`

## 6. Configurar o frontend

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as variáveis de ambiente:

```
VITE_SUPABASE_URL=sua_url_do_projeto
VITE_SUPABASE_ANON_KEY=sua_chave_anon
```

3. Instale a biblioteca Supabase:

```bash
npm install @supabase/supabase-js
```

4. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 7. Estrutura de Banco de Dados

### Tabelas

- **posts**: Armazena todos os artigos do site
- **categories**: Categorias dos posts (Gaming, Tecnologia, etc.)
- **authors**: Informações sobre os autores dos posts
- **profiles**: Perfis de usuários (extensão da tabela auth.users)

### Relações

- Cada post pertence a uma categoria (posts.category_id → categories.id)
- Cada post tem um autor (posts.author_id → authors.id)
- Cada perfil está vinculado a um usuário (profiles.id → auth.users.id)

## 8. Funções da API

Os hooks que criamos (`use-posts.ts`, `use-categories.ts` e `use-auth.ts`) fornecem as seguintes funções:

### Posts
- `fetchPosts()`: Busca todos os posts publicados
- `getPostById(id)`: Busca um post específico por ID
- `getPostsByCategory(categorySlug)`: Busca posts de uma categoria específica
- `createPost(post)`: Cria um novo post
- `updatePost(id, post)`: Atualiza um post existente
- `deletePost(id)`: Exclui um post

### Categorias
- `fetchCategories()`: Busca todas as categorias
- `getCategoryBySlug(slug)`: Busca uma categoria específica por slug
- `createCategory(category)`: Cria uma nova categoria
- `updateCategory(id, category)`: Atualiza uma categoria existente
- `deleteCategory(id)`: Exclui uma categoria

### Autenticação
- `signIn(email, password)`: Faz login no sistema
- `signOut()`: Faz logout do sistema
- `user`: Objeto com informações do usuário atual
- `isAuthenticated`: Booleano indicando se o usuário está autenticado
- `isAdmin`: Booleano indicando se o usuário é administrador

## 9. Armazenamento de Imagens

Para armazenar imagens dos posts:

1. No painel do Supabase, vá para a seção "Storage"
2. Clique em "Create New Bucket"
3. Nomeie o bucket como "post-images"
4. Adicione políticas de acesso:
   - Leitura pública para todos
   - Escrita apenas para usuários autenticados

Para implementar o upload de imagens, use o hook `useStorage` que você pode criar conforme sua necessidade.

## Suporte e Recursos Adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Referência da API JavaScript](https://supabase.com/docs/reference/javascript/introduction)
- [Guias de autenticação](https://supabase.com/docs/guides/auth)
- [Exemplos de Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 