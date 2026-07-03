import React from 'react';

function NoteSearch({ keyword, onSearch }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder="Cari catatan ..."
        value={keyword}
        onChange={(event) => onSearch(event.target.value)}
        data-testid="note-search-field"
      />
      {keyword && (
        <button
          className="note-search__clear"
          type="button"
          aria-label="Bersihkan pencarian"
          onClick={() => onSearch('')}
          data-testid="note-search-clear-button"
        >
          x
        </button>
      )}
    </div>
  );
}

export default NoteSearch;
