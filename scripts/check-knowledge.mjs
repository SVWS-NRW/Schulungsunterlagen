import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const sourceRef = '34cf8ef8f23332df4ab65ad2a908a64d40ff1f70'
const old = path => execFileSync('git', ['show', sourceRef + ':' + path], { encoding: 'utf8' })
const read = path => readFileSync(path, 'utf8')
const links = source => [...source.matchAll(/\]\(([^)]+)\)/g)].map(match => match[1])
const linkArticle = read('wissen/links.md')
for (const link of links(old('wissen/links.md'))) assert.ok(links(linkArticle).includes(link), 'Anlaufstelle verloren: ' + link)
const firstTable = linkArticle.split('## Teststände & Werkzeuge')[0]
assert.equal(links(firstTable)[0], 'https://www.svws.nrw.de/')
assert.ok(firstTable.includes('[SchILD-NRW-3-Wiki]('))
const advice = old('wissen/links.md').split('## Beratung & Austausch')[1].split('## Entwicklung')[0]
for (const link of links(advice)) assert.ok(links(firstTable).includes(link), 'Beratungslink fehlt in erster Tabelle: ' + link)
const canonical = link => (link.startsWith('./') ? '/Tipp_der_Woche/' + link.slice(2) : link).replace(/\.md$/, '')
const datedRows = source => source.split('\n').flatMap(line => {
  const date = line.match(/\b\d{2}\.\d{2}\.\d{4}\b/)?.[0]
  const link = links(line)[0]
  return date && link ? [{ date, link: canonical(link) }] : []
})
const original = datedRows(old('Tipp_der_Woche/index.md'))
assert.ok(original.length > 0)
for (const [path, prefix] of [
  ['wissen/schild-tipps.md', '/Tipp_der_Woche/SchILD-Tipp_der_Woche/'],
  ['wissen/svws-tipps.md', '/Tipp_der_Woche/SVWS-Hack_der_Woche/']
]) {
  const current = read(path)
  assert.deepEqual(datedRows(current), original.filter(row => row.link.startsWith(prefix)), path + ': Datum oder Artikelzuordnung verändert')
  assert.ok(current.includes('**Programmstand beachten**'))
  assert.ok(links(current).includes('/beratung/probleme'))
  assert.ok(!current.includes('localhost:'), path + ': lokale URL veröffentlicht')
}
for (const link of ['/wissen/schild-tipps', '/wissen/svws-tipps']) assert.ok(links(read('Tipp_der_Woche/index.md')).includes(link))
console.log('Wissen: alle bisherigen Anlaufstellen sowie alle datierten Tipps und Artikelzuordnungen bei der Aufteilung erhalten.')
