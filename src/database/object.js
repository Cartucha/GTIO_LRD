"use strict"

// Librerias
const zmq = require("zmq");
const level = require("level");

if (process.argv.length != 5) {
	console.log("Uso: " + process.argv[1] + " <identidad> <IP:puerto> <DB path>");
	process.exit(-1);
}

let id = process.argv[2];
let host = process.argv[3];
let db_path = process.argv[4];
let toexecute = []; // pares (manejador, comando) por ejecutar
let executed = []; // pares (comando,respuesta) ya ejecutados
let expectseq = 0; // primera posicion nula de 'toexecute'

let db = level("./" + db_path);

let socket = zmq.socket("dealer");
socket.identity = id;

socket.connect("tcp://" + host);

const execute = async (type, args) => {
	if (type == "PUT") {
		db.put(args.key, args.value);
		return "OK";
	} else {
		let res;
		let promiss = db.get(args.key);
		await promiss.then((value) => {
			res = value;
		});
		return res;
	}
};

socket.on("message", async (_, message) => { // llega un mensaje
	let msg = JSON.parse(message.toString());

	if (msg.dest == id && msg.type == "TOREQUEST") {
		if (expectseq == msg.seq) { // peticion esperada
			toexecute[msg.seq] = {
				source: msg.source,
				cmd: msg.cmd
			};

			while (toexecute[expectseq] != undefined) {
				let pair = toexecute[expectseq];
				let res = await execute(pair.cmd.op.type, pair.cmd.op.args);
				executed[expectseq] = {
					cmd: pair.cmd,
					res: res
				}
				console.log(res);
				let pkg = {
					source: id,
					dest: pair.source,
					type: "TOREPLY",
					seq: expectseq,
					res: res
				};
				socket.send(["", JSON.stringify(pkg)]);

				expectseq++;
			}
		} else if (expectseq < msg.seq) { // peticion posterior
			toexecute[msg.seq] = {
				source: msg.source,
				cmd: msg.cmd
			};
		} else { // peticion anterior -> // if (expectseq > msg.seq)
			let pair = executed[msg.seq];
			let pkg = {
				source: id,
				dest: msg.source,
				type: "TOREPLY",
				seq: msg.seq,
				res: pair.res
			};
			socket.send(["", JSON.stringify(pkg)]);
		}
	}
});