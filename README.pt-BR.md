# Shortify (Frontend)

Interface web moderna e responsiva para o encurtador de links **Shortify**, desenvolvida com **React**, **Vite** e **Bootstrap**.

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

- **isValidUrl()** - Valida URLs
- **isValidCode()** - Valida código personalizado
- **isValidPassword()** - Valida senha

---

## Armazenamento Local

A aplicação utiliza `localStorage` para armazenar links criados localmente:

- **Chave:** `links`
- **Valor:** Array JSON de links
- **Sincronização:** Carregado ao iniciar e atualizado após cada ação

---

## Integração com API

A aplicação se integra com o backend via requisições HTTP:

**Endpoints utilizados:**
- `POST /random` - Criar link aleatório
- `POST /custom` - Criar link personalizado
- `GET /info/:code` - Obter informações do link
- `GET /:code` - Acessar link
- `POST /:code/unlock` - Desbloquear link protegido
- `DELETE /:code` - Deletar link

**Variáveis de Ambiente:**
- `VITE_API_URL` - URL base da API
- `VITE_FRONTEND_URL` - URL do frontend (para CORS)

---

## Roteamento

A aplicação utiliza React Router DOM com as seguintes rotas:

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | CreateLink | Página principal de criação |
| `/links` | LinkList | Listagem de links |
| `/:code` | OpenLink | Acesso a links encurtados |
| `/404` | NotFound | Página de erro |

---

## Estilos

A aplicação utiliza:
- **Bootstrap 5** para componentes e layout
- **CSS customizado** em `App.css` e `index.css`
- **Temas responsivos** para mobile e desktop

---

## Build para Produção

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

- [ ] Incremento automático de cliques nos links
- [ ] Dashboard com análise de acessos (gráficos e estatísticas)
