import { useReducer, useRef, useState, useCallback, useEffect } from 'react';
import { initialState, formReducer } from './store';
import { processMarkdown, processEmail } from './lib/templateEngine';
import { loadThumbnailBase64 } from './lib/thumbnails';
import MetaSection from './components/MetaSection';
import NewsSection from './components/NewsSection';
import EditorPickSection from './components/EditorPickSection';
import Ai4seSection from './components/Ai4seSection';
import BoardSection from './components/BoardSection';
import ActionButtons from './components/ActionButtons';
import './App.css';

function downloadFile(content, filename, mimeType = 'text/html;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const iframeRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    loadThumbnailBase64().then((base64Map) => {
      dispatch({ type: 'LOAD_THUMBNAILS', base64Map });
    });
  }, []);

  const handlePreview = () => {
    const html = processEmail(state);
    setPreviewHtml(html);
  };

  const handleClosePreview = () => {
    setPreviewHtml(null);
  };

  const getEditedHtml = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return null;
    const doc = iframe.contentDocument;
    if (!doc) return null;
    // Remove contenteditable before extracting
    doc.body.removeAttribute('contenteditable');
    const html = '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
    doc.body.setAttribute('contenteditable', 'true');
    return html;
  }, []);

  const handlePreviewSave = () => {
    const html = getEditedHtml();
    if (!html) return;
    const filename = `devrel_letter_email_${state.volume || 'draft'}.html`;
    downloadFile(html, filename, 'text/html;charset=utf-8');
  };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.body.setAttribute('contenteditable', 'true');
    doc.body.style.cursor = 'text';
    doc.body.style.backgroundColor = '#fff';
    doc.body.style.colorScheme = 'light';
  };

  const handleSaveMd = () => {
    const html = processMarkdown(state);
    const filename = `devrel_letter_${state.volume || 'draft'}.md`;
    downloadFile(html, filename, 'text/markdown;charset=utf-8');
  };

  const handleSaveEmail = () => {
    const html = processEmail(state);
    const filename = `devrel_letter_email_${state.volume || 'draft'}.html`;
    downloadFile(html, filename, 'text/html;charset=utf-8');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>DevRel Letter Generator</h1>
        <p>데브렐 레터 생성기</p>
        <button
          className="btn-theme-toggle"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main className="form-container">
        <MetaSection date={state.date} volume={state.volume} dispatch={dispatch} />
        <NewsSection items={state.news} dispatch={dispatch} />
        <EditorPickSection items={state.editorPicks} dispatch={dispatch} />
        <Ai4seSection items={state.ai4se} dispatch={dispatch} />
        <BoardSection title="DevRel in DS" sectionKey="devrelDs" items={state.devrelDs} dispatch={dispatch} />
        <BoardSection title="DevRel in Korea" sectionKey="devrelKorea" items={state.devrelKorea} dispatch={dispatch} />
        <ActionButtons onPreview={handlePreview} onSaveMd={handleSaveMd} onSaveEmail={handleSaveEmail} />
      </main>

      {previewHtml && (
        <div className="preview-overlay">
          <div className="preview-panel">
            <div className="preview-toolbar">
              <span className="preview-title">EMAIL Preview (편집 가능)</span>
              <div className="preview-toolbar-actions">
                <button className="btn btn-md btn-sm" onClick={handlePreviewSave}>
                  Save as HTML
                </button>
                <button className="btn btn-close-preview btn-sm" onClick={handleClosePreview}>
                  닫기
                </button>
              </div>
            </div>
            <iframe
              ref={iframeRef}
              title="Preview"
              srcDoc={previewHtml}
              className="preview-iframe"
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
