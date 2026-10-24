import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync } from 'node:fs'
import { clean, createSidebar, footerFor, topicFor, sectionFor } from '../.vitepress/navigation.mjs'
const nav = JSON.parse(readFileSync('.vitepress/sidebar.json', 'utf8'))
const menus = createSidebar(nav)
const origin = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173'
const base = process.env.BASE ?? '/Schulungsunterlagen/'
const urlFor = link => origin + base + link.slice(1)
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
try {
  const keys = Object.keys(menus).filter(key => key.endsWith('.md'))
  for (const key of keys) {
    const link = key.replace(/index\.md$/, '').replace(/\.md$/, '.html')
    await visit(link)
    const { section, topic } = topicFor(nav, key)
    const level = section === 'team' ? 0 : 1
    const expanded = await page.locator('#VPSidebarNav .VPSidebarItem.level-' + level + '.collapsible:not(.collapsed)').count()
    assert.equal(expanded, topic?.items?.length ? 1 : 0, key + ': offener Themenzweig')
    if (section !== 'team') {
      const main = page.locator('#VPSidebarNav .VPSidebarItem.level-0').first()
      assert.equal(await main.locator(':scope > .item .text').innerText(), nav.sectionLabels[section])
      assert.equal(await main.locator('.VPSidebarItem.level-1 > .item .text').first().innerText(), 'Übersicht')
      const others = page.locator('#VPSidebarNav .VPSidebarItem.level-0').nth(1)
      assert.equal(await others.locator(':scope > .item .text').innerText(), 'Weitere Bereiche')
      assert.ok((await others.getAttribute('class')).includes('collapsed'))
      const labels = await others.locator('a .text').allTextContents()
      assert.deepEqual(labels, nav.nav.filter(item => sectionFor(nav, item.link) !== section).map(item => item.text))
    }
    const footer = footerFor(nav, key)
    for (const side of ['prev', 'next']) {
      const locator = page.locator('.VPDocFooter a.' + side)
      if (!footer[side]) assert.equal(await locator.count(), 0, key + ': ' + side)
      else {
        assert.equal(await locator.count(), 1, key + ': ' + side)
        const href = await locator.getAttribute('href')
        assert.equal(clean(new URL(href, urlFor('/')).pathname.slice(base.length - 1)), clean(footer[side].link))
      }
    }
  }
  const first = '/schulungsmodule/gost/Klausurplanung/1. allgemeine Vorlagen'
  const second = '/schulungsmodule/sek_i/1_Unterrichtsfaecher'
  await visit(first + '.html')
  await page.locator('#VPSidebarNav a').evaluateAll((links, href) => links.find(a => decodeURI(a.href).includes(href))?.click(), second)
  await page.waitForURL('**/1_Unterrichtsfaecher.html')
  await page.goBack({ waitUntil: 'networkidle' })
  assert.ok(decodeURI(page.url()).includes('1. allgemeine Vorlagen'))
  assert.equal(await page.locator('#VPSidebarNav .VPSidebarItem.level-1.collapsible:not(.collapsed)').count(), 1)
  await visit('/')
  await page.getByRole('button', { name: 'Dokumentation durchsuchen' }).click()
  const search = page.locator('input[type="search"]')
  await search.fill('Klausurplanung')
  await page.locator('.VPLocalSearchBox .result').first().waitFor()
  assert.ok((await page.locator('.VPLocalSearchBox').innerText()).includes('auswählen'))
  await search.press('Escape')
  await page.screenshot({ path: 'test-results/startseite-hell.png', fullPage: true })
  await page.getByRole('switch').click()
  await page.screenshot({ path: 'test-results/startseite-dunkel.png', fullPage: true })
  for (const width of [390, 820, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const link of ['/', '/schulungsmodule/', '/beratung/', '/fortbildung/', first + '.html']) {
      await visit(link)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)
      assert.equal(overflow, false, width + ': Überbreite auf ' + link)
      await page.screenshot({ path: 'test-results/layout-' + width + '-' + encodeURIComponent(link) + '.png', fullPage: true })
    }
  }
  assert.deepEqual(errors, [], 'Browserfehler')
  console.log(keys.length + ' direkte Artikelaufrufe, Vor/Zurück-Verweise, Themenwechsel, Verlauf, Suche und drei Bildschirmbreiten erfolgreich.')
} finally {
  await browser.close()
}
