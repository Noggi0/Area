// const Youtube = require("youtube-api")
//     , fs = require("fs")
//     , readJson = require("r-json")
//     , Lien = require("lien")
//     , Logger = require("bug-killer")
//     , opn = require("opn")
//     , prettyBytes = require("pretty-bytes")
//     ;

// let express = require("express");
// let router = express.Router();
 
// // I downloaded the file from OAuth2 -> Download JSON
// // const CREDENTIALS = readJson(`client_secret.json`);

 
// // Authenticate
// // You can access the Youtube resources via OAuth2 only.
// // https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
// let oauth = Youtube.authenticate({
//     type: "oauth"
//   , client_id: "964185218071-0nvm4i50ui3icestjd109ean4b05ampv.apps.googleusercontent.com"
//   , client_secret: "Y1DnW6aaoQxZTWPuNRtSeXX7"
//   , redirect_url: "http://localhost:8080/auth/google/callback"
// });
 
// opn(oauth.generateAuthUrl({
//     access_type: "offline"
//   , scope: ["https://www.googleapis.com/auth/youtube.upload"]
// }));
 
// // Handle oauth2 callback
// router.get("/auth/google/callback", lien => {
//     Logger.log("Trying to get the token using the following code: " + lien.query.code);
//     oauth.getToken(lien.query.code, (err, tokens) => {
 
//         if (err) {
//             lien.lien(err, 400);
//             return Logger.log(err);
//         }
 
//         Logger.log("Got the tokens.");
 
//         oauth.setCredentials(tokens);
 
//         lien.end("The video is being uploaded. Check out the logs in the terminal.");
 
//         var req = Youtube.videos.insert({
//             resource: {
//                 // Video title and description
//                 snippet: {
//                     title: "Testing YoutTube API NodeJS module"
//                   , description: "Test video upload via YouTube API"
//                 }
//                 // I don't want to spam my subscribers
//               , status: {
//                     privacyStatus: "private"
//                 }
//             }
//             // This is for the callback function
//           , part: "snippet,status"
 
//             // Create the readable stream to upload the video
//           , media: {
//                 body: fs.createReadStream("video.mp4")
//             }
//         }, (err, data) => {
//             console.log("Done.");
//             process.exit();
//         });
 
//         setInterval(function () {
//             Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
//         }, 250);
//     });
// });

// module.exports = router;







var passport = require('passport');
let express = require("express");
let router = express.Router();

// Initialize passprt

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
  })
passport.deserializeUser((user, done) => {
  done(null, user)
  })
  
/* GET home page. */

passport.use(new GoogleStrategy({
  clientID: "964185218071-0nvm4i50ui3icestjd109ean4b05ampv.apps.googleusercontent.com", // Add your clientID
  clientSecret: "Y1DnW6aaoQxZTWPuNRtSeXX7", // Add the secret here
  callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
  done(null, profile, accessToken );
  }))
  
  // Google Oauth2

  router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  
  // Google Oauth2 callback url
  
  router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    res.redirect("areaapp://areaapp.io?id=" + req.user.id);
  });

  module.exports = router;