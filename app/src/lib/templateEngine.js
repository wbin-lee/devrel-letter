import markdownRaw from '../../../template_markdown.md?raw';
import emailRaw from '../../../template_email.md?raw';
import { buildPlaceholderMap, replacePlaceholders } from './placeholders';
import {
  buildNewsSection,
  buildEditorPickSection,
  buildAi4seSection,
  buildBoardSection,
} from './markdownGenerator';
import {
  buildEmailNewsItems,
  buildEmailPickItems,
  buildEmailAi4seItems,
  buildEmailDsItems,
  buildEmailKoreaItems,
} from './emailGenerator';

/**
 * Replace content between two marker strings (inclusive).
 */
function replaceSection(html, startMarker, endMarker, replacement) {
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) return html;
  return html.slice(0, startIdx) + replacement + html.slice(endIdx + endMarker.length);
}

// ---------------------------------------------------------------------------
// Markdown template processing
// ---------------------------------------------------------------------------

export function processMarkdown(state) {
  let html = markdownRaw;

  if (import.meta.env.DEV) {
    console.log('[processMarkdown] raw type:', typeof markdownRaw);
    console.log('[processMarkdown] raw length:', markdownRaw?.length);
    console.log('[processMarkdown] has <!-- news -->:', html.includes('<!-- news -->'));
    console.log('[processMarkdown] state.date:', state.date, 'state.volume:', state.volume);
    console.log('[processMarkdown] state.news:', JSON.stringify(state.news));
  }

  // Replace dynamic sections (order doesn't matter — markers are unique)
  html = replaceSection(html, '<!-- news -->', '<!-- //end news -->', buildNewsSection(state));
  html = replaceSection(html, '<!-- editor pick -->', '<!-- //end editor pick -->', buildEditorPickSection(state));
  html = replaceSection(html, '<!-- AI4SE -->', '<!-- //end AI4SE -->', buildAi4seSection(state));

  // Board section: from <!-- board --> to the footer div
  const boardStart = '<!-- board -->';
  const boardEnd = '<div class="letter\\_\\_footer">';
  const boardStartIdx = html.indexOf(boardStart);
  const boardEndIdx = html.indexOf(boardEnd);
  if (boardStartIdx !== -1 && boardEndIdx !== -1) {
    html = html.slice(0, boardStartIdx) + buildBoardSection(state) + '\n' + html.slice(boardEndIdx);
  }

  // Replace simple placeholders (DATE, VOLUME, remaining thumbnails)
  // Markdown always uses URLs for images
  const map = buildPlaceholderMap(state, 'url');
  html = replacePlaceholders(html, map);

  return html;
}

// ---------------------------------------------------------------------------
// Email template processing
// ---------------------------------------------------------------------------

/**
 * Email template processing:
 * 1. Rebuild dynamic sections (variable item counts) between comment markers
 * 2. Replace remaining {{PLACEHOLDER}} tokens (DATE, VOLUME)
 */
export function processEmail(state) {
  let html = emailRaw;

  // Rebuild dynamic sections with correct number of items
  html = replaceSection(html, '<!-- email-news-items -->', '<!-- //email-news-items -->', buildEmailNewsItems(state));
  html = replaceSection(html, '<!-- email-pick-items -->', '<!-- //email-pick-items -->', buildEmailPickItems(state));
  html = replaceSection(html, '<!-- email-ai4se-items -->', '<!-- //email-ai4se-items -->', buildEmailAi4seItems(state));
  html = replaceSection(html, '<!-- email-ds-items -->', '<!-- //email-ds-items -->', buildEmailDsItems(state));
  html = replaceSection(html, '<!-- email-korea-items -->', '<!-- //email-korea-items -->', buildEmailKoreaItems(state));

  // Replace remaining placeholders (DATE, VOLUME)
  const map = buildPlaceholderMap(state, 'base64');
  html = replacePlaceholders(html, map);

  if (import.meta.env.DEV) {
    const remaining = html.match(/\{\{[^}]+\}\}/g);
    if (remaining) {
      console.warn('[processEmail] unreplaced placeholders:', remaining);
    }
  }

  return html;
}
