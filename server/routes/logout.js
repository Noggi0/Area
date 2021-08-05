let express = require("express");
let router = express.Router();
let database = require("../database.js");

router.get('/', (req, res) => {
    res.status(200).setHeader('Content-Type', 'application/json');
    req.session.destroy(null);
    res.send("LOGOUT");
});

module.exports = router;