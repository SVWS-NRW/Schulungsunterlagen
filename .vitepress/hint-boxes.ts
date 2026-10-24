// The existing VitePress containers are styled like those in SchILD-NRW 3.
// No new runtime dependency is needed; FBM checklists and Mermaid stay intact.
const icons: Record<string, string> = {
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  tip: '<path d="M9 18h6m-5 3h4m-5-6c-4-3-4-9 0-11 5-3 11 1 9 6-.5 2-2 3-3 5v1H9z"/>',
  important: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4v.1"/>',
  caution: '<path d="m10.3 4-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4v.1"/>',
  wrong: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
  right: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  details: '<path d="m9 5 7 7-7 7"/>'
}
const icon = (kind: string) => `<svg class="hint-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[kind]}</svg>`

export const containerLabels = {
  infoLabel: 'Hinweis',
  tipLabel: 'Tipp',
  warningLabel: 'Wichtig',
  dangerLabel: 'Achtung',
  detailsLabel: 'Details'
}

export function configureHintBoxes(md: any) {
  for (const type of ['info', 'tip', 'warning', 'danger', 'details']) {
    const rule = md.renderer.rules[`container_${type}_open`]
    if (typeof rule !== 'function') continue
    md.renderer.rules[`container_${type}_open`] = (tokens: any, idx: number, ...args: any[]) => {
      const title = tokens[idx].info.trim().slice(type.length).trim()
      const kind = type === 'tip' ? (title.startsWith('Richtig') ? 'right' : 'tip')
        : type === 'danger' ? (title.startsWith('Falsch') ? 'wrong' : 'caution')
          : ({ info: 'info', warning: 'important', details: 'details' } as Record<string, string>)[type]
      return rule(tokens, idx, ...args)
        .replace(/^<(div|details) /, `<$1 data-hint-kind="${kind}" `)
        .replace(type === 'details' ? '<summary>' : '<p class="custom-block-title">', (match: string) => match + icon(kind))
    }
  }
}
