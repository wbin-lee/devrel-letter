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
  buildNewsSectionEmail,
  buildEditorPickSectionEmail,
  buildAi4seSectionEmail,
  buildBoardDsSectionEmail,
  buildBoardKoreaSectionEmail,
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
 * For the email template we locate repeating content by distinctive
 * surrounding HTML patterns and replace the inner content.
 */
export function processEmail(state) {
  let html = emailRaw;

  // --- NEWS section ---
  // The news items sit inside a <tr> with two <td> columns (side-by-side news).
  // Marker: the row that contains both news thumbnail columns.
  // We find the <tr> that wraps both news <td>s by looking for the unique
  // table structure right after the NEWS title.
  const newsRowRe = /(<colgroup><col style="width: 0px"><col style="width: 0px"><\/colgroup><tbody><tr>)([\s\S]*?)(<\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td class="cui-real-td" style="background-color:rgb\(217, 217, 217\))/;
  html = html.replace(newsRowRe, (_, before, _content, after) => {
    return before + buildNewsSectionEmail(state) + after;
  });

  // --- Editor's Pick section ---
  // Pick items are consecutive <tr>s with border-top:1px solid rgb(102,102,102)
  // between the section title row and the AI4SE section.
  const pickRe = /(<\/td><\/tr><\/tbody><\/table><\/td><\/tr>)(<tr><td class="cui-real-td" style="border-top:1px solid[\s\S]*?)(<\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td class="cui-real-td" style="border:0px none rgb\(0, 0, 0\);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;"><table style="width: 100%; border-collapse: collapse" class="cui-real-table" role="presentation"><colgroup><col><\/colgroup><tbody><tr><td class="cui-real-td" style="border:0px none rgb\(0, 0, 0\);padding-left:20px;padding-bottom:64px)/;
  html = html.replace(pickRe, (_, before, _content, after) => {
    return before + buildEditorPickSectionEmail(state) + after;
  });

  // --- AI4SE section ---
  // Two side-by-side <td> columns inside a row, similar pattern to news.
  const ai4seRowRe = /(<colgroup><col style="width: 0px"><col style="width: 0px"><\/colgroup><tbody><tr>)([\s\S]*?)(<\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td class="cui-real-td" style="background-color:rgb\(240, 240, 240\))/;
  html = html.replace(ai4seRowRe, (_, before, _content, after) => {
    return before + buildAi4seSectionEmail(state) + after;
  });

  // --- DevRel in DS board ---
  // Items appear as <tr>s inside a table right after the DS title, before
  // the 92px spacer row.
  const dsRe = /(DevRel in DS<\/span><\/p>\s*<\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td style="border:0px none rgb\(0, 0, 0\);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" class="cui-real-td"><table style="width: 100%; border-collapse: collapse" class="cui-real-table" role="presentation"><colgroup><col><\/colgroup><tbody>)([\s\S]*?)(<\/tbody><\/table><\/td><\/tr><tr><td class="cui-real-td" style="height:92px)/;
  html = html.replace(dsRe, (_, before, _content, after) => {
    return before + buildBoardDsSectionEmail(state) + after;
  });

  // --- DevRel in Korea board ---
  const koreaRe = /(DevRel in Korea<\/span><\/p>\s*<\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td style="border:0px none rgb\(0, 0, 0\);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" class="cui-real-td"><table style="width: 100%; border-collapse: collapse" class="cui-real-table" role="presentation"><colgroup><col><\/colgroup><tbody>)([\s\S]*?)(<\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><\/tbody><\/table><\/td><\/tr><tr><td class="cui-real-td" style="background-color:rgb\(0, 0, 0\))/;
  html = html.replace(koreaRe, (_, before, _content, after) => {
    return before + buildBoardKoreaSectionEmail(state) + after;
  });

  // Replace simple placeholders — email uses base64 when available
  const map = buildPlaceholderMap(state, 'base64');
  html = replacePlaceholders(html, map);

  return html;
}
