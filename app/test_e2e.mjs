import fs from 'fs';

const md = fs.readFileSync('../template_markdown.md', 'utf8');
const email = fs.readFileSync('../template_email.md', 'utf8');

const state = {
  date: '2026.03.19',
  volume: '019',
  news: [{ title: 'Test News', link: 'https://example.com', thumbnailUrl: 'https://img.jpg', thumbnailBase64: '' }],
  editorPicks: [{ title: 'Pick 1', summary: 'Summary 1', link: 'https://pick1.com' }],
  ai4se: [{ summary: 'AI summary', link: 'https://ai.com', thumbnailUrl: 'https://ai.jpg', thumbnailBase64: '' }],
  devrelDs: [{ title: 'DS item', link: 'https://ds.com' }],
  devrelKorea: [{ title: 'Korea item', link: 'https://korea.com' }],
};

function replacePlaceholders(template, map) {
  return template.replace(/\{\{([\w\\]+)\}\}/g, (match, key) => {
    const normalizedKey = key.replace(/\\/g, '');
    return normalizedKey in map ? map[normalizedKey] : match;
  });
}

function replaceSection(html, startMarker, endMarker, replacement) {
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) { console.log('MISS:', startMarker); return html; }
  return html.slice(0, startIdx) + replacement + html.slice(endIdx + endMarker.length);
}

// --- Test Markdown ---
console.log('=== MARKDOWN TEMPLATE ===');
let html = md;
html = replaceSection(html, '<!-- news -->', '<!-- //end news -->', '<div>NEWS_REBUILT</div>');
html = replaceSection(html, '<!-- editor pick -->', '<!-- //end editor pick -->', '<div>EDITOR_REBUILT</div>');
html = replaceSection(html, '<!-- AI4SE -->', '<!-- //end AI4SE -->', '<div>AI4SE_REBUILT</div>');

const mdMap = { DATE: '2026.03.19', VOLUME: '019', NEWS1_THUMBNAIL_IMAGE: 'https://img.jpg', AI4SE1_THUMBNAIL_IMAGE: 'https://ai.jpg' };
html = replacePlaceholders(html, mdMap);

console.log('Date replaced:', html.includes('2026.03.19'));
console.log('Volume replaced:', html.includes('No.019'));
console.log('Sections replaced:', html.includes('NEWS_REBUILT'), html.includes('EDITOR_REBUILT'), html.includes('AI4SE_REBUILT'));
console.log('Unreplaced {{...}}:', (html.match(/\{\{[^}]+\}\}/g) || []).join(', ') || 'NONE');

// --- Test Email ---
console.log('\n=== EMAIL TEMPLATE ===');
const emailMap = { DATE: '2026.03.19', VOLUME: '019', NEWS1_THUMBNAIL_IMAGE: 'data:image/png;base64,xxx', AI4SE1_THUMBNAIL_IMAGE: 'data:image/png;base64,yyy', AI4SE2_THUMBNAIL_IMAGE: 'data:image/png;base64,zzz' };
let emailHtml = replacePlaceholders(email, emailMap);
console.log('Date replaced:', emailHtml.includes('2026.03.19'));
console.log('Volume replaced:', emailHtml.includes('No.019'));
console.log('NEWS1 img replaced:', emailHtml.includes('data:image/png;base64,xxx'));
console.log('AI4SE1 img replaced:', emailHtml.includes('data:image/png;base64,yyy'));
console.log('Unreplaced {{...}}:', (emailHtml.match(/\{\{[^}]+\}\}/g) || []).join(', ') || 'NONE');
