# Ocean Notes – React Frontend

A modern, lightweight notes app frontend built with React. It provides a sidebar with search and note list, a topbar, and a main area to view/edit notes. Styled using the "Ocean Professional" theme.

## Features

- Ocean Professional theme (blue primary with amber accents, subtle gradients and shadows)
- Sidebar:
  - Brand + New Note button
  - Search input (client-side filtering)
  - List of notes with title and snippet
- Routes (React Router):
  - `/` – landing/overview
  - `/notes/new` – create note
  - `/notes/:id` – view note
  - `/notes/:id/edit` – edit note
- State management with Context + reducer
- Persistence:
  - Uses backend API if `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` is set
  - Otherwise falls back to `localStorage`
- Accessibility: labeled inputs, ARIA roles, keyboard-friendly buttons

## Getting started

1. Install dependencies:
   - Inside `notes_frontend` folder: `npm install`
2. Run the development server:
   - `npm start`
3. Open the app:
   - http://localhost:3000

By default, notes are saved to `localStorage`.

## Backend integration (optional)

If you have a notes API, set one of the following in your `.env` file placed at the project root (`notes_frontend/.env`):

```
REACT_APP_API_BASE=https://your-api.example.com
# or
REACT_APP_BACKEND_URL=https://your-api.example.com
```

When configured, the app will attempt to use the backend. If the API is not reachable, it will gracefully fall back to `localStorage`.

See `.env.example` for all supported variables.

## Project structure

- `src/App.js` – App shell (Provider + Router + Layout)
- `src/routes.js` – Route definitions
- `src/components/Sidebar.js` – Search, new note, list
- `src/components/TopBar.js` – Breadcrumb/brand and context actions
- `src/pages/NotesPage.js` – Landing view
- `src/pages/NoteEditorPage.js` – Create/Edit
- `src/pages/NoteViewPage.js` – View
- `src/state/NotesContext.js` – Context + reducer + CRUD actions
- `src/services/apiClient.js` – Fetch wrapper using env vars
- `src/services/notesService.js` – API-first then localStorage fallback
- `src/utils/storage.js` – localStorage helpers
- `src/index.css`, `src/App.css` – Ocean Professional theme styles

## Acceptance criteria mapping

- App loads with sidebar and empty state; user can create, edit, view, delete notes using localStorage (no env vars required)
- Routing works: `/`, `/notes/new`, `/notes/:id`, `/notes/:id/edit`
- `.env.example` includes `REACT_APP_API_BASE` and `REACT_APP_BACKEND_URL`
- Styles reflect the Ocean Professional theme

## Accessibility

- Inputs and interactive elements have labels
- ARIA roles and states are used for context
- Keyboard focus works for buttons and links

## License

MIT
