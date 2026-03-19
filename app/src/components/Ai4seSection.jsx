import SectionHeader from './SectionHeader';
import { thumbnailUrls } from '../lib/thumbnails';

const TEMPLATE = { summary: '', link: '', thumbnailUrl: '', thumbnailBase64: '' };

export default function Ai4seSection({ items, dispatch }) {
  return (
    <fieldset className="form-section">
      <SectionHeader
        title="AI4SE 소식"
        count={items.length}
        min={1}
        max={2}
        onAdd={() => {
          const n = items.length + 1;
          dispatch({ type: 'ADD_ITEM', section: 'ai4se', template: { ...TEMPLATE, thumbnailUrl: thumbnailUrls[`AI4SE${n}`] || '' } });
        }}
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
          <div className="form-row">
            <label>썸네일 (component/AI4SE{i + 1}.*)</label>
            {(item.thumbnailBase64 || item.thumbnailUrl) ? (
              <div className="image-preview">
                <img src={item.thumbnailBase64 || item.thumbnailUrl} alt={`AI4SE${i + 1} 썸네일`} />
              </div>
            ) : (
              <p className="image-spec-hint">component/ 폴더에 AI4SE{i + 1} 이미지 파일을 넣어주세요.</p>
            )}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
