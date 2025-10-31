import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';

/**
 * PUBLIC_INTERFACE
 * NoteViewPage shows a note's title and content with meta and edit action.
 */
function NoteViewPage() {
  const { id } = useParams();
  const { notes } = useNotes();
  const note = notes.find((n) => String(n.id) === String(id));

  if (!note) {
    return (
      <section className="note-card" role="region" aria-label="Note not found">
        <h2 style={{ marginTop: 0 }}>Note not found</h2>
        <Link to="/" className="btn ghost">Go back</Link>
      </section>
    );
  }

  return (
    <article className="note-card note-view" aria-label="Note content">
      <h1>{note.title || 'Untitled'}</h1>
      <div className="note-meta">ID: {note.id}</div>
      <div style={{ whiteSpace: 'pre-wrap' }}>{note.content || 'No content'}</div>
      <div style={{ marginTop: 16 }} className="actions">
        <Link to={`/notes/${note.id}/edit`} className="btn" aria-label="Edit this note">Edit</Link>
      </div>
    </article>
  );
}

export default NoteViewPage;
