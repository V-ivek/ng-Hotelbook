var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db = require('./connection.js')


module.exports = {
    index: index
}


app.use(bodyParser.urlencoded({ extended: true }));

function index(req, res, next) {
    var Logincollection = db.getDB().collection('login');
    Logincollection.find({ "email": req.body.email })
        .toArray(function (err, items) {
            if (err) throw err;
            else {
                if (items.length === 0) {
                    console.log("Login Failed due to invalid email");
                    res.status(400).send("There is no user registered under the email : " + req.body.email);
                }
                else {
                    if (items[0].pass === req.body.pass) {
                        console.log("Login Success");
                        res.status(200).send("Login Successfull");
                    }
                    else {
                        console.log("Login Failed due to incorrect password")
                        res.status(400).send("Invalid Password ");
                    }
                }
            }
        });


}
