import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { clean, sectionFor, topicFor, sequence, footerFor, createSidebar } from '../.vitepress/navigation.mjs'
const nav = JSON.parse(readFileSync(new URL('../.vitepress/sidebar.json', import.meta.url), 'utf8'))
const sidebar = createSidebar(nav)
const topicsIn = (menu, section) => section === 'team' ? menu : menu[0].items

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
        const topics = topicsIn(menu, section)
        assert.ok(menu, key)
        assert.equal(topics.filter(g => g.items?.length && g.collapsed === false).length, topic.items?.length ? 1 : 0, key)
        assert.equal(topics.find(g => g.items?.length && g.collapsed === false)?.text, topic.items?.length ? topic.text : undefined)
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
  const open = url => topicsIn(sidebar[clean(url) + '.md'], sectionFor(nav, url)).find(g => g.collapsed === false)?.text
  assert.equal(open(first), 'Sekundarstufe II - Klausurplanung')
  assert.equal(open(second), 'Sekundarstufe I')
  assert.equal(open(first), 'Sekundarstufe II - Klausurplanung')
})

test('overview, equal main topics and other areas follow the top navigation', () => {
  for (const item of nav.nav) {
    const section = sectionFor(nav, item.link)
    if (section === 'team') continue
    const menu = sidebar[clean(item.link) + '/index.md']
    assert.equal(menu[0].text, item.text)
    assert.equal(menu[0].collapsed, undefined)
    assert.deepEqual(menu[0].items[0], { text: 'Übersicht', link: item.link })
    assert.equal(menu[1].text, 'Weitere Bereiche')
    assert.equal(menu[1].collapsed, true)
    assert.deepEqual(menu[1].items, nav.nav.filter(other => other.link !== item.link).map(({ text, link }) => ({ text, link })))
  }
})
test('school topics have the requested exact reading order', () => {
  assert.deepEqual(nav.sections.schulungen.map(item => item.text), [
    'Übersicht', 'Schulungsvorlagen', 'Basisschulung', 'Grundschule Grundlagen',
    'Grundschule Zeugnisse', 'Sekundarstufe I', 'Sekundarstufe II - EF',
    'Sekundarstufe II - Q1/Q2 und Abitur', 'Sekundarstufe II - Klausurplanung',
    'Sekundarstufe II - Laufbahnplanung', 'Berufskolleg', 'Reports erstellen',
    'SchILD-NRW 2 zu 3', 'Schulungsumgebung'
  ])
  assert.ok(!nav.sections.schulungen.some(item => item.link?.includes('VonSchild2_ZuSchild3')))
})
test('school environments move editorially without moving any article URLs', () => {
  for (const url of [
    '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/',
    '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Docker_Schulungsserver/',
    '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/Proxmox_Schulungsserver/Proxmox_Installation/'
  ]) {
    assert.equal(sectionFor(nav, url), 'schulungen')
    assert.equal(topicFor(nav, url).topic.text, 'Schulungsumgebung')
  }
  assert.ok(!nav.sections.testdaten.some(item => item.text === 'Schulungsumgebungen'))
})
test('onboarding retains its existing menu without a new wrapper or extra areas', () => {
  assert.deepEqual(sidebar['/neu-im-team/index.md'], [{
    text: 'Neu im Team', collapsed: false, items: [
      { text: 'Erste Schritte', link: '/neu-im-team/' },
      { text: 'Kommunikation', link: '/neu-im-team/kommunikation' },
      { text: 'Zusammenarbeit', link: '/neu-im-team/rollen' }
    ]
  }])
})
test('old overview pages keep an exact sidebar and do not enter another topic sequence', () => {
  for (const url of Object.keys(nav.aliases)) {
    assert.ok(sidebar[clean(url) + '/index.md'])
    assert.equal(topicFor(nav, url).topic.text, 'Übersicht')
    assert.deepEqual(footerFor(nav, url), { prev: false, next: false })
  }
})
