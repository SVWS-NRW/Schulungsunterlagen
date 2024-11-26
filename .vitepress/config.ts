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
					timeStyle: 'medium'
				}
			},
			search: {
				provider: 'local'
			},
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Dokumentation & Handbuch', link: 'https://doku.svws-nrw.de/' },
    ],

    sidebar: [
      {
		  text: 'Übergang zu SchILD-NRW3', link: '/VonSchild2_ZuSchild3/', collapsed: true, 
        items: [
          { text: 'SchILD-NRW3 - Neues Layout', link: '/VonSchild2_ZuSchild3/1Uebersicht/SchILD3_Oberflaeche/' },
          { text: 'SVWS-Client', link: '/VonSchild2_ZuSchild3/1Uebersicht/SVWS_Client/' },
		  { text: 'Das Arbeitsverzeichnis', link: '/VonSchild2_ZuSchild3/1Uebersicht/Arbeitsverzeichnis/' },
		  { text: 'Änderungen bezüglich Schülerdaten', link: '/VonSchild2_ZuSchild3/2Schueler/schild3', collapsed: true,
			items:[
			{text: 'In Schild-NRW3', link: '/VonSchild2_ZuSchild3/2Schueler/schild3'},
			{text: 'Im SVWS-Client', link: '/VonSchild2_ZuSchild3/2Schueler/svwsClient'}
			]
		  },
		  { text: 'Änderungen bezüglich Leistungsdaten', link: '/VonSchild2_ZuSchild3/3Leistungsdaten/schild3', collapsed: true,
			items:[
			{text: 'In Schild-NRW3', link: '/VonSchild2_ZuSchild3/3Leistungsdaten/schild3'},
			{text: 'Im SVWS-Client', link: '/VonSchild2_ZuSchild3/3Leistungsdaten/svwsClient'}
			]
		  },
		  { text: 'Stundenplan im SVWS-Client', link: '/VonSchild2_ZuSchild3/4Stundenplan' }
        ]
	  },
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
	  {
        text: 'Leistungsdaten Sek II', link: '/LeistungsdatenSekII/', collapsed: true, 
        items: [
          { text: 'Allgemeine Vorlagen', link: '/LeistungsdatenSekII/Allgemein_Vorlage/' },
          { text: 'Unterrichtsfächer', link: '/LeistungsdatenSekII/Unterrichtsfaecher/' },
          { text: 'Blockung EF', link: '/LeistungsdatenSekII/BlockungKommendeEF/', collapsed: true, 
          items :[
                { text: 'Laufbahnplanung kommende EF', link: '/LeistungsdatenSekII/BlockungKommendeEF/LaufbahnKursplanungJG10/' },
                { text: 'Klausurplanung EF', link: '/LeistungsdatenSekII/BlockungKommendeEF/KlausurplanungJG10/' }
              ]
            },
          { text: 'Import SchILD2 Laufbahndaten', link: '/LeistungsdatenSekII/ImportSchILD2Laufbahndaten/' }
        ]
      },
	  {
        text: 'Fortbildungen für Fachberater', link: '/Fachberater_Fortbildungen/', collapsed: true, 
         items: [
          { text: 'Übersicht', link: '/Fachberater_Fortbildungen/Uebersicht' }
		  ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SVWS-NRW/Schulungsunterlagen' }
    ]
  }
})
