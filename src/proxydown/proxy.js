"use strict"
// Librerias
const zmq = require("zmq");

if (process.argv.length != 4) {
	console.log("Uso: " + process.argv[1] + " <ipF:puertoF> <ipB:puertoB>");
	process.exit(-1);
}

let hostF = process.argv[2];
let hostB = process.argv[3];

let frontend = zmq.socket("router"); // socket para conexion con clientes
let backend = zmq.socket("router"); // socket para conexion con manejadores
frontend.identity = "frontend";
backend.identity = "backend";

// Conectar
frontend.bind("tcp://" + hostF);
backend.bind("tcp://" + hostB);

let ids = [];

frontend.on("message", (fuente, _, message) => {
	//console.log(message);
	let msg = JSON.parse(message.toString());
	backend.send([msg.dest, "", JSON.stringify(msg)]);
	
});

backend.on("message", (fuente, _, message) => {
	if (ids[fuente] == undefined) {
		console.log("new handler " + fuente);
		ids[fuente] = {};
	} else {
		console.log(message.toString());
		let msg = JSON.parse(message.toString());
		frontend.send([msg.dest, "", JSON.stringify(msg)]);	
	}
});

process.on("SIGINT", () => {
	frontend.close();
	backend.close();
	process.exit(-1);
});