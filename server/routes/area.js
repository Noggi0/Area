let express = require("express");
let router = express.Router();
let database =  require("../database.js");

router.get('/', (req, res) => {
    let username = database.escape(req.query.username);

    database.getConnection(function(err, connection) {
        database.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
            if (err)
                return err;
            if (result) {
                res.header(200);
                res.send(result[0].areaString);
                console.log("Got Areas from DB:", result[0].areaString);
            }
        })
    })
})

router.post('/', (req, res) => {
    let string = req.query.string;
    let username = database.escape(req.query.username);

    console.log('username', username);
    database.getConnection(function(err, connection) {
        database.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
            if (err)
                console.log(err);
            if (result) {
                console.log("result:", result)
                if (result[0].areaString === null) {
                    database.query("UPDATE user SET areaString = ? WHERE username = ?", [string, username], (err, result) => {
                        if (err)
                            console.log(err);
                        if (result) {
                            console.log("yolo");
                            res.status(200);
                            res.send("Added:", string, "to user:", username);
                        }
                    });
                } else {
                    let newString = result[0].areaString +";"+string;
                    database.query("UPDATE user SET areaString = ? WHERE username = ?", [newString, username],(err, result) => {
                        if (err)
                            console.log(err);
                        if (result) {
                            res.status(200);
                            res.send("Updated:", newString, "on user:", username);
                        }
                    })
                }
            }
        })
    })
});

router.delete('/', (req, res) => {
    let username = database.escape(req.query.username);
    let toRemove = req.query.string;

    database.getConnection(function(err, connection) {
        database.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
            if (err)
                return err;
            if (result) {
                if (result[0].areaString.includes(toRemove)) {
                    let newString = result[0].areaString.replace(toRemove, '');
                    database.query("UPDATE user SET areaString = ? WHERE username = ?", [newString, username],(err, result) => {
                        if (err)
                            console.log(err);
                        if (result)
                            res.send("Removed:", toRemove, "on user:", username);
                    })
                }
            }
        })
    })
})

module.exports = router;