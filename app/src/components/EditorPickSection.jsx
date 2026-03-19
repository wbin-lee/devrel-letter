import SectionHeader from './SectionHeader';

const TEMPLATE = { title: '', summary: '', link: '' };

export default function EditorPickSection({ items, dispatch }) {
  return (
    <fieldset className="form-section">
      <SectionHeader
        title="DSDN Editor's Pick"
        count={items.length}
        min={3}
        max={5}
        onAdd={() => dispatch({ type: 'ADD_ITEM', section: 'editorPicks', template: { ...TEMPLATE } })}
        onRemove={() => dispatch({ type: 'REMOVE_ITEM', section: 'editorPicks', index: items.length - 1 })}
      />
      {items.map((item, i) => (
        <div key={i} className="form-card">
          <span className="card-index">#{i + 1}</span>
          <div className="form-row">
            <label>제목</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'editorPicks', index: i, field: 'title', value: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>요약</label>
            <textarea
              rows={3}
              value={item.summary}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'editorPicks', index: i, field: 'summary', value: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>링크</label>
            <input
              type="text"
              value={item.link}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'editorPicks', index: i, field: 'link', value: e.target.value })}
            />
          </div>
        </div>
      ))}
    </fieldset>
  );
}
