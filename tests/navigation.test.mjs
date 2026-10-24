import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { clean, sectionFor, topicFor, sequence, footerFor, createSidebar } from '../.vitepress/navigation.mjs'
const nav = JSON.parse(readFileSync(new URL('../.vitepress/sidebar.json', import.meta.url), 'utf8'))
const sidebar = createSidebar(nav)

test('canonical URLs, encoded spaces and index pages', () => {
  assert.equal(clean('/a/index.md'), '/a')
  assert.equal(clean('/a/'), '/a')
  assert.equal(clean('/a%20b.html#test'), '/a b')
})
test('each article opens only its own topic and has reciprocal local neighbours', () => {
  let count = 0
  for (const groups of Object.values(nav.sections)) {
    for (const group of groups) {
      for (const item of [group, ...group.items ?? []]) {
        if (!item.link || item.link.includes('#')) continue
        const { section, topic } = topicFor(nav, item.link)
        assert.ok(section, item.link)
        const key = clean(item.link) + (item.link.endsWith('/') ? '/index.md' : '.md')
        const menu = sidebar[key]
        assert.ok(menu, key)
        assert.equal(menu.filter(g => g.items?.length && g.collapsed === false).length, topic.items?.length ? 1 : 0, key)
        assert.equal(menu.find(g => g.items?.length && g.collapsed === false)?.text, topic.items?.length ? topic.text : undefined)
        const footer = footerFor(nav, item.link)
        if (footer.next) assert.equal(clean(footerFor(nav, footer.next.link).prev.link), clean(item.link), item.link)
        if (footer.prev) assert.equal(clean(footerFor(nav, footer.prev.link).next.link), clean(item.link), item.link)
        count++
      }
    }
  }
  console.log(count + ' menu entries verified')
})
test('cross-directory advice retains canonical editorial ownership', () => {
  const url = '/schulungsmodule/VonSchild2_ZuSchild3/2Schueler/svwsClient/'
  assert.equal(sectionFor(nav, url), 'beratung')
  assert.equal(sectionFor(nav, '/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/AdminTool/'), 'testdaten')
  assert.equal(sectionFor(nav, '/Fachberatung_Anleitungen/Reporting/'), 'beratung')
})
test('reading sequence ends at each topic boundary and ignores fragment shortcuts', () => {
  for (const groups of Object.values(nav.sections)) for (const group of groups) {
    if (group.link && topicFor(nav, group.link).topic !== group) continue
    const pages = sequence(nav, group)
    if (!pages.length) continue
    assert.equal(footerFor(nav, pages[0].link).prev, false)
    assert.equal(footerFor(nav, pages.at(-1).link).next, false)
  }
})
test('sidebar state is reconstructed after returning from another topic', () => {
  const first = '/schulungsmodule/gost/Klausurplanung/1. allgemeine Vorlagen'
  const second = '/schulungsmodule/sek_i/1_Unterrichtsfaecher'
  const open = url => sidebar[clean(url) + '.md'].find(g => g.collapsed === false)?.text
  assert.equal(open(first), 'Oberstufe: Klausurplanung')
  assert.equal(open(second), 'Sekundarstufe I')
  assert.equal(open(first), 'Oberstufe: Klausurplanung')
})
