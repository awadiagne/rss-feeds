const express = require('express')
const app = express()

app.use(express.json())

const MongoClient = require('mongodb').MongoClient;

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

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    feeds = db.collection('feeds').find({}, { projection: { _id: 1, title: 1, content: 1 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.status(200).json(result);
      client.close();
    });
  });

})

app.get('/feeds/:id', (req,res) => {
  const id = parseInt(req.params.id)
  const feed = feeds.find(feed => feed.id === id)
  res.status(200).json(feed)
})

app.post('/feeds', (req,res) => {
  feeds.push(req.body)
  res.status(200).json(feeds)
})

app.put('/feeds/:id', (req,res) => {
  const id = parseInt(req.params.id)
  let feed = feeds.find(feed => feed.id === id)
  feed.title = req.body.title,
  feed.content = req.body.content,
  feed.img = req.body.img,
  res.status(200).json(feed)
})

app.listen(8080, () => {
  console.log('Running on port 8080...')
})