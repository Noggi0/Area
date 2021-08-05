import Axios from 'axios';
import { useState } from 'react';
import { Panel } from 'rsuite';
import './Home.css';

let Areas = []
let area = {
    "serviceType": Number,
    "serviceNumber": Number,
    "reactionType": Number,
    "reactionNumber": Number
}

const services =  [
    {
        "name": "Intra Epitech",
        "picture": "epitech.png",
        "color": "#006ab3",
        "key": 1
    },
    {
        "name": "Twitter",
        "picture": "twitter.png",
        "color": "#0099CC",
        "key": 2
    },
    {
        "name": "OneDrive",
        "picture": "oneDrive.png",
        "color": "#0066CC",
        "key": 3
    },
    {
        "name": "Reddit",
        "picture": "reddit.png",
        "color": "#FF5700",
        "key": 4
    },
    {
        "name": "Google Drive",
        "picture": "google_drive.png",
        "color": "#333366",
        "key": 5
    },
    {
        "name": "Météo",
        "picture": "meteo.png",
        "color": "#0099CC",
        "key": 6
    },
    {
        "name": "Twitch",
        "picture": "twitch.png",
        "color": "#663399",
        "key": 7
    },
    {
        "name": "Youtube",
        "picture": "youtube.png",
        "color": "red",
        "key": 8
    },
    {
        "name": "Google Calendar",
        "picture": "google_calendar.png",
        "color": "#0066FF",
        "key": 9
    }
]

const reactions = [
    {
        "name": "Intra Epitech",
        "color": "#006ab3",
        "key": 1
    },
    {
        "name": "Twitter",
        "color": "#0099CC",
        "key": 2
    },
    {
        "name": "Reddit",
        "color": "#FF5700",
        "key": 3
    },
    {
        "name": "Google Sheets",
        "color": "green",
        "key": 4
    },
    {
        "name": "Google Calendar",
        "color": "#0066FF",
        "key": 5
    },
    {
        "name": "Webhooks",
        "color": "#006ab3",
        "key": 6
    },
    {
        "name": "Office 365 Mail",
        "color": "#333366",
        "key": 7
    }
]

function getServiceTitle(id) {
    let save = "";

    switch(id) {
        case "1":
            save = "Intra Epitech";
            break;
        case "2":
            save = "Twitter";
            break;
        case "3":
            save = "OneDrive";
            break;
        case "4":
            save = "Reddit";
            break;
        case "5":
            save = "Google Drive";
            break;
        case "6":
            save = "Météo";
            break;
        case "7":
            save = "Twitch";
            break;
        case "8":
            save = "Youtube";
            break;
        case "9":
            save = "Google Calendar";
            break;
    }

    return save;
}

function getReactionTitle(id) {
    let save = "";

    switch(id) {
        case "1":
            save = "Intra Epitech";
            break;
        case "2":
            save = "Twitter";
            break;
        case "3":
            save = "Reddit";
            break;
        case "4":
            save = "Google Sheets";
            break;
        case "5":
            save = "Google Calendar";
            break;
        case "6":
            save = "Webhooks";
            break;
        case "7":
            save = "Office 365 Mail";
            break;
    }

    return save;
}

function getServiceQuote(service, quote) {
    let saveQuote = "";
    switch(service) {
        case "1":
            if (quote == "1") {
                saveQuote = 'A project P is to be completed in less than X days';
            } else if (quote == "2") {
                saveQuote = 'There is X spots left on S slot';
            } else {
                saveQuote = 'A note from a P project is available';
            }
            break;

        case "2":
            if (quote == "1") {
                saveQuote = 'A new private message is received by the user U';
            } else if (quote == "2") {
                saveQuote = 'The user gains a follower';
            } else {
                saveQuote = 'New tweet from search';
            }
            break;

        case "3":
            if (quote == "1") {
                saveQuote = 'A new file is present in the X directory';
            } else {
                saveQuote = 'A user shares a file';
            }
            break;

        case "4":
            if (quote == "1") {
                saveQuote = 'If new hot post in R reddit';
            } else {
                saveQuote = 'If new comment by you';
            }
            break;

        case "5":
            saveQuote = 'If a new file is added in your folder';
            break;

        case "6":
            if (quote == "1") {
                saveQuote = 'If the T temperature falls under D degrees in X days at L location';
            } else {
                saveQuote = 'If it will be rain in X days at L location';
            }
            break;

        case "7":
            saveQuote = 'If a streamer S launches a stream';
            break;

        case "8":
            if (quote == "1") {
                saveQuote = 'If new liked video';
            } else {
                saveQuote = 'If new video uploaded by U user';
            }
            break;

        case "9":
            if (quote == "1") {
                saveQuote = 'If new event added';
            } else {
                saveQuote = 'If any event is planned in X days';
            }
            break;

        default:
            break;
    }

    return saveQuote;
}

function getReactionQuote(reaction, quote) {
    let saveQuote = "";

    switch (reaction) {
        case "1":
            saveQuote = 'The user signs up for an activity A';
            break;

        case "2":
            if (quote == "1") {
                saveQuote = 'Update Biography';
            } else if (quote == "2") {
                saveQuote = 'Post a tweet';
            } else {
                saveQuote = 'Update profile picture';
            }
            break;
        
        case "3":
            saveQuote = 'New hot post in R reddit';
            break;

        case "4":
            saveQuote = 'Save X in a spreadsheet S';
            break;

        case "5":
            saveQuote = 'Add an event';
            break;

        case "6":
            saveQuote = 'Make a web request';
            break;

        case "7":
            saveQuote = 'Send email';
            break

        default:
            break;
    }

    return saveQuote;
}

function Home() {
    const [isEmpty, setEmpty] = useState(true);
    
    const getAreas = () => {
        Axios.get(`http://localhost:8080/area?username=${localStorage.getItem('username')}`)
        .then((response) => {
            if (response.status == 200) {
                console.log("response:", response)
                if (typeof(response.data) === 'undefined') {
                    setEmpty(true);
                } else {
                    const save = response.data.split(';');
                    let areaSave = {
                        "serviceTitle": "",
                        "serviceNumberTitle": "",
                        "reactionTitle": "",
                        "reactionNumberTitle": "",
                        "serviceType": Number,
                        "serviceNumber": Number,
                        "reactionType": Number,
                        "reactionNumber": Number
                    }                    
                    save.forEach((area) => {
                        areaSave = [];
                        areaSave.serviceType = area[0];
                        areaSave.serviceTitle = getServiceTitle(area[0]);
                        areaSave.serviceNumber = area[2];
                        areaSave.serviceNumberTitle = getServiceQuote(area[0], area[2]);
                        areaSave.reactionType = area[4];
                        areaSave.reactionTitle = getReactionTitle(area[4]);
                        areaSave.reactionNumber = area[6];
                        areaSave.reactionNumberTitle = getReactionQuote(area[4], area[6]);
                        console.log("Add", areaSave, "to Areas.");
                        Areas.push(areaSave)
                    })
                    setEmpty(false);
                }
            } else {
                Notification.warning({
                    title: "Error " + response.headers,
                    duration: 4000,
                    description: "Error when receiving the Area: wrong reponse status."
                })
                console.log("Error when adding the Area: wrong reponse status");
            }
        })
    }
    const listAreas = Areas.map((a) => 
        <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, marginTop: "3%" }}>
            <b> {a.serviceTitle} - {a.reactionTitle}<br/></b>
            <p>
                <small>
                    <b>{a.serviceTitle}</b> : <i>{a.serviceNumberTitle}</i><br/>
                    <b>{a.reactionTitle}</b> : <i>{a.reactionNumberTitle}</i><br/>
                </small>
            </p>
        </Panel >
    );

    getAreas();

    if (isEmpty) {
        return (
            <div className="Home">
                <div className="mainContent">
                    <h6> You don't have any <i>Hook</i> configured yet.<br/>Click on the "<b>+ Create</b>" button to create a first one !</h6>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Home">
                <div className="cardsDisplay">
                    {listAreas}
                </div>
            </div>
        );
    }
}

export default Home;