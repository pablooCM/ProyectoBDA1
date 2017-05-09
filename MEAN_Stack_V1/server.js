// Express
// Express
var express = require('express');
var app = express();
var router = express.Router();
// Mongo
var mongojs = require('mongojs');
var db = mongojs('mean_stack_v3', ['student','courseList']);
// JSON
var bodyParser = require('body-parser');
// Port
var port = 8080;

app.use(express.static( __dirname + "/modules"));
app.use(bodyParser.json());



/**********************
	Login Functions
**********************/
app.get('/', function(req, res){
	res.redirect('/');
});

app.get('/singup', function(req, res){
	res.render('/singup/index.html');
});

/************************
	Student Functions
************************/
app.get('/studentList', function(req, res){

	db.studentList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/studentList', function(req,res){
	db.studentList.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.get('/studentList/:email', function(req, res){
	var email = req.params.email;
	db.studentList.findOne({email: email}, function(err, doc){
		res.json(doc);
	});
});



/************************
	Courses Functions
************************/
app.get('/courseList', function(req, res){
	db.courseList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/courseList', function (req, res){
	db.courseList.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/courseList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.courseList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

app.get('/courseList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.courseList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/courseList/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.codCourse);
	db.courseList.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update:{$set:{codCourse: req.body.codCourse, courseName: req.body.courseName, semester: req.body.semester, year: req.body.year}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

app.listen(port);
console.log("Server running on port: " + port);
