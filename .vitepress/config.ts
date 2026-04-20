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
				{ text: 'SchILD-NRW 3 Wiki',link: 'https://schulverwaltungsinfos.nrw.de/svws/wiki/' },
				{ text: 'doku.svws-nrw.de', link: 'https://doku.svws-nrw.de/' },
			],
			socialLinks: [
				{ icon: 'github', link: 'https://github.com/SVWS-NRW/Schulungsunterlagen' },
			],
			sidebar: [
				{
					"text": "Schulungsmodule",
					"collapsed": false,
					"link": "/schulungsmodule",
					"items": [
						{
							"text": "Basisschulungen",
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
							"text": "GOSt",
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
									"text": "Notes",
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
							"text": "Import SchILD2 Laufbahndaten",
							"collapsed": true,
							"link": "/schulungsmodule/ImportSchILD2Laufbahndaten",
						},
						{
							"text": "Reporterstellung",
							"collapsed": true,
							"link": "/schulungsmodule/Reporterstellung",
						},
						{
							"text": "SEK I",
							"collapsed": true,
							"link": "/schulungsmodule/sek_i",
						},
						{
							"text": "Übergangsschulung",
							"collapsed": true,
							"link": "/schulungsmodule/uebergangsschulung",
							"items": [
								{
									"text": "Aufgaben - von SchILD2 zu SchILD3",
									"link": "/schulungsmodule/uebergangsschulung/aufgaben_VonSchild2_zuSchild3",
								},
								{
									"text": "1 Orientierung",
									"link": "/schulungsmodule/uebergangsschulung/1_Orientierung",
								},
								{
									"text": "2 Filtern & Gruppenprozesse",
									"link": "/schulungsmodule/uebergangsschulung/2_Filtern_Gruppenprozesse",
								},
								{
									"text": "3 Kataloge",
									"link": "/schulungsmodule/uebergangsschulung/3_Kataloge",
								},
								{
									"text": "4 Reports",
									"link": "/schulungsmodule/uebergangsschulung/4_Reports",
								},
								{
									"text": "5 Noteneingabe",
									"link": "/schulungsmodule/uebergangsschulung/5_Noteneingabe",
								},
							],
						},
						{
							"text": "Von SchILD2 zu SchILD3",
							"collapsed": true,
							"link": "/schulungsmodule/VonSchild2_ZuSchild3",
							"items": [
								{
									"text": "1 Uebersicht",
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
					"text": "Fortbildungen für Fachberater",
					"collapsed": true,
					"link": "/Fachberatung_Fortbildungen",
					"items": [
						{
							"text": "Aktuell",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Aktuell",
						},
						{
							"text": "Austausch Schulungen",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Austausch_Schulungen",
						},
						{
							"text": "DBeaver",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/DBeaver",
						},
						{
							"text": "EFBlockung",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/EFBlockung",
						},
						{
							"text": "Fragerunde",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Fragerunde",
						},
						{
							"text": "GymnasialeOberstufeBasics",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/GymnasialeOberstufeBasics",
						},
						{
							"text": "Installation",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Installation",
						},
						{
							"text": "Installation Fachberatung Moderation offline",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline",
							"items": [
								{
									"text": "AdminTool",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/AdminTool",
								},
								{
									"text": "DBeaver",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/DBeaver",
								},
								{
									"text": "Handout",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Handout",
								},
								{
									"text": "Installation SchILD3",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SchILD3",
								},
								{
									"text": "Installation SVWS",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_SVWS",
								},
								{
									"text": "Installation Zertifikat",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Installation_Zertifikat",
								},
								{
									"text": "Log Files",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/Log_Files",
								},
								{
									"text": "SVWS Client Sichten",
									"collapsed": true,
									"link": "/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/SVWS_Client_Sichten",
								},
							],
						},
						{
							"text": "MigrationSicherung",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/MigrationSicherung",
						},
						{
							"text": "Oberstufe",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Oberstufe",
						},
						{
							"text": "QBlockung",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/QBlockung",
						},
						{
							"text": "ReparaturMDB",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/ReparaturMDB",
						},
						{
							"text": "Reports",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Reports",
						},
						{
							"text": "Schulungskonzept",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Schulungskonzept",
						},
						{
							"text": "Stundenplan Klausurblockung",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Stundenplan_Klausurblockung",
						},
						{
							"text": "UmstiegSchild3",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/UmstiegSchild3",
						},
						{
							"text": "Wenom",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Wenom",
						},
						{
							"text": "Wissenswert",
							"collapsed": true,
							"link": "/Fachberatung_Fortbildungen/Wissenswert",
						},
					],
				},
				{
					"text": "Fachberatung Anleitungen",
					"collapsed": true,
					"link": "/Fachberatung_Anleitungen/",
					"items": [
						{
							"text": "DBReparatur",
							"collapsed": true,
							"link": "/Fachberatung_Anleitungen/DBReparatur",
						},
						{
							"text": "Reporting",
							"collapsed": true,
							"link": "/Fachberatung_Anleitungen/Reporting",
							"items": [
								{
									"text": "Beispiel Report-Schuelerliste",
									"collapsed": true,
									"link": "/Fachberatung_Anleitungen/Reporting/BeispielreportSchuelerliste",
								},
								{
									"text": "Übersicht",
									"collapsed": true,
									"link": "/Fachberatung_Anleitungen/Reporting/Uebersicht",
								},
							],
						},
						{
							"text": "WebLupo Windows",
							"collapsed": true,
							"link": "/Fachberatung_Anleitungen/WebLupo_Windows",
						},
						{
							"text": "Schulungsserver",
							"collapsed": true,
							"link": "/Fachberatung_Anleitungen/schulungsserver/",
							"items": [
								{
									"text": "Wartung",
									"link": "/Fachberatung_Anleitungen/schulungsserver/Moderatoren_Schulungsserver/Wartung",
								},
							],
						},
						{
							"text": "api-examples",
							"link": "/api-examples",
						},
					],
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
