var db = require('./connection');

module.exports = { getHotels: getHotels };

function getHotels(req, res) {
    var dbs = db.getDB();
    dbs = dbs.db('Hotels');
    var Hotelscollection = dbs.collection('Hotellists');
    Hotelscollection.find({}).toArray(function (err, result) {
        if (err) throw err;
        else res.send(result);
    });
}



