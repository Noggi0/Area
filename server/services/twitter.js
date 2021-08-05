const LoginWithTwitter = require('login-with-twitter');
var Twit = require('twit');
let express = require("express");
let router = express.Router();
const request = require('request');
const database = require('../database.js');
const redirHome = "http://localhost:8081/home"
const redirLogin = "http://localhost:8080/twitter/login"
const redirLogged = "http://localhost:8080/twitter/logged"
const redirTwitter = "http://localhost:8080/twitter"
var T;
var TwitterId = '';
var TwitterName = '';

const twLogin = new LoginWithTwitter({
    consumerKey: 'JR2OsiEdDamtKHdZW9UftE2ab',
    consumerSecret: 'TnthPBdIcCYSxI9b0dYb0KJwmN1D9lNb6OE7XtT1zi6VZMRH5T',
    callbackUrl: 'http://localhost:8080/twitter/auth'
});

//List of ACTIONS
// ----- A new private message is received by the user U
// ----- The user U gains a follower
// ----- New tweet from search:

//List of REACTIONS
// ----- Update bio
// -[V]- Post a tweet 
// ----- Update profile picture


router.post('/', (req, res) => {
    res.send("post post post")
});

router.get('/', (req, res) => {
    res.send("get get get")
});

router.get('/action/checkdm', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        res.status(200)
        res.redirect(redirHome)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/action/userfollow', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        res.status(200)
        res.redirect(redirHome)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/action/tweetfromsearch', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        res.status(200)
        res.redirect(redirHome)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/reaction/bio', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        res.status(200)
        console.log("Bio updated !")
        res.redirect(redirHome)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/reaction/tweet', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        T.post('statuses/update', {status: 'This is a test!'}, function(err, data, response) {
            // console.log(data)
        });
        res.status(200)
        console.log("Tweeted !")
        res.redirect(redirHome)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/reaction/profilepic', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        res.status(200)
        console.log("Profile picture updated !")
        res.redirect(redirHome)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/logged', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        res.status(200)
        console.log('You are now logged, welcome ' + TwitterName)
        res.send('You are now logged, welcome ' + TwitterName)
    }
    else {
        res.status(400)
        console.log('You are not logged in')
        res.send('You are not logged in')
    }
});

router.get('/auth', (req, res) => {
    twLogin.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if (err) {
            console.log("[ERR] Error occurred on login redirect")
            res.status(400)
            res.redirect(redirTwitter)
        }
        delete req.session.tokenSecret
        
        // user = {
        //   userId,
        //   userName,
        //   userToken,
        //   userTokenSecret
        // }
        req.session.user = user

        T = new Twit({
            consumer_key: twLogin.consumerKey,
            consumer_secret: twLogin.consumerSecret,
            access_token: req.session.user.userToken,
            access_token_secret: req.session.user.userTokenSecret,
            timeout_ms: 60*1000
        });
        TwitterId = req.session.user.userId
        TwitterName = req.session.user.userName
        // console.log(T)
        // console.log('Name : [' + TwitterName + '] ID: [' + TwitterId + ']')
        console.log('Logged !')
        res.status(200)
        res.redirect(redirLogged)
    });
});

router.get('/login', (req, res) => {
    if (TwitterId === '' || TwitterName === '') {
        twLogin.login((err, tokenSecret, url) => {
            if (err) {
                console.log("[ERR] Error occured on login")
                res.status(400)
                res.redirect(redirTwitter)
            }
            req.session.tokenSecret = tokenSecret
            console.log('Login is being proceed...')
            res.status(200)
            res.redirect(url)
        })
    }
    else {
        console.log('You are already logged ' + TwitterName)
        res.redirect(redirTwitter)
    }
});

router.get('/logout', (req, res) => {
    if (TwitterId !== '' || TwitterName !== '') {
        delete req.session.user
        TwitterId = ''
        TwitterName = ''
        console.log("Logged out !")
        res.status(200)
        res.redirect(redirTwitter)
    }
    else {
        console.log("Not logged in, no need to logout")
        res.status(200)
        res.redirect(redirTwitter)
    }
});

module.exports = router;
