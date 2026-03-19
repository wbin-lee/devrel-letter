import { useRef } from 'react';

export default function ImageUpload({ url, base64, section, index, dispatch, spec }) {
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result; // data:image/...;base64,...
      dispatch({ type: 'SET_ITEM_FIELD', section, index, field: 'thumbnailBase64', value: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    dispatch({ type: 'SET_ITEM_FIELD', section, index, field: 'thumbnailUrl', value: e.target.value });
  };

  const handleRemove = () => {
    dispatch({ type: 'SET_ITEM_FIELD', section, index, field: 'thumbnailBase64', value: '' });
    if (fileRef.current) fileRef.current.value = '';
  };

  const preview = base64 || url;

  return (
    <div className="image-upload">
      <div className="form-row">
        <label>썸네일 URL</label>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="https://..." />
      </div>
      <div className="form-row">
        <label>또는 이미지 업로드 (EMAIL용 base64 변환)</label>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="file-input" />
        {spec && <p className="image-spec-hint">{spec}</p>}
      </div>
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="썸네일 미리보기" />
          {base64 && (
            <button type="button" className="btn-remove-img" onClick={handleRemove}>이미지 제거</button>
          )}
        </div>
      )}
    </div>
  );
}
