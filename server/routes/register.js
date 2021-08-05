let express = require("express");
let router = express.Router();
let database = require("../database.js");

router.post('/', (req, res)=> {

    let username = database.escape(req.query.username);
    let password = database.escape(req.query.password);

    database.getConnection(function(err, connection) {
        connection.query("INSERT IGNORE INTO user (username, passwrd) VALUES (?, ?)", [username, password], (err, result) => {
            if (err) {
                res.status(400);
                res.end("Database err = " + err);
            }
            if (result.warningCount !== 0) {
                res.status(401);
                res.end("Duplicate");
            }
            if (result)
                res.end(JSON.stringify(result));
        });
    })
});

router.get('/', (req, res) => {
    res.status(200).setHeader('Content-Type', 'application/json');
    database.query("SELECT * FROM user", (err, result) => {
        if (err)
            console.log(err);
        if (result)
            res.send(result);
    });
    //res.send("Register");
});

module.exports = router;