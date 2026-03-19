const fs = require('fs');
const template = fs.readFileSync('../template_email.md', 'utf-8');

function replaceSection(html, startMarker, endMarker, replacement) {
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) { console.log('MARKER NOT FOUND:', startMarker); return html; }
  return html.slice(0, startIdx) + replacement + html.slice(endIdx + endMarker.length);
}

// Check each marker exists and its table balance
const markers = ['email-news-items', 'email-pick-items', 'email-ai4se-items', 'email-ds-items', 'email-korea-items'];
markers.forEach(m => {
  const startTag = '<!-- ' + m + ' -->';
  const endTag = '<!-- //' + m + ' -->';
  const s = template.indexOf(startTag);
  const e = template.indexOf(endTag);
  console.log(m + ': start=' + s + ' end=' + e);
  if (s >= 0 && e >= 0) {
    const content = template.slice(s + startTag.length, e);
    const opens = (content.match(/<table/gi) || []).length;
    const closes = (content.match(/<\/table>/gi) || []).length;
    console.log('  content table balance: opens=' + opens + ' closes=' + closes);
  }
});

// Now generate a full output and write it for inspection
const ARROW = 'data:image/png;base64,ABC';

function boardRow(title, link) {
  return `<tr><td class="cui-real-td" style="font-size:20px;line-height:40px;letter-spacing:-0.02em;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;"><p><span>
                                         </span><span class="cui-origin-span">\u2022</span><a style="color: rgb(5, 149, 168); text-decoration: none;" target="_blank" href="${link}">${title}</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${ARROW}"><span>
                                       </span></p>
</td></tr>`;
}

// Replace all sections with simple test content
let html = template;
html = replaceSection(html, '<!-- email-news-items -->', '<!-- //email-news-items -->', '<tbody><tr><td>NEWS TEST</td></tr></tbody></table>');
html = replaceSection(html, '<!-- email-pick-items -->', '<!-- //email-pick-items -->', '<tr><td>PICK TEST</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>');
html = replaceSection(html, '<!-- email-ai4se-items -->', '<!-- //email-ai4se-items -->', '<tbody><tr><td>AI4SE TEST</td></tr></tbody></table>');
html = replaceSection(html, '<!-- email-ds-items -->', '<!-- //email-ds-items -->', '<tbody>' + boardRow('DS Test 1', '#') + boardRow('DS Test 2', '#') + '</tbody></table>');
html = replaceSection(html, '<!-- email-korea-items -->', '<!-- //email-korea-items -->', '<tbody>' + boardRow('Korea Test 1', '#') + '</tbody></table>');

// Replace placeholders
html = html.replace(/\{\{[\w\\]+\}\}/g, 'PLACEHOLDER');

fs.writeFileSync('debug_output.html', html);
console.log('\nWrote debug_output.html (' + html.length + ' bytes)');

// Check overall table balance
const allOpens = (html.match(/<table/gi) || []).length;
const allCloses = (html.match(/<\/table>/gi) || []).length;
console.log('Total table balance: opens=' + allOpens + ' closes=' + allCloses);
