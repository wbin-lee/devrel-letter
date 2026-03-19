export default function SectionHeader({ title, count, min, max, onAdd, onRemove }) {
  return (
    <div className="section-header">
      <h2>{title} <span className="count">({count}/{max})</span></h2>
      <div className="section-header-actions">
        {count < max && (
          <button type="button" className="btn-add" onClick={onAdd}>+ 추가</button>
        )}
        {count > min && (
          <button type="button" className="btn-remove" onClick={onRemove}>− 삭제</button>
        )}
      </div>
    </div>
  );
}
