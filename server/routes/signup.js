var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db = require('./connection.js')


app.use(bodyParser.urlencoded({ extended: true }));


module.exports = {
    index: index
}


function index(req, res, next) {

    var Signupcollection = db.getDB().collection('signup');
    var Logincollection = db.getDB().collection('login');
    Signupcollection.find({ "email": req.body.email }).toArray(function (err, items) {
        if (err) throw err;
        else {
            if (items.length === 0) {
                Signupcollection.insert({
                    "name": req.body.name,
                    "email": req.body.email,
                    "tel": req.body.tel,
                    "pass": req.body.pass
                })
                Logincollection.insert({ "email": req.body.email, "pass": req.body.pass });
                res.status(200).send("Your account has been registered successfully " + req.body.email);
                console.log("Signup successfull \n --")
                Signupcollection.find({ "name": req.body.name })
                    .toArray(function (err, result) {
                        if (err) throw err

                        console.log(JSON.stringify(result) + "--\n^^added successfully to the database");
                    });
            }
            else {
                console.log("Signup failed due to same email");
                res.status(400).send("Account already exists , registered under " + items[0].name);
            }
        }
    });
}




