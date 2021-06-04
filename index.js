const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const loginRoutes = require('./routes/login.routes.js');
const userRoutes = require('./routes/user.routes');
const storefrontRoutes = require('./routes/storefront.routes');
const storeRoutes = require('./routes/store.routes');

const utilities = require('./utilities');

const dbUrl = "mongodb+srv://storeFrontAdmin:storeFrontPassword@develop.5toek.mongodb.net/develop?retryWrites=true&w=majority";

const app = express();

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log('connected to mongodb'));

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

// app.use(utilities.verifyToken);
app.use(fileUpload());
app.use('/start', loginRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/storefront', storefrontRoutes);

app.listen(process.env.PORT || 5000, () => console.log(process.env.PORT, 'server started'));


 