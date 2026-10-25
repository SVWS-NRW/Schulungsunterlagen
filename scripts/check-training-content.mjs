import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
const ref = 'd77833732b64678227dc8d586cc0d9b42c5210b2'
const prefix = 'Fachberatung_Anleitungen/Test-_und_Schulungsserver/'
const paths = ["Fachberatung_Anleitungen/Test-_und_Schulungsserver/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/Docker_Schulungsserver/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/VirtuaBox_SchulungsClient/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/Windows_Testserver/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/SVWS-Tools/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/VirtuaBox_SchulungsClient/Virtualbox_Installation/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/Proxmox_Installation/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/index.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/Moderatoren_Schulungsserver/Wartung.md","Fachberatung_Anleitungen/Test-_und_Schulungsserver/Installationsskripte/index.md"]
for (const path of paths) {
  assert.ok(existsSync(path), path + ': Bestandsartikel fehlt')
  const before = execFileSync('git', ['show', ref + ':' + path], { encoding: 'utf8' })
  const current = readFileSync(path, 'utf8')
  const images = text => [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(match => match[1])
  for (const image of images(before)) assert.ok(images(current).includes(image), path + ': Bildverweis entfernt: ' + image)
  assert.ok(!current.includes('Schulungsunterlagen/raw'), path + ': alter Skript-Downloadpfad')
  assert.equal((current.match(/^# /gm) ?? []).length, 1, path + ': genau ein Artikeltitel')
}
const nav = JSON.parse(readFileSync('.vitepress/sidebar.json', 'utf8'))
const group = nav.sections.schulungen.find(item => item.text === 'Schulungsumgebungen')
assert.equal(group.items.length, 9)
const oldScripts = execFileSync('git', ['ls-tree', '-r', '--name-only', ref, prefix], { encoding: 'utf8' }).split('\n').filter(path => path.endsWith('.sh'))
assert.equal(oldScripts.length, 27)
for (const path of oldScripts) {
  assert.ok(existsSync(path), path + ': Skriptpfad entfernt')
  assert.ok(readFileSync(prefix + 'Installationsskripte/index.md', 'utf8').includes(path.split('/').at(-1)), path + ': fehlt im Prüfbericht')
}
console.log('Schulungsumgebungen: zehn Artikel, 27 Skriptpfade, vollständige Bildverweise und Prüfbericht geprüft.')
