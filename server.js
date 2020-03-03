// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouter = require('./routes/product');

const app = express();

// Set up mongoose connection

const mongoDB = "mongodb://admin:Aa123456@ds353338.mlab.com:53338/heroku_qbw5r0x2";

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/product', productRouter);

port = const PORT = process.env.PORT || 3000;

app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});



var kittySchema = new mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);


var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy2' });

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);	
  });

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})


db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
});