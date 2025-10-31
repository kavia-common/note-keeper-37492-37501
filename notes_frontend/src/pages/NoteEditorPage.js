import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';

/**
 * PUBLIC_INTERFACE
 * NoteEditorPage supports:
 * - /notes/new for creating
 * - /notes/:id/edit for updating
 */
function NoteEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { notes, createNote, updateNote, deleteNote } = useNotes();

  const editing = Boolean(id);
  const existing = editing ? notes.find((n) => String(n.id) === String(id)) : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');

  useEffect(() => {
    if (editing && !existing) {
      // If note not found, go home
      navigate('/');
    }
  }, [editing, existing, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) {
      return;
    }
    if (editing) {
      const updated = await updateNote(existing.id, { title, content });
      navigate(`/notes/${updated.id}`);
    } else {
      const created = await createNote({ title, content });
      navigate(`/notes/${created.id}`);
    }
  };

  const handleDelete = async () => {
    if (editing && existing) {
      await deleteNote(existing.id);
      navigate('/');
    }
  };

  return (
    <section className="note-card note-editor" role="region" aria-label="Note editor">
      <h1>{editing ? 'Edit note' : 'Create note'}</h1>
      <form onSubmit={handleSubmit} className="editor-form">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
          />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn" aria-label="Save note">
            {editing ? 'Save changes' : 'Create note'}
          </button>
          {editing && (
            <button
              type="button"
              className="btn ghost"
              onClick={handleDelete}
              aria-label="Delete note"
            >
              Delete
            </button>
          )}
        </div>
        <p className="helper">Notes are saved to your browser if no backend is configured.</p>
      </form>
    </section>
  );
}

export default NoteEditorPage;
