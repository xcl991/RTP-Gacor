const fs = require('fs');

const content = fs.readFileSync('src/data/games.ts', 'utf8');

// Extract LAYOUT_OPTIONS array
const match = content.match(/export const LAYOUT_OPTIONS: LayoutOption\[\] = \[([\s\S]*?)\n\];/);

if (!match) {
  console.log('ERROR: Cannot find LAYOUT_OPTIONS export');
  process.exit(1);
}

const arrayContent = match[1];
const layouts = arrayContent.match(/\{[\s\S]*?\}/g) || [];

console.log('='.repeat(60));
console.log('LAYOUT_OPTIONS PARSER TEST');
console.log('='.repeat(60));
console.log('Total layouts found:', layouts.length);
console.log('');

layouts.forEach((layout, i) => {
  const id = layout.match(/id: "([^"]+)"/);
  const name = layout.match(/name: "([^"]+)"/);
  if (id && name) {
    const num = (i + 1).toString().padStart(2);
    const idStr = id[1].padEnd(25);
    console.log(`${num}. ${idStr} => ${name[1]}`);
  }
});

// Check if medieval exists
const hasMedieval = arrayContent.includes('casinomedieval');
console.log('');
console.log('='.repeat(60));
console.log('Medieval Kingdom exists:', hasMedieval ? 'YES ✅' : 'NO ❌');
console.log('='.repeat(60));
