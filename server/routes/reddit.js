'use strict';
const snoowrap = require('snoowrap');

let express = require("express");
let router = express.Router();

const r = new snoowrap({
    userAgent: 'put your user-agent string here',
    clientId: 'nSggeMPlXqa65w',
    clientSecret: 'TSamLAau61BYEexPIUoVijmCpApXJg',
    refreshToken: '230597171865-VcoPk33ck5dzx-qM5FMua4jBu09YlA'
});

const simpleOAuth2Reddit = require('@jimmycode/simple-oauth2-reddit');

const reddit = simpleOAuth2Reddit.create({
    clientId: 'nSggeMPlXqa65w',
    clientSecret: 'TSamLAau61BYEexPIUoVijmCpApXJg',
    callbackURL: 'http://localhost:8080/reddit/auth/reddit/callback',
    state: 'isfndoihvdifh'
});

router.get('/auth/reddit', reddit.authorize);

router.get('/auth/reddit/callback', reddit.accessToken, (req, res) => {
    console.log(req.token);
    return res.status(200).json(req.token);
});

module.exports = router;