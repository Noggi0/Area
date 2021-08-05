let express = require("express");
let router = express.Router();
let database =  require("../database.js");
const request = require('request');

const appid = "0ee1435c68af84b839f0e2baa1c7bdd4";

class Meteo {
    trigger;
    constructor () {
        this.trigger = false;
        this.wait = true;
    }
    async selectAction(index, username) {
        if (index === 1) {
            console.log("GetRain");
            this.getRain(username);
        } else {
            this.getTemp(username);
        }
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.trigger);
                console.log("Resolved trigger");
            }, 4000);
        });
    }
    async selectReaction(index, username) {
        console.log("Chosing Reaction");
        this.trigger = false
        if (index === 1) {
            console.log("GetRain");
            this.getRain(username);
        } else {
            console.log("Get Temp");
            this.getTemp(username);
        }
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Trigger is now " + this.trigger);
                resolve();
            }, 3000) ;
        });
    }
    getRain(username) {
        database.getConnection((err, connection) => {
            if (err)
                return err;
            connection.query("SELECT * FROM meteo WHERE username = ?", [username], (err, result) => {
                if (err)
                    return err;
                if (result && !err) {
                    if (result[0].rainLocation === null || result[0].rainDay === null)
                        return;
                    let city = result[0].rainLocation.slice(1, result[0].rainLocation.length - 1);
                    let days = parseInt(result[0].rainDay);
                    request(`http://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=1&appid=${appid}`, (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            const lat = JSON.parse(body)[0].lat;
                            const lon = JSON.parse(body)[0].lon;
                            request(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${appid}`, (error, response, body) => {
                                if (!error && response.statusCode === 200) {
                                    let weatherOfTheDay = JSON.parse(body).daily[days].weather[0].main;
                                    this.trigger = weatherOfTheDay === "Rain" ? true : false;
                                }
                            })
                        }
                    });
                }
            });
        })
    }
    getTemp(username) {
        let currentTemp;
        database.getConnection((err, connection) => {
            connection.query("SELECT * FROM meteo WHERE username = ?", [username], (err, result) => {
                if (err) {
                    return;
                }
                if (result && !err) {
                    if (result[0].tempLocation === null) {
                        return;
                    }
                    console.log(result[0].tempLocation);
                    let city = result[0].tempLocation.slice(1, result[0].tempLocation.length - 1);
                    request(`http://api.openweathermap.org/data/2.5/weather?q=${city},fr&appid=${appid}`, (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            currentTemp = JSON.parse(body).main.temp - 273.15;
                            if (currentTemp < result[0].temp) {
                                this.trigger = true;
                            }
                        }
                        if (typeof(currentTemp) === 'undefined') {
                            return;
                        }
                    });
                }
            });
        });
    }
}

module.exports = {
    Meteo: Meteo
};