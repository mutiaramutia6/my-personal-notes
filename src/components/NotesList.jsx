import React from 'react';
import NoteItem from './NoteItem';

function getMonthYearGroup(note) {
  const date = new Date(note.createdAt);
  const groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const groupTitle = date.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  return { groupKey, groupTitle };
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword,
  dataTestId = 'notes-list',
}) {
  const hasNotes = notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <div
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </div>
      </div>
    );
  }

  const groupedNotes = notes.reduce((groups, note) => {
    const { groupKey, groupTitle } = getMonthYearGroup(note);

    if (!groups[groupKey]) {
      groups[groupKey] = {
        title: groupTitle,
        notes: [],
      };
    }

    groups[groupKey].notes.push(note);
    return groups;
  }, {});

  return (
    <div className="notes-list notes-list--grouped" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, group]) => (
        <section
          key={groupKey}
          className="notes-group"
          data-testid={`${groupKey}-group`}
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{group.title}</h3>
            <span
              className="notes-group__count"
              data-testid={`${groupKey}-group-count`}
            >
              {group.notes.length}
              {' '}
              catatan
            </span>
          </div>
          <div className="notes-group__items">
            {group.notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
