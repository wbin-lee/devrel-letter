/**
 * Generators for the email (table-based) template sections.
 * Produces email-client-compatible HTML using nested tables.
 */

// Inline base64 icon for clickable page-move button (same as in original template)
const PAGE_MOVE_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIpJREFUOE/tkUsOgDAIBat742FceGc3Xs14AYUIRlr6odadk7ygtp1CdK3pqFo5qPrU+gQTBC8Ql+wQ/hjLAvGZIbjG9QZfhuvRBMuQQGiBx3zySoj7uTOmSqh1plKyiWV+ZyolwphspSpICXNjqmu5A6kxzcIc4mxPtRm/0MxINQD/VG02yFc4dwKiuTixkCuZCwAAAABJRU5ErkJggg==';

// Inline base64 icon for clickable cursor button
const CURSOR_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIpJREFUOE/tkUsOgDAIBat742FceGc3Xs14AYUIRlr6odadk7ygtp1CdK3pqFo5qPrU+gQTBC8Ql+wQ/hjLAvGZIbjG9QZfhuvRBMuQQGiBx3zySoj7uTOmSqh1plKyiWV+ZyolwphspSpICXNjqmu5A6kxzcIc4mxPtRm/0MxINQD/VG02yFc4dwKiuTixkCuZCwAAAABJRU5ErkJggg==';

function emailImageSrc(item) {
  return item.thumbnailBase64 || item.thumbnailUrl;
}

function newsItemEmail(item) {
  return `<td class="cui-real-td" style="vertical-align:top;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:12px;padding-top:0px;"><table style="border-collapse: collapse" class="cui-real-table" role="presentation"><colgroup><col></colgroup><tbody><tr><td class="cui-real-td" style="font-size:24px;line-height:30px;font-weight:bold;color:rgb(5, 149, 168);border:0px none rgb(5, 149, 168);padding-left:0px;padding-bottom:20px;padding-right:0px;padding-top:0px;"><p><span>
</span><a style="color: rgb(5, 149, 168); text-decoration: none;" target="\\_blank" href="${item.link}">#${item.title}</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${CURSOR_ICON}"><span>
</span></p>
</td></tr><tr><td style="border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" class="cui-real-td"><p><span>
</span><a style="text-decoration: none;" target="\\_blank" href="${item.link}"><img data-cui-image="true" unselectable="on" style="display: block; max-width: 373px; height: 200px; border: 0px;" alt="alt" src="${emailImageSrc(item)}"></a><span>
</span></p>
</td></tr></tbody></table></td>`;
}

function editorPickItemEmail(item, isLast) {
  const borderStyle = isLast
    ? 'border-top:1px solid rgb(102, 102, 102);border-bottom:1px solid rgb(102, 102, 102);'
    : 'border-top:1px solid rgb(102, 102, 102);';
  return `<tr><td class="cui-real-td" style="${borderStyle}padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;"><table class="cui-real-table" style="background-color: rgb(255, 255, 255); width: 100%; border-collapse: collapse;" role="presentation"><colgroup><col></colgroup><tbody><tr><td class="cui-real-td" style="border:0px none rgb(0, 0, 0);padding-left:24px;padding-bottom:18px;padding-right:24px;padding-top:18px;"><table style="width: 100%; border-collapse: collapse;" class="cui-real-table" role="presentation"><colgroup><col></colgroup><tbody><tr><td class="cui-real-td" style="font-size:22px;line-height:28px;font-weight:bold;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:10px;padding-top:0px;"><p><span>
</span><span class="cui-origin-span">${item.title}</span><span>
</span></p>
</td></tr></tbody></table></td></tr><tr><td class="cui-real-td" style="background-color:rgb(230, 230, 230);font-size:18px;line-height:30px;border:0px none rgb(0, 0, 0);padding-left:30px;padding-bottom:20px;padding-right:30px;padding-top:20px;"><p><span>
</span><span class="cui-origin-span">${item.summary}<br><br></span><a style="color: rgb(5, 149, 168); font-weight: bold; text-decoration: none;" target="\\_blank" href="${item.link}">원문보기</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${PAGE_MOVE_ICON}"><span>
</span></p>
</td></tr></tbody></table></td></tr>`;
}

function ai4seItemEmail(item) {
  return `<td class="cui-real-td" style="vertical-align:top;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:14px;padding-top:0px;"><table style="width: 100%; border-collapse: collapse" class="cui-real-table" role="presentation"><colgroup><col></colgroup><tbody><tr><td style="border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" class="cui-real-td"><p><span>
</span><img data-cui-image="true" unselectable="on" style="display: inline-block; max-width: 378px; height: 200px; border: 0px; resize: none; zoom: 1; top: auto; left: auto; visibility: visible; width: 300.188px; margin: 0;" alt="alt" src="${emailImageSrc(item)}"><span>
</span></p>
</td></tr><tr><td class="cui-real-td" style="font-size:18px;line-height:35px;letter-spacing:-0.02em;color:rgb(68, 68, 68);border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:26px;"><p><span>
</span><span class="cui-origin-span">${item.summary}<br><br></span><a style="color: rgb(5, 149, 168); font-weight: bold; text-decoration: none;" target="\\_blank" href="${item.link}">원문보기</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${PAGE_MOVE_ICON}"><span>
</span></p>
</td></tr></tbody></table></td>`;
}

function boardItemEmail(item) {
  return `<tr><td class="cui-real-td" style="font-size:20px;line-height:40px;letter-spacing:-0.02em;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;"><p><span>
</span><span class="cui-origin-span">•</span><a style="color: rgb(5, 149, 168); text-decoration: none;" target="\\_blank" href="${item.link}">${item.title}</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${PAGE_MOVE_ICON}"><span>
</span></p>
</td></tr>`;
}

// ---------------------------------------------------------------------------
// Section builders — return the full section HTML to splice into the template
// ---------------------------------------------------------------------------

export function buildNewsSectionEmail(state) {
  const cols = state.news.map(newsItemEmail).join('');
  return cols;
}

export function buildEditorPickSectionEmail(state) {
  return state.editorPicks
    .map((item, i) => editorPickItemEmail(item, i === state.editorPicks.length - 1))
    .join('');
}

export function buildAi4seSectionEmail(state) {
  const cols = state.ai4se.map(ai4seItemEmail).join('');
  return cols;
}

export function buildBoardDsSectionEmail(state) {
  return state.devrelDs.map(boardItemEmail).join('');
}

export function buildBoardKoreaSectionEmail(state) {
  return state.devrelKorea.map(boardItemEmail).join('');
}
