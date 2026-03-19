/**
 * Generators for the email (table-based) template dynamic sections.
 * Each builder returns HTML that replaces content between email comment markers.
 */

const ARROW_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAIpJREFUOE/tkUsOgDAIBat742FceGc3Xs14AYUIRlr6odadk7ygtp1CdK3pqFo5qPrU+gQTBC8Ql+wQ/hjLAvGZIbjG9QZfhuvRBMuQQGiBx3zySoj7uTOmSqh1plKyiWV+ZyolwphspSpICXNjqmu5A6kxzcIc4mxPtRm/0MxINQD/VG02yFc4dwKiuTixkCuZCwAAAABJRU5ErkJggg==';

function imgSrc(item) {
  return item.thumbnailBase64 || item.thumbnailUrl;
}

// ---------------------------------------------------------------------------
// Item HTML generators (matching email template structure exactly)
// ---------------------------------------------------------------------------

function newsColumn(item, isFirst) {
  const pad = isFirst
    ? 'padding-left:0px;padding-bottom:0px;padding-right:12px;padding-top:0px;'
    : 'padding-left:12px;padding-bottom:0px;padding-right:0px;padding-top:0px;';
  return `<td class="cui-real-td" style="vertical-align:top;border:0px none rgb(0, 0, 0);${pad}"><table style="border-collapse: collapse" class="cui-real-table" role="presentation"><colgroup><col></colgroup><tbody><tr><td class="cui-real-td" style="font-size:24px;line-height:30px;font-weight:bold;color:rgb(5, 149, 168);border:0px none

&#x20;                                                   rgb(5, 149, 168);padding-left:0px;padding-bottom:20px;padding-right:0px;padding-top:0px;"><p><span>

&#x20;                                                 </span><a style="color: rgb(5, 149, 168); text-decoration: none;" target="_blank" href="${item.link}">${item.title}

&#x20;                                                   </a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" p="" src="${ARROW_ICON}"><span>

&#x20;                                             </span></p>

</td></tr><tr><td style="border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" class="cui-real-td"><p><span>

&#x20;                                                 </span><a style="text-decoration: none;" target="_blank" href="${item.link}"><img data-cui-image="true" unselectable="on" style="

&#x20;                                                       display: block;

&#x20;                                                       max-width: 373px;

&#x20;                                                       height: 200px;

&#x20;                                                       border: 0px;

&#x20;                                                     " alt="alt" src="${imgSrc(item)}"></a><span>

&#x20;                                               </span></p>

</td></tr></tbody></table></td>`;
}

function pickItem(item, isLast) {
  const border = isLast
    ? 'border-top:1px solid rgb(102, 102, 102);border-bottom:1px solid rgb(102, 102, 102);'
    : 'border-top:1px solid rgb(102, 102, 102);';
  return `<tr><td class="cui-real-td" style="${border}padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;"><table class="cui-real-table" style="

&#x20;                                   background-color: rgb(255, 255, 255);

&#x20;                                   width: 100%;

&#x20;                                   border-collapse: collapse;

&#x20;                                 " role="presentation"><colgroup><col></colgroup><tbody><tr><td class="cui-real-td" style="border:0px none rgb(0, 0, 0);padding-left:24px;padding-bottom:18px;padding-right:24px;padding-top:18px;"><table style="

&#x20;                                           width: 100%;

&#x20;                                           border-collapse: collapse;

&#x20;                                         " class="cui-real-table" role="presentation"><colgroup><col></colgroup><tbody><tr><td class="cui-real-td" style="font-size:22px;line-height:28px;font-weight:bold;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:10px;padding-top:0px;"><p><span>

&#x20;                                                 </span><span class="cui-origin-span">${item.title}</span><span>

&#x20;                                               </span></p>

</td></tr></tbody></table></td></tr><tr><td class="cui-real-td" style="background-color:rgb(230, 230, 230);font-size:18px;line-height:30px;border:0px none rgb(0, 0, 0);padding-left:30px;padding-bottom:20px;padding-right:30px;padding-top:20px;"><p><span>

&#x20;                                         </span><span class="cui-origin-span">${item.summary}<br><br></span><a style="color: rgb(5, 149, 168); font-weight: bold; text-decoration: none;" target="_blank" href="${item.link}">원문보기</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${ARROW_ICON}"><span>

&#x20;                                       </span></p>

</td></tr></tbody></table></td></tr>`;
}

function ai4seColumn(item, isFirst) {
  const pad = isFirst
    ? 'padding-left:0px;padding-bottom:0px;padding-right:14px;padding-top:0px;'
    : 'padding-left:14px;padding-bottom:0px;padding-right:0px;padding-top:0px;';
  return `<td class="cui-real-td" style="vertical-align:top;border:0px none rgb(0, 0, 0);${pad}"><table style="

&#x20;                                           width: 100%;

&#x20;                                           border-collapse: collapse;

&#x20;                                         " class="cui-real-table" role="presentation"><colgroup><col></colgroup><tbody><tr><td style="border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;" class="cui-real-td"><p style="text-align: center"><span>

&#x20;                                                 </span><img data-cui-image="true" unselectable="on" style="display: inline-block; max-width: 378px; height: 200px; border: 0px; resize: none; zoom: 1; top: auto; left: auto; visibility: visible; width: 300.188px; margin-left: 0px; margin-bottom: 0px; margin-right: 0px; margin-top: 0px;" alt="alt" src="${imgSrc(item)}"><span>

&#x20;                                               </span></p>

</td></tr><tr><td class="cui-real-td" style="vertical-align:top;font-size:18px;line-height:35px;color:rgb(68, 68, 68);letter-spacing:-0.02em;border:0px none

&#x20;                                                   rgb(68, 68, 68);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:26px;"><p><span>

&#x20;                                                 </span><span class="cui-origin-span">${item.summary}<br><br></span><a style="color: rgb(5, 149, 168); font-weight: bold; text-decoration: none;" target="_blank" href="${item.link}">원문보기</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${ARROW_ICON}"><span>

&#x20;                                               </span></p>

</td></tr></tbody></table></td>`;
}

function boardRow(item) {
  return `<tr><td class="cui-real-td" style="font-size:20px;line-height:40px;letter-spacing:-0.02em;border:0px none rgb(0, 0, 0);padding-left:0px;padding-bottom:0px;padding-right:0px;padding-top:0px;"><p><span>

&#x20;                                         </span><span class="cui-origin-span">\u2022</span><a style="color: rgb(5, 149, 168); text-decoration: none;" target="_blank" href="${item.link}">${item.title}</a><img data-cui-image="true" unselectable="on" style="vertical-align: middle; display: inline-block; width: 20px; height: 20px; border: 0; padding-left: 5px;" height="20" width="20" alt="alt" src="${ARROW_ICON}"><span>

&#x20;                                       </span></p>

</td></tr>`;
}

// ---------------------------------------------------------------------------
// Section builders — return full content to replace between markers
// ---------------------------------------------------------------------------

export function buildEmailNewsItems(state) {
  const cols = state.news.map((item, i) => newsColumn(item, i === 0)).join('');
  return `<tbody><tr>${cols}</tr></tbody>`;
}

export function buildEmailPickItems(state) {
  const rows = state.editorPicks
    .map((item, i) => pickItem(item, i === state.editorPicks.length - 1))
    .join('');
  return `${rows}</tbody></table></td></tr></tbody></table>`;
}

export function buildEmailAi4seItems(state) {
  const cols = state.ai4se.map((item, i) => ai4seColumn(item, i === 0)).join('');
  return `<tbody><tr>${cols}</tr></tbody>`;
}

export function buildEmailDsItems(state) {
  const rows = state.devrelDs.map(boardRow).join('');
  return `<tbody>${rows}</tbody></table>`;
}

export function buildEmailKoreaItems(state) {
  const rows = state.devrelKorea.map(boardRow).join('');
  return `<tbody>${rows}</tbody></table>`;
}
