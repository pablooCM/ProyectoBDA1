// Express
var express = require('express');
var app = express();
// Mongo
var mongojs = require('mongojs');
var db = mongojs('mean_stack_v2', ['student','course']);
// JSON
var bodyParser = require('body-parser');
// Port
var port = 8080;


app.use(express.static( __dirname + "/modules"));
app.use(bodyParser.json());
/*
app.get('/student', function(req, res){
	console.log("I received a GET request for student")

	db.student.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/course', function(req, res){
	console.log("I received a GET request for course")

	db.course.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});
*/
app.post('/student', function(req,res){
	console.log(req.body);

	db.student.insert(req.body, function(err, doc){
		res.json(doc);
	});
});
/*
app.post('/course', function(req,res){
	console.log(req.body);

	db.student.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/student/:id', function(req,res){
	var id = req.params.id;
	console.log(id);

	db.student.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

app.delete('/course/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	
	db.course.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

app.get('/student/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	db.student.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/course/:id', function(req, res){
	var id = req.params.id;
	console.log(id);

	db.course.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});
*/
app.listen(port);
console.log("Server running on port: " + port);