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

    var Signupcollection = db.getDB().db('user').collection('signup');
    console.log("Signup accesed.--");
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
                res.status(200).send(items[0]);
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




