-- Migration number: 0000 	 2023-11-13T18:52:38.792Z
CREATE TABLE Playlist_new (
  id TEXT PRIMARY KEY,
  userid TEXT,
  url TEXT,
  date TEXT
);

INSERT INTO Playlist_new (id, userid, url, date) SELECT id, email, url, date FROM
Playlist;

DROP TABLE Playlist;

CREATE TABLE Playlist (
  id TEXT PRIMARY KEY,
  userid TEXT,
  url TEXT,
  date TEXT
);

INSERT INTO Playlist (id, userid, url, date) SELECT id, userid, url, date FROM
Playlist_new;

DROP TABLE Playlist_new;
