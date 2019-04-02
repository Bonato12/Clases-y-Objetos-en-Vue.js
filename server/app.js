var express = require('express');
var bodyParser = require('body-parser');
var app = express();


const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());

var peliculas = [{
 titulo: "Rambo",
 año: "1985"
}, {
 titulo: "Terminaitor",
 año: "1984"
}];


app.get('/peliculas', function(req, res) {
    res.json(peliculas);
    console.log(peliculas)
});

app.post('/peliculas', function(req, res){
  console.log(req.body);
  peliculas.push(req.body);
  res.json(req.body);
})


app.listen(3000, function() {
  console.log('Aplicación escuchando el puerto 3000!');
});
