const KEY = 'ocean_notes_v1';

/**
 * Safe JSON parse
 */
function parse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}

/**
 * PUBLIC_INTERFACE
 * loadNotes reads notes array from localStorage
 */
export function loadNotes() {
  const raw = window.localStorage.getItem(KEY);
  const data = parse(raw, []);
  if (!Array.isArray(data)) return [];
  return data;
}

/**
 * PUBLIC_INTERFACE
 * saveNotes writes notes array to localStorage
 */
export function saveNotes(notes) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(notes || []));
  } catch {
    // ignore quota errors
  }
}

/**
 * PUBLIC_INTERFACE
 * genId returns a simple unique id string
 */
export function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
