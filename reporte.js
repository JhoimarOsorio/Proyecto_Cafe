// MiniReto 4: reporte de negocio por consola.
const { ventas } = require("./datos");
const a = require("./analitica");
 
const pesos = (n) => `$ ${Math.round(n).toLocaleString("es-CO")}`;
const linea = "=".repeat(48);
const ANCHO = 28;
 
function fila(etiqueta, valor) {
  return `${etiqueta.padEnd(ANCHO)}${String(valor).padStart(20)}`;
}
 
console.log(linea);
console.log("  CAFÉ ORIGEN · REPORTE DE VENTAS v0.1");
console.log(linea);
 
// 1. Resumen general
const mayor = a.ventaMayor(ventas);
console.log("\n1) RESUMEN GENERAL");
console.log(fila("Total vendido", pesos(a.totalVendido(ventas))));
console.log(fila("Unidades vendidas", a.unidadesVendidas(ventas)));
console.log(fila("Ticket promedio", pesos(a.ticketPromedio(ventas))));
console.log(fila("Venta mayor (id " + mayor.id + ")", pesos(a.valorVenta(mayor))));
 
// 2. Ventas por ciudad
console.log("\n2) VENTAS POR CIUDAD");
for (const [ciudad, total] of Object.entries(a.totalPorCiudad(ventas))) {
  console.log(fila(ciudad, pesos(total)));
}
 
// 3. Unidades por producto
console.log("\n3) UNIDADES POR PRODUCTO");
for (const [producto, unidades] of Object.entries(a.unidadesPorProducto(ventas))) {
  console.log(fila(producto, unidades));
}
 
// 4. Top 3 por valor
console.log("\n4) TOP 3 PRODUCTOS POR VALOR");
a.topProductosPorValor(ventas, 3).forEach((p, i) => {
  console.log(fila(`${i + 1}. ${p.producto}`, pesos(p.total)));
});
 
// Resumen de un día con ventas y de un día sin ventas
console.log("\nRESUMEN DE UN DÍA");
for (const fecha of ["2026-09-01", "2026-09-07"]) {
  const d = a.ventasDelDia(ventas, fecha);
  console.log(`\n${d.fecha}`);
  if (d.numeroVentas === 0) {
    console.log("  Sin ventas registradas este día.");
  }
  console.log(fila("  Número de ventas", d.numeroVentas));
  console.log(fila("  Total", pesos(d.total)));
  console.log(fila("  Unidades", d.unidades));
  console.log(fila("  Ticket promedio", pesos(d.ticketPromedio)));
}
console.log("\n" + linea);
 