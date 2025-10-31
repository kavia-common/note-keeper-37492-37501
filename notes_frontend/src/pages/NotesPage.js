import React from 'react';
import { useNotes } from '../hooks/useNotes';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * NotesPage renders the landing area when no note is selected.
 */
function NotesPage() {
  const { notes } = useNotes();

  if (notes.length === 0) {
    return (
      <section className="empty-state note-card" role="region" aria-label="Empty notes">
        <div>
          <h2 style={{ marginTop: 0 }}>Welcome to Ocean Notes</h2>
          <p className="helper">Get started by creating your first note.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Link to="/notes/new" className="btn" aria-label="Create your first note">Create Note</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="note-card" role="region" aria-label="Notes overview">
      <h2 style={{ marginTop: 0 }}>Select a note</h2>
      <p className="helper">Choose a note from the sidebar to view it here.</p>
    </section>
  );
}

export default NotesPage;
