export default function ActionButtons({ onPreview, onSaveMd, onSaveEmail }) {
  return (
    <div className="action-buttons">
      <button type="button" className="btn btn-preview" onClick={onPreview}>
        Preview
      </button>
      <button type="button" className="btn btn-md" onClick={onSaveMd}>
        Save as MD
      </button>
      <button type="button" className="btn btn-email" onClick={onSaveEmail}>
        Save as EMAIL Template
      </button>
    </div>
  );
}
