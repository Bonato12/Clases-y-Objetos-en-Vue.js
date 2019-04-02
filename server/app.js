var express = require('express');
var app = express();

var telefonos = [{
 nombre: "iphone",
 precio: "700"
}, {
 nombre: "android",
 precio: "500"
}];


app.get('/telefonos', function(req, res) {
    res.json(telefonos);
});


app.listen(3000, function() {
  console.log('Aplicación escuchando el puerto 3000!');
});
