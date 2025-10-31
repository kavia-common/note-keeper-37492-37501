import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * TopBar shows breadcrumb-like navigation and context actions.
 */
function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = location.pathname.endsWith('/edit');
  const isNew = location.pathname === '/notes/new';

  return (
    <div className="topbar-inner">
      <div className="brand">
        <span className="dot" />
        <Link to="/" aria-label="Go to home">Ocean Notes</Link>
      </div>
      <div style={{ flex: 1 }} />
      <div className="actions">
        {!isNew && !isEditing && id && (
          <button className="btn ghost" onClick={() => navigate(`/notes/${id}/edit`)} aria-label="Edit note">
            Edit
          </button>
        )}
        {(isEditing || isNew) && (
          <button className="btn ghost" onClick={() => navigate(id ? `/notes/${id}` : '/')} aria-label="Cancel editing">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default TopBar;
