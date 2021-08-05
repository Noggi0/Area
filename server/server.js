const { Console } = require('console');
const http = require('http');
const express = require('express');
const { json } = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Communication Front/Back-end
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

let login = require('./routes/login.js');
let register = require('./routes/register.js');
let logout = require('./routes/logout.js');
let twitch = require('./services/twitch.js');
let reddit = require('./routes/reddit.js');
let youtube = require('./routes/youtube.js');
const { connect } = require('http2');
let meteo = require('./services/meteo.js');
let twitter = require('./services/twitter.js');
let onedrive = require('./services/onedrive.js');
let test = require('./services/area.js');
let area = require('./routes/area.js');

// Server initialisation
const hostname = '0.0.0.0';
const port = 8080;
const server = express();

server.use(cors());
server.use(bodyparser.urlencoded({extended:false}));
server.use(bodyparser.json());
server.use(passport.initialize());

server.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Server routes linking
server.use('/login', login);
server.use('/register', register);
server.use('/logout', logout);
server.use('/twitch', twitch);
server.use('/reddit', reddit);
server.use('/youtube', youtube);
server.use('/meteo', meteo);
server.use('/twitter', twitter);
server.use('/onedrive', onedrive);
server.use('/area', area);

//setInterval(test, 60000);

server.get('/', (req, res) => {
  res.status(200).setHeader('Content-Type', 'application/json');
  res.send("Area main page " + req.session.username);
});

server.get('/about.json', (req, res) => {
  res.status(200).setHeader('Content-Type', 'application/json');
  res.send("List of Actions and REActions");
  //TODO : Créer un json (automatiquement?) des actions/réactions
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});