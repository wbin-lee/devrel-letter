import SectionHeader from './SectionHeader';
import ImageUpload from './ImageUpload';

const TEMPLATE = { summary: '', link: '', thumbnailUrl: '', thumbnailBase64: '' };

export default function Ai4seSection({ items, dispatch }) {
  return (
    <fieldset className="form-section">
      <SectionHeader
        title="AI4SE 소식"
        count={items.length}
        min={1}
        max={2}
        onAdd={() => dispatch({ type: 'ADD_ITEM', section: 'ai4se', template: { ...TEMPLATE } })}
        onRemove={() => dispatch({ type: 'REMOVE_ITEM', section: 'ai4se', index: items.length - 1 })}
      />
      {items.map((item, i) => (
        <div key={i} className="form-card">
          <span className="card-index">#{i + 1}</span>
          <div className="form-row">
            <label>요약</label>
            <textarea
              rows={3}
              value={item.summary}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'ai4se', index: i, field: 'summary', value: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label>링크</label>
            <input
              type="text"
              value={item.link}
              onChange={(e) => dispatch({ type: 'SET_ITEM_FIELD', section: 'ai4se', index: i, field: 'link', value: e.target.value })}
            />
          </div>
          <ImageUpload
            url={item.thumbnailUrl}
            base64={item.thumbnailBase64}
            section="ai4se"
            index={i}
            dispatch={dispatch}
          />
        </div>
      ))}
    </fieldset>
  );
}
