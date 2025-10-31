import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteListItem shows a compact preview of a note (title + snippet).
 * Props: note {id, title, content}, active (bool), onClick (fn)
 */
function NoteListItem({ note, active = false, onClick }) {
  return (
    <button
      className={`note-list-item ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Open note ${note.title || 'Untitled'}`}
    >
      <h4>{note.title || 'Untitled'}</h4>
      <p>{(note.content || '').slice(0, 80) || 'No content'}</p>
    </button>
  );
}

export default NoteListItem;
