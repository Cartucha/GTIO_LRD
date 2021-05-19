"use strict"
// Librerias
const zmq = require("zmq");

// Creacion del socket
let socket = zmq.socket("router");
socket.identity = "sequencer";

if (process.argv.length != 3) {
	console.log("Uso: " + process.argv[1] + " <IP:puerto>");
	process.exit(-1);
}
let host = process.argv[2];

socket.bind("tcp://"+ host);

let ids = ["h1"]; // ["h1", "h2", "h3"];
let i = 0;

socket.on("message", (fuente, _, message) => {
	console.log(fuente + " recived message " + message)
	if (ids[fuente] == undefined) {
		ids[fuente] = {};
		console.log(" New handler: " + fuente);
	} else {
		let msg = {
			s: fuente.toString(),
			n: i++,
			m: JSON.parse(message.toString())
		}
		// Reenviar a todos
		for (let id in ids) {
			socket.send([id, "", JSON.stringify(msg)]);
		}
	}
});

// El proceso se interrumpe
process.on("SIGINT", () => {
	socket.close();
	process.exit(-1);
});