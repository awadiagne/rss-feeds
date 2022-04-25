const express = require('express')
const app = express()

app.use(express.json())

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017'
const dbName = 'feeds';

MongoClient.connect(url, function(err, client) {
  console.log("Connecté à MongoDB");
  const db = client.db(dbName);
  
  let Parser = require('rss-parser');
  let parser = new Parser();

  (async () => {
    let feeds = await parser.parseURL('https://www.lemonde.fr/rss/en_continu.xml');

    console.log(feeds.title);

    feeds.items.forEach((item) => {
      console.log(item.title);
      console.log(item.pubDate);
      db.collection("feeds").insertOne(item, function(err, res) {
        if (err) throw err;        
      })
    });
  })();
  //client.close();
});


app.get('/feeds', (req,res) => {
  console.log("Get feeds requested...");

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    db.collection('feeds').find({}, { projection: { _id: 1, title: 1, content: 1 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.status(200).json(result);
      client.close();
    });
  });

})

app.get('/feeds/:id', (req,res) => {
  const id = req.params.id
  console.log("Get feed by id requested... Id : " + id);

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);

    db.collection('feeds').findOne({ _id: ObjectID(id)}, function(err, result) {
      if (err) throw err;
      console.log("1 document found : " + result.title);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.status(200).json(result);
      client.close();
    });
  });

})

app.put('/feeds/:id', (req,res) => {
  const id = parseInt(req.params.id)
  console.log("Put feed requested... Id : " + id);

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { _id: id };
    var newvalues = { $set: {title: req.body.title, content: req.body.content } };

    db.collection('feeds').updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.status(200).json(result);
      client.close();
    });
  });

})

app.listen(8080, () => {
  console.log('Running on port 8080...')
})