import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import notesService from '../services/notesService';

/**
 * State shape: { notes: Array<{id, title, content, createdAt?, updatedAt?}>, loading: bool }
 */
const NotesContext = createContext();

/**
 * Reducer for note actions
 */
function notesReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, notes: action.payload || [], loading: false };
    case 'CREATE': {
      const next = [action.payload, ...state.notes];
      return { ...state, notes: next };
    }
    case 'UPDATE': {
      const next = state.notes.map((n) => (String(n.id) === String(action.payload.id) ? action.payload : n));
      return { ...state, notes: next };
    }
    case 'DELETE': {
      const next = state.notes.filter((n) => String(n.id) !== String(action.payload));
      return { ...state, notes: next };
    }
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * NotesProvider provides notes state and CRUD actions to children.
 */
export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, { notes: [], loading: true });

  useEffect(() => {
    let alive = true;
    notesService.list().then((items) => {
      if (alive) dispatch({ type: 'HYDRATE', payload: items });
    }).catch(() => dispatch({ type: 'HYDRATE', payload: [] }));
    return () => { alive = false; };
  }, []);

  const api = useMemo(() => ({
    get notes() { return state.notes; },
    get loading() { return state.loading; },

    // PUBLIC_INTERFACE
    async createNote(data) {
      /** Create a new note */
      const created = await notesService.create({
        title: (data.title || '').trim(),
        content: (data.content || '').trim(),
      });
      dispatch({ type: 'CREATE', payload: created });
      return created;
    },

    // PUBLIC_INTERFACE
    async updateNote(id, data) {
      /** Update an existing note */
      const updated = await notesService.update(id, {
        title: (data.title ?? '').toString(),
        content: (data.content ?? '').toString(),
      });
      dispatch({ type: 'UPDATE', payload: updated });
      return updated;
    },

    // PUBLIC_INTERFACE
    async deleteNote(id) {
      /** Delete a note by id */
      await notesService.remove(id);
      dispatch({ type: 'DELETE', payload: id });
    },
  }), [state.notes, state.loading]);

  return (
    <NotesContext.Provider value={api}>
      {children}
    </NotesContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useNotesContext() {
  /** Access raw context value. Prefer useNotes hook. */
  return useContext(NotesContext);
}
