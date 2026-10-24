import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = p => JSON.parse(readFileSync(resolve(root, p), 'utf8'))
const nav = read('.vitepress/sidebar.json')
const pkg = read('package.json')
const lock = read('package-lock.json')
const errors = []
const found = new Map()
const shared = new Set()
const routes = Object.entries(nav.routes)
const sections = nav.sections

if (lock.lockfileVersion !== 3) errors.push('package-lock.json: lockfileVersion muss 3 sein')
if (lock.packages?.['']?.name !== pkg.name) errors.push('Paketname in package-lock.json unterscheidet sich von package.json')
for (const type of ['dependencies', 'devDependencies']) {
  for (const [name, version] of Object.entries(pkg[type] ?? {})) {
    if (lock.packages?.['']?.[type]?.[name] !== version) errors.push(`Lockfile-Abweichung: ${name}`)
  }
}
if (pkg.devDependencies?.vitepress !== '^1.6.4') errors.push('VitePress-Version vom vereinbarten gemeinsamen Stand abweichend')

const normalize = url => decodeURIComponent(url.split(/[?#]/, 1)[0]).replace(/^\//, '')
function pageExists(url) {
  const p = normalize(url)
  const paths = p.endsWith('/') ? [p + 'index.md'] : [p + '.md', p + '/index.md', p + '.html']
  return paths.some(x => existsSync(resolve(root, x)))
}
function walk(items, section, trail = []) {
  for (const item of items) {
    if (!item.text?.trim()) errors.push(`Leerer Menütext: ${section}`)
    if (item.link?.startsWith('/')) {
      const key = item.link.split('#')[0]
      if (!pageExists(key)) errors.push(`Fehlende Seite: ${section}: ${key}`)
      const prev = found.get(key)
      if (prev && prev !== section) shared.add(key)
      found.set(key, section)
    }
    if (item.text?.length > 48 || ['[', '**', 'http:', 'https:', '_'].some(mark => item.text?.includes(mark))) errors.push(`Ungeeigneter Menütext: ${item.text}`)
    if (trail.length > 1) errors.push(`Zu tiefe Menüstruktur: ${[section, ...trail, item.text].join(' > ')}`)
    if (item.items?.length && trail.length > 0) errors.push(`Artikel darf keine Unterartikel enthalten: ${item.text}`)
    if (item.items) walk(item.items, section, [...trail, item.text])
  }
}
for (const [section, items] of Object.entries(sections)) walk(items, section)
for (const [prefix, section] of routes) {
  if (!sections[section]) errors.push(`Unbekannter Bereich ${section} für ${prefix}`)
}
for (const required of ['team', 'schulungen', 'testdaten', 'beratung', 'fortbildung', 'wissen']) {
  if (!sections[required]) errors.push(`Fehlender Navigationsbereich: ${required}`)
}
console.log(`Navigation: ${Object.keys(sections).length} Bereiche, ${routes.length} Routen, ${found.size} verlinkte Seiten.`)
console.log(`Bereichsübergreifend verlinkte Seiten: ${shared.size} (zulässig).`)
console.log('Paketdefinition und Lockfile: geprüft.')
if (errors.length) {
  for (const e of errors) console.error('FEHLER:', e)
  process.exitCode = 1
} else console.log('Technische Strukturprüfung erfolgreich.')
