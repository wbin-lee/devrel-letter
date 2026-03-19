// Simulate what Vite ?raw gives us: literal backslash + underscore in the file
const raw = '{{NEWS1\\_THUMBNAIL\\_IMAGE}} and {{DATE}} and {{AI4SE1\\_THUMBNAIL\\_IMAGE}}';
console.log('input:', JSON.stringify(raw));

// Current regex from placeholders.js — does it work?
const oldRe = /\{\{(\w+(?:\\?_\w+)*)\}\}/g;
console.log('\n--- Old regex ---');
let m;
while ((m = oldRe.exec(raw)) !== null) {
  console.log('match:', JSON.stringify(m[0]), '-> group:', JSON.stringify(m[1]));
}

// New approach: match {{ then anything that's word char or backslash or underscore, then }}
const newRe = /\{\{([\w\\]+)\}\}/g;
console.log('\n--- New regex ---');
while ((m = newRe.exec(raw)) !== null) {
  console.log('match:', JSON.stringify(m[0]), '-> group:', JSON.stringify(m[1]));
  const normalized = m[1].replace(/\\/g, '');
  console.log('  normalized:', normalized);
}
