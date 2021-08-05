const { response } = require("express");
let express = require("express");
let router = express.Router();
let database =  require("../database.js");

router.post('/', (req, res)=> {

    let username = database.escape(req.query.username);
    let password = database.escape(req.query.password);
    console.log("username = " + username + " password = " + password);

    database.getConnection(function(err, connection) {
        connection.query("SELECT * FROM user WHERE username = ? AND passwrd = ?", [username, password], (err, result)=> {
            console.log(result);
            if (err) {
                console.log("test");
                res.send({err: err});
            }
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.status(200).setHeader('Content-Type', 'application/json');
                console.log("success");
                res.send("Success. Hello "+ username);
            }
            else {
                res.status(400);
                console.log(result.length);
                console.log("fail");
                res.send({message: "Wrong Username/password combination"});
            }
        })
    })
});

router.get('/', (req, res) => {
    res.status(200).setHeader('Content-Type', 'application/json');
    res.send("LOGIN");
});

module.exports = router;