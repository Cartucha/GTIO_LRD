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

app.listen(80, () => {
 console.log("Server running on port 80");
});

app.get('/', function(req, res) { res.send({
		codigo: 200,
		mensaje: 'Punto de inicio'
	});
});

app.get("/key", (req, res, next) => {
	// Construir un objeto CLT (cliente interfaz)
	/*let clt = new CLT(id);
	clt.connect(host);
	let op = {
		type: "GET", // "PUT"
		args: {
			key: 'key',
			value: 'value'
		}
	}
	op.args.value = (op.type == "GET") ? null : op.args.value;
	clt.reqCommand(op);
	clt.on("ResCommand", (op, res) => {
		console.log("Respuesta: " + res);
	});
	*/
	res.json(['key', req.params.id, 'value', 'pendiente']);
});

app.post("/key", (req, res, next) => {
	if(!req.body.nombre || !req.body.apellido) {
		res.send({ codigo: 502, mensaje: 'El campo nombre y apellido son requeridos' });
	} else {
		 var toCreateUpdate = { key: req.body.key, value: req.body.value };
		 respuesta = {
		  codigo: 200,
		  mensaje: 'Clave actualizada ' + toCreateUpdate.key,
		  respuesta: req.body.value
		 };
	}
})	
