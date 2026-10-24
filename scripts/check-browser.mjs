import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync } from 'node:fs'
import { clean, createSidebar, footerFor, topicFor, sectionFor, sidebarFor } from '../.vitepress/navigation.mjs'
import { overviewRows } from '../.vitepress/overview.mjs'
const nav = JSON.parse(readFileSync('.vitepress/sidebar.json', 'utf8'))
const menus = createSidebar(nav)
const origin = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173'
const base = process.env.BASE ?? '/Schulungsunterlagen/'
const urlFor = link => origin + base + link.slice(1)
const localPath = href => new URL(href, urlFor('/')).pathname.slice(base.length - 1)
mkdirSync('test-results', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))
const visit = async link => {
  const response = await page.goto(urlFor(link), { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200, link)
  await page.waitForSelector('.VPContent')
}
const roots = () => page.locator('#VPSidebarNav .VPSidebarItem.level-0')
const collapsed = async () => roots().evaluateAll(nodes => nodes.map(node => node.classList.contains('collapsed')))
const toggleRoot = async index => roots().nth(index).locator(':scope > .item .caret').click()
const assertIndependent = async () => {
  assert.deepEqual(await collapsed(), [false, true, true])
  await toggleRoot(1)
  assert.deepEqual(await collapsed(), [false, false, true])
  await toggleRoot(2)
  assert.deepEqual(await collapsed(), [false, false, false])
  await roots().nth(1).locator(':scope > .item .caret').focus()
  await page.keyboard.press('Enter')
  assert.deepEqual(await collapsed(), [false, true, false])
  await toggleRoot(0)
  assert.deepEqual(await collapsed(), [true, true, false])
}
const assertRootNavigation = async (mobile = false) => {
  await visit('/schulungsmodule/VonSchild2_ZuSchild3/')
  if (mobile) await page.locator('.VPLocalNav button.menu').click()
  for (const [index, path, heading] of [
    [1, '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/', 'Schulungsumgebungen'],
    [0, '/schulungsmodule/', 'Schulungen durchführen']
  ]) {
    const link = roots().nth(index).locator(':scope > .item > a.link')
    assert.equal(clean(localPath(await link.getAttribute('href'))), clean(path))
    await link.click()
    await page.waitForURL(url => url.pathname === new URL(urlFor(path)).pathname)
    assert.ok((await page.locator('.vp-doc h1').innerText()).includes(heading))
    if (mobile) await page.locator('.VPLocalNav button.menu').click()
    for (const root of [0, 1]) {
      assert.ok(!(await roots().nth(root).locator(':scope > .items > .VPSidebarItem > .item .text').allTextContents()).includes('Übersicht'))
    }
  }
}
const fontStyle = async selector => page.locator(selector).first().evaluate(node => {
  const css = getComputedStyle(node)
  return { size: css.fontSize, weight: css.fontWeight, family: css.fontFamily, lineHeight: css.lineHeight }
})
try {
  await visit('/neu-im-team/')
  assert.equal(await roots().first().locator(':scope > .item .caret').count(), 0)
  assert.equal(await roots().last().locator(':scope > .item .text').innerText(), 'Weitere Bereiche')
  assert.deepEqual(await collapsed(), [false, true])
  await toggleRoot(1)
  assert.deepEqual(await collapsed(), [false, false])
  assert.equal(await roots().first().locator('a:visible').count(), 3)
  await visit('/beratung/')
  const referenceRoot = await fontStyle('#VPSidebarNav .VPSidebarItem.level-0 > .item .text')
  const referenceTopic = await fontStyle('#VPSidebarNav .VPSidebarItem.level-1 > .item .text')
  const referenceBranch = await fontStyle('#VPSidebarNav .VPSidebarItem.level-1.collapsible > .item .text')
  const referenceArticle = await fontStyle('#VPSidebarNav .VPSidebarItem.level-2 > .item .text')
  await visit('/schulungsmodule/')
  assert.equal(await page.locator('.school-sidebar').count(), 0)
  assert.deepEqual(await roots().locator(':scope > .item .text').allTextContents(),
    ['Schulungen', 'Schulungsumgebungen', 'Weitere Bereiche'])
  assert.deepEqual(await fontStyle('#VPSidebarNav .VPSidebarItem.level-0 > .item .text'), referenceRoot)
  assert.deepEqual(await fontStyle('#VPSidebarNav .VPSidebarItem.level-1 > .item .text'), referenceTopic)
  assert.deepEqual(await fontStyle('#VPSidebarNav .VPSidebarItem.level-1.collapsible > .item .text'), referenceBranch)
  assert.deepEqual(await fontStyle('#VPSidebarNav .VPSidebarItem.level-2 > .item .text'), referenceArticle)
  await assertIndependent()
  await assertRootNavigation()
  await visit('/Fachberatung_Anleitungen/Test-_und_Schulungsserver/')
  assert.deepEqual(await collapsed(), [true, false, true])
  assert.ok((await page.locator('.vp-doc h1').innerText()).includes('Schulungsumgebungen'))
  for (const path of ['/schulungsmodule/', '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/']) {
    await visit(path)
    assert.equal(await page.locator('.section-card').count(), 0)
    const rows = page.locator('.navigation-overview tbody tr')
    const expected = overviewRows(nav, path)
    assert.equal(await rows.count(), expected.length)
    for (const [index, item] of expected.entries()) {
      assert.equal(await rows.nth(index).locator('a').innerText(), item.text)
      assert.equal(clean(localPath(await rows.nth(index).locator('a').getAttribute('href'))), clean(item.link))
      assert.equal(await rows.nth(index).locator('td').nth(1).innerText(), item.description)
    }
    const headings = await page.locator('.vp-doc h2').allTextContents()
    assert.ok(!headings.some(title => /Basismodule|GoST|Reporterstellung|Sammlung Installations|Wie benutze|Wie setze|Quellen/.test(title)))
    if (path === '/schulungsmodule/') assert.ok(headings.some(title => title.includes('Vorhandene Schulungsmodule')))
  }
  await visit('/schulungsmodule/VonSchild2_ZuSchild3/')
  assert.deepEqual(await collapsed(), [false, true, true])
  assert.ok((await page.locator('.vp-doc h1').innerText()).includes('Umstieg zu SchILD-NRW 3'))
  assert.equal((await page.locator('.VPNavBarMenu a.active').innerText()).trim(), 'Schulungen')
  await visit('/schulungsmodule/uebergangsschulung/2_Filtern_Gruppenprozesse.html')
  const prose = await page.locator('.vp-doc').innerText()
  assert.ok(!prose.includes(':a:'), 'Training emoji shortcuts are still literal')
  assert.ok(prose.includes('🅰'), 'Task emoji missing')

  const keys = Object.keys(menus).filter(key => key.endsWith('.md'))
  for (const key of keys) {
    await visit(key.replace(/index\.md$/, '').replace(/\.md$/, '.html'))
    const { section, topic } = topicFor(nav, key)
    const level = section === 'team' ? 0 : 1
    const topicCount = section === 'team' ? 0 : section === 'schulungen' && topic?.text === 'Schulungsumgebungen' ? 0 : topic?.items?.length ? 1 : 0
    assert.equal(await page.locator('#VPSidebarNav .VPSidebarItem.level-' + level + '.collapsible:not(.collapsed)').count(), topicCount, key)
    {
      if (section === 'team') assert.equal(await roots().first().locator(':scope > .item .caret').count(), 0)
      const root = roots()
      assert.equal(await root.first().locator(':scope > .item .text').innerText(), nav.sectionLabels[section])
      const others = root.last()
      assert.equal(await others.locator(':scope > .item .text').innerText(), 'Weitere Bereiche')
      assert.ok((await others.getAttribute('class')).includes('collapsed'))
      if (section === 'schulungen') {
        assert.deepEqual(await collapsed(), topic?.text === 'Schulungsumgebungen' ? [true, false, true] : [false, true, true])
      }
      assert.deepEqual(await others.locator('a .text').allTextContents(), sidebarFor(nav, key).at(-1).items.map(item => item.text))
    }
    for (const href of await page.locator('.section-cards a').evaluateAll(links => links.map(link => link.href))) {
      assert.equal(sectionFor(nav, localPath(href)), section, key + ': misplaced card')
    }
    const footer = footerFor(nav, key)
    for (const side of ['prev', 'next']) {
      const locator = page.locator('.VPDocFooter a.' + side)
      assert.equal(await locator.count(), footer[side] ? 1 : 0, key + ': ' + side)
      if (footer[side]) assert.equal(clean(localPath(await locator.getAttribute('href'))), clean(footer[side].link))
    }
  }
  const first = '/schulungsmodule/gost/Klausurplanung/1. allgemeine Vorlagen'
  const second = '/schulungsmodule/sek_i/1_Unterrichtsfaecher'
  await visit(first + '.html')
  await page.locator('#VPSidebarNav a').evaluateAll((links, href) => links.find(a => decodeURI(a.href).includes(href))?.click(), second)
  await page.waitForURL('**/1_Unterrichtsfaecher.html')
  await page.goBack({ waitUntil: 'networkidle' })
  assert.ok(decodeURI(page.url()).includes('1. allgemeine Vorlagen'))
  assert.deepEqual(await collapsed(), [false, true, true])

  await visit('/')
  await page.getByRole('button', { name: 'Dokumentation durchsuchen' }).click()
  const search = page.locator('input[type="search"]')
  await search.fill('Klausurplanung')
  await page.locator('.VPLocalSearchBox .result').first().waitFor()
  await search.press('Escape')
  for (const scheme of ['light', 'dark']) {
    await page.evaluate(mode => {
      document.documentElement.classList.toggle('dark', mode === 'dark')
      localStorage.setItem('vitepress-theme-appearance', mode)
    }, scheme)
    for (const width of [390, 820, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      for (const link of ['/schulungsmodule/', '/Fachberatung_Anleitungen/Test-_und_Schulungsserver/', '/beratung/', '/Datenbanken/']) {
        await visit(link)
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2), false, width + ': ' + link)
        await page.screenshot({ path: 'test-results/' + scheme + '-' + width + '-' + encodeURIComponent(link) + '.png', fullPage: true })
      }
      if (width === 390) {
        await visit('/schulungsmodule/')
        await page.locator('.VPLocalNav button.menu').click()
        await assertIndependent()
        await page.screenshot({ path: 'test-results/' + scheme + '-mobile-sidebar.png', fullPage: true })
        await assertRootNavigation(true)
        await visit('/neu-im-team/')
        await page.locator('.VPLocalNav button.menu').click()
        assert.equal(await roots().first().locator(':scope > .item .caret').count(), 0)
        await toggleRoot(1)
        assert.deepEqual(await collapsed(), [false, false])
        assert.equal(await roots().first().locator('a:visible').count(), 3)
        await page.screenshot({ path: 'test-results/' + scheme + '-mobile-neu-im-team.png', fullPage: true })
      }
    }
  }
  assert.deepEqual(errors, [], 'Browserfehler')
  console.log(keys.length + ' Artikelaufrufe, Umstiegsmodul, Emoji, Karten-Zuordnung, unabhängige native Menüs mit Maus/Tastatur/mobil und gemeinsame Schriftgestaltung, Verlauf und Suche erfolgreich.')
} finally {
  await browser.close()
}
