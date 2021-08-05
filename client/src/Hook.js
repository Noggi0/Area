import './Hook.css';
import React, { useState } from 'react';
import { Button, Icon, Notification } from 'rsuite';
import Axios from 'axios';

let titleIf = "If This..."
let titleThen = "Then That..."

let Area = [
    {
        "serviceType": Number,
        "serviceNumber": Number,
        "reactionType": Number,
        "reactionNumber": Number
    }
]

function resetArea() {
    titleIf = "If This..."
    titleThen = "Then That..."
    Area[0].serviceType = Number;
    Area[0].serviceNumber = Number;
    Area[0].reactionNumber = Number;
    Area[0].reactionType = Number;
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

let listActions = [];
let listReactions = [];

const sendArea = () => {
    console.log("Area:", Area[0].serviceType);
    Axios.post(`http://localhost:8080/area?username=${localStorage.getItem('username')}&string=${Area[0].serviceType}.${Area[0].serviceNumber}-${Area[0].reactionType}.${Area[0].reactionNumber}`)
    .then((response) => {
        console.log("response:", response);
        if (response.status == 200) {
            console.log("Area added to DB");
            titleIf = "If This...";
            titleThen = "Then That...";
            Notification.success({
                title: "Area Success",
                duration: 4000,
                description: "Area successfully added !"
            })
            resetArea();

        } else {
            Notification.warning({
                title: "Error " + response.headers,
                duration: 4000,
                description: "Error when adding the Area: wrong reponse status."
            })
            console.log("Error when adding the Area: wrong reponse status");
        }
    })
}

function Hook() {
    const [isDisabled, setDisabled] = useState(true);
    const [isColored, setColor] = useState('#e71d36');
    const [isChoosingReaction, setChoosingReaction] = useState(false);
    const [isChoosingAction, setChoosingAction] = useState(false);

    const servicesActionClicked = (id) => {
        let actions = [];
        switch(id) {
            case 1:
                titleIf = "Service Intra Epitech : ";
                actions.push({ name: 'A project P is to be completed in less than X days', color: '#006ab3', key: 1});
                actions.push({ name: 'There is X spots left on S slot', color: '#006ab3', key: 2});
                actions.push({ name: 'A note from a P project is available', color: '#006ab3', key: 3});
                break;
            case 2:
                titleIf = "Service Twitter : ";
                actions.push({ name: 'A new private message is received by the user U', color: '#0099CC', key: 1});
                actions.push({ name: 'The user gains a follower', color: '#0099CC', key: 2});
                actions.push({ name: 'New tweet from search', color: '#0099CC', key: 3});
                break;
            case 3:
                titleIf = "Service OneDrive : ";
                actions.push({ name: 'A new file is present in the X directory', color: '#0066CC', key: 1});
                actions.push({ name: 'A user shares a file', color: '#0066CC', key: 2});
                break;
            case 4:
                titleIf = "Service Reddit : ";
                actions.push({ name: 'If new hot post in R reddit', color: '#FF5700', key: 1});
                actions.push({ name: 'If new comment by you', color: '#FF5700', key: 2});
                break;
            case 5:
                titleIf = "Service Google Drive : ";
                actions.push({ name: 'If a new file is added in your folder', color: '#333366', key: 1});
                break;
            case 6:
                titleIf = "Service Météo : ";
                actions.push({ name: 'If the T temperature falls under D degrees in X days at L location', color: '#0099CC', key: 1});
                actions.push({ name: 'If it will be rain in X days at L location', color: '#0099CC', key: 2});
                break;
            case 7:
                titleIf = "Service Twitch : ";
                actions.push({ name: 'If a streamer S launches a stream', color: '#663399', key: 1});
                break;
            case 8:
                titleIf = "Service Youtube : ";
                actions.push({ name: 'If new liked video', color: 'red', key: 1});
                actions.push({ name: 'If new video uploaded by U user', color: 'red', key: 2});
                break;
            case 9:
                titleIf = "Service Google Calendar : ";
                actions.push({ name: 'If new event added', color: '#0066FF', key: 1});
                actions.push({ name: 'If any event is planned in X days', color: '#0066FF', key: 2});
                break;
        }
        Area[0].serviceType = id;
        listActions = actions.map((d) =>
        <Button className="ButtonIf" style={{ background: d.color, whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={ () => {
            setChoosingAction(false)
            Area[0].serviceNumber = d.key
            titleIf += (d.name)
            if (titleIf != "If This..." && titleThen != "Then That...") {
                setDisabled(false);
                setColor('black');
            } else {
                setDisabled(true);
                setColor('#e71d36');
            }
        }}>
            <div>
                {d.name}
            </div>
        </Button>);
        setChoosingAction(true);
    }

    const servicesReactionClicked = (id) => {
        let recs = [];
        switch(id) {
            case 1:
                titleThen = "Reaction Intra Epitech : ";
                recs.push({ name: 'The user signs up for an activity A', color: '#006ab3', key: 1});
                break;
            case 2:
                titleThen = "Reaction Twitter : ";
                recs.push({ name: 'Update biography', color: '#0099CC', key: 1});
                recs.push({ name: 'Post a tweet', color: '#0099CC', key: 2});
                recs.push({ name: 'Update profile picture', color: '#0099CC', key: 3});
                break;
            case 3:
                titleThen = "Reaction Reddit : " ;
                recs.push({ name: 'New hot post in R reddit', color: '#FF5700', key: 1});
                break;
            case 4:
                titleThen = "Reaction Google Sheets : ";
                recs.push({ name: 'Save X in a spreadsheet S', color: 'green', key: 1});
                break;
            case 5:
                titleThen = "Reaction Google Calendar : ";
                recs.push({ name: 'Add an event', color: '#0066FF', key: 1});
                break;
            case 6:
                titleThen = "Reaction Webhooks : ";
                recs.push({ name: 'Make a web request', color: '#006ab3', key: 1});
                break;
            case 7:
                titleThen = "Reaction Office 365 Mail : ";
                recs.push({ name: 'Send email', color: '#333366', key: 1});
                break;
        }
        Area[0].reactionType = id;
        listReactions = recs.map((d) =>
        <Button className="ButtonIf" style={{ background: d.color, whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={() => {
            setChoosingReaction(false)
            Area[0].reactionNumber = d.key
            titleThen += d.name
            if (titleIf != "If This..." && titleThen != "Then That...") {
                setDisabled(false);
                setColor('black');
            } else {
                setDisabled(true);
                setColor('#e71d36');
            }
        }}>
            <div>
                {d.name}
            </div>
        </Button>);
        setChoosingReaction(true);
    }

    const listItems = services.map((d) =>
    <Button className="ButtonIf" style={{ background: d.color, whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={() => servicesActionClicked(d.key)}>
        <div>
            {d.name}
            <img src={d.picture} alt={d.name} />
        </div>
    </Button>);

    const listItemsRec = reactions.map((d) =>
    <Button className="ButtonIf" style={{ background: d.color, whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={() => servicesReactionClicked(d.key)}>
        <div>
            {d.name}
        </div>
    </Button>);

    if (isChoosingReaction === true) {
        return (
            <div className="Hook">
                <div className="Title">
                    <h1>CHOOSE A REACTION !</h1>
                </div>
                <div className="space">
                    {listReactions}
                </div>
            </div>
        );
    } else if (isChoosingAction === true) {
        return (
            <div className="Hook">
                <div className="Title">
                    <h1>CHOOSE AN ACTION !</h1>
                </div>
                <div className="space">
                    {listActions}
                </div>
            </div>
        );
    } else {
        return (
            <div className="Hook">
                <div className="Title">
                    <h1><b>CREATE YOUR HOOK !</b></h1>
                </div>
                <div className="space">
                    <b><h3>{titleIf}</h3></b>
                </div>
                <div>
                    {listItems}
                </div>
                <div className="space">
                    <b><h3>{titleThen}</h3></b>
                </div>
                <div>
                    {listItemsRec}
                </div>
                <div className="space">
                    <Button disabled={isDisabled} style={{color: isColored}} componentClass="button" onClick={() => {
                        sendArea()
                        setDisabled(true)
                        setColor('#e71d36')
                        resetArea()
                    }}>
                        <Icon icon="plus"/> <b>Add</b>
                    </Button>
                </div>
            </div>
        );
    }
}

export default Hook;