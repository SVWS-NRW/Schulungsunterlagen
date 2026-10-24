import { clean, sidebarFor } from './navigation.mjs'

// The menu is the single source for names, destinations and editorial order.
export function overviewRows(navigation, url) {
  const root = sidebarFor(navigation, url).find(group =>
    group.link && clean(group.link) === clean(url))
  if (!root) throw new Error('Keine Themenübersicht für ' + url)
  return root.items.filter(item => clean(item.link) !== clean(url)).map(item => {
    if (!item.description?.trim()) throw new Error('Kurzbeschreibung fehlt: ' + item.text)
    return { text: item.text, link: item.link, description: item.description }
  })
}
