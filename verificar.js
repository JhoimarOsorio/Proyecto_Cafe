// MiniReto 3: demuestra que cada método da EXACTAMENTE lo mismo que el ciclo que reemplaza.
const { ventas } = require("./datos");
const a = require("./analitica");
 
const copiaOriginal = JSON.stringify(ventas);
 
function comparar(nombre, resultadoCiclo, resultadoMetodo) {
  const ok = resultadoCiclo === resultadoMetodo;
  console.log(`${nombre.padEnd(34)} ciclo=${resultadoCiclo}  método=${resultadoMetodo}  ->  ${ok ? "OK" : "DIFERENTE"}`);
}
 
comparar("totalVendido",   a.totalVendido(ventas),   a.totalVendidoM(ventas));
comparar("unidadesVendidas", a.unidadesVendidas(ventas), a.unidadesVendidasM(ventas));
for (const ciudad of ["Medellín", "Bogotá", "Cali", "Pereira"]) {
  comparar(`ventasPorCiudad(${ciudad})`, a.ventasPorCiudad(ventas, ciudad), a.ventasPorCiudadM(ventas, ciudad));
}
 
// Con arreglo vacío ambos deben coincidir también.
comparar("totalVendido([])", a.totalVendido([]), a.totalVendidoM([]));
 
// Comprobaciones extra del reto
const ciudades = Object.keys(a.totalPorCiudad(ventas));
console.log("\nCiudades agrupadas:", ciudades, ciudades.length === 4 ? "-> OK (4 grupos)" : "-> DIFERENTE");
console.log("Top 3 por valor:", a.topProductosPorValor(ventas, 3));
console.log("Ventas conserva su orden:", JSON.stringify(ventas) === copiaOriginal ? "OK" : "DIFERENTE");
 
