import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const sourceRef = 'a2af73f2774552d76e55d03ac82cf1b8839e11bb'
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
const source = path => git('show', sourceRef + ':' + path)
const current = path => readFileSync(path, 'utf8')
const folders = ['Grundschule', 'GOSt-DB', 'GOSt-DB_2026', 'Gesamtschule']
const downloads = text => [...text.matchAll(/\]\((https:[^)]+\.(?:sqlite|zip|7z|pdf))\)/g)].map(match => match[1])
const tree = new Set(git('ls-files', '-z', 'Datenbanken').split('\0').filter(Boolean))
for (const folder of folders) {
  const path = 'Datenbanken/' + folder + '/index.md'
  const article = current(path)
  for (const heading of ['Einsatzbereich', 'Datenbanken herunterladen', 'Eigenschaften und Einsatzmöglichkeiten', 'Herkunft und Hinweise']) {
    assert.ok(article.includes('## ' + heading), path + ': ' + heading)
  }
  const before = downloads(source(path))
  const after = downloads(article)
  assert.ok(before.length > 0, path + ': keine belegten Downloads')
  for (const link of before) assert.ok(after.includes(link), path + ': Download entfernt: ' + link)
  for (const link of after) {
    const relative = decodeURIComponent(link.split('/refs/heads/dev/')[1] ?? '')
    assert.ok(tree.has(relative), path + ': Download nicht im Bestand: ' + link)
  }
}
for (const folder of ['GOSt-DB', 'GOSt-DB_2026']) {
  const oldPath = 'Datenbanken/' + folder + '/GOSt_DB_Eigenschaften.md'
  const retained = source(oldPath).replace(/^# Erläuterung der Datenbanken GOSt[^\n]*\n+/, '').trimEnd()
    .replace(/^### /gm, '#### ').replace(/^## /gm, '### ')
  assert.ok(current('Datenbanken/' + folder + '/index.md').includes(retained), oldPath + ': fachliche Beschreibung nicht vollständig übernommen')
  assert.ok(!existsSync(oldPath), oldPath + ': Doppelartikel nicht entfernt')
}
assert.ok(!existsSync('Datenbanken/Berufskolleg/index.md'), 'Berufskolleg-Platzhalter nicht entfernt')
const beforeGS = source('Datenbanken/Grundschule/index.md').split('## Datenbanken gs_2026_x.sqlite und gs_2026_x_mitLeistungsdaten.sqlite')[1]
  .split('## Dateien in dieser Sammlung')[0].trim().replace('Grundschludatenbank', 'Grundschuldatenbank')
assert.ok(current('Datenbanken/Grundschule/index.md').includes(beforeGS), 'Grundschul-Eigenschaften unvollständig')
const oldCardLink = './GOSt-DB_2026/GOSt_DB_Eigenschaften.md'
assert.ok(current('Datenbanken/steckbrief.md').startsWith(source('Datenbanken/steckbrief.md').replace(oldCardLink, './GOSt-DB_2026/#eigenschaften')))
for (const sourceName of ['SVWS-TestSqlites', 'SVWS-TestMDBs']) assert.ok(current('Datenbanken/steckbrief.md').includes('https://github.com/SVWS-NRW/' + sourceName), 'Testdatenquelle verloren: ' + sourceName)
const changedAssets = git('diff', '--diff-filter=MD', '--name-only', sourceRef, '--', 'Datenbanken/').trim().split('\n').filter(path => path && !path.endsWith('.md'))
assert.deepEqual(changedAssets, [], 'Datenbankdateien oder Begleitmaterialien verändert')
console.log('Datenbanksammlungen: Downloadziele, unveränderte Dateien und vollständig zusammengeführte Fachbeschreibungen geprüft.')
