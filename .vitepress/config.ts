import { defineConfig } from 'vitepress'

export default defineConfig({
	base: '/Schulungsunterlagen/',
	title: 'SVWS Schulungsunterlagen',
	description: 'Schulungen SVWS-Server NRW',

	themeConfig: {
		lastUpdated: {
			text: 'Diese Seite wurde zuletzt bearbeitet am',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium',
			},
		},

		search: {
			provider: 'local',
		},

		nav: [
			{ text: 'SVWS-Dokumentation', link: 'https://doku.svws-nrw.de/' },
			{ text: 'SchILD3-Wiki', link: 'https://schulverwaltungsinfos.nrw.de/svws/wiki/index.php' },
		],

		sidebar: [
			{
				text: 'Schulungsmodule',
				link: '/schulungsmodule/',
				collapsed: false,
				items: [
					{
						text: 'Basisschulungen',
						link: '/schulungsmodule/basisschulungen/',
						collapsed: true,
						items: [
							{ text: '1 Allgemeines', link: '/schulungsmodule/basisschulungen/1. Allgemeines.md' },
							{ text: '2 Erste Orientierung in SchILD', link: '/schulungsmodule/basisschulungen/2. Erste Orientierung in SchILD-NRW.md' },
							{ text: '3 Verwaltung', link: '/schulungsmodule/basisschulungen/3. Reiter_ Verwaltung.md' },
							{ text: '4 Lehrkräfte', link: '/schulungsmodule/basisschulungen/4. Reiter_ Lehrkräfte.md' },
							{ text: '5 Schüler', link: '/schulungsmodule/basisschulungen/5. Reiter_ Schüler.md' },
							{ text: '6 Auswahl', link: '/schulungsmodule/basisschulungen/6. Reiter_ Auswahl.md' },
							{ text: '7 Gruppenprozesse', link: '/schulungsmodule/basisschulungen/7. Reiter_ Gruppenprozesse.md' },
							{ text: '8 Kataloge', link: '/schulungsmodule/basisschulungen/8. Reiter_ Kataloge.md' },
							{ text: '9 Reportverwaltung', link: '/schulungsmodule/basisschulungen/9. Reiter_ Reportverwaltung.md' },
							{ text: '10 Aufgaben aus dem Schulalltag', link: '/schulungsmodule/basisschulungen/10. Aufgaben aus dem Schulalltag.md' },
						],
					},
					{ text: 'Sekundarstufe I', link: '/schulungsmodule/sek_i/' },

					{
						text: 'Gymnasiale Oberstufe',
						link: '/schulungsmodule/gost/',
						collapsed: true,
						items: [
							{
								text: 'Laufbahnplanung kommende EF',
								link: '/schulungsmodule/gost/modul1_grundlagen_ef/',
								collapsed: true,
								items: [
									{ text: '1. Orientierung', link: '/schulungsmodule/gost/modul1_grundlagen_ef/kapitel1_orientierung.md' },
									{ text: '2. App Oberstufe', link: '/schulungsmodule/gost/modul1_grundlagen_ef/kapitel2_oberstufe.md' },
									{ text: '3. Wahlen und Beratung', link: '/schulungsmodule/gost/modul1_grundlagen_ef/kapitel3_wahlen_beratung.md' },
									{ text: '4. Blocken', link: '/schulungsmodule/gost/modul1_grundlagen_ef/kapitel4_blocken.md' },
									{ text: '5. Blockung anwenden', link: '/schulungsmodule/gost/modul1_grundlagen_ef/kapitel5_blockung_anwenden.md' },
									{ text: '6. Leistungsdaten und Zeugnisse', link: '/schulungsmodule/gost/modul1_grundlagen_ef/kapitel6_leistungsdaten_zeugnisse.md' },
								],
							},
							{
								text: 'Q-Phase und Abitur',
								link: '/schulungsmodule/gost/modul2_qphase_abitur/',
								items: [
									{ text: '1. Orientierung und Wiederholung', link: '/schulungsmodule/gost/modul2_qphase_abitur/kapitel1_orientierung.md' },
									{ text: '2. Neue Q-Phase und Laufbahnkorrekturen', link: '/schulungsmodule/gost/modul2_qphase_abitur/kapitel2_neueQphase.md' },
									{ text: '3. Korrigierte EF und Q1 blocken', link: '/schulungsmodule/gost/modul2_qphase_abitur/kapitel3_Q1blocken.md' },
									{ text: '4. Umwahlen und Wahl von A3/A4', link: '/schulungsmodule/gost/modul2_qphase_abitur/kapitel4_Blockung_verändern.md' },
									{ text: '5. Abitur usw?' },
									{ text: '6. Optional: Klausurplanung' },
								],
							},
							{
								text: 'Modul 3 - Flexmodul',
								link: '/schulungsmodule/gost/modul3_leitung/',
								items: [
									{ text: '↳ Aufgaben Modul 3 (kein Link)' },
								],
							},
						],
					},

					{ text: 'Was anderes', link: '/schulungsmodule/' },
				],
			},

			{
				text: 'Fortbildungen für Fachberater',
				link: '/Fortbildungen_fuer_Fachberater/',
				collapsed: true,
			},

			{
				text: 'Anleitungen für Fachberater',
				link: '/Anleitungen_fuer_Fachberater/',
				collapsed: false,
				items: [
					{ text: 'SVWS-MariaDB Reparieren', link: '/Anleitungen_fuer_Fachberater/Fachberater_DBReparatur/' },
					{ text: 'WebLuPO unter Windows', link: '/Anleitungen_fuer_Fachberater/Fachberater_WebLupo_Windows/' },
					{
						text: 'Reporting',
						link: '/Anleitungen_fuer_Fachberater/Fachberater_Reporting/',
						collapsed: true,
						items: [
							{ text: 'Übersicht - Thymeleaf', link: '/Anleitungen_fuer_Fachberater/Fachberater_Reporting/Uebersicht/' },
							{ text: 'Beispiel Schülerliste', link: '/Anleitungen_fuer_Fachberater/Fachberater_Reporting/BeispielreportSchuelerliste/' },
						],
					},
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/SVWS-NRW/Schulungsunterlagen' },
		],
	},
})
