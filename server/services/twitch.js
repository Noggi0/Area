const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { SimpleAdapter, WebHookListener } = require('twitch-webhooks');

let express = require("express");
let router = express.Router();
let database = require("../database");
const clientId = "y6g9unwy7xelv08gyr29rty18fr4t3";
const clientSecret = "2i4xnmb4ujgnqp2r1e0c38w0yt5hnb";

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

async function isStreamLive(userName) {
    const user = await apiClient.helix.users.getUserByName(userName);
    if (!user) {
        return false;
    }
    return await user.getStream() !== null;
}

router.get("/isStreaming", (req, res) => {
    const streamer = database.escape(req.query.streamer);
    isStreamLive(streamer)
    .then((response) => {
        if (response) {
            res.status(200);
            res.send(true);
            console.log(streamer + " is live !");
        } else if (response == null) {
            res.status(400);
            console.log("Error: response from Twitch is null.");
            res.send(null);
        } else {
            res.status(200);
            res.send(false);
            console.log(streamer + " is not live !");
        }
    })
})

router.post("/streamer", (req, res) => {
    const username = database.escape(req.query.username);
    const streamer = database.escape(req.query.streamer);

    database.getConnection(function(err, connection) {
        connection.query("INSERT IGNORE INTO twitch (username, streamer)", [username, streamer], (err, result) => {
            if (err) {
                res.status(400);
                res.end("Database err = " + err);
            }
            if (result) {
                res.status(200);
                res.send("Added Streamer " + streamer + " to database with username: " + username + " successfully.");
            }
        });
    });
})

module.exports = router;
