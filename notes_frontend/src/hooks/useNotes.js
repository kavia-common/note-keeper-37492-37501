import { useNotesContext } from '../state/NotesContext';

/**
 * PUBLIC_INTERFACE
 * useNotes exposes notes state and CRUD operations.
 */
export function useNotes() {
  return useNotesContext();
}

export default useNotes;
