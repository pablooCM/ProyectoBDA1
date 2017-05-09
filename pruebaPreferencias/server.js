var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('preferencias', ['preferencias']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/preferencias', function(req, res){
  console.log("Recibí una solicitud GET");

  db.preferencias.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.listen(3000);
console.log("Servidor corriendo en el puerto 3000");
