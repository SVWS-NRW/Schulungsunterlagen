DROP TABLE IF EXISTS RandomNames;

CREATE TEMP TABLE RandomNames (
    LastName VARCHAR(50),
    FirstName VARCHAR(50),
    GeschlechtID INT,
    Strassenname VARCHAR(50)  
);

INSERT INTO RandomNames (LastName, FirstName, GeschlechtID, Strassenname) VALUES
('Müller', 'Lukas', 3, 'BahnhofStr.'),
('Schmidt', 'Emma', 4, 'Cassiusstr.'),
('Becker', 'Marie', 5, 'Düsseldorfer Str.');

WITH RowCount AS (
    SELECT COUNT(*) AS total_rows FROM RandomNames
),
RandomOrder AS (
    SELECT 
        LastName, 
        FirstName, 
        GeschlechtID, 
        Strassenname, 
        ROW_NUMBER() OVER (ORDER BY RANDOM()) AS rn
    FROM RandomNames
),
SchuelerOrder AS (
    SELECT 
        ID, 
        ROW_NUMBER() OVER (ORDER BY RANDOM()) AS rn
    FROM Schueler
)
UPDATE Schueler
SET 
    Geschlecht = RandomOrder.GeschlechtID,
    Vorname = RandomOrder.FirstName,
    Name = RandomOrder.LastName,
    Strassenname = RandomOrder.Strassenname
FROM RandomOrder
JOIN SchuelerOrder ON MOD(RandomOrder.rn, (SELECT total_rows FROM RowCount)) = MOD(SchuelerOrder.rn, (SELECT total_rows FROM RowCount))
WHERE Schueler.ID = SchuelerOrder.ID;
