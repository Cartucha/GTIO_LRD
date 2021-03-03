"use strict"

// Importar la interfaz
const CLT = require("./client");

let flag = true;

if (process.argv.length != 4) {
	console.log("Uso: " + process.argv[1] + " <identidad> <IP:puerto>");
	process.exit(-1);
}

let id = process.argv[2];
let host = process.argv[3];

// Construir un objeto CLT (cliente interfaz)
let clt = new CLT(id);
clt.connect(host);

// Reaccionar a un evento de respuesta
clt.on("ResCommand", (op, res) => {
	console.log("Respuesta: " + res);
});

// Reaccionar a un evento de cancelacion de operacion
clt.on("abort Command", () => {
	console.log("Operacion abortada");
});

// Enviar peticiones de operacion cada cierto intervalo de tiempo
setInterval(() => {
	if (!flag) {
		let op = {
			type: (Math.random() < 0.1) ? "PUT" : "GET",
			args: {
				key: Math.floor(Math.random() * 5),
				value: Math.floor(Math.random() * 10)
			}
		}
		op.args.value = (op.type == "GET") ? null : op.args.value;
		clt.reqCommand(op);
	} else {
		flag = false;
	}
}, 1000);