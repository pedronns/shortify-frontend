# Shortify (Frontend)

A modern and responsive web interface for the **Shortify** URL shortener, built with **React**, **Vite**, and **Bootstrap**.

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
