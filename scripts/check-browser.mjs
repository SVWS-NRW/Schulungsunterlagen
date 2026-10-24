import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import { mkdirSync, readFileSync } from 'node:fs'
import { clean, createSidebar, footerFor, topicFor, sectionFor, sidebarFor } from '../.vitepress/navigation.mjs'
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
const sectionButtons = () => page.locator('.school-section > h2 > button')
const assertOnlyOpen = async index => {
  assert.deepEqual(await sectionButtons().evaluateAll(buttons => buttons.map(button => button.getAttribute('aria-expanded'))),
    [0, 1, 2].map(i => i === index ? 'true' : 'false'))
}
try {
  // Exercise the changed behaviour first, so failures do not wait for the full scan.
  await visit('/schulungsmodule/')
  assert.deepEqual((await sectionButtons().allTextContents()).map(text => text.replace(/[⌄›]/g, '').trim()),
    ['Schulungen', 'Schulungsumgebungen', 'Weitere Bereiche'])
  await assertOnlyOpen(0)
  for (const index of [1, 2, 0]) {
    await sectionButtons().nth(index).click()
    await assertOnlyOpen(index)
  }
  await sectionButtons().nth(1).focus()
  await page.keyboard.press('Enter')
  await assertOnlyOpen(1)
  await sectionButtons().nth(2).focus()
  await page.keyboard.press('Space')
  await assertOnlyOpen(2)
  await visit('/Fachberatung_Anleitungen/Test-_und_Schulungsserver/')
  await assertOnlyOpen(1)
  assert.ok((await page.locator('.vp-doc h1').innerText()).includes('Schulungsumgebungen'))
  assert.equal(await page.locator('.section-card').count(), 9)
  await visit('/schulungsmodule/VonSchild2_ZuSchild3/')
  await assertOnlyOpen(0)
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
    if (section === 'schulungen') {
      await assertOnlyOpen(topic?.text === 'Schulungsumgebungen' ? 1 : 0)
      const nativeVisible = await page.locator('#VPSidebarNav > .group').evaluateAll(groups => groups.some(group => getComputedStyle(group).display !== 'none'))
      assert.equal(nativeVisible, false, key + ': duplicate native menu')
      const expected = sidebarFor(nav, key).at(-1).items.map(item => item.text)
      assert.deepEqual(await page.locator('#school-section-panel-2 a').allTextContents(), expected)
    } else {
      const level = section === 'team' ? 0 : 1
      assert.equal(await page.locator('#VPSidebarNav .VPSidebarItem.level-' + level + '.collapsible:not(.collapsed)').count(), topic?.items?.length ? 1 : 0, key)
      if (section !== 'team') {
        const root = page.locator('#VPSidebarNav .VPSidebarItem.level-0')
        assert.equal(await root.first().locator(':scope > .item .text').innerText(), nav.sectionLabels[section])
        assert.equal(await root.nth(1).locator(':scope > .item .text').innerText(), 'Weitere Bereiche')
        assert.ok((await root.nth(1).getAttribute('class')).includes('collapsed'))
      }
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
  await page.locator('.school-sidebar a').evaluateAll((links, href) => links.find(a => decodeURI(a.href).includes(href))?.click(), second)
  await page.waitForURL('**/1_Unterrichtsfaecher.html')
  await page.goBack({ waitUntil: 'networkidle' })
  assert.ok(decodeURI(page.url()).includes('1. allgemeine Vorlagen'))
  await assertOnlyOpen(0)

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
        for (const index of [1, 2, 0]) {
          await sectionButtons().nth(index).click()
          await assertOnlyOpen(index)
        }
        await page.screenshot({ path: 'test-results/' + scheme + '-mobile-accordion.png', fullPage: true })
      }
    }
  }
  assert.deepEqual(errors, [], 'Browserfehler')
  console.log(keys.length + ' Artikelaufrufe, Umstiegsmodul, Emoji, Karten-Zuordnung, exklusives Akkordeon mit Maus/Tastatur/mobil, Verlauf und Suche erfolgreich.')
} finally {
  await browser.close()
}
