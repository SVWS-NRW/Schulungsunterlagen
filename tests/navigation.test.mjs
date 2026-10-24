import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { clean, sectionFor, topicFor, sequence, footerFor, createSidebar, sidebarFor } from '../.vitepress/navigation.mjs'
import { overviewRows } from '../.vitepress/overview.mjs'
const nav = JSON.parse(readFileSync(new URL('../.vitepress/sidebar.json', import.meta.url), 'utf8'))
const sidebar = createSidebar(nav)
test('canonical URLs, encoded spaces and index pages', () => {
  assert.equal(clean('/a/index.md'), '/a')
  assert.equal(clean('/a/'), '/a')
  assert.equal(clean('/a%20b.html#test'), '/a b')
})
test('every article has a suitable initial section and reciprocal local neighbours', () => {
  for (const groups of Object.values(nav.sections)) for (const group of groups) {
    for (const item of [group, ...group.items ?? []]) {
      if (!item.link || item.link.includes('#')) continue
      const { section, topic } = topicFor(nav, item.link)
      const key = clean(item.link) + (item.link.endsWith('/') ? '/index.md' : '.md')
      assert.ok(sidebar[key], key)
      const menu = sidebar[key]
      if (section === 'schulungen') {
        const opened = menu.filter(group => group.collapsed === false)
        assert.equal(opened.length, 1, key)
        assert.equal(opened[0].text, topic.text === 'Schulungsumgebungen' ? 'Schulungsumgebungen' : 'Schulungen', key)
      }
      const footer = footerFor(nav, item.link)
      if (footer.next) assert.equal(clean(footerFor(nav, footer.next.link).prev.link), clean(item.link), item.link)
      if (footer.prev) assert.equal(clean(footerFor(nav, footer.prev.link).next.link), clean(item.link), item.link)
    }
  }
})
test('the complete transition module belongs to training', () => {
  const group = nav.sections.schulungen.find(item => item.text === 'Umstieg zu SchILD-NRW 3')
  assert.ok(group)
  for (const item of [group, ...group.items]) {
    assert.equal(sectionFor(nav, item.link), 'schulungen')
    assert.equal(topicFor(nav, item.link).topic, group)
  }
  assert.ok(!nav.sections.beratung.some(item => item.link?.includes('VonSchild2_ZuSchild3')))
  const index = nav.sections.schulungen.findIndex(item => item.text === 'SchILD-NRW 2 zu 3')
  assert.equal(nav.sections.schulungen[index + 1], group)
})
test('reading sequences stop at topic boundaries and ignore fragment shortcuts', () => {
  for (const groups of Object.values(nav.sections)) for (const group of groups) {
    const pages = sequence(nav, group)
    if (!pages.length) continue
    assert.equal(footerFor(nav, pages[0].link).prev, false)
    assert.equal(footerFor(nav, pages.at(-1).link).next, false)
  }
})
test('school sidebar has exactly the three requested collapsible sections', () => {
  for (const url of ['/schulungsmodule/', '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/']) {
    const groups = sidebarFor(nav, url)
    assert.deepEqual(groups.map(item => item.text), ['Schulungen', 'Schulungsumgebungen', 'Weitere Bereiche'])
    assert.ok(groups.every(item => typeof item.collapsed === 'boolean'))
    assert.equal(groups.filter(item => !item.collapsed).length, 1)
    assert.equal(groups[0].link, '/schulungsmodule/')
    assert.equal(groups[1].link, '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/')
    assert.ok(groups.slice(0, 2).every(group => !group.items.some(item => item.text === 'Übersicht')))
    assert.equal(groups[0].items[0].text, 'Schulungsvorlagen')
    assert.equal(groups[1].items[0].text, 'Docker-Schulungsserver')
    assert.ok(!groups[0].items.some(item => item.text === 'Schulungsumgebungen'))
  }
})
test('other areas follow the top navigation in every section', () => {
  for (const entry of nav.nav) {
    const section = sectionFor(nav, entry.link)
    const groups = sidebarFor(nav, entry.link)
    assert.deepEqual(groups.at(-1).items, nav.nav.filter(item => item.link !== entry.link).map(({ text, link }) => ({ text, link })))
    assert.equal(groups.at(-1).collapsed, true)
  }
})
test('onboarding stays permanently expanded and offers all other areas', () => {
  const expected = [
    { text: 'Erste Schritte', link: '/neu-im-team/' },
    { text: 'Kommunikation', link: '/neu-im-team/kommunikation' },
    { text: 'Zusammenarbeit', link: '/neu-im-team/rollen' }
  ]
  for (const item of expected) {
    const groups = sidebarFor(nav, item.link)
    assert.equal(groups[0].text, 'Neu im Team')
    assert.equal(groups[0].collapsed, undefined)
    assert.deepEqual(groups[0].items, expected)
    assert.equal(groups[1].text, 'Weitere Bereiche')
    assert.equal(groups[1].collapsed, true)
    assert.deepEqual(groups[1].items, nav.nav.filter(entry => entry.link !== '/neu-im-team/').map(({ text, link }) => ({ text, link })))
  }
})
test('old overview URLs retain their exact sidebar', () => {
  for (const url of Object.keys(nav.aliases)) {
    assert.ok(sidebar[clean(url) + '/index.md'])
    assert.deepEqual(footerFor(nav, url), { prev: false, next: false })
  }
})
test('all overview cards belong to the page section', () => {
  const paths = execFileSync('git', ['ls-files', '-z', '*.md'], { encoding: 'utf8' }).split('\0').filter(Boolean)
  let checked = 0
  for (const path of paths) {
    if (path === 'index.md') continue // Portal cards intentionally span all sections.
    const source = readFileSync(path, 'utf8')
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!frontmatter || !frontmatter[1].includes('sectionCards:')) continue
    const section = sectionFor(nav, '/' + path)
    assert.ok(section, path)
    for (const match of frontmatter[1].matchAll(/^\s+link:\s*"([^"]+)"/gm)) {
      assert.equal(sectionFor(nav, match[1]), section, path + ': misplaced card ' + match[1])
      checked++
    }
  }
  assert.ok(checked > 0, 'Overview cards were not discovered')
})


test('training overview tables follow all menu topics and require descriptions', () => {
  for (const [path, index] of [['/schulungsmodule/', 0], ['/Fachberatung_Anleitungen/Test-_und_Schulungsserver/', 1]]) {
    const topics = sidebarFor(nav, path)[index].items.filter(item => item.text !== 'Übersicht')
    const rows = overviewRows(nav, path)
    assert.deepEqual(rows.map(({ text, link }) => ({ text, link })), topics.map(({ text, link }) => ({ text, link })))
    assert.ok(rows.every(row => row.description.trim().length > 0))
    const changed = structuredClone(nav)
    const list = index === 0 ? changed.sections.schulungen : changed.sections.schulungen.at(-1).items
    list.push({ text: 'Neues Thema', link: path + 'neu', description: 'Neue Schulungsinhalte.' })
    assert.equal(overviewRows(changed, path).at(-1).text, 'Neues Thema')
    delete list.at(-1).description
    assert.throws(() => overviewRows(changed, path), /Kurzbeschreibung fehlt/)
  }
})

test('test data menu is flat, complete and automatically reflected in its table', () => {
  const topics = nav.sections.testdaten
  const expected = ['Übersicht', 'Datenbanksteckbrief', 'Grundschule', 'Sekundarstufe I', 'Sekundarstufe II - bis 2026', 'Sekundarstufe II ab 2026', 'Gesamtschule', 'Berufskolleg']
  assert.deepEqual(topics.map(item => item.text).filter(text => expected.includes(text)), expected)
  assert.ok(topics.every(item => !item.items))
  assert.deepEqual(overviewRows(nav, '/Datenbanken/'), topics.slice(1).map(({ text, link, description }) => ({ text, link, description })))
  for (const name of ['Sekundarstufe I', 'Berufskolleg']) assert.equal(topics.find(item => item.text === name).link, undefined)
  const changed = structuredClone(nav)
  changed.sections.testdaten.push({ text: 'Neue Sammlung', link: '/Datenbanken/neu/', description: 'Neuer Bestand.' })
  assert.equal(overviewRows(changed, '/Datenbanken/').at(-1).text, 'Neue Sammlung')
  delete changed.sections.testdaten.at(-1).description
  assert.throws(() => overviewRows(changed, '/Datenbanken/'), /Kurzbeschreibung fehlt/)
})
test('all local analysis articles belong to advice and activate its top menu', () => {
  const analysis = nav.sections.beratung.find(item => item.text === 'Lokale Analyse')
  assert.ok(analysis)
  assert.ok(!nav.sections.testdaten.some(item => item.text === 'Lokale Analyse'))
  for (const item of [analysis, ...analysis.items]) {
    assert.equal(sectionFor(nav, item.link), 'beratung')
    const active = nav.nav.filter(entry => entry.activeMatch && new RegExp(entry.activeMatch).test(item.link))
    assert.deepEqual(active.map(entry => entry.text), ['Beratung'])
  }
})

test('important links are a direct leaf and dated tips have separate topic pages', () => {
  const items = nav.sections.wissen
  const links = items.find(item => item.text === 'Wichtige Links')
  assert.equal(links.link, '/wissen/links')
  assert.equal(links.items, undefined)
  assert.ok(!items.some(item => item.text === 'Nachschlagen & Links'))
  assert.ok(!items.some(item => [item, ...item.items ?? []].some(entry => entry.link === '/Tipp_der_Woche/')))
  for (const [label, path] of [['SchILD-Tipps', '/wissen/schild-tipps'], ['SVWS-Tipps', '/wissen/svws-tipps']]) {
    const topic = items.find(item => item.text === label)
    assert.equal(topic.link, path)
    assert.equal(topicFor(nav, path).topic, topic)
    for (const article of topic.items) assert.equal(topicFor(nav, article.link).topic, topic)
  }
  assert.ok(sidebar['/Tipp_der_Woche/index.md'])
})
