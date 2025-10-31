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
  - Uses backend API if configured
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

If you have a notes API, create a `.env` file at `notes_frontend/.env` and set one of the following:

Priority order:
1) `REACT_APP_API_BASE` (preferred)
2) `REACT_APP_BACKEND_URL` (fallback key)

Example:
```
REACT_APP_API_BASE=https://your-api.example.com
# or, if you can't set the preferred key:
REACT_APP_BACKEND_URL=https://your-api.example.com
```

Behavior:
- If neither is set, the app uses `localStorage`.
- If set, the app will use the backend. If the API is unreachable or returns an error, the app will gracefully fall back to `localStorage` so users can continue working.

See `.env.example` for all supported variables.

## Verify CRUD and routing

- Routes:
  - `/` – overview/empty state
  - `/notes/new` – create note
  - `/notes/:id` – view note
  - `/notes/:id/edit` – edit note
- CRUD:
  - Create, edit, and delete from editor and view pages.
  - Without env vars: all actions persist to localStorage.
  - With `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL`: actions go to the API first, then fall back to localStorage on failure.

## Project structure

- `src/App.js` – App shell (Provider + Router + Layout)
- `src/routes.js` – Route definitions
- `src/components/Sidebar.js` – Search, new note, list
- `src/components/TopBar.js` – Breadcrumb/brand and context actions
- `src/pages/NotesPage.js` – Landing view
- `src/pages/NoteEditorPage.js` – Create/Edit
- `src/pages/NoteViewPage.js` – View
- `src/state/NotesContext.js` – Context + reducer + CRUD actions
- `src/services/apiClient.js` – Fetch wrapper using env vars with correct priority
- `src/services/notesService.js` – API-first then localStorage fallback
- `src/utils/storage.js` – localStorage helpers
- `src/index.css`, `src/App.css` – Ocean Professional theme styles

## Acceptance criteria mapping

- App loads with sidebar and empty state; user can create, edit, view, delete notes using localStorage (no env vars required)
- Routing works: `/`, `/notes/new`, `/notes/:id`, `/notes/:id/edit`
- `.env.example` includes `REACT_APP_API_BASE` and `REACT_APP_BACKEND_URL`
- API base resolution prioritizes `REACT_APP_API_BASE` then `REACT_APP_BACKEND_URL`
- Styles reflect the Ocean Professional theme

## Accessibility

- Inputs and interactive elements have labels
- ARIA roles and states are used for context
- Keyboard focus works for buttons and links

## License

MIT
