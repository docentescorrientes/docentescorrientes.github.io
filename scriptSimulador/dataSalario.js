class Aumentos {
  constructor() {
    this.datos = {};
  }

  agregarAumento(codigo, anio, mes, cantidad, tipo) {
    const clave = `${codigo}-${anio}-${mes}-${tipo}`;
    this.datos[clave] = (this.datos[clave] || 0) + cantidad;
  }

  obtenerTotalPorCodigoHasta(codigo, anio, mes, tipo) {
    return Object.keys(this.datos)
      .filter(clave => {
        const [cod, a, m, t] = clave.split("-").map((v, i) => (i > 0 && i < 3 ? parseInt(v) : v));
        return cod === codigo && t === tipo && (a < anio || (a === anio && m <= mes));
      })
      .reduce((total, clave) => total + this.datos[clave], 0);
  }

  obtenerTotalPorCodigoAnteriorA(codigo, anio, mes, tipo) {
    return Object.keys(this.datos)
      .filter(clave => {
        const [cod, a, m, t] = clave.split("-").map((v, i) => (i > 0 && i < 3 ? parseInt(v) : v));
        return cod === codigo && t === tipo && (a < anio || (a === anio && m < mes));
      })
      .reduce((total, clave) => total + this.datos[clave], 0);
  }
};


// Agregar abajo de cada código el incremento (código, año, mes, incremento, b) (orden), ejemplo aumentos.agregarAumento("1 Básico", 2025, 3, 15800, "b");:
const aumentos = new Aumentos();
aumentos.agregarAumento("1 Básico", 2024, 8, 142536.75, "b");
aumentos.agregarAumento("1 Básico", 2024, 10, 15000, "b");
aumentos.agregarAumento("1 Básico", 2025, 3, 20500, "b");

// Grises: (Neto * 4/3)
aumentos.agregarAumento("193 Adicional Remunerativo Docente C/A (solo un cargo)", 2023, 4, 23500 * 4 / 3, "g"); // Tope: hasta un cargo
//aumentos.agregarAumento("193 Adicional Remunerativo Docente C/A (solo un cargo)", 2023, 5, 10000 * 4 / 3, "g");

aumentos.agregarAumento("603 Plus Unificado Remunerativo (solo un cargo)", 2024, 7, 47000 * 4 / 3, "g"); // Tope: hasta un cargo
aumentos.agregarAumento("603 Plus Unificado Remunerativo (solo un cargo)", 2024, 8, 8000 * 4 / 3, "g"); // Tope: hasta un cargo

aumentos.agregarAumento("625 Plus de Refuerzo Remunerativo (solo un cargo)", 2024, 7, 42000 * 4 / 3, "g"); // Tope: hasta un cargo
aumentos.agregarAumento("625 Plus de Refuerzo Remunerativo (solo un cargo)", 2024, 8, 8000 * 4 / 3, "g"); // Tope: hasta un cargo

aumentos.agregarAumento("629 Adicional Remunerativo 2° Cargo (solo en el 2° cargo)", 2023, 9, 10000 * 4 / 3, "g"); // ## Tope: hasta un cargo en el segundo

aumentos.agregarAumento("632 Complemento Docente Provincial (en 2 cargos)", 2024, 9, 48700 * 4 / 3, "g"); // ### Tope: hasta dos cargos.
aumentos.agregarAumento("632 Complemento Docente Provincial (en 2 cargos)", 2024, 10, 7825 * 4 / 3, "g"); // ### Tope: hasta dos cargos.
aumentos.agregarAumento("632 Complemento Docente Provincial (en 2 cargos)", 2025, 3, 30000 * 4 / 3, "g"); // ### Tope: hasta dos cargos.

// Negros: cod3SalFam (cod3xHijo, cod3xHijoDisc, cod3Esc, cod3EscDisc, Cod3AnualComplemVacac, cod3AyEsc), cod171CompDocPcial, cod622BonoNav3Tramos(dic100,ene200, feb200)
aumentos.agregarAumento("171 Compensador Docente Provincial (en 2 cargos)", 2024, 9, 251500, "n"); // ### Tope: hasta dos cargos
aumentos.agregarAumento("171 Compensador Docente Provincial (en 2 cargos)", 2024, 10, 35000, "n"); // ### Tope: hasta dos cargos
aumentos.agregarAumento("171 Compensador Docente Provincial (en 2 cargos)", 2025, 3, 30000, "n"); // ### Tope: hasta dos cargos

aumentos.agregarAumento("3 Asignación por hijo", 2024, 1, 22000, "n"); // Tope: hasta un cargo y 2 hijos
aumentos.agregarAumento("3 Asignación por hijo", 2024, 2, 8000, "n"); // Tope: hasta un cargo y 2 hijos

aumentos.agregarAumento("3 Asignación por hijo discapacitado", 2024, 1, 33000, "n"); // Tope: hasta un cargo y 2 hijos
aumentos.agregarAumento("3 Asignación por hijo discapacitado", 2024, 2, 12000, "n"); // Tope: hasta un cargo y 2 hijos

aumentos.agregarAumento("3 Asignación por escolaridad", 2011, 1, 60, "n"); // Tope: hasta un cargo y 2 hijos
aumentos.agregarAumento("3 Asignación por escolaridad de hijo discapacitado", 2011, 1, 120, "n"); // Tope: hasta un cargo y 2 hijos

aumentos.agregarAumento("3 Ayuda Escolar (marzo)", 2024, 1, 20000, "n"); // Tope: hasta un cargo y 2 hijos
aumentos.agregarAumento("3 Ayuda Escolar (marzo)", 2024, 2, 100000, "n"); // Tope: hasta un cargo y 2 hijos
aumentos.agregarAumento("3 Ayuda Escolar (marzo)", 2025, 3, 120000, "n"); // Tope: hasta un cargo y 2 hijos

// Descuentos: cod210SegVida -1709,03
aumentos.agregarAumento("210 Seguro de Vida (Life)", 2024, 10, -1553.67, "d"); // Tope: solo un cargo
aumentos.agregarAumento("210 Seguro de Vida (Life)", 2024, 11, -155.36, "d"); // Tope: solo un cargo


export function obtenerValores(year, month, tipo) {
  const anio = parseInt(year);
  const mes = parseInt(month);
  const claves = Object.keys(aumentos.datos);
  const codigosUnicos = new Set(claves.map(clave => clave.split("-")[0])); // Extrae solo los códigos únicos
  const valores = [];
  codigosUnicos.forEach(codigo => {
    const total = aumentos.obtenerTotalPorCodigoHasta(codigo, anio, mes, tipo);
    if (total !== 0) {
      valores.push({ name: codigo, valor: total })
    };
  });
  return valores;
};

function buscarAumentos(anio, mes, dia) {
  const aumentosArray = Object.keys(aumentos.datos);
  const ultimoAumentoPorCodigo = {};
  const exportados = {};

  // Encontrar el último aumento por código hasta el mes y año dados
  aumentosArray.forEach(clave => {
    const [codigo, a, m, tipo] = clave.split("-").map((v, i) => (i > 0 && i < 3 ? parseInt(v) : v.trim()));

    if (a <= anio || (a > anio)) {
      const claveActual = `${codigo}-${tipo}`;

      if (!ultimoAumentoPorCodigo[claveActual] ||
        a > ultimoAumentoPorCodigo[claveActual].anio ||
        (a === ultimoAumentoPorCodigo[claveActual].anio && m > ultimoAumentoPorCodigo[claveActual].mes)) {
        ultimoAumentoPorCodigo[claveActual] = { anio: a, mes: m, monto: aumentos.datos[clave], tipo };
      }
    }
  });

  let tablaHTML = `
    <table class="table table-striped table-bordered">
      <thead class="table-secondary">
        <tr>
          <th>Código</th>
          <th>Última Actualización (Mes/Año)</th>
          <th>Monto Último Aumento</th>
          <th>Total Actual</th>
          <th>% Actualización</th>
        </tr>
      </thead>
      <tbody>
  `;

  Object.keys(ultimoAumentoPorCodigo).forEach(clave => {
    const { anio, mes, monto, tipo } = ultimoAumentoPorCodigo[clave];
    const codigo = clave.split("-")[0];

    // Obtener el total acumulado hasta la fecha dada
    const totalAcumuladoHastaFecha = aumentos.obtenerTotalPorCodigoHasta(codigo, anio, mes, tipo);

    // Si el total acumulado es igual al último aumento, mostrar $0,00
    const montoMostrar = totalAcumuladoHastaFecha === monto ? 0 : monto;
    exportados[codigo] = { montoMostrar, totalAcumuladoHastaFecha };

    // Obtener el total acumulado ANTERIOR a la fecha del último aumento
    const totalAcumuladoAnterior = aumentos.obtenerTotalPorCodigoAnteriorA(codigo, anio, mes, tipo);

    // Calcular % de actualización (último aumento / total acumulado anterior)
    const porcentajeActualizacion = totalAcumuladoAnterior ? (monto / totalAcumuladoAnterior) * 100 : 0;

    // Determinar la clase de color según el tipo
    let rowClass = "";
    switch (tipo) {
      case "b": rowClass = "table-primary"; break;
      case "g": rowClass = "table-warning"; break;
      case "n": rowClass = "table-danger"; break;
      case "d": rowClass = "table-muted"; break;
    };

    tablaHTML += `
      <tr class="${rowClass}">
        <td>${codigo}</td>
        <td>${mes}/${anio}</td>
        <td id="aumentoReferencia">${formatNumero(montoMostrar, "$")}</td>
        <td id="montoReferencia">${formatNumero(totalAcumuladoHastaFecha, "$")}</td>  
        <td>${formatNumero(porcentajeActualizacion.toFixed(2))}%</td>
      </tr>
    `;
  });
  tablaHTML += `
  <tr><td colspan="5" style="height: 10px;"></td></tr> <!-- Fila en blanco -->
  <tr class="table-secondary">
    <td colspan="5" class="text-right small">*Resumen de aumentos a la fecha: ${dia}/${mes}/${anio}.
    En las categorías 7 (por horas cátedra) un cargo se consideran 15 horas cátedra para secundaria
    y 12 horas cátedra para superior.<br>El Cód.629 Adicional Remunerativo 2° Cargo se corresponde solo
    en el 2° cargo o 30 horas cátedras secundaria o 24 horas cátedras superior.</td>
  </tr>`;


  tablaHTML += `</tbody></table>`;
  const pruebaElement = document.getElementById("prueba");
  if (pruebaElement) {
    pruebaElement.innerHTML = tablaHTML;
  }

  return exportados;
};


// Llamar la función para generar la tabla
const fechaActual = new Date();
const anioActual = fechaActual.getFullYear();
const mesActual = fechaActual.getMonth() + 1;
const diaActual = fechaActual.getDate();

const exportados = buscarAumentos(anioActual, mesActual, diaActual);
export { exportados };

export function formatNumero(number, simbol = "") {
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number)
    .toFixed(2) // Asegura dos decimales
    .replace('.', ','); // Reemplaza punto por coma

  const formattedNumber = absoluteNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (isNegative ? `-${simbol}` : `${simbol}`) + formattedNumber;
};

export function obtenerNombreMes(numero) {
  let numeroMes = parseInt(numero); // Convertir a número si es un string
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const monthSelect = document.getElementById("month");
  const selectedOption = monthSelect.options[monthSelect.selectedIndex].text;

  if (numeroMes == 6 && selectedOption === "1° SAC Junio") {
    return "1° SAC Junio";
  } else if (numeroMes == 12 && selectedOption === "2° SAC Diciembre") {
    return "2° SAC Diciembre";
  } else {
    return meses[numeroMes - 1]; // Restamos 1 porque los arrays comienzan en 0
  };
};
