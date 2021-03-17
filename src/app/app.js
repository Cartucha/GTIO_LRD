"use strict"

var express = require("express");
const bodyParser = require('body-parser');

const CLT = require("./client"); // Importar la interfaz
if (process.argv.length != 4) {
	console.log("Uso: " + process.argv[1] + " <identidad> <IP:puerto>");
	process.exit(-1);
}

let id = process.argv[2];
let host = process.argv[3];

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
 console.log("Server running on port 8080");
});

app.get('/', function(req, res) { res.send({ codigo: 200, mensaje: 'Punto de inicio' }); });
app.get("/item/:id", (req, res, next) => {
	if((!req.params.id && !req.body.id)) { res.send({ codigo: 502, mensaje: 'Falta id en url o como campo'} );} 
	else {
		var id = req.params.id || req.body.id;
		clt.connect(host);
	    clt.reqCommand({ type: "GET", args: { key: id } });
		clt.on("ResCommand", (op, res) => {
			console.log("Respuesta: " + res);
			res.json({ key: id, value: res });
		});
	}
});

app.post("/item/:id", (req, res, next) => {
	if((!req.params.id && !req.body.id)) { res.send({ codigo: 502, mensaje: 'Falta id en url o como campo' });} 
	else {
		var id = req.params.id || req.body.id;
		var value = req.body.value; 
		clt.connect(host);
	    clt.reqCommand({ type: "PUT", args: { key: id, value: value} });
		clt.on("ResCommand", (op, res) => {
			console.log("Respuesta: " + res);
			res.json({
				mensaje: 'Clave actualizada ' + key,
				value: value
			});
		});
	}
})	
