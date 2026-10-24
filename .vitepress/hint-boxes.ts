import container from 'markdown-it-container'

// Small outline icons are decorative; the adjacent German title supplies the name.
const shapes: Record<string, string> = {
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  tip: '<path d="M9 18h6m-5 3h4m-5-6c-4-3-4-9 0-11 5-3 11 1 9 6-.5 2-2 3-3 5v1H9z"/>',
  important: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4v.1"/>',
  caution: '<path d="m10.3 4-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4v.1"/>',
  wrong: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
  right: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  example: '<path d="M9 3h6m-5 0v6l-6 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-9V3M7 15h10"/>',
  details: '<path d="m9 5 7 7-7 7"/>'
}

function icon(kind: string) {
  return `<svg class="hint-icon" data-icon="${kind}" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${shapes[kind]}</svg>`
}

export function configureHintBoxes(md: any) {
  // VitePress 1.6 exposes five built-in types; use the same Markdown container
  // mechanism and HTML structure for examples, including custom inline titles.
  md.use(container, 'example', {
    render(tokens: any, idx: number, _options: any, env: any) {
      if (tokens[idx].nesting !== 1) return '</div>\n'
      const title = tokens[idx].info.trim().slice('example'.length).trim() || 'Beispiel'
      return `<div class="example custom-block"${md.renderer.renderAttrs(tokens[idx])}><p class="custom-block-title">${md.renderInline(title, { references: env.references })}</p>\n`
    }
  })
  for (const type of ['info', 'tip', 'warning', 'danger', 'details', 'example']) {
    const name = `container_${type}_open`
    const render = md.renderer.rules[name]
    md.renderer.rules[name] = (tokens: any, idx: number, ...args: any[]) => {
      const title = tokens[idx].info.trim().slice(type.length).trim()
      const kind = type === 'tip' ? (title.startsWith('Richtig') ? 'right' : 'tip')
        : type === 'danger' ? (title.startsWith('Falsch') ? 'wrong' : 'caution')
          : ({ info: 'info', warning: 'important', details: 'details', example: 'example' } as Record<string, string>)[type]
      return render(tokens, idx, ...args)
        .replace(/^<(div|details) /, `<$1 data-hint-kind="${kind}" `)
        .replace(type === 'details' ? '<summary>' : '<p class="custom-block-title">', (match: string) => match + icon(kind))
    }
  }
}

export const containerLabels = {
  infoLabel: 'Hinweis', tipLabel: 'Tipp', warningLabel: 'Wichtig',
  dangerLabel: 'Achtung', detailsLabel: 'Details'
}
