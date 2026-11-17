
// MiniReto 1: explorar los datos antes de calcular nada.
const { ventas } = require("./datos");
 
console.log("Cantidad de registros:", ventas.length);
console.log("Primer registro:", ventas[0]);
console.log("Último registro:", ventas[ventas.length - 1]);
console.log("Producto del registro en la posición 4:", ventas[3].producto); // índice 3 = 4.ª posición
console.table(ventas);
 
