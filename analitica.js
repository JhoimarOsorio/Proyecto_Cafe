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

// ============================================================
// MiniReto 3: versiones con métodos de arreglo y agrupaciones
// ============================================================

// reduce con valor inicial 0 (¿qué acumulo?)
const totalVendidoM = (ventas) =>
  ventas.reduce((acc, venta) => acc + valorVenta(venta), 0);

const unidadesVendidasM = (ventas) =>
  ventas.reduce((acc, venta) => acc + venta.cantidad, 0);

// filter + map + reduce (¿qué filtro? ¿qué transformo? ¿qué acumulo?)
const ventasPorCiudadM = (ventas, ciudad) =>
  ventas
    .filter((venta) => normalizar(venta.ciudad) === normalizar(ciudad))
    .map(valorVenta)
    .reduce((acc, valor) => acc + valor, 0);

// Primera letra en mayúscula, para mostrar "medellín " como "Medellín".
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Objeto-diccionario { ciudad: total }. La clave se normaliza para no duplicar grupos.
function totalPorCiudad(ventas) {
  return ventas.reduce((grupos, venta) => {
    const clave = capitalizar(normalizar(venta.ciudad));
    grupos[clave] = (grupos[clave] || 0) + valorVenta(venta);
    return grupos;
  }, {});
}

// Objeto-diccionario { producto: unidades }.
function unidadesPorProducto(ventas) {
  return ventas.reduce((grupos, venta) => {
    const clave = venta.producto.trim();
    grupos[clave] = (grupos[clave] || 0) + venta.cantidad;
    return grupos;
  }, {});
}

// Los k productos que más dinero generaron, de mayor a menor.
// Object.entries crea un arreglo NUEVO, así que sort() no toca `ventas`.
// Se copia con [...] para dejar explícito que no se muta nada.
function topProductosPorValor(ventas, k) {
  const totales = ventas.reduce((grupos, venta) => {
    const clave = venta.producto.trim();
    grupos[clave] = (grupos[clave] || 0) + valorVenta(venta);
    return grupos;
  }, {});

  const ranking = Object.entries(totales).map(([producto, total]) => ({ producto, total }));
  return [...ranking].sort((a, b) => b.total - a.total).slice(0, k);
}

// ============================================================
// MiniReto 4: resumen de un día
// ============================================================

// Resumen de un día. Si no hubo ventas devuelve ceros (no un error ni NaN).
function ventasDelDia(ventas, fecha) {
  const delDia = ventas.filter((venta) => venta.fecha === fecha);
  return {
    fecha,
    numeroVentas: delDia.length,
    total: totalVendido(delDia),
    unidades: unidadesVendidas(delDia),
    ticketPromedio: ticketPromedio(delDia),
  };
}
 
module.exports = {
  valorVenta,
  normalizar,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
};
 
