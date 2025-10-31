import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import { NotesProvider } from './state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * App is the root component setting up the application shell with:
 * - NotesProvider: global state for notes (CRUD, hydration)
 * - BrowserRouter: routing for list, view, new, edit
 * - Ocean Professional theme layout: Sidebar + TopBar + Main
 */
function App() {
  return (
    <NotesProvider>
      <BrowserRouter>
        <div className="app-shell container-app">
          <aside className="sidebar" aria-label="Notes sidebar">
            <Sidebar />
          </aside>
          <header className="topbar" aria-label="Top bar">
            <TopBar />
          </header>
          <main className="main" role="main">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </NotesProvider>
  );
}

export default App;
