/**
 * Build a flat placeholder map from form state.
 * Keys match the {{PLACEHOLDER}} names in templates.
 *
 * @param {'url'|'base64'} imageMode - 'url' for markdown, 'base64' for email
 */
export function buildPlaceholderMap(state, imageMode = 'url') {
  const map = {
    DATE: state.date,
    VOLUME: state.volume,
  };

  state.news.forEach((item, i) => {
    const n = i + 1;
    map[`NEWS${n}_TITLE`] = item.title;
    map[`NEWS${n}_LINK`] = item.link;
    map[`NEWS${n}_THUMBNAIL_IMAGE`] =
      imageMode === 'base64' && item.thumbnailBase64
        ? item.thumbnailBase64
        : item.thumbnailUrl;
  });

  state.editorPicks.forEach((item, i) => {
    const n = i + 1;
    map[`PICK${n}_TITLE`] = item.title;
    map[`PICK${n}_SUMMARY`] = item.summary;
    map[`PICK${n}_LINK`] = item.link;
  });

  state.ai4se.forEach((item, i) => {
    const n = i + 1;
    map[`AI4SE${n}_SUMMARY`] = item.summary;
    map[`AI4SE${n}_LINK`] = item.link;
    map[`AI4SE${n}_THUMBNAIL_IMAGE`] =
      imageMode === 'base64' && item.thumbnailBase64
        ? item.thumbnailBase64
        : item.thumbnailUrl;
  });

  state.devrelDs.forEach((item, i) => {
    const n = i + 1;
    map[`DS${n}_TITLE`] = item.title;
    map[`DS${n}_LINK`] = item.link;
  });

  state.devrelKorea.forEach((item, i) => {
    const n = i + 1;
    map[`KOREA${n}_TITLE`] = item.title;
    map[`KOREA${n}_LINK`] = item.link;
  });

  return map;
}

/**
 * Replace all {{KEY}} placeholders in text, including escaped variants
 * like {{KEY\_ESCAPED}} found in email templates.
 */
export function replacePlaceholders(template, map) {
  return template.replace(/\{\{([\w\\]+)\}\}/g, (match, key) => {
    // Strip literal backslashes (email template has \_)
    const normalizedKey = key.replace(/\\/g, '');
    return normalizedKey in map ? map[normalizedKey] : match;
  });
}
