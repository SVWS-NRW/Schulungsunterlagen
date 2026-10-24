import type { DefaultTheme } from 'vitepress'
import navigation from './.vitepress/sidebar.json'

type Item = DefaultTheme.SidebarItem
type Items = Item[]
const sections = navigation.sections as Record<string, Items>
const routes = navigation.routes as Record<string, string>

// A separate menu for each topic resets collapsed branches on navigation.
// Cross-directory links keep their editorial section instead of their file location.
const clean = (url: string) => url.split(/[?#]/, 1)[0].replace(/\.html$/, '').replace(/\/$/, '') || '/'
function includes(item: Item, target: string): boolean {
  return (item.link ? clean(item.link) === target : false) ||
    (item.items?.some(child => includes(child, target)) ?? false)
}
function selected(items: Items, target: string): Items {
  return items.map(item => item.items?.length
    ? { ...item, collapsed: !includes(item, target), items: selected(item.items, target) }
    : { ...item })
}
const exact: Record<string, Items> = {}
const prefixes: Record<string, Items> = {}
for (const [prefix, section] of Object.entries(routes)) prefixes[prefix] = selected(sections[section], '')
for (const [section, groups] of Object.entries(sections)) {
  const walk = (items: Items) => {
    for (const item of items) {
      if (item.link) {
        const path = clean(item.link)
        const folder = item.link.split(/[?#]/, 1)[0].endsWith('/')
        const menu = selected(groups, path)
        exact[folder ? path + '/index.md' : path + '.md'] = menu
        if (folder && item.items?.length) prefixes[path + '/'] = menu
      }
      if (item.items) walk(item.items)
    }
  }
  walk(groups)
}
// Explicit links outrank directory fallbacks; longest prefixes first.
export default {
  ...exact,
  ...Object.fromEntries(Object.entries(prefixes).sort(([a], [b]) => b.length - a.length)),
} satisfies DefaultTheme.Sidebar
