import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import NoteEditorPage from './pages/NoteEditorPage';
import NoteViewPage from './pages/NoteViewPage';

/**
 * PUBLIC_INTERFACE
 * AppRoutes declares all application routes.
 * Routes:
 * - / -> NotesPage (overview/empty)
 * - /notes/new -> NoteEditorPage (create)
 * - /notes/:id -> NoteViewPage (view)
 * - /notes/:id/edit -> NoteEditorPage (edit)
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NotesPage />} />
      <Route path="/notes/new" element={<NoteEditorPage />} />
      <Route path="/notes/:id" element={<NoteViewPage />} />
      <Route path="/notes/:id/edit" element={<NoteEditorPage />} />
      <Route path="*" element={<NotesPage />} />
    </Routes>
  );
}

export default AppRoutes;
