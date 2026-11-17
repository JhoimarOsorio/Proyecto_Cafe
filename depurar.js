
// MiniReto 4: reproduce los dos errores reportados por la gerente con versiones "con bug".
// No es parte del motor: es evidencia para la bitacora.
const { ventas } = require("./datos");
const a = require("./analitica");
 
// ERROR 1: agrupar SIN normalizar -> "Bogotá" y "Bogotá " quedan en grupos distintos.
function totalPorCiudadConBug(lista) {
  const grupos = {};
  for (const v of lista) {
    grupos[v.ciudad] = (grupos[v.ciudad] || 0) + a.valorVenta(v);
  }
  return grupos;
}
const conEspacio = [...ventas, { id: 99, fecha: "2026-09-06", cliente: "C09", producto: "Molino manual", ciudad: "Bogotá ", cantidad: 1, precio: 120000 }];
console.log("Error 1 (con bug):   ", Object.keys(totalPorCiudadConBug(conEspacio)));
console.log("Error 1 (corregido): ", Object.keys(a.totalPorCiudad(conEspacio)));
 
// ERROR 2: ticket promedio dividiendo sin validar -> 0 / 0 = NaN.
function ticketConBug(lista) {
  let total = 0;
  for (const v of lista) total += a.valorVenta(v);
  return total / lista.length;
}
const sinVentas = ventas.filter((v) => v.fecha === "2026-09-07");
console.log("Error 2 (con bug):   ", ticketConBug(sinVentas));
console.log("Error 2 (corregido): ", a.ticketPromedio(sinVentas));
 
