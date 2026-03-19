export default function MetaSection({ date, volume, dispatch }) {
  return (
    <fieldset className="form-section">
      <legend>기본 정보</legend>
      <div className="form-row">
        <label htmlFor="date">DATE</label>
        <input
          id="date"
          type="text"
          placeholder="예: 2026.03.19"
          value={date}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })}
        />
      </div>
      <div className="form-row">
        <label htmlFor="volume">VOLUME</label>
        <input
          id="volume"
          type="text"
          placeholder="예: 21"
          value={volume}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'volume', value: e.target.value })}
        />
      </div>
    </fieldset>
  );
}
