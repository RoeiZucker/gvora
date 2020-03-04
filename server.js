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


var storySchema = new mongoose.Schema({
	nameSurvivor : String,
	email : String,
	longitude : String,
	latitude : String,
	dateStory : String,
	story : String,
	headline : String
});



var Kitten = mongoose.model('Kitten', kittySchema);

var Story = mongoose.model('Story', storySchema);



//app.get("/url", (req, res, next) => {
// res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//});

app.get("/addStory", (req, res, next) => {
 //console.log(req.query)
 var addedStory = new Story(
	{ 
		nameSurvivor : req.query.nameSurvivor,
		email : req.query.email,
		longitude : req.query.longitude,
		latitude : req.query.latitude,
		dateStory : req.query.dateStory,
		story : req.query.story,
		headline : req.query.headline
	}
	);
   addedStory.save(function (err, addedStory) {
    if (err) return console.error(err);
  });
  res.json({res: "story addedd"});
});


app.get("/stories", (req, res, next) => {
 Story.find(function (err, stories) {
  if (err) return console.error(err);
  res.json(stories);
})
});

app.get("/latest", (req, res, next) => {
 Story.find().sort({_id: -1}).limit(10).then(stories => {
    res.json(stories);
  });

});


app.get("/story", (req, res, next) => {
 Story.find({'tital':{$regex:'.*' + req.query.tital + '.*'}},function (err, stor) {
  if (err) return console.error(err);
  res.json(stor);
})
});

app.get("/deletestory", (req, res, next) => {
 Story.find({'_id':req.query.id},function (err, stor) {
  if (err) return console.error(err);
    if (stor.length > 0){
		if(stor[0].id == req.query.id){stor[0].remove() }
  }
  res.json(stor);
})
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

app.get("/cat", (req, res, next) => {
 Kitten.find({'name':{$regex:'.*' + req.query.name + '.*'}},function (err, kittens) {
  if (err) return console.error(err);
  res.json(kittens);
  //MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })

})
});



db.once('open', function() {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
});