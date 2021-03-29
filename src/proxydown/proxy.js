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

// Reaccion en frontend
frontend.on("message", (fuente, _, message) => {
	console.log("Proxydown.message " + message);
	let msg = JSON.parse(message.toString());
	backend.send([msg.dest, "", JSON.stringify(msg)]);
});

// Reaccion en backend
backend.on("message", (fuente, _, message) => {
	// Comprobar si es mensaje de presentacion
	if (ids[fuente] == undefined) {
		console.log("Proxydown new handler " + fuente);
		ids[fuente] = {};
	} else {
		console.log("Proxydown.backend " + message);
		let msg = JSON.parse(message.toString());
		frontend.send([msg.dest, "", JSON.stringify(msg)]);	
	}
});

// El proceso se interrumpe
process.on("SIGINT", () => {
	frontend.close();
	backend.close();
	process.exit(-1);
});