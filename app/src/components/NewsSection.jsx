import SectionHeader from './SectionHeader';
import { thumbnailUrls } from '../lib/thumbnails';

const TEMPLATE = { title: '', link: '', thumbnailUrl: '', thumbnailBase64: '' };

export default function NewsSection({ items, dispatch }) {
  return (
    <fieldset className="form-section">
      <SectionHeader
        title="NEWS"
        count={items.length}
        min={1}
        max={2}
        onAdd={() => {
          const n = items.length + 1;
          dispatch({ type: 'ADD_ITEM', section: 'news', template: { ...TEMPLATE, thumbnailUrl: thumbnailUrls[`NEWS${n}`] || '' } });
        }}
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
          <div className="form-row">
            <label>썸네일 (component/NEWS{i + 1}.*)</label>
            {(item.thumbnailBase64 || item.thumbnailUrl) ? (
              <div className="image-preview">
                <img src={item.thumbnailBase64 || item.thumbnailUrl} alt={`NEWS${i + 1} 썸네일`} />
              </div>
            ) : (
              <p className="image-spec-hint">component/ 폴더에 NEWS{i + 1} 이미지 파일을 넣어주세요.</p>
            )}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
