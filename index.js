const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');

// const MongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb+srv://storeFrontAdmin:storeFrontPassword@develop.5toek.mongodb.net/develop?retryWrites=true&w=majority";

const app = express();

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to mongodb'))
//const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

/* client.connect(err => {
  const db = client.db("develop");
  const usersCollection = db.collection('users');
  console.log('connected with mongodb');

  app.post('/user', (req, res) => {
      usersCollection.insertOne({ timestamp: new Date(), ...req.body }, ((err, result) => {
          res.send({success: true});
         }));
  }) 

      app.get('/user/:email', (req, res) => {
        usersCollection.findOne({userEmail: req.params.email}, ((err, result) => {
          if (result) {
            res.send({success: true, ...result});
          } else {
            res.send({success: false});
          }
           }));
      })
}); */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});

app.use(express.json());

// test route
app.get('/test', function (req, res) {
  res.send({testKey: 'test value'});
})

app.use('/user', userRoutes);

app.listen(process.env.PORT || 5000, function() {
    console.log(process.env.PORT, 'server started');
})


 