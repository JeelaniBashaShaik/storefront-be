const express = require('express');
const app = express();
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://storeFrontAdmin:storeFrontPassword@develop.5toek.mongodb.net/develop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const db = client.db("develop");
  // perform actions on the collection object
  console.log('connected with mongodb');

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

    const usersCollection = db.collection('users');

    app.post('/user', (req, res) => {
        console.log(req.body, 'request body');
        usersCollection.insertOne({ timestamp: new Date(), ...req.body }, ((err, result) => {
            res.send('ok');
           }));
      })
});

app.listen(process.env.PORT || 5000, function() {
    console.log(process.env.PORT, 'listening');
})

app.get('/', function (req, res) {
    res.send({success: true})
  })

  app.get('/test', function (req, res) {
    res.send({testKey: 'test value'});
  })

 