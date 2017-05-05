var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('estudiantes', ['estudiantes']);
var bodyParser = require('body-parser');

app.use(express.static( __dirname + "/public"));
app.use(bodyParser.json());

app.get('/estudiantes', function(req, res){
	console.log("I received a GET request")

	db.estudiantes.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

app.post('/estudiantes',function(req,res){
	console.log(req.body);
	db.estudiantes.insert(req.body, function (err, doc){
		res.json(doc);
	})
})

app.delete('/estudiantes/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.estudiantes.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
})

app.get('/estudiantes/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.estudiantes.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/estudiantes/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.estudiantes.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});

	});


app.listen(2000);
console.log("Server runing on port 2000");