var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var connection = require('./routes/connection.js');
let router = express.Router();


configDB = require('./configDB')
home = require('./routes/home');
signup = require('./routes/signup');
login = require('./routes/login');

var host = configDB.user.host;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

router.use("/signup", signup.index);
router.use("/login", login.index);


app.listen(3000, function () {
    console.log("Server running");
    connection.connect(host);
});
