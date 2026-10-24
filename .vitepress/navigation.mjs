// One source of truth for section ownership, sidebar state and article order.
export const clean = url => decodeURIComponent(url.split(/[?#]/, 1)[0])
  .replace(/(?:\/index)?\.(?:md|html)$/, '').replace(/\/$/, '') || '/'

export function sectionFor(navigation, url) {
  const target = clean(url)
  return Object.entries(navigation.routes)
    .sort(([a], [b]) => b.length - a.length)
    .find(([prefix]) => target === clean(prefix) || target.startsWith(prefix))?.[1]
}

export function topicFor(navigation, url) {
  const target = clean(url)
  const section = sectionFor(navigation, url)
  const groups = navigation.sections[section] ?? []
  const canonical = clean(navigation.aliases?.[target + '/'] ?? navigation.aliases?.[target] ?? target)
  const topic = groups.find(group => [group, ...group.items ?? []]
    .some(item => item.link && !item.link.includes('#') && clean(item.link) === canonical))
  return { section, groups, topic }
}

export function sequence(navigation, topic) {
  const seen = new Set()
  return [topic, ...topic?.items ?? []].filter(item => {
    if (!item?.link || item.link.includes('#')) return false
    const target = clean(item.link)
    // Cross-section shortcuts remain visible but never change the reading order.
    if (sectionFor(navigation, target) !== sectionFor(navigation, topic.link ?? item.link) || seen.has(target)) return false
    seen.add(target)
    return true
  })
}

export function footerFor(navigation, url) {
  const { topic } = topicFor(navigation, url)
  const pages = sequence(navigation, topic)
  const index = pages.findIndex(item => clean(item.link) === clean(url))
  const entry = item => item ? { text: item.text, link: item.link } : false
  return { prev: entry(pages[index - 1]), next: index < 0 ? false : entry(pages[index + 1]) }
}

export function createSidebar(navigation) {
  const exact = {}
  const prefixes = {}
  const menu = (section, active) => {
    const topics = navigation.sections[section].map(group => ({
      ...group,
      ...(group.items?.length ? { collapsed: group !== active } : {})
    }))
    // The onboarding section deliberately keeps its existing presentation.
    if (section === 'team') return topics
    return [
      { text: navigation.sectionLabels[section], items: topics },
      {
        text: 'Weitere Bereiche',
        collapsed: true,
        items: navigation.nav
          .filter(item => sectionFor(navigation, item.link) !== section)
          .map(({ text, link }) => ({ text, link }))
      }
    ]
  }
  for (const [prefix, section] of Object.entries(navigation.routes)) prefixes[prefix] = menu(section)
  for (const groups of Object.values(navigation.sections)) {
    for (const group of groups) {
      for (const item of [group, ...group.items ?? []]) {
        if (!item.link || item.link.includes('#')) continue
        const target = clean(item.link)
        const { section, topic } = topicFor(navigation, target)
        if (!section) continue
        const sidebar = menu(section, topic)
        exact[target + (item.link.endsWith('/') ? '/index.md' : '.md')] = sidebar
      }
    }
  }
  for (const alias of Object.keys(navigation.aliases ?? {})) {
    const { section, topic } = topicFor(navigation, alias)
    exact[clean(alias) + '/index.md'] = menu(section, topic)
  }
  return { ...exact, ...Object.fromEntries(Object.entries(prefixes).sort(([a], [b]) => b.length - a.length)) }
}
