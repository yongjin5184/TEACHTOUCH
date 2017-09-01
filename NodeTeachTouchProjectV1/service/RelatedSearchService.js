

/**
 * Mongo DB Connection Setting
 */

var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;

var mongoclient = new MongoClient(new MongoServer('localhost',27017,{'native_parser':true}));
var mongo_db_name = 'test';

var mongo_db = mongoclient.db(mongo_db_name);
var query = null;

mongoclient.open(function(err, mongoclient) {
    if(err) throw err;
    console.log('mongo client connected');
});


/**
 * Related Search Service
 */

/*app.post('/dictionary', function(req,res) {
  res.header('Access-Control-Allow-Origin', '*');
    console.log(req.body.term);
    var query = {"term" : {$regex:"^"+req.body.term}};
    mongo_db.collection('test').find(query).toArray(function(err,doc){
       if(err) throw err;
       console.log("doc = " + JSON.stringify(doc));
       // console.log("JSON.stringify(doc)" + JSON.stringify(doc))
       res.send(doc);
   });
});*/

app.get('/word', function(req,res) {
  res.header('Access-Control-Allow-Origin', '*');
    //console.log(req.query.term);
    var query = {"word" : {$regex:"^"+req.query.term}};
    mongo_db.collection('high_school_word').find(query).toArray(function(err,doc){
       if(err) throw err;
       console.log("doc = " + JSON.stringify(doc));
       // console.log("JSON.stringify(doc)" + JSON.stringify(doc))
       res.send(doc);
   });
});
	