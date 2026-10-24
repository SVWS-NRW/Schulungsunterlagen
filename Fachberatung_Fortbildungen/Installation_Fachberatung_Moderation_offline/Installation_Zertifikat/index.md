# Installation des Zertifikats


### Zertifikatsdatei suchen
Navigiere zum Windows-Systemordner "Dokumente". Dort findest Du in der Regel eine Zertifikatsdatei mit dem Namen **SVWS.cer**. 


> [!TIP] 
> In der Datei C:\ProgramData\SVWS-Server\logs\keystore.log ist der Pflad der Zertifikatsdatei hinterlegt.

### Installation des Zertifikats
Eine detailierte Anleitung zur Installation des Zertifikats findest Du im [Wiki](https://schulverwaltungsinfos.nrw.de/svws/wiki/index.php?title=Installation_SVWS-Server_und_SchILD-NRW_3#Installation_des_SSL-Zertifikats).

Achte darauf, das Zertifikat in **Vertrauenswürdige Stammzertifizierung** zu installieren.



### Anpassungen für Firefox (optional)
Chrome und Edge nutzen automatisch diese Zertifikate. Firefox muss die Einstellung security.enterprise_roots.enabled auf true gesetzt haben.

Tippe im Firefox-Browser about:config ein und ändere die entsprechende Einstellung, sofern Du mit Firefox arbeiten möchtest.




