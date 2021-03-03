"use strict"

// Librerias
const zmq = require("zmq");
const TOBE = require("./tobe");

if (process.argv.length != 6) {
	console.log("Uso: " + process.argv[1] + " <identidad> <ipC:puertoC> <ipR:puertoR> <ipT:puertoT>");
	process.exit(-1);
}

let id = process.argv[2];
let hostC = process.argv[3];
let hostR = process.argv[4];
let hostT = process.argv[5];

let sequenced = []; // vector de comandos secuenciados
let localseq = 0; // primera position nula de 'sequenced'
let lastservedseq = -1; // ultimo numero de secuencia utilizado por el manejador
let mycommands = []; // comandos actualmente a cargo del manejador
let myreplies = []; // num. secuencia de comandos que espera el manejador
let ORIDs = ["r1", "r2", "r3"]; // TODO rellenar

let socketC = zmq.socket("dealer"); // socket para clientes
socketC.identity = id;

let socketR = zmq.socket("dealer"); // socket para replicas
socketR.identity = id;

// Funcion para enviar a todas las replicas
const transmitToReplicas = (seq, cmd, last) => {
	for (let j = last + 1; j < seq; j++) {
		let cmdj = sequenced[j];
		for (let orid of ORIDs) {
			let msg = {
				source: id,
				dest: orid,
				type: "TOREQUEST",
				seq: j,
				cmd: cmdj
			};
			socketR.send(["", JSON.stringify(msg)]);
		}
	}
	for (let orid of ORIDs) {
		let msg = {
			source: id,
			dest: orid,
			type: "TOREQUEST",
			seq: seq,
			cmd: cmd
		};
		socketR.send(["", JSON.stringify(msg)]);
	}
}

// Funcion auxiliar para encontrar comandos
const find = (cmd, list) => {
	let cmdid = cmd.CLTid + "_" + cmd.opnum;
	for (let i in list) {
		let itemcmdid = list[i].CLTid + "_" + list[i].opnum;
		if (itemcmdid == cmdid) {
			return i;
		}
	}

	return null;
}

let tobe = new TOBE(id); // construir objecto TOBE (interfaz)
tobe.connect(hostT);

// Reaccionar a evento TODeliver
tobe.on("TODeliver", (n, msg) => {
	//let m = JSON.parse(msg);
	// console.log(msg.cmd);
	// console.log(n);
	let seq = find(msg.cmd, sequenced);
	// console.log(seq);
	// console.log(localseq);
	if (seq == null) {
		// console.log(localseq);
		sequenced[localseq] = msg.cmd;
		seq = localseq;
		localseq++;
	}

	let cmdid = msg.cmd.CLTid + "_" + msg.cmd.opnum;
	if (mycommands[cmdid] != undefined) {
		transmitToReplicas(seq, msg.cmd, lastservedseq);
		delete mycommands[cmdid];
		myreplies.push(seq);
		lastservedseq = Math.max(lastservedseq, seq);
	}
});

socketC.connect("tcp://" + hostC);
socketC.send(["", "Mensaje de presentacion"]);
socketC.on("message", (_, message) => { // llega mensaje de un cliente
	let msg = JSON.parse(message.toString());
	if (msg.dest == id && msg.type == "REQUEST") {
		let seq = find(msg.cmd, sequenced);
		// console.log(seq);
		if (seq == null) {
			let cmdid = msg.cmd.CLTid + "_" + msg.cmd.opnum;
			let pkg = {
				source: id,
				cmd: msg.cmd
			};
			tobe.TOBroadcast(JSON.stringify(pkg));
			mycommands[cmdid] = msg.cmd;
		} else {
			console.log("Ya secuenciado");
			console.log(sequenced);
			transmitToReplicas(seq, msg.cmd, lastservedseq);
			myreplies.push(seq);
			lastservedseq = Math.max(lastservedseq, seq);
		}
	}
	
});

socketR.connect("tcp://" + hostR);
socketR.on("message", (_, message) => { // llega mensaje de una replica
	let msg = JSON.parse(message.toString());

	if (
		msg.dest == id &&
		msg.type == "TOREPLY" &&
		myreplies.includes(msg.seq)
	) {
		let cmd = sequenced[msg.seq];
		let pkg = {
			source: id,
			dest: cmd.CLTid,
			type: "REPLY",
			cmd: cmd,
			res: msg.res
		};
		socketC.send(["", JSON.stringify(pkg)]);
		delete myreplies[msg.seq];
	}
});