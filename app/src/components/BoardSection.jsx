const TEMPLATE = { title: '', link: '' };

export default function BoardSection({ title, sectionKey, items, dispatch }) {
  return (
    <fieldset className="form-section">
      <div className="section-header">
        <h2>{title}</h2>
        <div className="section-header-actions">
          <button
            type="button"
            className="btn-add"
            onClick={() => dispatch({ type: 'ADD_ITEM', section: sectionKey, template: { ...TEMPLATE } })}
          >
            + 추가
          </button>
          {items.length > 1 && (
            <button
              type="button"
              className="btn-remove"
              onClick={() => dispatch({ type: 'REMOVE_ITEM', section: sectionKey, index: items.length - 1 })}
            >
              − 삭제
            </button>
          )}
        </div>
      </div>
      {items.map((item, i) => (
        <div key={i} className="form-card form-card-inline">
          <span className="card-index">#{i + 1}</span>
          <div className="form-row">
            <label>제목</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: sectionKey, index: i, field: 'title', value: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>링크</label>
            <input
              type="text"
              value={item.link}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: sectionKey, index: i, field: 'link', value: e.target.value })}
            />
          </div>
        </div>
      ))}
    </fieldset>
  );
}
