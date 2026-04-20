// usage: node generate-sidebar.js . > sidebar.ts
// check sidebar.ts and copy to sidebar[] ind .vitepresscontig.mts

const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];

if (!ROOT) {
  console.log("Usage: node generate-sidebar.js <docs-folder>");
  process.exit(1);
}

const IGNORE_FOLDERS = [
  '.vitepress',
  'node_modules',
  'Dubletten',
  'Unsortiert'
];

function shouldIgnore(dirPath) {
  return IGNORE_FOLDERS.some(ignore =>
    dirPath.split(path.sep).includes(ignore)
  );
}

function toTitle(name) {
  return name
    .replace('.md', '')
    .replace(/_/g, ' ')
    .trim();
}


function readDirRecursive(dir, baseUrl = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const items = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    if (shouldIgnore(fullPath)) continue;

    const urlPath = path.join(baseUrl, entry.name);

    if (entry.isDirectory()) {

      const children = readDirRecursive(fullPath, urlPath);
      const indexPath = path.join(fullPath, 'index.md');
      const hasIndex = fs.existsSync(indexPath);

      if (children.length > 0 || hasIndex) {
        const section = {
          text: toTitle(entry.name),
          collapsed: true
        };

        if (hasIndex) {
          section.link = '/' + path
            .join(baseUrl, entry.name)
            .replace(/\\/g, '/');
        }

        if (children.length > 0) {
          section.items = children;
        }

        items.push(section);
      }
    }

    if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name !== 'index.md'
    ) {
      items.push({
        text: toTitle(entry.name),
        link: '/' + urlPath.replace('.md', '').replace(/\\/g, '/')
      });
    }
  }

  items.sort((a, b) => a.text.localeCompare(b.text));
  return items;
}

const sidebar = readDirRecursive(ROOT);

// NUR sidebar-Array ausgeben
console.log(JSON.stringify(sidebar, null, 2));
