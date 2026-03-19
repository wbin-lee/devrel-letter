/**
 * Generators for the markdown (web) template sections.
 * Each function returns the inner HTML for its section.
 */

const WEB_BUTTON_SRC = 'https://dsdn.samsungds.net/upload/files/1769393142642\\_web\\_button.webp';

function newsItem(item, index, volume) {
  return `<li class="news\\_\\_item">
  <div class="hashtag">
    <a href="${item.link}" target="\\_blank"
      ># ${item.title}
      <img class="clickable-cursor" src="${WEB_BUTTON_SRC}" />
    </a>
  </div>
  <div class="thumb">
    <img src="${item.thumbnailUrl}" />
  </div>
</li>`;
}

function editorPickItem(item) {
  return `<details open class="editor-pick-item">
  <summary>
    <p>${item.title}</p>
  </summary>
  <p class="answer">
    ${item.summary}<br /><br />
    <a href="${item.link}" class="link-text" target="\\_blank">
      원문보기
      <img class="clickable-page-move" src="${WEB_BUTTON_SRC}" />
    </a>
  </p>
</details>
<br />`;
}

function ai4seItem(item) {
  return `<li class="ai4se\\_\\_item">
  <div class="thumb">
    <img src="${item.thumbnailUrl}" style="display: block; margin: 0 auto" />
  </div>
  <p class="content">
    ${item.summary}<br /><br />
    <a href="${item.link}" class="link-text" target="\\_blank">
      원문보기
      <img class="clickable-page-move" src="${WEB_BUTTON_SRC}" />
    </a>
  </p>
</li>`;
}

function boardItem(item) {
  return `<li class="board\\_\\_item">
  <a href="${item.link}" target="\\_blank"
    >${item.title}
    <img class="clickable-page-move" src="${WEB_BUTTON_SRC}" />
  </a>
</li>`;
}

// ---------------------------------------------------------------------------
// Section builders — return the full section HTML between comment markers
// ---------------------------------------------------------------------------

export function buildNewsSection(state) {
  const items = state.news.map((n, i) => newsItem(n, i, state.volume)).join('\n');
  return `<!-- news -->
<div class="news\\_\\_section">
  <div class="letter-section-inner">
    <h2 class="sub-title">
      <img src="https://dsdn.samsungds.net/upload/files/1769392933278\\_title\\_icon\\_01.webp" />
      <span>NEWS</span>
    </h2>
    <ul class="news\\_\\_list">
      ${items}
    </ul>
  </div>
</div>
<!-- //end news -->`;
}

export function buildEditorPickSection(state) {
  const items = state.editorPicks.map(editorPickItem).join('\n');
  return `<!-- editor pick -->
<div class="editorPick\\_\\_section">
  <div class="letter-section-inner">
    <h2 class="sub-title">
      <img src="https://dsdn.samsungds.net/upload/files/1769393137405\\_title\\_icon\\_02.webp" />
      <span>DSDN Editor's Pick</span>
    </h2>
    ${items}
  </div>
  <div class="object"></div>
</div>
<!-- //end editor pick -->`;
}

export function buildAi4seSection(state) {
  const items = state.ai4se.map(ai4seItem).join('\n');
  return `<!-- AI4SE -->
<div class="ai4se\\_\\_section">
  <div class="letter-section-inner">
    <h2 class="sub-title">
      <img src="https://dsdn.samsungds.net/upload/files/1769393146978\\_title\\_icon\\_03.webp" />
      <span>AI4SE 소식</span>
    </h2>
    <ul class="ai4se\\_\\_list">
      ${items}
    </ul>
  </div>
</div>
<!-- //end AI4SE -->`;
}

export function buildBoardSection(state) {
  const dsItems = state.devrelDs.map(boardItem).join('\n');
  const koreaItems = state.devrelKorea.map(boardItem).join('\n');
  return `<!-- board -->
<div class="board\\_\\_section">
  <div class="letter-section-inner">
    <h2 class="sub-title">
      <img src="https://dsdn.samsungds.net/upload/files/1769393155745\\_title\\_icon\\_04.webp" />
      <span>DevRel in DS</span>
    </h2>
    <ul class="board\\_\\_list">
      ${dsItems}
    </ul>
    <h2 class="sub-title">
      <img src="https://dsdn.samsungds.net/upload/files/1769393158573\\_title\\_icon\\_05.webp" />
      <span>DevRel in Korea</span>
    </h2>
    <ul class="board\\_\\_list">
      ${koreaItems}
    </ul>
  </div>
</div>`;
}
