"use strict"

// Librerias
const zmq = require("zmq");
const events = require("events");

// Eleccion de numero aleatorio
function randInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

// Seleccionar elemento aleatorio de una lista
function select(list) {
	if (list.length <= 0) {
		return null;
	} else if (list.length == 1) {
		return list[0];
	}

	return list[randInt(0, list.length)];
}

class CLT extends events.EventEmitter {
	constructor(CLTid) {
		super();

		this.RHIDs = ["h1"]; // lista de posibles manejadores ["h1","h2", "h3"]
		this.id = CLTid;

		this.socket = zmq.socket("dealer");
		this.socket.identity = CLTid;

		this.opnum = 1; // numero de operacion 
		this.rhid = null; //manejador actual -->// Luego se selecciona
		this.op = null; // operacion actual
		this.running = false; // 'true' si hay operacion en curso
		this.delta = 1000; // valor para Timeout
		this.timeout = null;

		this.sum = 0;
		this.count = 0;
		this.time = 0;

		this.adaptative_delta = false;
	}

	connect(host) {
		this.socket.connect("tcp://" + host);
		console.log(" connected to host " + host);
		this.socket.on("message", (_, message) => {
			let msg = JSON.parse(message.toString());
			if (
				msg.source == this.rhid &&
				msg.cmd.CLTid == this.id &&
				msg.cmd.opnum == this.opnum
			) { // si se recibe respuesta a la operacion solicitada
				clearTimeout(this.timeout);
				this.running = false;
				this.opnum++;
				this.sum = Date.now() - this.time;
				this.count++;
				this.delta = Math.floor(this.sum / this.count * 2);
				if (!this.adaptative_delta) {
					this.delta = 10 * 1000;
				}
				this.emit("ResCommand", msg.op, msg.res); // evento de respuesta obtenida
			}
		});
	}

	reqCommand(op) {
		if (!this.running) { // si no hay operacion en curso
			this.running = true;
			this.op = op;
			this.rhid = select(this.RHIDs); // seleccionar manejador aleatorio
			let msg = {
				source: this.id,
				dest: this.rhid,
				type: "REQUEST",
				cmd: {
					CLTid: this.id,
					opnum: this.opnum,
					op: this.op
				}
			};
			let timeoutFunc = () => { // el timeout ha expirado
				if (this.RHIDs.length > 1) {
					this.rhid = select(this.RHIDs.filter((item) => {
						return (item != this.rhid);
					}));
				}
				msg.dest = this.rhid;
				if (this.adaptative_delta) {
					this.delta = this.delta * 2;
				}
				this.time = Date.now();
				this.socket.send(["", JSON.stringify(msg)]);
				this.timeout = setTimeout(timeoutFunc, this.delta);
			}
			this.time = Date.now();
			console.log("sending to " + this.host + " " + JSON.stringify(msg));
			this.socket.send(["", JSON.stringify(msg)]);
			this.timeout = setTimeout(timeoutFunc, this.delta);
		} else {
			console.log("Client is runing, can not accept new messages");
			this.emit("abort Command"); // evento de operacion cancelada
		}
	}
}

module.exports = CLT;