import { defineConfig, loadEnv } from 'vite'

// https://vitepress.dev/reference/site-config
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		base: env.BASE === undefined ? '/Schulungsunterlagen/' : env.BASE,
		title: 'SVWS Schulungsunterlagen',
		description: 'Materialsammlung für Schulungen zum SVWS-Server NRW',
		lastUpdated: true,
		themeConfig: {
			outline: {
				label: 'Auf dieser Seite',
			},
			docFooter: {
				next: 'Nächste Seite',
				prev: 'Vorherige Seite',
			},
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
				{
					text: 'Benutzerhandbücher',
					items: [
						{ text: 'SVWS-Webclient', link: '/webclient' },
						{ text: 'SVWS-AdminClient', link: '/adminclient' },
						{ text: '', items: [
							{ text: 'WebNotenManager (Alpha)', link: '/wenom' },
							{ text: 'SVWS-Konferenzübersicht (Bald)', link: '/svws_module/svws_konferenzuebersicht' },
						] },
						{ text: 'Laufbahnplanung SII mit WebLuPO', link: '/weblupo' },
					] },
				{ text: 'Administration',
					items: [
						{ text: 'Installation', link: '/deployment' },
						{ text: 'FAQ', link: '/deployment/FAQ.md' },
						{ text: 'Roadmap', link: '/deployment/roadmap.md' },
					] },

				{ text: 'Entwicklung',
					items: [
						{ text: 'SVWS-Server', link: '/development/SVWS-Server/'},
						{ text: 'Entwicklungsumgebungen', link: '/development/Entwicklungsumgebungen/'},
						{ text: 'APIs für externe Tools', link: '/development/ExterneAPIs/'},
						{ text: 'FAQs Development', link: '/development/FAQ/' },
						{ text: 'SVWS-Server bei GitHub', link: 'https://github.com/SVWS-NRW/SVWS-Server/' },
						{ text: ' ', items: [
							{ text: 'Projekte', link: '/projekte' },
						] },
						{ text: 'Mitarbeit', link: '/teamarbeit' },
						{ text: 'Schulungen', link: '/schulungen' },
					] },
			],
			socialLinks: [
				{ icon: 'github', link: 'https://github.com/SVWS-NRW/SVWS-Dokumentation' },
			],
			sidebar: [


				{
					"text": "Anleitungen fuer Fachberater",
					"collapsed": true,
					"link": "/Anleitungen_fuer_Fachberater",
					"items": [
						{
							"text": "Fachberater DBReparatur",
							"collapsed": true,
							"link": "/Anleitungen_fuer_Fachberater/Fachberater_DBReparatur",
						},
						{
							"text": "Fachberater Reporting",
							"collapsed": true,
							"link": "/Anleitungen_fuer_Fachberater/Fachberater_Reporting",
							"items": [
								{
									"text": "BeispielreportSchuelerliste",
									"collapsed": true,
									"link": "/Anleitungen_fuer_Fachberater/Fachberater_Reporting/BeispielreportSchuelerliste",
								},
								{
									"text": "Uebersicht",
									"collapsed": true,
									"link": "/Anleitungen_fuer_Fachberater/Fachberater_Reporting/Uebersicht",
								},
							],
						},
						{
							"text": "Fachberater WebLupo Windows",
							"collapsed": true,
							"link": "/Anleitungen_fuer_Fachberater/Fachberater_WebLupo_Windows",
						},
					],
				},
				{
					"text": "api-examples",
					"link": "/api-examples",
				},
				{
					"text": "Datenbanken",
					"collapsed": true,
					"items": [
						{
							"text": "GOSt-DB",
							"collapsed": true,
							"items": [
								{
									"text": "GOSt DB Eigenschaften",
									"link": "/Datenbanken/GOSt-DB/GOSt_DB_Eigenschaften",
								},
							],
						},
					],
				},
				{
					"text": "Fachberater Anleitungen",
					"collapsed": true,
					"items": [
						{
							"text": "Moderatoren Schulungsserver",
							"collapsed": true,
							"items": [
								{
									"text": "Wartung",
									"link": "/Fachberater_Anleitungen/Moderatoren_Schulungsserver/Wartung",
								},
							],
						},
					],
				},
				{
					"text": "Fortbildungen fuer Fachberater",
					"collapsed": true,
					"link": "/Fortbildungen_fuer_Fachberater",
					"items": [
						{
							"text": "Aktuell",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Aktuell",
						},
						{
							"text": "Austausch Schulungen",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Austausch_Schulungen",
						},
						{
							"text": "DBeaver",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/DBeaver",
						},
						{
							"text": "EFBlockung",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/EFBlockung",
						},
						{
							"text": "Fragerunde",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Fragerunde",
						},
						{
							"text": "GymnasialeOberstufeBasics",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/GymnasialeOberstufeBasics",
						},
						{
							"text": "Installation",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Installation",
						},
						{
							"text": "Installation Fachberatung Moderation offline",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline",
							"items": [
								{
									"text": "AdminTool",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/AdminTool",
								},
								{
									"text": "DBeaver",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/DBeaver",
								},
								{
									"text": "Handout",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/Handout",
								},
								{
									"text": "Installation SchILD3",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/Installation_SchILD3",
								},
								{
									"text": "Installation SVWS",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/Installation_SVWS",
								},
								{
									"text": "Installation Zertifikat",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/Installation_Zertifikat",
								},
								{
									"text": "Log Files",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/Log_Files",
								},
								{
									"text": "SVWS Client Sichten",
									"collapsed": true,
									"link": "/Fortbildungen_fuer_Fachberater/Installation_Fachberatung_Moderation_offline/SVWS_Client_Sichten",
								},
							],
						},
						{
							"text": "MigrationSicherung",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/MigrationSicherung",
						},
						{
							"text": "Oberstufe",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Oberstufe",
						},
						{
							"text": "QBlockung",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/QBlockung",
						},
						{
							"text": "ReparaturMDB",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/ReparaturMDB",
						},
						{
							"text": "Reports",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Reports",
						},
						{
							"text": "Schulungskonzept",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Schulungskonzept",
						},
						{
							"text": "Stundenplan Klausurblockung",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Stundenplan_Klausurblockung",
						},
						{
							"text": "UmstiegSchild3",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/UmstiegSchild3",
						},
						{
							"text": "Wenom",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Wenom",
						},
						{
							"text": "Wissenswert",
							"collapsed": true,
							"link": "/Fortbildungen_fuer_Fachberater/Wissenswert",
						},
					],
				},
				{
					"text": "markdown-examples",
					"link": "/markdown-examples",
				},
				{
					"text": "README",
					"link": "/README",
				},
				{
					"text": "schulungsmodule",
					"collapsed": true,
					"link": "/schulungsmodule",
					"items": [
						{
							"text": "basisschulungen",
							"collapsed": true,
							"link": "/schulungsmodule/basisschulungen",
							"items": [
								{
									"text": "1. Allgemeines",
									"link": "/schulungsmodule/basisschulungen/1. Allgemeines",
								},
								{
									"text": "10. Aufgaben aus dem Schulalltag",
									"link": "/schulungsmodule/basisschulungen/10. Aufgaben aus dem Schulalltag",
								},
								{
									"text": "2. Erste Orientierung in SchILD-NRW",
									"link": "/schulungsmodule/basisschulungen/2. Erste Orientierung in SchILD-NRW",
								},
								{
									"text": "3. Verwaltung",
									"link": "/schulungsmodule/basisschulungen/3. Verwaltung",
								},
								{
									"text": "4. Lehrkräfte",
									"link": "/schulungsmodule/basisschulungen/4. Lehrkräfte",
								},
								{
									"text": "5. Schüler",
									"link": "/schulungsmodule/basisschulungen/5. Schüler",
								},
								{
									"text": "6. Auswahl",
									"link": "/schulungsmodule/basisschulungen/6. Auswahl",
								},
								{
									"text": "7. Gruppenprozesse",
									"link": "/schulungsmodule/basisschulungen/7. Gruppenprozesse",
								},
								{
									"text": "8. Kataloge",
									"link": "/schulungsmodule/basisschulungen/8. Kataloge",
								},
								{
									"text": "9. Reportverwaltung",
									"link": "/schulungsmodule/basisschulungen/9. Reportverwaltung",
								},
							],
						},
						{
							"text": "BK",
							"collapsed": true,
							"link": "/schulungsmodule/BK",
						},
						{
							"text": "gost",
							"collapsed": true,
							"link": "/schulungsmodule/gost",
							"items": [
								{
									"text": "Beweglicher Block Leitung",
									"collapsed": true,
									"link": "/schulungsmodule/gost/Beweglicher Block Leitung",
								},
								{
									"text": "Laufbahnplanung kommende EF",
									"collapsed": true,
									"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF",
									"items": [
										{
											"text": "1 Orientierung und Wiederholung",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/1_Orientierung_und_Wiederholung",
										},
										{
											"text": "2 App Oberstufe",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/2_App_Oberstufe",
										},
										{
											"text": "3 Wahlen und Beratung",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/3_Wahlen_und_Beratung",
										},
										{
											"text": "4 Blocken",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/4_Blocken",
										},
										{
											"text": "5 Blockung Anwenden",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/5_Blockung_Anwenden",
										},
										{
											"text": "6 Um-Abwahlen",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/6_Um-Abwahlen",
										},
										{
											"text": "7 Leistungsdaten und Zeugnisse",
											"link": "/schulungsmodule/gost/Laufbahnplanung_kommende_EF/7_Leistungsdaten_und_Zeugnisse",
										},
									],
								},
								{
									"text": "notes",
									"link": "/schulungsmodule/gost/notes",
								},
								{
									"text": "QPhase und Abitur",
									"collapsed": true,
									"link": "/schulungsmodule/gost/QPhase_und_Abitur",
									"items": [
										{
											"text": "1 Orientierung und Wiederholung",
											"link": "/schulungsmodule/gost/QPhase_und_Abitur/1_Orientierung_und_Wiederholung",
										},
										{
											"text": "2 NeueQphase und Laufbahnkorrekturen",
											"link": "/schulungsmodule/gost/QPhase_und_Abitur/2_NeueQphase_und_Laufbahnkorrekturen",
										},
										{
											"text": "3 KorrigierteEF und Q1Blocken",
											"link": "/schulungsmodule/gost/QPhase_und_Abitur/3_KorrigierteEF_und_Q1Blocken",
										},
										{
											"text": "4 Umwahlen und Wahl von A3A4",
											"link": "/schulungsmodule/gost/QPhase_und_Abitur/4_Umwahlen_und_Wahl_von_A3A4",
										},
									],
								},
							],
						},
						{
							"text": "ImportSchILD2Laufbahndaten",
							"collapsed": true,
							"link": "/schulungsmodule/ImportSchILD2Laufbahndaten",
						},
						{
							"text": "Reporterstellung",
							"collapsed": true,
							"link": "/schulungsmodule/Reporterstellung",
						},
						{
							"text": "sek i",
							"collapsed": true,
							"link": "/schulungsmodule/sek_i",
						},
						{
							"text": "uebergangsschulung",
							"collapsed": true,
							"link": "/schulungsmodule/uebergangsschulung",
							"items": [
								{
									"text": "aufgaben VonSchild2 zuSchild3",
									"link": "/schulungsmodule/uebergangsschulung/aufgaben_VonSchild2_zuSchild3",
								},
								{
									"text": "kapitel0 Einfuehrung",
									"link": "/schulungsmodule/uebergangsschulung/kapitel0_Einfuehrung",
								},
								{
									"text": "kapitel1 Orientierung",
									"link": "/schulungsmodule/uebergangsschulung/kapitel1_Orientierung",
								},
								{
									"text": "kapitel2 Filtern Gruppenprozesse",
									"link": "/schulungsmodule/uebergangsschulung/kapitel2_Filtern_Gruppenprozesse",
								},
								{
									"text": "kapitel3 Kataloge",
									"link": "/schulungsmodule/uebergangsschulung/kapitel3_Kataloge",
								},
								{
									"text": "kapitel4 Reports",
									"link": "/schulungsmodule/uebergangsschulung/kapitel4_Reports",
								},
								{
									"text": "kapitel5 Noteneingabe",
									"link": "/schulungsmodule/uebergangsschulung/kapitel5_Noteneingabe",
								},
							],
						},
						{
							"text": "VonSchild2 ZuSchild3",
							"collapsed": true,
							"link": "/schulungsmodule/VonSchild2_ZuSchild3",
							"items": [
								{
									"text": "1Uebersicht",
									"collapsed": true,
									"items": [
										{
											"text": "Arbeitsverzeichnis",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/1Uebersicht/Arbeitsverzeichnis",
										},
										{
											"text": "SchILD3 Oberflaeche",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/1Uebersicht/SchILD3_Oberflaeche",
										},
										{
											"text": "SVWS Client",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/1Uebersicht/SVWS_Client",
										},
									],
								},
								{
									"text": "2Schueler",
									"collapsed": true,
									"items": [
										{
											"text": "schild3",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/2Schueler/schild3",
										},
										{
											"text": "svwsClient",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/2Schueler/svwsClient",
										},
									],
								},
								{
									"text": "3Leistungsdaten",
									"collapsed": true,
									"items": [
										{
											"text": "schild3",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/3Leistungsdaten/schild3",
										},
										{
											"text": "svwsClient",
											"collapsed": true,
											"link": "/schulungsmodule/VonSchild2_ZuSchild3/3Leistungsdaten/svwsClient",
										},
									],
								},
								{
									"text": "4Stundenplan",
									"collapsed": true,
									"link": "/schulungsmodule/VonSchild2_ZuSchild3/4Stundenplan",
								},
								{
									"text": "5Oberstufenplanung",
									"collapsed": true,
									"link": "/schulungsmodule/VonSchild2_ZuSchild3/5Oberstufenplanung",
								},
								{
									"text": "GrenzenClient",
									"collapsed": true,
									"link": "/schulungsmodule/VonSchild2_ZuSchild3/GrenzenClient",
								},
							],
						},
					],
				},
				{
					"text": "schulungsserver",
					"collapsed": true,
					"link": "/schulungsserver",
				},
				{
					"text": "Tipp der Woche",
					"collapsed": true,
					"link": "/Tipp_der_Woche",
					"items": [
						{
							"text": "SchILD-Tipp der Woche",
							"collapsed": true,
							"items": [
								{
									"text": "datenbankmigration",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/datenbankmigration",
								},
								{
									"text": "leistungsuebersicht",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/leistungsuebersicht",
								},
								{
									"text": "StartwarnungSchuljahresabschnitt",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/StartwarnungSchuljahresabschnitt",
								},
								{
									"text": "strassenkatalog",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/strassenkatalog",
								},
								{
									"text": "telliExport",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/telliExport",
								},
								{
									"text": "zeugnisRechtsbelehrung",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/zeugnisRechtsbelehrung",
								},
								{
									"text": "zeugnisreports",
									"link": "/Tipp_der_Woche/SchILD-Tipp_der_Woche/zeugnisreports",
								},
							],
						},
						{
							"text": "SVWS-Hack der Woche",
							"collapsed": true,
							"items": [
								{
									"text": "bugfix122",
									"link": "/Tipp_der_Woche/SVWS-Hack_der_Woche/bugfix122",
								},
								{
									"text": "dbeaver-dump",
									"link": "/Tipp_der_Woche/SVWS-Hack_der_Woche/dbeaver-dump",
								},
								{
									"text": "kataloge",
									"link": "/Tipp_der_Woche/SVWS-Hack_der_Woche/kataloge",
								},
								{
									"text": "konferenzmodul",
									"link": "/Tipp_der_Woche/SVWS-Hack_der_Woche/konferenzmodul",
								},
							],
						},
					],
				},




			],
		},
	}
})
