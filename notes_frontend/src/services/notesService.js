import { apiClient, hasBackend } from './apiClient';
import { genId, loadNotes, saveNotes } from '../utils/storage';

function nowIso() { return new Date().toISOString(); }

async function apiList() { return apiClient('/notes'); }
async function apiCreate(data) { return apiClient('/notes', { method: 'POST', body: JSON.stringify(data) }); }
async function apiUpdate(id, data) { return apiClient(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
async function apiDelete(id) { return apiClient(`/notes/${id}`, { method: 'DELETE' }); }

/**
 * PUBLIC_INTERFACE
 * notesService: CRUD methods. Uses API if REACT_APP_API_BASE or REACT_APP_BACKEND_URL is defined,
 * otherwise persists to localStorage. If API calls fail at runtime, it gracefully falls back to local.
 */
const notesService = {
  async list() {
    if (hasBackend()) {
      try {
        return await apiList();
      } catch (e) {
        // Fall back to local on network or server error
      }
    }
    return loadNotes();
  },

  async create({ title = '', content = '' }) {
    const payload = { title, content };
    if (hasBackend()) {
      try {
        return await apiCreate(payload);
      } catch (e) {
        // fall through to local
      }
    }
    const current = loadNotes();
    const note = {
      id: genId(),
      title: title.trim(),
      content: content.trim(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    const next = [note, ...current];
    saveNotes(next);
    return note;
  },

  async update(id, { title = '', content = '' }) {
    if (hasBackend()) {
      try {
        return await apiUpdate(id, { title, content });
      } catch (e) {
        // fall through
      }
    }
    const current = loadNotes();
    const idx = current.findIndex((n) => String(n.id) === String(id));
    if (idx === -1) throw new Error('NOT_FOUND');
    const updated = {
      ...current[idx],
      title,
      content,
      updatedAt: nowIso(),
    };
    const next = [...current];
    next[idx] = updated;
    saveNotes(next);
    return updated;
  },

  async remove(id) {
    if (hasBackend()) {
      try {
        await apiDelete(id);
        return;
      } catch (e) {
        // fall through
      }
    }
    const current = loadNotes();
    const next = current.filter((n) => String(n.id) !== String(id));
    saveNotes(next);
  },
};

export default notesService;
