var MongoClient = require('mongodb').MongoClient;
var db;


module.exports = {
    connect: connect,
    getDB: getDB
}


function connect(host) {
    MongoClient.connect(host, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log(err);
            throw (err);
        }
        else {
            db = client.db('user');
        }

    });

}


function getDB() {
    return db;
}
