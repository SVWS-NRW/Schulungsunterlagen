import { defineConfig, loadEnv } from 'vite';
import type { DefaultTheme, UserConfig } from 'vitepress';
import sidebar from '../sidebar';
import navigation from './sidebar.json';
import { footerFor } from './navigation.mjs';
import { configureMarkdown } from './markdown';
import { containerLabels } from './hint-boxes';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        lang: 'de-DE',
        base: env.BASE === undefined ? '/Schulungsunterlagen/' : env.BASE,
        title: 'SVWS-Teamportal',
        description: 'Wissen, Schulungsmaterial und Austausch für Fachberatung und Moderation rund um SchILD-NRW und den SVWS-Server.',
        lastUpdated: true,
        transformPageData(pageData) {
            if (pageData.frontmatter.layout !== 'home') {
                Object.assign(pageData.frontmatter, footerFor(navigation, '/' + pageData.relativePath));
            }
        },
        srcExclude: ['README.md', 'PORTAL-REDAKTION.md', 'ARTIKELSTANDARD.md', 'markdown-examples.md', 'api-examples.md', 'HARMONISIERUNG.md', 'tests/**', '**/notes.md'],
        markdown: {
            container: containerLabels,
            config: configureMarkdown,
        },
        themeConfig: {
            outline: { label: 'Auf dieser Seite', level: [2, 3] },
            docFooter: { next: 'Nächstes Thema', prev: 'Vorheriges Thema' },
            lastUpdated: { text: 'Zuletzt bearbeitet', formatOptions: { dateStyle: 'long' } },
            darkModeSwitchLabel: 'Darstellung',
            lightModeSwitchTitle: 'Zum hellen Erscheinungsbild wechseln',
            darkModeSwitchTitle: 'Zum dunklen Erscheinungsbild wechseln',
            sidebarMenuLabel: 'Themen',
            returnToTopLabel: 'Nach oben',
            search: { provider: 'local', options: { translations: {
                button: { buttonText: 'Suchen', buttonAriaLabel: 'Dokumentation durchsuchen' },
                modal: { displayDetails: 'Detaillierte Treffer anzeigen', resetButtonTitle: 'Suche zurücksetzen', backButtonTitle: 'Suche schließen', noResultsText: 'Keine Ergebnisse für', footer: { selectText: 'auswählen', selectKeyAriaLabel: 'Eingabetaste', navigateText: 'navigieren', navigateUpKeyAriaLabel: 'Pfeil nach oben', navigateDownKeyAriaLabel: 'Pfeil nach unten', closeText: 'schließen', closeKeyAriaLabel: 'Escape' } },
            } } },
            nav: navigation.nav,
            socialLinks: [{ icon: 'github', link: 'https://github.com/Raffenberg/SVWS_FBM' }],
            sidebar,
        },
    } satisfies UserConfig<DefaultTheme.Config>;
});
