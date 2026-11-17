// ============================================================
// MiniReto 2: indicadores con ciclos (sin map/filter/reduce)
// ============================================================
 
// Valor de una venta = cantidad × precio.
function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}
 
// Normaliza texto para comparar: quita espacios sobrantes y pasa a minúsculas.
function normalizar(texto) {
  return texto.trim().toLowerCase();
}
 
// Patrón ACUMULADOR: arranca en 0 y suma el valor de cada venta.
function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    total += valorVenta(venta);
  }
  return total; // arreglo vacío -> 0
}
 
// Patrón ACUMULADOR sobre las unidades.
function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    unidades += venta.cantidad;
  }
  return unidades; // arreglo vacío -> 0
}
 
// Patrón MÁXIMO: guarda el registro completo con el mayor valor.
function ventaMayor(ventas) {
  let mayor = null; // arreglo vacío -> null (no existe una venta mayor)
  for (const venta of ventas) {
    if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
      mayor = venta;
    }
  }
  return mayor;
}
 
// Ticket promedio = total / cantidad de ventas VÁLIDAS (cantidad > 0).
// Patrones CONTADOR + ACUMULADOR. Sin ventas válidas -> 0 (evita 0/0 = NaN).
function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      validas++;
    }
  }
  if (validas === 0) {
    return 0;
  }
  return total / validas;
}
 
// Total vendido en una ciudad, ignorando mayúsculas y espacios sobrantes.
function ventasPorCiudad(ventas, ciudad) {
  const buscada = normalizar(ciudad);
  let total = 0;
  for (const venta of ventas) {
    if (normalizar(venta.ciudad) === buscada) {
      total += valorVenta(venta);
    }
  }
  return total; // ciudad inexistente o arreglo vacío -> 0
}
 
module.exports = {
  valorVenta,
  normalizar,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
};
 
