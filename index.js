const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://storeFrontAdmin:storeFrontPassword@develop.5toek.mongodb.net/develop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('connected with mongodb');
  client.close();
});

app.listen(process.env.PORT || 5000, function() {
    console.log('listening on 3000');
})

app.get('/', function (req, res) {
    res.send({success: true})
  })

  app.get('/test', function (req, res) {
    res.send({testKey: 'test value'});
  })