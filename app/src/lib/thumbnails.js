/**
 * Auto-load thumbnail images from the component/ directory.
 * Supports any image extension (png, jpg, jpeg, gif, webp, svg, bmp).
 */

const imageModules = import.meta.glob(
  '../../../component/{NEWS1,NEWS2,AI4SE1,AI4SE2}.{png,jpg,jpeg,gif,webp,svg,bmp}',
  { eager: true, import: 'default' }
);

// Build a map: { NEWS1: url, NEWS2: url, AI4SE1: url, AI4SE2: url }
export const thumbnailUrls = {};
for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
  thumbnailUrls[filename] = url;
}

async function toBase64(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

/**
 * Convert all thumbnail URLs to base64 data URLs.
 * Returns { NEWS1: 'data:image/png;base64,...', ... }
 */
export async function loadThumbnailBase64() {
  const result = {};
  const entries = Object.entries(thumbnailUrls);
  await Promise.all(
    entries.map(async ([name, url]) => {
      result[name] = await toBase64(url);
    })
  );
  return result;
}
