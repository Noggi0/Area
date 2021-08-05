CREATE TABLE IF NOT EXISTS user (username VARCHAR(36) NOT NULL UNIQUE, passwrd VARCHAR(36) NOT NULL, areaString VARCHAR(80));
CREATE TABLE IF NOT EXISTS meteo (username VARCHAR(36) NOT NULL UNIQUE,
                                tempLocation VARCHAR(36), temp TINYINT, tempDay DATE,
                                rainLocation VARCHAR(36), rainDay TINYINT, isRaining BOOLEAN);
CREATE TABLE IF NOT EXISTS twitch (username VARCHAR(36) NOT NULL UNIQUE, streamer VARCHAR(36) NOT NULL);
INSERT INTO user (username, passwrd, areaString) VALUES ("'testUser'", "'testPassword'", "");
INSERT INTO meteo (username, tempLocation, temp, tempDay) VALUES ("'testUser'", "'Montpellier'", 21, "2021-03-04");