let express = require("express");
let database =  require("../database.js");
let { Meteo } = require('../modules/meteo.js');

const meteo = new Meteo();

const services = {
    1: "Intra",
    2: "Twitter",
    3: "OneDrive",
    4: "Reddit",
    5: "Google Drive",
    6: "Meteo",
    7: "Twitch",
    8: "YouTube",
    9: "Google Calendar",
    10: "Google Sheets",
    11: "Webhook",
    12: "Office365"
};

function loopOnEveryUsers()
{
    database.query("SELECT * from user", (err, result) => {
        if (err)
            return err;
        if (result) {
            result.forEach((element, i) => {
                console.log("i == ", i);
                console.log("username: ", element.username);
                startActionThenReaction(element.username, element.areaString);
            })
        }
    })
}

async function startActionThenReaction(username, input)
{
    if (input === null)
        return;
    let inputs = input.split(';');
    inputs.forEach(async function(element) {
        if (element === '')
            return;
        let serviceAction = element.slice(0, element.indexOf('.'));
        let action = element.slice(element.indexOf('.') + 1, element.indexOf('-'));
        let serviceReaction = element.slice(element.indexOf('-') + 1, element.lastIndexOf('.'));
        let reaction = element.slice(element.lastIndexOf('.') + 1, element.length);
        let trigger;

        if (services[serviceAction] == "Meteo") {
            console.log("METEO");
            trigger = await meteo.selectAction(parseInt(action), database.escape("Noggio"));
        } else {
            console.log("NOT METEO, SERVICE ACTION ==", services[serviceAction]);
        }
        if (trigger === true) {
            console.log("TRIGGERED");
            if (services[serviceReaction] == "Meteo") {
                await meteo.selectReaction(parseInt(reaction), database.escape("Noggio"));
            }
        } else {
            console.log("NOT TRIGGERED");
        }
    });
}

module.exports = loopOnEveryUsers;