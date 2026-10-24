import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import assert from 'node:assert/strict'
import { createSidebar } from '../.vitepress/navigation.mjs'
import './check-databases.mjs'
const nav = JSON.parse(readFileSync('.vitepress/sidebar.json', 'utf8'))
const sidebar = createSidebar(nav)
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
const baseline = process.env.CONTENT_BASE ?? '022646efd04bf6a2e6c13a819b8974740588cf59'
const files = git('ls-tree', '-r', '-z', '--name-only', baseline).split('\0').filter(p => p.endsWith('.md'))
const excluded = /^(README|ARTIKELSTANDARD|PORTAL-REDAKTION|api-examples|markdown-examples)\.md$|\/notes\.md$/
const matches = (source, re) => [...source.matchAll(re)].map(m => m[0])
assert.equal(files.length, 199, 'Vollständiges Markdown-Inventar einschließlich Unicode-Pfaden')
const removedDatabaseArticles = new Set(["Datenbanken/Berufskolleg/index.md","Datenbanken/GOSt-DB/GOSt_DB_Eigenschaften.md","Datenbanken/GOSt-DB_2026/GOSt_DB_Eigenschaften.md"])
const redesignedDatabaseArticles = new Set(["Datenbanken/index.md","Datenbanken/steckbrief.md","Datenbanken/Grundschule/index.md","Datenbanken/Gesamtschule/index.md","Datenbanken/GOSt-DB/index.md","Datenbanken/GOSt-DB_2026/index.md"])
let checked = 0
for (const file of files) {
  if (removedDatabaseArticles.has(file)) {
    assert.ok(!existsSync(file), 'Entfernter Datenbankartikel wieder vorhanden: ' + file)
    continue
  }
  assert.ok(existsSync(file), 'Bisheriger Artikel fehlt: ' + file)
  if (excluded.test(file)) continue
  if (redesignedDatabaseArticles.has(file)) {
    // Explicitly authorized consolidation; download, asset and merged text
    // preservation is verified by check-databases.mjs above.
    assert.ok(sidebar['/' + file], 'Keine gezielte Sidebar: ' + file)
    checked++
    continue
  }
  let old = git('show', baseline + ':' + file)
  let current = readFileSync(file, 'utf8')
  // These reviewed overview changes relocate cards; their article bodies retain
  // the original code, links, numbers and structure. Card ownership is tested separately.
  const revisedOverviews = new Set([
    'beratung/index.md', 'Datenbanken/index.md', 'schulungsmodule/index.md',
    'Fachberatung_Anleitungen/Test-_und_Schulungsserver/index.md'
  ])
  if (revisedOverviews.has(file)) {
    const body = source => source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    old = body(old)
    current = body(current)
  }
  // These two landing pages were explicitly rewritten: cards and old summaries
  // are replaced by menu-derived tables. Preserve the remaining training guidance.
  if (file === 'schulungsmodule/index.md') {
    const retained = source => source.slice(source.indexOf('## Eine Schulung vorbereiten')).split('## Basismodule')[0].trim()
    old = retained(old)
    current = retained(current)
  }
  if (file === 'Fachberatung_Anleitungen/Test-_und_Schulungsserver/index.md') {
    const retained = source => source.split('## Sammlung Installationsskripte')[0]
      .replace(/<(?:SectionCards|NavigationOverview)\b[^>]*\/>/g, '').trim()
    old = retained(old)
    current = retained(current)
  }
  if (file === 'schulungsmodule/VonSchild2_ZuSchild3/index.md') {
    old = old.replace('# Von SchILD-NRW 2 zu SchILD-NRW 3 und zum SVWS-Client', '# Umstieg zu SchILD-NRW 3')
  }
  for (const [label, re] of [
    ['Codeblöcke', /^([ \t]*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2[ \t]*$/gm],
    ['Inline-Code', /`[^`\n]+`/g],
    ['Linkziele', /\]\((?:[^()\n]|\([^()\n]*\))*\)/g],
    ['HTML-Medien', /(?:src|href)=["'][^"']*["']/g],
    ['Zahlen und Versionsangaben', /\d+(?:[.,:/_-]\d+)*/g],
    ['Aufgabenstruktur', /^\s*(?:[-+*]|\d+[.)])\s/gm],
    ['Überschriftenebenen', /^#{1,6} /gm],
  ]) assert.deepEqual(matches(current, re), matches(old, re), file + ': ' + label + ' verändert')
  if (file !== 'index.md') assert.ok(sidebar['/' + file], 'Keine gezielte Sidebar: ' + file)
  checked++
}
for (const file of ['eslint.config.js', '.vitepress/theme/print.css', '.vitepress/theme/components/DownloadPdf.vue']) {
  assert.equal(readFileSync(file, 'utf8'), git('show', baseline + ':' + file), 'Zurückgestellter Bereich verändert: ' + file)
}
console.log(checked + ' veröffentlichte Bestandsseiten: Pfade und geschützte Inhalte geprüft; freigegebene Datenbank-Zusammenführung gesondert validiert.')
