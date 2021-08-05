let express = require("express");
let router = express.Router();
let database =  require("../database.js");
const { route } = require("../routes/login.js");
const request = require('request');

const appid = "0ee1435c68af84b839f0e2baa1c7bdd4";

router.get("/", (req, res) => {
    database.getConnection(function(err, connection) {
        connection.query("SELECT * FROM meteo", (err, result) => {
            if (err) {
                res.status(400);
                res.end("Database err = " + err);
            }
            if (result) {
                res.send(result);
            }
        });
    });
});

router.get("/temperature", (req, res) => {
    const username = database.escape(req.query.username);
    let currentTemp;
    
    database.getConnection(function(err, connection) {
        connection.query("SELECT * FROM meteo WHERE username = ?", [username], (err, result) => {
            if (err) {
                res.status(400);
                res.end("Database err = " + err);
            }
            if (result) {
                let city = result[0].tempLocation.slice(1, result[0].tempLocation.length - 1);
                request(`http://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${appid}`, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        currentTemp = JSON.parse(body).main.temp - 273.15;
                        if (currentTemp < result[0].temp) {
                            console.log("ALERTE TEMPERATURE");
                            console.log("\t" + currentTemp + "=>" + result[0].temp);
                            res.status(200);
                            res.send(result[0]);
                        }
                    }
                    if (typeof(currentTemp) === 'undefined') {
                        res.status(400);
                        res.send("Error in gathering data");
                    }
                });
            }
        });
    });
});

router.post("/temperature", (req, res) => {
    const day = new Date(database.escape(req.query.day));
    const location = database.escape(req.query.location);
    const target = parseInt(req.query.target);
    const username = database.escape(req.query.username);

    database.getConnection(function(err, connection) {
        
        connection.query("SELECT * FROM meteo WHERE username = ?", [username], (err, result) => {
            if (err)
                return err;
            if (result.length > 0) {
                connection.query("UPDATE meteo SET tempLocation = ? , tempDay = ? , temp = ? WHERE username = ?", [location, day, target, username], (err, result) => {
                    if (err) {
                        res.status(400);
                        res.end("Database err = " + err);
                    }
                    if (result) {
                        res.status(200);
                        res.send("Updated temp to database with username: " + username + " successfully.");
                    }
                })
            } else {
                connection.query("INSERT IGNORE INTO meteo (username, tempLocation, tempDay, temp) VALUES (?, ?, ?, ?)", [username, location, day, target], (err, result) => {
                    if (err) {
                        res.status(400);
                        res.end("Database err = " + err);
                    }
                    if (result) {
                        res.status(200);
                        res.send("Added temp to database with username: " + username + " successfully.");
                    }
                });
            }
        })
    });
})

router.post("/rain", (req, res) => {
    const day = parseInt(req.query.day);
    const location = database.escape(req.query.location);
    const username = database.escape(req.query.username);

    database.getConnection(function(err, connection) {
        connection.query("SELECT * FROM meteo WHERE username = ?", [username], (err, result) => {
            if (err)
                return err;
            if (result.length > 0) {
                connection.query("UPDATE meteo SET rainLocation = ? , rainDay = ? WHERE username = ?", [location, day, username], (err, result) => {
                    if (err) {
                        res.status(400);
                        res.end("Database err = " + err);
                    }
                    if (result) {
                        res.status(200);
                        res.send("Updated rain to database with username: " + username + " successfully.");
                    }
                })
            } else {
                connection.query("INSERT IGNORE INTO meteo (username, rainLocation, rainDay) VALUES (?, ?, ?)", [username, location, day], (err, result) => {
                    if (err) {
                        res.status(400);
                        res.end("Database err = " + err);
                    }
                    if (result) {
                        res.status(200);
                        res.send("Added rain to database with username: " + username + " successfully.");
                    }
                });
            }
        })
    });
});

router.get("/rain", (req, res) => {
    const username = database.escape(req.query.username);

    database.getConnection(function(err, connection) {
        connection.query("SELECT * FROM meteo WHERE username = ?", [username], (err, result) => {
            if (err) {
                res.status(400);
                res.end("Database err = " + err);
            }
            if (result) {
                let city = result[0].rainLocation.slice(1, result[0].rainLocation.length - 1);
                let days = parseInt(result[0].rainDay);
                request(`http://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=1&appid=${appid}`, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const lat = JSON.parse(body)[0].lat;
                        const lon = JSON.parse(body)[0].lon;
                        request(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${appid}`, (error, response, body) => {
                            if (!error && response.statusCode === 200) {
                                let weatherOfTheDay = JSON.parse(body).daily[days].weather[0].main;
                                res.send(weatherOfTheDay);
                            }
                        })
                    }
                });
            }
        });
    });
});

module.exports = router;