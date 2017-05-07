var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('listaDeCursos', ['listaDeCursos']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/listaDeCursos', function(req, res){
  console.log("Recibí una solicitud GET");

  db.listaDeCursos.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/listaDeCursos', function (req, res){
  console.log(req.body);
  db.listaDeCursos.insert(req.body, function(err, doc){
    res.json(doc);
  })
});

app.delete('/listaDeCursos/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.listaDeCursos.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

app.get('/listaDeCursos/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.listaDeCursos.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

app.put('/listaDeCursos/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.codCurso);
  db.listaDeCursos.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update:{$set:{codCurso: req.body.codCurso, nombreCurso: req.body.nombreCurso, semestre: req.body.semestre, anno: req.body.anno}},
    new: true}, function(err, doc){
      res.json(doc);
    });
});

app.listen(3000);
console.log("Servidor corriendo en el puerto 3000");
