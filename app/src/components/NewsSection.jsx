import SectionHeader from './SectionHeader';
import ImageUpload from './ImageUpload';

const TEMPLATE = { title: '', link: '', thumbnailUrl: '', thumbnailBase64: '' };

export default function NewsSection({ items, dispatch }) {
  return (
    <fieldset className="form-section">
      <SectionHeader
        title="NEWS"
        count={items.length}
        min={1}
        max={2}
        onAdd={() => dispatch({ type: 'ADD_ITEM', section: 'news', template: { ...TEMPLATE } })}
        onRemove={() => dispatch({ type: 'REMOVE_ITEM', section: 'news', index: items.length - 1 })}
      />
      {items.map((item, i) => (
        <div key={i} className="form-card">
          <span className="card-index">#{i + 1}</span>
          <div className="form-row">
            <label>제목</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'news', index: i, field: 'title', value: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>링크</label>
            <input
              type="text"
              value={item.link}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'news', index: i, field: 'link', value: e.target.value })}
            />
          </div>
          <ImageUpload
            url={item.thumbnailUrl}
            base64={item.thumbnailBase64}
            section="news"
            index={i}
            dispatch={dispatch}
          />
        </div>
      ))}
    </fieldset>
  );
}
