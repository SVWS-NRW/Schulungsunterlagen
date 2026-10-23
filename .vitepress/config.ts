import { defineConfig, loadEnv } from 'vite';
import type { DefaultTheme, UserConfig } from 'vitepress';
import sidebar from '../sidebar';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        lang: 'de-DE',
        base: env.BASE === undefined ? '/Schulungsunterlagen/' : env.BASE,
        title: 'SVWS-Teamportal',
        description: 'Wissen, Schulungsmaterial und Austausch für Fachberatung und Moderation rund um SchILD-NRW und den SVWS-Server.',
        lastUpdated: true,
        srcExclude: ['README.md', 'PORTAL-REDAKTION.md', 'markdown-examples.md', 'api-examples.md', '**/notes.md'],
        themeConfig: {
            outline: { label: 'Auf dieser Seite', level: [2, 3] },
            docFooter: { next: 'Nächste Seite', prev: 'Vorherige Seite' },
            lastUpdated: { text: 'Zuletzt bearbeitet', formatOptions: { dateStyle: 'long' } },
            darkModeSwitchLabel: 'Erscheinungsbild',
            lightModeSwitchTitle: 'Zum hellen Erscheinungsbild wechseln',
            darkModeSwitchTitle: 'Zum dunklen Erscheinungsbild wechseln',
            sidebarMenuLabel: 'In diesem Bereich',
            returnToTopLabel: 'Zurück nach oben',
            search: { provider: 'local', options: { locales: { root: { translations: {
                button: { buttonText: 'Suchen', buttonAriaLabel: 'Portal durchsuchen' },
                modal: { displayDetails: 'Details anzeigen', resetButtonTitle: 'Suche zurücksetzen', backButtonTitle: 'Suche schließen', noResultsText: 'Keine Ergebnisse für', footer: { selectText: 'Auswählen', navigateText: 'Navigieren', closeText: 'Schließen' } },
            } } } } },
            nav: [
                { text: 'Neu im Team', link: '/neu-im-team/' },
                { text: 'Schulungen', link: '/schulungsmodule/', activeMatch: '^/schulungsmodule/(?!VonSchild2_ZuSchild3)' },
                { text: 'Testdaten', link: '/Datenbanken/', activeMatch: '^/(Datenbanken|umgebungen|Fachberatung_Anleitungen/Test-_und_Schulungsserver|Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline)/' },
                { text: 'Beratung', link: '/beratung/', activeMatch: '^/(beratung|schulungsmodule/VonSchild2_ZuSchild3|Fachberatung_Anleitungen/(?!Test-_und_Schulungsserver))' },
                { text: 'Fortbildung', link: '/fortbildung/', activeMatch: '^/(fortbildung|Fachberatung_Fortbildungen/(?!Installation_Fachberatung_Moderation_offline))' },
                { text: 'Wissen & Links', link: '/wissen/', activeMatch: '^/(wissen|Tipp_der_Woche)/' },
            ],
            socialLinks: [{ icon: 'github', link: 'https://github.com/Raffenberg/SVWS_FBM' }],
            sidebar,
        },
    } satisfies UserConfig<DefaultTheme.Config>;
});
