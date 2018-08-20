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

    var Bookingcollection = db.getDB().db('Hotels').collection('Hotelbooking');
    console.log("booking accesed.--");
    Bookingcollection.insertOne({
        "name": req.body.name,
        "email": req.body.email,
        "tel": req.body.tel,
        "hotelname": req.body.hotelname,
        "roomtype": req.body.roomtype,
        "checkin": req.body.checkin,
        "checkout": req.body.checkout
    })
    res.status(200).send(req.body);
    console.log("booking successfull \n --")
}




