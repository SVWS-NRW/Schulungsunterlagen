import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: '/Schulungsunterlagen/',
	title: "SVWS Schulungsunterlagen",
	description: "Schulungen SVWS-Server NRW",
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
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'SVWS-Dokumentation', link: 'https://doku.svws-nrw.de/' },
			{ text: 'SchILD3-Wiki', link: 'https://schulverwaltungsinfos.nrw.de/svws/wiki/index.php' },
		],

		sidebar: [
			/** {
				text: 'Übergang zu SchILD-NRW3', link: '/VonSchild2_ZuSchild3/', collapsed: true,
				items: [
					{ text: 'SchILD-NRW3 - Neues Layout', link: '/VonSchild2_ZuSchild3/1Uebersicht/SchILD3_Oberflaeche/' },
					{ text: 'SVWS-Client', link: '/VonSchild2_ZuSchild3/1Uebersicht/SVWS_Client/' },
					{ text: 'Das Arbeitsverzeichnis', link: '/VonSchild2_ZuSchild3/1Uebersicht/Arbeitsverzeichnis/' },
					{ text: 'Änderungen bezüglich Schülerdaten', link: '/VonSchild2_ZuSchild3/2Schueler/schild3', collapsed: true,
						items:[
							{text: 'In Schild-NRW3', link: '/VonSchild2_ZuSchild3/2Schueler/schild3'},
							{text: 'Im SVWS-Client', link: '/VonSchild2_ZuSchild3/2Schueler/svwsClient'},
						],
					},
					{ text: 'Änderungen bezüglich Leistungsdaten', link: '/VonSchild2_ZuSchild3/3Leistungsdaten/schild3', collapsed: true,
						items:[
							{text: 'In Schild-NRW3', link: '/VonSchild2_ZuSchild3/3Leistungsdaten/schild3'},
							{text: 'Im SVWS-Client', link: '/VonSchild2_ZuSchild3/3Leistungsdaten/svwsClient'},
						],
					},
					{ text: 'Stundenplan im SVWS-Client', link: '/VonSchild2_ZuSchild3/4Stundenplan' },
				],
			},*/
			/** {
	 	  text: 'Installation', link: '/Installation_Fachberatung_Moderation/', collapsed: true,
        items: [
          { text: 'Installation SVWS-Server', link: '/Installation_Fachberatung_Moderation/Installation_SVWS/' },
          { text: 'Installation Zertifikat', link: '/Installation_Fachberatung_Moderation/Installation_Zertifikat/' },
          { text: 'Installation Schild-NRW3', link: '/Installation_Fachberatung_Moderation/Installation_SchILD3/' },
		  { text: 'Sichten der Log-Files', link: '/Installation_Fachberatung_Moderation/Log_Files/' },
          { text: 'Öffnen der Datenbank mit DBeaver', link: '/Installation_Fachberatung_Moderation/DBeaver/' },
          { text: 'Administration im Client', link: '/Installation_Fachberatung_Moderation/AdminTool/' }
        ]
	  },*/
			/**	{
				text: 'Leistungsdaten Sek II', link: '/LeistungsdatenSekII/', collapsed: true,
				items: [
					{ text: 'Allgemeine Vorlagen', link: '/LeistungsdatenSekII/Allgemein_Vorlage/' },
					{ text: 'Unterrichtsfächer', link: '/LeistungsdatenSekII/Unterrichtsfaecher/' },
					{ text: 'Blockung EF', link: '/LeistungsdatenSekII/BlockungKommendeEF/', collapsed: true,
						items :[
							{ text: 'Laufbahnplanung kommende EF', link: '/LeistungsdatenSekII/BlockungKommendeEF/LaufbahnKursplanungJG10/' },
							{ text: 'Klausurplanung EF', link: '/LeistungsdatenSekII/BlockungKommendeEF/KlausurplanungJG10/' },
						],
					},
					{ text: 'Import SchILD2 Laufbahndaten', link: '/LeistungsdatenSekII/ImportSchILD2Laufbahndaten/' },
				],
			}, */
			{
				text: 'Schulungsmodule', link: '/schulungsmodule/', collapsed: false,
				items: [
					{ text: 'Basisschulungen (leer)', link: '/schulungsmodule/basisschulungen/', collapsed: true,
						items: [
							{ text: 'Kapitel 1 test', link: 'schulungsmodule/basisschulungen/S1_Kapitel 1 (1).md' },
							{ text: 'Kapitel 2', link: 'schulungsmodule/basisschulungen/S1_Kapitel 2 (1).md' },
							{ text: 'Kapitel 3', link: 'schulungsmodule/basisschulungen/S1_Kapitel 3 (2).md' },
							{ text: 'Kapitel 4', link: 'schulungsmodule/basisschulungen/S1_Kapitel 4 (1).md' },
						],
					},
					{ text: 'Sekundarstufe I', link: '/schulungsmodule/sek_i/' },
					{ text: 'Gymnasiale Oberstufe', link: '/schulungsmodule/gost/', collapsed: true,
						items: [
							{ text: 'Laufbahnplanung kommende EF', link: '/schulungsmodule/gost/modul1_grundlagen_ef', items: [
								{ text: '1. Orientierung', link: 'schulungsmodule/gost/modul1_grundlagen_ef/kapitel1_orientierung.md' },
								{ text: '2. App Oberstufe', link: 'schulungsmodule/gost/modul1_grundlagen_ef/kapitel2_oberstufe.md' },
								{ text: '3. Wahlen und Beratung', link: 'schulungsmodule/gost/modul1_grundlagen_ef/kapitel3_wahlen_beratung.md' },
								{ text: '4. Blocken', link: 'schulungsmodule/gost/modul1_grundlagen_ef/kapitel4_blocken.md' },
								{ text: '5. Blockung anwenden', link: 'schulungsmodule/gost/modul1_grundlagen_ef/kapitel5_blockung_anwenden.md' },
								{ text: '6. Leistungsdaten und Zeugnisse', link: 'schulungsmodule/gost/modul1_grundlagen_ef/kapitel6_leistungsdaten_zeugnisse.md' },
								{ text: '↳ Aufgaben Modul 1', link: '/schulungsmodule/gost/modul1_grundlagen_ef/aufgaben_modul_1.md' },
								{ text: '↳ Extraaufgaben Modul 1', link: '/schulungsmodule/gost/modul1_grundlagen_ef/extraaufgaben_modul_1.md' },
							],
							},
							{ text: 'Q-Phase und Abitur', link: '/schulungsmodule/gost/modul2_qphase_abitur/', items: [
								{ text: '↳ Aufgaben Modul 2 (kein Link)' },
							],
							},
							{ text: 'Leitungskram', link: '/schulungsmodule/gost/modul3_leitung/', items: [
								{ text: '↳ Aufgaben Modul 3 (kein Link)' },
							],
							},
						],
					},
					{ text: 'Was anderes', link: '/schulungsmodule/' },
				],
			},
			{
				text: 'Fortbildungen für Fachberater', link: '/Fachberater_Fortbildungen/', collapsed: true,
				/*items: [
					{ text: 'Übersicht', link: '/Fachberater_Fortbildungen/Uebersicht' },
				],*/
			},
			{
				text: 'Fortbildungen für Fachberater', link: '/Fachberater_Fortbildungen/', collapsed: true,
				/*items: [
					{ text: 'Übersicht', link: '/Fachberater_Fortbildungen/Uebersicht' },
				],*/
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/SVWS-NRW/Schulungsunterlagen' },
		],
	},
})
