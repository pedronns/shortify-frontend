# Shortify (Frontend)

**Idiomas / Languages:**
- [ Português](#português)
- [ English](#english)

---

## Português

Interface web moderna e responsiva para o encurtador de links **Shortify**, desenvolvida com **React**, **Vite** e **Bootstrap**.

Live demo: https://shortify-6s8t.vercel.app/

---

## Funcionalidades

- 🔗 Criação de links aleatórios e personalizados
- 🔐 Suporte a links protegidos por senha
- 📋 Lista de links criados com paginação
- 📋 Busca e filtragem de links
- 🔑 Desbloqueio de links protegidos
- 🗑️ Deleção de links
- 💾 Armazenamento local (localStorage) dos links
- 🎨 Interface responsiva com Bootstrap
- 📱 Suporte a mobile
- ⚡ Build otimizado com Vite

---

## Stack Técnico

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Bootstrap 5 + CSS customizado
- **Roteamento**: React Router DOM v7
- **Icons**: React Icons
- **Validação**: Validator.js
- **Linter**: ESLint

---

## Instalação

### Pré-requisitos
- Node.js (v18+)

### Setup

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente (crie `.env.local`):
```env
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot reload |
| `npm run build` | Cria build otimizado para produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa linter (ESLint) |

---

## Estrutura do Projeto

```
src/
├── App.jsx                # Componente raiz da aplicação
├── App.css                # Estilos globais
├── main.jsx               # Ponto de entrada
├── index.css              # Estilos base
├── pages/                 # Páginas da aplicação
│   ├── CreateLink.jsx     # Página de criação de links
│   ├── OpenLink.jsx       # Página de acesso a links
│   ├── LinkList.jsx       # Página de listagem de links
│   ├── RedirectLink.jsx   # Página de redirecionamento
│   └── NotFound.jsx       # Página 404
├── components/            # Componentes reutilizáveis
│   ├── Navbar.jsx         # Barra de navegação
│   ├── Footer.jsx         # Rodapé
│   ├── FormInput.jsx      # Campo de input customizado
│   ├── ResultModal.jsx    # Modal de resultado
│   ├── CodeTakenModal.jsx # Modal de código em uso
│   └── CopyToast.jsx      # Notificação de cópia
├── hooks/                 # Custom React hooks
│   └── useSubmit.jsx      # Hook para submissão de formulário
├── handlers/              # Manipuladores de eventos
│   └── formHandlers.js    # Handlers do formulário
├── utils/                 # Utilitários
│   └── validators.js      # Funções de validação
├── api/                   # Chamadas de API
│   ├── links.js           # API para links
│   └── qrCode.js          # API para QR codes
└── img/                   # Imagens e assets
```

---

## Páginas

### CreateLink
Página principal para criação de links encurtados.

**Funcionalidades:**
- Validação de URL em tempo real
- Seleção entre link aleatório ou personalizado
- Proteção opcional por senha
- Visualização de QR code
- Seleção de cores customizadas
- Modal de resultado com link compartilhável

---

### LinkList
Lista todos os links criados no navegador.

**Funcionalidades:**
- Tabela com informações dos links
- Paginação (10 itens por página)
- Busca/filtragem de links
- Ação de copiar link
- Ação de deletar link
- Toast de notificação

---

### OpenLink
Página dinâmica para acessar links encurtados.

**Funcionalidades:**
- Detecção automática de links protegidos
- Formulário de desbloqueio para links com senha
- Redirecionamento automático para links públicos
- Tratamento de links não encontrados

---

### RedirectLink
Página de redirecionamento para o link original.

---

### NotFound
Página de erro 404 para links não encontrados.

---

## Componentes

### Navbar
Barra de navegação superior com links de navegação entre páginas.

### Footer
Rodapé com informações sobre o projeto.

### FormInput
Componente de input customizado com validação integrada.

### ResultModal
Modal que exibe o resultado da criação de um link com:
- Link encurtado
- Link completo
- QR code
- Botão de copiar

### CodeTakenModal
Modal alertando que o código personalizado já está em uso.

### CopyToast
Notificação que aparece quando o link é copiado para a área de transferência.

---

## Hooks

### useSubmit
Hook customizado que gerencia a submissão do formulário de criação de links.

**Responsabilidades:**
- Validação de campos
- Chamada à API
- Tratamento de erros
- Armazenamento no localStorage
- Callback de sucesso

---

## Validação

O arquivo `utils/validators.js` contém funções para validar:
- URLs
- Custom codes
- Senhas

---

## Rotas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | CreateLink | Página principal de criação |
| `/links` | LinkList | Lista de links |
| `/:code` | OpenLink | Acesso a links encurtados |
| `/404` | NotFound | Página de erro |

---

## Estilização

A aplicação utiliza:
- **Bootstrap 5** para componentes e layout
- **CSS customizado** em `App.css` e `index.css`
- **Temas responsivos** para mobile e desktop

---

## Build de Produção

```bash
npm run build
```

O build otimizado será gerado na pasta `dist/` e pode ser deployado em qualquer servidor estático.

---

## Deployment

A configuração `vercel.json` indica suporte para deploy no Vercel:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Para fazer deploy:
```bash
vercel
```

---

## Melhorias Futuras

- [ ] Incremento automático de contagem de cliques
- [ ] Dashboard com análise de acessos (gráficos e estatísticas)

---

## English

A modern and responsive web interface for the **Shortify** URL shortener, built with **React**, **Vite**, and **Bootstrap**.

Live demo: https://shortify-6s8t.vercel.app/

---

## Features

- 🔗 Random and custom link creation
- 🔐 Password-protected link support
- 📋 Created links list with pagination
- 📋 Link search and filtering
- 🔑 Password-protected link unlock
- 🗑️ Link deletion
- 💾 Local storage (localStorage) for links
- 🎨 Responsive interface with Bootstrap
- 📱 Mobile support
- ⚡ Optimized build with Vite

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Bootstrap 5 + Custom CSS
- **Routing**: React Router DOM v7
- **Icons**: React Icons
- **Validation**: Validator.js
- **Linter**: ESLint

---

## Installation

### Prerequisites
- Node.js (v18+)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (create `.env.local`):
```env
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run linter (ESLint) |

---

## Project Structure

```
src/
├── App.jsx                # Root application component
├── App.css                # Global styles
├── main.jsx               # Entry point
├── index.css              # Base styles
├── pages/                 # Application pages
│   ├── CreateLink.jsx     # Link creation page
│   ├── OpenLink.jsx       # Link access page
│   ├── LinkList.jsx       # Links list page
│   ├── RedirectLink.jsx   # Redirect page
│   └── NotFound.jsx       # 404 page
├── components/            # Reusable components
│   ├── Navbar.jsx         # Navigation bar
│   ├── Footer.jsx         # Footer
│   ├── FormInput.jsx      # Custom input field
│   ├── ResultModal.jsx    # Result modal
│   ├── CodeTakenModal.jsx # Code taken modal
│   └── CopyToast.jsx      # Copy notification
├── hooks/                 # Custom React hooks
│   └── useSubmit.jsx      # Form submission hook
├── handlers/              # Event handlers
│   └── formHandlers.js    # Form handlers
├── utils/                 # Utilities
│   └── validators.js      # Validation functions
├── api/                   # API calls
│   ├── links.js           # Links API
│   └── qrCode.js          # QR codes API
└── img/                   # Images and assets
```

---

## Pages

### CreateLink
Main page for creating shortened links.

**Features:**
- Real-time URL validation
- Choice between random or custom link
- Optional password protection
- QR code preview
- Custom color selection
- Result modal with shareable link

---

### LinkList
Lists all links created in the browser.

**Features:**
- Table with link information
- Pagination (10 items per page)
- Link search/filtering
- Copy link action
- Delete link action
- Toast notifications

---

### OpenLink
Dynamic page to access shortened links.

**Features:**
- Automatic password-protected link detection
- Unlock form for password-protected links
- Automatic redirect for public links
- 404 handling for not found links

---

### RedirectLink
Page for redirecting to the original link.

---

### NotFound
404 error page for not found links.

---

## Components

### Navbar
Top navigation bar with links to different pages.

### Footer
Footer with project information.

### FormInput
Custom input component with integrated validation.

### ResultModal
Modal displaying link creation result with:
- Shortened link
- Full link
- QR code
- Copy button

### CodeTakenModal
Modal warning that the custom code is already in use.

### CopyToast
Notification that appears when link is copied to clipboard.

---

## Hooks

### useSubmit
Custom hook that manages form submission for link creation.

**Responsibilities:**
- Field validation
- API calls
- Error handling
- localStorage storage
- Success callback

---

## Validation

The `utils/validators.js` file contains functions to validate:

- **isValidUrl()** - Validates URLs
- **isValidCode()** - Validates custom code
- **isValidPassword()** - Validates password

---

## Local Storage

The application uses `localStorage` to store created links:

- **Key:** `links`
- **Value:** JSON array of links
- **Sync:** Loaded on startup and updated after each action

---

## API Integration

The application integrates with the backend through HTTP requests:

**Endpoints used:**
- `POST /random` - Create random link
- `POST /custom` - Create custom link
- `GET /info/:code` - Get link information
- `GET /:code` - Access link
- `POST /:code/unlock` - Unlock password-protected link
- `DELETE /:code` - Delete link

**Environment Variables:**
- `VITE_API_URL` - Base API URL
- `VITE_FRONTEND_URL` - Frontend URL (for CORS)

---

## Routing

The application uses React Router DOM with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | CreateLink | Main creation page |
| `/links` | LinkList | Links list |
| `/:code` | OpenLink | Access shortened links |
| `/404` | NotFound | Error page |

---

## Styling

The application uses:
- **Bootstrap 5** for components and layout
- **Custom CSS** in `App.css` and `index.css`
- **Responsive themes** for mobile and desktop

---

## Production Build

```bash
npm run build
```

The optimized build will be generated in the `dist/` folder and can be deployed to any static server.

---

## Deployment

The `vercel.json` configuration indicates Vercel deployment support:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

To deploy:
```bash
vercel
```

---

## Future Improvements

- [ ] Automatic click count increment
- [ ] Dashboard with access analytics (charts and statistics)

