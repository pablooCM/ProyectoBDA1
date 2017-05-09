// variable para utilizar express
var express = require('express');
// llama a express
var app = express();
// variable para usar mongojs
var mongojs = require('mongojs');
// variable para que mongojs busque la BD con la cual se necesita hacer la conexion
var db = mongojs('listaDeCursos', ['listaDeCursos']);
// el parse
var bodyParser = require('body-parser');


var cursoid = '';
// indica que express va ausar las cosas estáticas, el html es algo estático, entonces el servidor agarra cualquier html en la carpeta public
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// comprueba conexion con la BD listaDeCursos haciendo una solicitud GET
app.get('/listaDeCursos', function(req, res){
  console.log("Recibí una solicitud GET");
// esta línea carga los datos que tenga listaDeCursos usando un find de mongo
  db.listaDeCursos.find(function(err, docs){
    console.log(docs);
    // la respuesta que recibe es un json
    res.json(docs);
  })
});

//hace un post sobre la base de datos
app.post('/listaDeCursos', function (req, res){
  console.log(req.body);
  // aqui realiza el insert propio de mongo para meterle los datos que el usuario introdujo en el input del html
  db.listaDeCursos.insert(req.body, function(err, doc){
    res.json(doc);
  })
})

// hace un delete basado en el id del parámetro que el usuario metió en el input del html
app.delete('/listaDeCursos/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  // utiliza la bd de lista de cursos y le manda un remove para eliminar ese dato en la BD
  db.listaDeCursos.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  })
});

// Esta funcion jala los datos de mongo para cargarlos en el input del HTML
app.get('/listaDeCursos/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  // findOne busca el objeto especifico en la BD
  db.listaDeCursos.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

// el put realiza el update, pone los datos encima de lo que ya tenía
app.put('/listaDeCursos/:id', function(req, res){
  var id = req.params.id;
  console.log(req.body.codCurso);
  // aquí se usa findAndModify para encontrar el id y modificarlo con los parametros modificados
  db.listaDeCursos.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update:{$set:{codCurso: req.body.codCurso, nombreCurso: req.body.nombreCurso, semestre: req.body.semestre, anno: req.body.anno}},
    new: true}, function(err, doc){
      res.json(doc);
    });
});


app.put('/listaDeCursos/:_id/:pref', function(req, res,preferencia){
    var id = req.params.id;
    var pref = req.params.pref;
    db.listaDeCursos.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update:{$set:{preferencias:pref}},new: true}, function(err, doc){
      res.json(doc);
    });
});



// pone el app en el puerto 3000 del localhost
app.listen(3000);
console.log("Servidor corriendo en el puerto 3000");
