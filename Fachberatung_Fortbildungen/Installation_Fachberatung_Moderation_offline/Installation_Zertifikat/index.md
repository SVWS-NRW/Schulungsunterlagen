# Installation des Zertifikats


### Zertifikatsdatei suchen
Navigieren Sie zum Windows-Systemordner "Dokumente". Dort finden Sie in der Regel eine Zertifikatsdatei mit dem Namen **SVWS.cer**. 


> [!TIP] 
> In der Datei C:\ProgramData\SVWS-Server\logs\keystore.log ist der Pflad der Zertifikatsdatei hinterlegt.

### Installation des Zertifikats
Eine detailierte Anleitung zur Installation des Zertifikats finden Sie im [Wiki](https://schulverwaltungsinfos.nrw.de/svws/wiki/index.php?title=Installation_SVWS-Server_und_SchILD-NRW_3#Installation_des_SSL-Zertifikats).

Achten Sie darauf, das Zertifikat in **Vertrauenswürdige Stammzertifizierung** zu installieren.



### Anpassungen für Firefox (optional)
Chrome und Edge nutzen automatisch diese Zertifikate. Firefox muss die Einstellung security.enterprise_roots.enabled auf true gesetzt haben.

Tippen Sie im Firefox-Browser about:config ein und ändern Sie die entsprechende Einstellung, sofern Sie mit Firefox arbeiten möchten.




