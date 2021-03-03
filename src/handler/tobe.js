"use strict"
// Librerias
const zmq = require("zmq");
const events = require("events");

class TOBE extends events.EventEmitter {
	constructor(clientID) {
		super();

		// Crear atributos
		this.socket = zmq.socket("dealer");
		this.socket.identity = clientID;

		// Otras variables necesarias
		this.queue = [];
		this.next = -1;

		// El proceso se interrumpe
		process.on("SIGINT", () => {
			this.socket.close();
			process.exit(-1);
		});
	}

	connect(host) {
		// Conectar
		this.socket.connect("tcp://" + host);

		// Presentacion del cliente
		this.socket.send("", "hi");

		// Reaccion ante la llegada
		this.socket.on("message", (_, message) => {
			// Generar evento "TODeliver"
			let msg = JSON.parse(message);

			// Reordenar mensajes antes de logearlos
			// No es necesario por estar usando tcp

			this.emit("TODeliver", msg.n, msg.m);

		});
	}

	TOBroadcast(message) {
		// Enviar mensaje al router
		this.socket.send(["", message]);
	}
}

module.exports = TOBE;