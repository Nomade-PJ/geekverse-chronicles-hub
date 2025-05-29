# Top Nerd Universe

Um portal de notícias sobre games, tecnologia e cultura geek.

## Project info

**URL**: https://lovable.dev/projects/c075e4fa-0ae9-419a-9734-a2b5d96606d3

## Como editar este código?

Existem várias maneiras de editar esta aplicação.

**Use Lovable**

Simplesmente visite o [Lovable Project](https://lovable.dev/projects/c075e4fa-0ae9-419a-9734-a2b5d96606d3) e comece a fazer solicitações.

As alterações feitas via Lovable serão automaticamente confirmadas neste repositório.

**Use seu IDE preferido**

Se você quiser trabalhar localmente usando seu próprio IDE, você pode clonar este repositório e enviar alterações. As alterações enviadas também serão refletidas no Lovable.

O único requisito é ter Node.js e npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <YOUR_GIT_URL>

# Passo 2: Navegue até o diretório do projeto.
cd <YOUR_PROJECT_NAME>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com recarga automática e visualização instantânea.
npm run dev
```

**Edite um arquivo diretamente no GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Edit" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e confirme-as.

**Use GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) próximo ao canto superior direito.
- Selecione a guia "Codespaces".
- Clique em "New codespace" para iniciar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e confirme e envie suas alterações quando terminar.

## Quais tecnologias são usadas neste projeto?

Este projeto é construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router DOM

## Como fazer deploy deste projeto na Vercel?

### Opção 1: Deploy direto do GitHub

1. Crie uma conta na [Vercel](https://vercel.com) se ainda não tiver.
2. Na dashboard da Vercel, clique em "Add New..." e depois "Project".
3. Importe seu repositório do GitHub.
4. A Vercel detectará automaticamente que é um projeto Vite/React.
5. Configure as variáveis de ambiente se necessário.
6. Clique em "Deploy".

### Opção 2: Deploy usando a Vercel CLI

1. Instale a Vercel CLI globalmente:
   ```sh
   npm i -g vercel
   ```

2. Faça login na sua conta Vercel:
   ```sh
   vercel login
   ```

3. No diretório do projeto, execute:
   ```sh
   vercel
   ```

4. Siga as instruções na tela para completar o deploy.

### Opção 3: Deploy manual

1. Construa o projeto localmente:
   ```sh
   npm run build
   ```

2. Na dashboard da Vercel, clique em "Add New..." e depois "Project".
3. Escolha a opção "Upload" e arraste a pasta `dist` gerada.
4. Configure o projeto conforme necessário e clique em "Deploy".

## Posso conectar um domínio personalizado ao meu projeto?

Sim, você pode!

Para conectar um domínio ao seu projeto na Vercel:

1. Vá para o painel do seu projeto na Vercel.
2. Navegue até "Settings" > "Domains".
3. Adicione seu domínio e siga as instruções para configurar os registros DNS.

Para mais informações, consulte a [documentação da Vercel sobre domínios personalizados](https://vercel.com/docs/projects/domains).
