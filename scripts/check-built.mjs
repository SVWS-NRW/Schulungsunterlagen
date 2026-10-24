import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname, relative, join } from 'node:path'
import assert from 'node:assert/strict'
const root = resolve('.vitepress/dist')
const base = process.env.BASE ?? '/Schulungsunterlagen/'
const files = readdirSync(root, { recursive: true }).filter(p => String(p).endsWith('.html')).map(String)
const errors = []
const decode = text => text.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
const html = new Map(files.map(p => [resolve(root, p), readFileSync(resolve(root, p), 'utf8')]))
let checked = 0
for (const [path, source] of html) {
  if (/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/.test(source)) errors.push(relative(root, path) + ': verschachtelter Link')
  for (const match of source.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = decode(match[1])
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href) || !href) continue
    const [raw, hash] = href.split('#')
    let decoded
    try { decoded = decodeURIComponent(raw.split('?')[0]) } catch { errors.push('Ungültige URL: ' + href); continue }
    let target
    if (!decoded) target = path
    else if (decoded.startsWith('/')) {
      if (!decoded.startsWith(base)) { errors.push('Link außerhalb BASE: ' + href); continue }
      target = resolve(root, decoded.slice(base.length))
    } else target = resolve(dirname(path), decoded)
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html')
    if (!existsSync(target) && existsSync(target + '.html')) target += '.html'
    if (!existsSync(target)) { errors.push(relative(root, path) + ' -> ' + href); continue }
    if (hash && html.has(target)) {
      const id = decodeURIComponent(hash)
      const ids = [...html.get(target).matchAll(/\b(?:id|name)="([^"]+)"/g)].map(m => decode(m[1]))
      if (!ids.includes(id)) errors.push(relative(root, path) + ' -> fehlender Anker ' + href)
    }
    checked++
  }
}
console.log(files.length + ' HTML-Seiten, ' + checked + ' lokale Link- und Medienziele geprüft.')
for (const error of [...new Set(errors)]) console.error(error)
assert.equal(errors.length, 0, 'Build enthält ungültige Ziele oder HTML-Verknüpfungen')
