CREATE TABLE IF NOT EXISTS Users (id TEXT PRIMARY KEY, password TEXT);
CREATE TABLE IF NOT EXISTS Playlist (id TEXT PRIMARY KEY, userid TEXT, url TEXT, date TEXT);
