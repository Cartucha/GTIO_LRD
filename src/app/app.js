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
var isDemo = false;
var data = {key: "value"};

app.listen(bindingPort, '0.0.0.0', () => {
	clt = new CLT(appId);
	console.log("connecting... to " + host);
	clt.connect(host);
	console.log("api rest server running on port " + bindingPort);
});

app.get('/', function(req, res) { 
	res.send({ mensaje: 'Punto de inicio' });
 });

app.get("/item/:id", (req, res) => {
	new Promise((resolve, reject) => {
		if((!req.params.id && !req.body.id)) { reject('Falta id en url o como campo'); } 
		const id = +(req.params.id || req.body.id);
		if (isDemo) { resolve({ key: id, value: data[id+'']+'' });}

		clt.reqCommand({ type: "GET", args: { key: id } });
		clt.once("ResCommand", (op, replicatorResponse) => {
			console.log("GET " + id + "-->" + replicatorResponse);
			resolve({ key: id, value: replicatorResponse });
		});
	})
	.then(item => { res.json(item); })
	.catch(reason =>{ res.json({ key: null, value: reason}) });
});

app.post("/item/:id", (req, res, next) => {
	new Promise((resolve, reject) => {
		const id = req.params.id || req.body.id;
		if((!req.params.id && !req.body.id)) { reject('Falta id en url o como campo'); } 
		if (isDemo) { resolve({ mensaje: "clave actualizada:" + id, value: req.body.value+'' });}

		const data = req.body.value;
		clt.reqCommand({ type: "PUT", args: { key: id, value: data} });
		clt.once("ResCommand", (op, replicatorResponse) => {
			console.log("POST " + id + "=" + data + "-->" + replicatorResponse);
			resolve({ mensaje: "clave actualizada:" + id, value: data });
		});
	})
	.then(item => { res.json(item); })
	.catch(reason =>{ res.json({ mensaje:reason, value: null}) });
})	
