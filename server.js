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

port = process.env.PORT || 3000;

var kittySchema = new mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);



app.get("/url", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});


app.get("/addcat", (req, res, next) => {
 //console.log(req.query)
 var fluffy = new Kitten({ name: req.query.name });
   fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
  res.json({res: "cat added"});
});

app.get("/cats", (req, res, next) => {
 Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  res.json(kittens);
})
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