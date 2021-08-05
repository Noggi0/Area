let express = require("express");
let router = express.Router();
const request = require('request');
const oneDriveAPI = require('onedrive-api');
const database = require("../database.js");

const client_id = "78bdfd04-790f-4563-8312-0a71af594e37";
const client_secret = "P2wRY-._5_~LboOAwghAJh2z3c37nudS~Y";
const directoryId = "901cb4ca-b862-4029-9306-e5cd0f6d9f86";
const objectId = "9ec65480-cfd2-4833-9ff1-a24e70a1e816";
const redirectLogin = "http://localhost:8080/onedrive/login";
const redirectHome = "http://localhost:8081/home";
const scopeOD = "wl.basic onedrive.readwrite wl.offline_access files.readwrite offline_access";
const baseGraph = 'https://graph.microsoft.com/v1.0/';
const accessTokenUri = "https://login.live.com/oauth20_token.srf";
const authorizationUri = "https://login.live.com/oauth20_authorize.srf?";

let user_session = {
    access_token_graph: undefined,
    access_token: undefined,
    refresh_token: undefined,
    authentification_token: undefined,
    user_id: undefined,
    expires_in: undefined,
    access_given: undefined,
    ext_expires_in: undefined,
    ext_access_given: undefined
};
  
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

function auth(res) {
    const client = new AuthorizationCode({
        client: {
          id: client_id,
          secret: client_secret,
        },
        auth: {
          tokenHost: 'https://login.live.com',
          tokenPath: '/oauth20_token.srf',
          authorizePath: '/oauth20_authorize.srf',
        },
        options: {
          authorizationMethod: 'body',
        },
    });
    const authorizationUri = client.authorizeURL({
        redirect_uri: redirectLogin,
        scope: scopeOD
    });
    res.redirect(authorizationUri);
}

router.get('/auth', (req, res) => {
    auth(res);
})

router.get('/login', (req, res) => {
    const code = req.query.code;

    request.post({ headers: {'content-type' : 'application/x-www-form-urlencoded'}
                , url: "https://login.live.com/oauth20_token.srf", body: (`client_id=${client_id}&redirect_uri=${redirectLogin}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`) }
                , function(error, response, body){
                    if (typeof(JSON.parse(body).access_token) === 'undefined') {
                        res.status(400);
                        res.redirect(redirectHome);
                    } else {
                        let user_info = {
                            access_token: JSON.parse(body).access_token,
                            refresh_token: JSON.parse(body).refresh_token,
                            authentification_token: JSON.parse(body).authentification_token,
                            user_id: JSON.parse(body).user_id,
                            expires_in: JSON.parse(body).expires_in
                        }
                        user_session = user_info;
                        user_session.access_given = new Date().getTime() / 1000;
                        res.status(200);
                        res.redirect(redirectHome);
                    }
    });
})

function refresh_token(res) {
    request.post({ headers: {'content-type' : 'application/x-www-form-urlencoded'}
        , url: "https://login.live.com/oauth20_token.srf", body: (`client_id=${client_id}&redirect_uri=${redirectLogin}&client_secret=${client_secret}&refresh_token=${user_session.refresh_token}&grant_type=refresh_token`) }
        , function(error, response, body){
            if (typeof(JSON.parse(body).access_token) === 'undefined') {
                res.status(400);
                res.send("Error when refreshing the access_token.");
            } else {
                user_session.access_token = JSON.parse(body).access_token,
                user_session.authentification_token = JSON.parse(body).authentification_token,
                user_session.user_id = JSON.parse(body).user_id,
                user_session.expires_in = JSON.parse(body).expires_in
                user_session.access_given = new Date().getTime() / 1000;
                console.log("Access_Token Refreshed.");
                res.status(200);
                res.send("Access_Token Refreshed.");
            }
    });
}

router.get('/refresh_auth', (req, res) => {
    if (typeof(user_session.refresh_token) === 'undefined') {
        console.log("refresh_auth Error: refresh_token is undefined. Refreshing it...");
        auth(res);
    } else if ((new Date().getTime() / 1000 - user_session.access_given) > user_session.expires_in) { // Token expired for +1h
        refresh_token(res);
    }
})

function authAdmin(res) {
    request.post({host: "login.microsoftonline.com", headers: {'content-type' : 'application/x-www-form-urlencoded'}
    , url: "https://login.microsoftonline.com/common/oauth2/v2.0/token", body: (`client_id=${client_id}&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&client_secret=${client_secret}&grant_type=client_credentials`) }
    , function(error, response, body){
        if (typeof(JSON.parse(response.body).access_token) !== undefined) {
            user_session.access_token_graph = JSON.parse(response.body).access_token;
            user_session.ext_expires_in = JSON.parse(response.body).ext_expires_in;
            user_session.ext_access_given = new Date().getTime() / 1000;
            console.log("Ext_access_Token Refreshed.");
            res.status(200);
            res.redirect(redirectHome);
        } else {
            res.status(400);
            console.log("Error when refreshing the ext_access_token.");
        }
    })
}

router.get('/authadmin', (req, res) => {
    authAdmin(res);
})

router.get('/getdrive', (req, res) => {
    if (typeof(user_session.access_token) === 'undefined') {
        console.log("Error, access_token undefined. Refreshing it...");
        auth(res);
    } else if ((new Date().getTime() / 1000 - user_session.access_given) > user_session.expires_in) {
        console.log("getdrive Error: access_token expired. Refreshing it...");
        refresh_token(res);
    // } else if ((new Date().getTime() / 1000 - user_session.ext_access_given) > user_session.ext_expires_in) {
    //     console.log("getdrive Error: ext_access_token expired. Refreshing it...");
    //     authAdmin();
    } else {
        oneDriveAPI.items.listChildren({
            accessToken: user_session.access_token,
            itemId: 'root',
            drive: 'me', // 'me' | 'user' | 'drive' | 'group' | 'site'
            driveId: '' // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
          }).then((item) => {
          console.log(item)
          // returns body of https://dev.onedrive.com/items/create.htm#response
        })
    }
})

router.get('/logout', (req, res) => {
    // https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri={redirect-uri}
})

module.exports = router;
