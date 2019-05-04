var MongoClient = require('mongodb').MongoClient;
const pipeline = [{ $project: { documentKey: false } }];
MongoClient.connect("mongodb://localhost:27017?replicaSet=mongo-repl", { useNewUrlParser: true }, function (err, database) {
    if (err) throw err;
    var db = database.db("FYP2019");
    console.log("[mongodb] Mongo connection established - FYP2019");
    // Show database docs for debugging
    console.log("[mongodb] Mongo db dump: ");
    db.collection("data").find({}, { fields: { "_id": false } }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    const changeStream = db.collection("data").watch(pipeline);
    changeStream.on("change", function (change) {
        dataObj = { "sensor": change.fullDocument.sensor }
        console.log(dataObj);
    });
});