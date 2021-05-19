"use strict"

var express = require("express");
const bodyParser = require('body-parser');

const CLT = require("./client"); // Importar la interfaz
if (process.argv.length != 5) {
	console.log("Uso: " + process.argv[1] + "<bindingPort> <identidad> <IP:puerto>");
	process.exit(-1);
}

let bindingPort = process.argv[2]/1;
let appId = process.argv[3];
let host = process.argv[4];

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let clt = null;

app.listen(bindingPort, '0.0.0.0', () => {
	clt = new CLT(appId);
	console.log(" Connecting  to " + host);
	clt.connect(host);
	console.log("api rest server running on port " + bindingPort);
});

var isDemo = false;
var data = {key: "value"};

app.get('/', function(req, res) { res.send({ codigo: 200, mensaje: 'Punto de inicio' }); });

app.get("/item/:id", (req, res, next) => {
	if((!req.params.id && !req.body.id)) { res.send({ codigo: 502, mensaje: 'Falta id en url o como campo'} );} 
	else {
		var id = req.params.id || req.body.id;
		if (isDemo) {
			res.json({ key: id, value: data[id+'']+'' });
		}
		else {
			clt.reqCommand({ type: "GET", args: { key: id } });
			console.log(" GET send message query item with key " + id);
			clt.on("ResCommand", (op, replicatorResponse) => {
				console.log("  GET response: " + replicatorResponse);
				res.json({ key: id, value: replicatorResponse });
			});
		}
	}
});

app.post("/item/:id", (req, res, next) => {
	if((!req.params.id && !req.body.id)) { res.send({ codigo: 502, mensaje: 'Falta id en url o como campo' });} 
	else {
		var id = req.params.id || req.body.id;
		var value = req.body.value; 
		if (isDemo) {
			data[id+""] = value;
			res.json({
				mensaje: 'Clave actualizada ' + id,
				value: value + ''
			});
		}
		else{
			clt.reqCommand({ type: "PUT", args: { key: id, value: value} });
			clt.on("ResCommand", (op, replicatorResponse) => {
				console.log("Respuesta: " + replicatorResponse);
				res.json({
					mensaje: 'Clave actualizada ' + id,
					value: value
				});
			});
		}
	}
})	
