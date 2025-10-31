import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';

/**
 * PUBLIC_INTERFACE
 * Sidebar displays:
 * - Brand
 * - Search input (client-side filtering)
 * - "New Note" button
 * - List of notes with active highlight and preview
 */
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notes } = useNotes();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return notes;
    return notes.filter(
      (n) =>
        (n.title || '').toLowerCase().includes(query) ||
        (n.content || '').toLowerCase().includes(query)
    );
  }, [q, notes]);

  return (
    <div>
      <div className="sidebar-header">
        <div className="brand" aria-label="Brand">
          <span className="dot" />
          <span>Ocean Notes</span>
        </div>
        <button
          className="btn"
          onClick={() => navigate('/notes/new')}
          aria-label="Create new note"
        >
          + New
        </button>
      </div>

      <label htmlFor="search" className="sr-only">Search notes</label>
      <input
        id="search"
        className="search"
        placeholder="Search notes..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search notes"
      />

      <ul className="note-list" aria-label="Notes list">
        {filtered.map((note) => {
          const isActive =
            location.pathname === `/notes/${note.id}` ||
            location.pathname === `/notes/${note.id}/edit`;
          return (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`} className={`note-list-item ${isActive ? 'active' : ''}`}>
                <h4 title={note.title || 'Untitled'}>{note.title || 'Untitled'}</h4>
                <p>{(note.content || '').slice(0, 80) || 'No content'}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <div className="empty-state" aria-live="polite">
          No notes found
        </div>
      )}
    </div>
  );
}

export default Sidebar;
