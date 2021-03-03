"use strict"

let level = require('level');
if (process.argv.length != 3) {
	console.loge("Uso: " + process.argv[1] + " <db_name>");
}
let db_name = process.argv[2];
// Crear base de datos
let db = level('./' + db_name);

// Introducir valores
db.put("0", "5", function (err) {});
db.put("1", "7", function (err) {});
db.put("2", "1", function (err) {});
db.put("3", "6", function (err) {});
db.put("4", "9", function (err) {});
db.put("5", "8", function (err) {});