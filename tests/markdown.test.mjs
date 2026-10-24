import test from 'node:test'
import assert from 'node:assert/strict'
import { createMarkdownRenderer } from 'vitepress'
import { configureHintBoxes, containerLabels } from '../.vitepress/hint-boxes.ts'
const md = await createMarkdownRenderer(process.cwd(), { container: containerLabels }, '/')
configureHintBoxes(md)
md.disable('emoji')
md.inline.ruler.disable('linkify')
test('all eight callouts render German labels and decorative SVGs', () => {
  const cases = [['info', 'Hinweis', 'info'], ['tip', 'Tipp', 'tip'], ['warning', 'Wichtig', 'important'],
    ['danger', 'Achtung', 'caution'], ['tip Richtig', 'Richtig', 'right'], ['danger Falsch', 'Falsch', 'wrong'],
    ['example', 'Beispiel', 'example'], ['details', 'Details', 'details']]
  for (const [type, label, kind] of cases) {
    const html = md.render('::: ' + type + '\nInhalt.\n:::\n')
    assert.ok(html.includes('data-hint-kind="' + kind + '"'), html)
    assert.ok(html.includes('aria-hidden="true"'), html)
    assert.ok(html.includes(label), html)
    assert.ok(html.includes('Inhalt.'), html)
  }
})
test('examples accept inline titles and nested Markdown without nested anchors', () => {
  const html = md.render('::: example **Test**\n- Eintrag\n\n[Quelle](https://example.com)\n:::\n')
  assert.match(html, /<strong>Test<\/strong>/)
  assert.match(html, /<ul>/)
  const anchor = md.render('<a href="https://example.com">https://example.com</a>')
  assert.equal((anchor.match(/<a /g) ?? []).length, 1)
})
