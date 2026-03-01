import { capturarDatos } from "./capturaData.js";
import { obtenerValores, formatNumero, obtenerNombreMes } from "./dataSalario.js";

// Constantes para descuentos
const apJub = 0.2;
const obSocial = 0.05;
const DESCUENTO = apJub + obSocial;
let valor603 = 0;
let valor625 = 0;
// Función para capturar datos del formulario y calcular el salario
document.getElementById("dataForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let datosFormulario = capturarDatos(event);
    const year = datosFormulario.year;
    const month = datosFormulario.month;
    const seniority = datosFormulario.seniority;

    const selectedTextMonth = document.getElementById("month").options[document.getElementById("month").selectedIndex].text;

    // Función para calcular la diferencia en días entre dos fechas
    function calcularDias(fechaInicio, fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const diferencia = fin - inicio; // Diferencia en milisegundos
        return Math.ceil(1 + diferencia / (1000 * 60 * 60 * 24)); // Convertir a días
    };

    function obtenerDiasDelMes(anio, mes) {
        const fecha = new Date(anio, mes, 0); // El día 0 del mes siguiente es el último día del mes actual
        return fecha.getDate(); // Devuelve el número de días del mes
    }

    // Iterar sobre el array de cargos y crear un nuevo array con la diferencia de días
    const cargosRange = datosFormulario.cargos;
    const diasArray = cargosRange.map(cargo => {
        if (cargo.tipoContrato === "permanente") {
            return 1; // Si es permanente, devolver 1
        } else if (cargo.tipoContrato === "temporario" && cargo.fechaInicio && cargo.fechaFin) {
            return calcularDias(cargo.fechaInicio, cargo.fechaFin) / obtenerDiasDelMes(year, month); // Calcular días si es temporario
        } else {
            return 0; // Si no hay fechas válidas, devolver 0
        }
    });

    // Arreglos para ítems Blancos
    const arrayCodigoB = ["1", "36", "37", "62", "624", "📌"];
    const arrayNameB = [
        "Básico",
        "Ubicación Geográfica",
        "Antigüedad",
        "Ay. Material Didáctico",
        "Jornada Extendida",
        "∑ Total Ítems en Blanco"
    ];
    let arrayValorB = new Array(arrayCodigoB.length).fill(0);

    const anio193 = parseInt(year);
    const mes193 = parseInt(month);
    console.log("Año 193:", anio193, "Mes 193:", mes193);
    // Arreglos para ítems Grises
    let text193 = "Adicional Remunerativo Docente C/A (en solo un cargo)";
    if (anio193 > 2025 || (anio193 === 2025 && mes193 >= 3)) {
        text193 = "Adicional Remunerativo Docente C/A (en dos cargos)"
    };

    const arrayCodigoG = ["193", "603", "625", "629", "632", "📌"];
    const arrayNameG = [
        text193,
        "Plus Unificado Remunerativo (en solo un cargo)",
        "Plus de Refuerzo Remunerativo (en solo un cargo)",
        "Adicional Remunerativo 2° Cargo (en solo el 2° cargo)",
        "Complemento Docente Provincial (en dos cargos)",
        "∑ Total Ítems Grises"
    ];
    let arrayValorG = new Array(arrayCodigoG.length).fill(0);

    // Arreglos para ítems Negros
    const arrayCodigoN = ["171", "3", "📌"];
    const arrayNameN = [
        "Compensador Docente Provincial (en dos cargos)",
        "Salario Familiar",
        "∑ Total Ítems en Negro"
    ];
    let arrayValorN = new Array(arrayCodigoN.length).fill(0);

    // Arreglo auxiliar para algunos cálculos (usado en calcularNegros)
    let arrayValor = new Array(6).fill(0);
    const cantidadClases = datosFormulario.cargos.length;

    for (let i = 0; i < cantidadClases; i++) {
        const clase = datosFormulario.cargos[i].claseInfo.clase;
        const indiceClase = datosFormulario.cargos[i].claseInfo.indiceClase;
        const categoria = datosFormulario.cargos[i].claseInfo.categoria;
        const dias = diasArray[i];

        let factor7 = datosFormulario.cargos[i].horasCatedra;
        let cociente7 = 1;
        if (categoria == 5 && factor7 == null) {
            factor7 = 1;
        } else {
            if (clase === 191) {
                cociente7 = factor7 / 12;
            } else if (clase === 192) {
                cociente7 = factor7 / 15;
            }
        }
        const ubicacionGeografica = datosFormulario.cargos[i].ubicacionGeografica;
        const jornada = datosFormulario.cargos[i].jornada;

        // --- Cálculo de ítems Blancos ---
        const resultadoBlancos = calcularBlancos(year, month, seniority, indiceClase * factor7, ubicacionGeografica, jornada);
        for (let j = 0; j < resultadoBlancos.length; j++) {
            arrayValorB[j] += resultadoBlancos[j];
        }

        // --- Cálculo de ítems Grises ---
        const itemsGrises = obtenerValores(year, month, "g");

        let nCargo193 = 1;
        let nCargo629 = 2;
        if (anio193 > 2025 || (anio193 === 2025 && mes193 >= 3)) {
            nCargo193 = 2;
            nCargo629 = 0;
        };

        const topesG = [
            nCargo193 * itemsGrises[0].valor, //193 Ad. Rem. Doc C/A (1 cargo hasta 02/2025)
            1 * itemsGrises[1].valor, //603 Plus Unif
            1 * itemsGrises[2].valor, //625 Plus Ref
            nCargo629 * itemsGrises[3].valor, //629 Ad Rem 2° Cargo (en el 2 cargo hasta 02/2025)
            2 * itemsGrises[4].valor  //632 Compl Doc Pcial (en 2 cargos)
        ];

        const resultadogrises = calcularGrises(year, month, cociente7);
        for (let k = 0; k < resultadogrises.length; k++) {
            if (arrayValorG[k] + resultadogrises[k] > topesG[k]) {
                arrayValorG[k] = topesG[k];
            } else {
                arrayValorG[k] += resultadogrises[k];
            }
        };

        // --- Cálculo de ítems Negros ---
        let mes = month;
        let anualComplem = 1;
        if (mes == 1) {
            anualComplem = 2;
        };

        const cantHijo = datosFormulario.children;
        const cantHijoDisc = datosFormulario.disabledChildren;
        const cantEsc = datosFormulario.schoolChildren;
        const cantEscDisc = datosFormulario.schoolDisabledChildren;
        const itemsNegros = obtenerValores(year, month, "n");
        const topesN = [
            2 * itemsNegros[0].valor,
            anualComplem * cantHijo * itemsNegros[1].valor,
            anualComplem * cantHijoDisc * itemsNegros[2].valor,
            anualComplem * cantEsc * itemsNegros[3].valor,
            anualComplem * cantEscDisc * itemsNegros[4].valor,
            cantEsc * itemsNegros[5].valor
        ];
        const resultadoNegros = calcularNegros(year, month, cociente7, cantHijo, cantHijoDisc, cantEsc, cantEscDisc);
        for (let l = 0; l < resultadoNegros.length; l++) {
            if (arrayValor[l] + resultadoNegros[l] > topesN[l]) {
                arrayValor[l] = topesN[l];
            } else {
                arrayValor[l] += resultadoNegros[l];
            }
        }
    }

    // Ajuste adicional para ítems Grises
    const itemsGrises = obtenerValores(year, month, "g");
    if (anio193 < 2025 || (anio193 === 2025 && mes193 < 3)) {
        if (arrayValorG[3] < itemsGrises[3].valor) {
            arrayValorG[3] = 0; // menos de 1 cargo
        } else if (arrayValorG[3] >= itemsGrises[3].valor && arrayValorG[3] < 2 * itemsGrises[3].valor) {
            arrayValorG[3] -= itemsGrises[3].valor;
        } else if (arrayValorG[3] >= 2 * itemsGrises[3].valor) {
            arrayValorG[3] = itemsGrises[3].valor;
        }
    }

    let sumaTotalG = 0;
    arrayValorG.forEach(valor => {
        sumaTotalG += valor;
    });
    arrayValorG[5] = sumaTotalG;

    arrayValorN = [arrayValor[0]];
    let sumaTotalN = 0;
    for (let i = 1; i < arrayValor.length; i++) {
        sumaTotalN += arrayValor[i];
    }
    arrayValorN.push(sumaTotalN);
    arrayValorN.push(arrayValorN[0] + arrayValorN[1]);

    valor603 = arrayValorG[1]; // Plus Unificado Remunerativo (Código 603)
    valor625 = arrayValorG[2]; // Plus de Refuerzo Remunerativo (Código 625)

    // --- Ajustes especiales para SAC Junio y SAC Diciembre ---
    if (selectedTextMonth === "1° SAC Junio" || selectedTextMonth === "2° SAC Diciembre") {
        arrayValorB = arrayValorB.map(valor => valor / 2); // Blancos a la mitad
        arrayValorG = arrayValorG.map(valor => valor / 2); // Grises a la mitad
        arrayValorN = arrayValorN.map(() => 0);             // Negros en cero

        // También reiniciar el auxiliar arrayValor (por seguridad)
        arrayValor = arrayValor.map(() => 0);
    };

    // --- Generar la tabla con los arreglos de Blancos, Grises y Negros ---
    generarTabla(year, month, datosFormulario,
        [...arrayCodigoB, ...arrayCodigoG, ...arrayCodigoN],
        [...arrayNameB, ...arrayNameG, ...arrayNameN],
        [...arrayValorB, ...arrayValorG, ...arrayValorN],
        [
            ...Array(arrayCodigoB.length).fill("primary"),
            ...Array(arrayCodigoG.length).fill("warning"),
            ...Array(arrayCodigoN.length).fill("danger")
        ]
    );
});

// Función para calcular valores Blancos
function calcularBlancos(year, month, seniority, indiceClase, ubicacionGeografica, jornada, ayMatDidac = 0.1) {
    const basicoRef = obtenerValores(year, month, "b")[0].valor;
    const cod1BasicoBruto = basicoRef * indiceClase;
    const cod36UbGeoBruto = cod1BasicoBruto * ubicacionGeografica;
    const cod37AntigBruto = cod1BasicoBruto * seniority;
    const cod62AyMatBruto = cod1BasicoBruto * ayMatDidac;
    const cod624JornBruto = (cod1BasicoBruto + cod36UbGeoBruto + cod37AntigBruto + cod62AyMatBruto) * jornada;
    const itemsBlancBruto = (cod1BasicoBruto + cod36UbGeoBruto + cod37AntigBruto + cod62AyMatBruto + cod624JornBruto);
    const arrayValor = [cod1BasicoBruto, cod36UbGeoBruto, cod37AntigBruto, cod62AyMatBruto, cod624JornBruto, itemsBlancBruto];
    return arrayValor;
}

// Función para calcular valores Grises
function calcularGrises(year, month, cociente7) {
    const itemsGrises = obtenerValores(year, month, "g");
    const arrayValor = [];
    itemsGrises.forEach(function (item) {
        arrayValor.push(item.valor * cociente7);
    });
    return arrayValor;
}

// Función para calcular valores Negros
function calcularNegros(year, month, cociente7, cantHijo, cantHijoDisc, cantEsc, cantEscDisc) {
    const itemsNegros = obtenerValores(year, month, "n");
    const arrayValor = [];
    arrayValor.push(itemsNegros[0].valor * cociente7);
    let ayEscolMarzo = 0;
    if (month == 3) {
        ayEscolMarzo = itemsNegros[5].valor;
    };
    let anualComplemVaca = 1;
    if (month == 1) {
        anualComplemVaca = 2;
    }
    arrayValor.push((itemsNegros[1].valor * (cantHijo - cantHijoDisc)) * 2);
    arrayValor.push((itemsNegros[2].valor * cantHijoDisc) * 2);
    arrayValor.push((itemsNegros[3].valor * (cantEsc - cantEscDisc)) * 2);
    arrayValor.push((itemsNegros[4].valor * cantEscDisc) * 2);
    arrayValor.push(ayEscolMarzo * cantEsc);
    return arrayValor;
}

// Función para generar la tabla con Bootstrap 5
function generarTabla(year, month, datosFormulario, arrayCodigo, arrayNombre, arrayValor, arrayColor) {
    let datos = arrayCodigo.map((codigo, index) => ({
        codigo,
        nombre: arrayNombre[index],
        valor: arrayValor[index],
        color: arrayColor[index]
    }));

    let datosNumericos = datos.filter(item => !isNaN(parseInt(item.codigo)));
    let datosEspeciales = datos.filter(item => isNaN(parseInt(item.codigo)));

    datosNumericos.sort((a, b) => parseInt(a.codigo) - parseInt(b.codigo));

    let tablaHTML = `
      <div class="table-responsive">
          <table class="table table-bordered text-center">
              <thead class="table-secondary">
                  <tr>
                      <th style="width: 10%;">Código</th>
                      <th>Concepto</th>
                      <th>Monto Bruto</th>
                      <th>Descuento (${DESCUENTO * 100}%)</th>
                      <th>Monto Neto</th>
                  </tr>
              </thead>
              <tbody>
  `;

    function agregarSeccion(datos, titulo) {
        let totalBruto = 0, totalDescuento = 0, totalNeto = 0;
        let datosFiltrados = datos.filter(item => item.valor > 0);
        if (datosFiltrados.length === 0) return '';

        let seccionHTML = `<tr></tr>`;
        datosFiltrados.forEach(item => {
            let descuento = item.color === "danger" ? 0 : item.valor * DESCUENTO;
            let neto = item.valor - descuento;
            totalBruto += item.valor;
            totalDescuento += descuento;
            totalNeto += neto;
            seccionHTML += `
          <tr class="table-${item.color}">
              <td><strong>${item.codigo}</strong></td>
              <td class="text-start">${item.nombre}</td>
              <td>${formatNumero(item.valor, "$")}</td>
              <td>${formatNumero(-descuento, "$")}</td>
              <td>${formatNumero(neto, "$")}</td>
          </tr>
      `;
        });

        if (totalBruto > 0) {
            seccionHTML += `
          <tr class="table-light fw-bold">
              <td colspan="2">∑ Total ${titulo}</td>
              <td>${formatNumero(totalBruto, "$")}</td>
              <td>${formatNumero(-totalDescuento, "$")}</td>
              <td class="fw-bold border-2 border-success">${formatNumero(totalNeto, "$")}</td>
          </tr>
          <tr class="table-light"><td colspan="5" style="height: 10px; border: none;"></td></tr>
      `;
        }
        document.getElementById("versionH6").setAttribute("data-array", JSON.stringify([totalBruto, totalNeto]));
        return seccionHTML;
    }

    tablaHTML += agregarSeccion(datosNumericos, "por Ítems");
    tablaHTML += agregarSeccion(datosEspeciales, "por grupos de 📌 ítems");

    tablaHTML += `
              </tbody>
          </table>
      </div>
        <div class="d-flex justify-content-center gap-3 mt-3">
            <button type="button" id="bajarPDF" class="btn btn-primary">Bajar PDF</button>
            <button type="button" id="recalculateButtonTable" class="btn btn-success">Volver a simular</button>
        </div><br>          
  `;

    // Insertar la tabla en el contenedor
    let tablaResultados = document.getElementById("tablaResultados");
    tablaResultados.innerHTML = tablaHTML; // Actualiza la tabla

    // --- AGREGAR AL FINAL: Fila para Seguro de Vida (Life) con Código 120 ---
    // Buscamos el <tbody> dentro de la tabla recien insertada
    const tablaElement = tablaResultados.querySelector("table");
    if (tablaElement) {
        const tbody = tablaElement.querySelector("tbody");
        if (tbody) {
            // Obtenemos el valor para Seguro de Vida desde el grupo "d"
            const segurosD = obtenerValores(year, month, "d");
            let cod120SegVida = segurosD.length > 0 ? segurosD[0].valor : 0;
            let segurosCNPas = segurosD.length > 1 ? segurosD[1].valor : 0;
            let sumaPlusBruto = valor603 + valor625;
            let sumaPlusNeto = (valor603 + valor625) * 0.75;
            // Si el mes es Junio o Diciembre, se ajustan los valores
            const selectedTextMonth = document.getElementById("month").options[document.getElementById("month").selectedIndex].text;
            if (selectedTextMonth === "1° SAC Junio" || selectedTextMonth === "2° SAC Diciembre") {
                cod120SegVida = 0;
                segurosCNPas = 0;
                sumaPlusBruto /=2;
                sumaPlusNeto /=2;
            }
            const storedJSON = document.getElementById("versionH6").getAttribute("data-array");
            // const storedJSON = document.getElementById("versionH6").dataset.array;
            const arrayRecuperado = JSON.parse(storedJSON);

            // Creamos la nueva fila
            const newRow = document.createElement("tr");
            newRow.classList.add("table-secondary"); // Color secundario
            newRow.innerHTML = `
          <td><strong>120</strong></td>
          <td class="text-start">Descontando el Seguro de Vida (Life)</td>
          <td>----</td>
          <td>${formatNumero(cod120SegVida, "$")}</td>
          <td class="fw-bold border-2 border-success">${formatNumero(cod120SegVida + arrayRecuperado[1], "$")}</td>
      `;
            tbody.appendChild(newRow);
            // Creamos la nueva fila para el Seguro CNP
            const newRowSeguroCNP = document.createElement("tr");
            newRowSeguroCNP.classList.add("table-secondary"); // Color secundario
            newRowSeguroCNP.innerHTML = `
          <td><strong>🏛</strong></td>
          <td class="text-start">Seguro CNP (Banco Corrientes)</td>
          <td>----</td>
          <td>${formatNumero(segurosCNPas, "$")}</td>
          <td class="fw-bold border-2 border-success">${formatNumero(segurosCNPas + cod120SegVida + arrayRecuperado[1], "$")}</td>
      `;
            tbody.appendChild(newRowSeguroCNP);

            // Calcular el salario sin pluses
            const salarioBrutoSinPluses = segurosCNPas + cod120SegVida + arrayRecuperado[0] - sumaPlusBruto;
            const salarioNetoSinPluses = segurosCNPas + cod120SegVida + arrayRecuperado[1] - sumaPlusNeto;

            const newRowSalarioSinPluses = document.createElement("tr");
            newRowSalarioSinPluses.classList.add("table-success"); // Color secundario
            newRowSalarioSinPluses.innerHTML = `
            <td><strong>⚠️</strong></td>
            <td class="text-start">Salario Real (Sin Pluses)</td>
            <td>${formatNumero(salarioBrutoSinPluses, "$")}</td>
            <td>${formatNumero(salarioNetoSinPluses - salarioBrutoSinPluses, "$")}</td>
            <td class="fw-bold border-2 border-success">${formatNumero(salarioNetoSinPluses, "$")}</td>
`;
            tbody.appendChild(newRowSalarioSinPluses);
        }
    }

    // Mostrar la tabla y actualizar textos relacionados
    const selectedTextMonth = document.getElementById("month").options[document.getElementById("month").selectedIndex].text;
    document.getElementById("tableHaber").hidden = false;
    document.getElementById("textTableHaberes").innerText = `Total de Haberes de ${selectedTextMonth} del ${year}`;

    // Eliminar acordeón previo si existe para evitar duplicados
    let acordeonExistente = document.getElementById("acordeonInfo");
    if (acordeonExistente) {
        acordeonExistente.remove();
    }

    // Agregar acordeón con información adicional debajo de la tabla
    const valoresD = obtenerValores(year, month, "d");
    let cod210SV = valoresD.length > 0 ? valoresD[0].valor : 0;
    let segurosCNP = valoresD.length > 1 ? valoresD[1].valor : 0;
    if (selectedTextMonth === "1° SAC Junio" || selectedTextMonth === "2° SAC Diciembre") {
        cod210SV = 0;
        segurosCNP = 0;
    }


    const antiguedad = 100 * parseFloat(datosFormulario.seniority);
    const cantCargos = datosFormulario.cargos.length > 1
        ? datosFormulario.cargos.length + " clases"
        : datosFormulario.cargos.length + " clase";


    // Generar texto para cada contrato en el array
    const textos = datosFormulario.cargos.map((contrato, index) => generarTextoCompacto(contrato, index));
    const textFinalAcordeon = `<div class="accordion mt-3" id="acordeonInfo"><div class="accordion-item"><h2 class="accordion-header" id="headingOne"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" style="white-space: nowrap;">👉🏼 Información adicional sobre la simulación, descuentos y componentes del salario.</button></h2><div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#acordeonInfo"><div class="accordion-body text-start"><p>Simulación ${month}/${year} de docente con ${antiguedad}% antigüedad en ${cantCargos}: ${textos.join("; ")}.</p><ol><li>Las simulaciones pueden variar dependiendo de cada docente, ya que algunos pueden contar con <strong>ítems especiales</strong>. Por ejemplo, ciertos cargos incluyen ítems por tarea diferenciada. Algunos <strong>cargos directivos y gremiales</strong> tienen un descuento menor en aportes jubilatorios (<strong>18.5%</strong> en lugar del <strong>20%</strong> que se aplica a la mayoría). Pueden existir <strong>descuentos adicionales</strong>, como los <strong>aportes gremiales</strong> o descuento del <strong>Cód. 210 Seguro de vida (Life): </strong>${formatNumero(cod210SV, "$")} y <strong>Seguros CNP del Banco Corrientes: </strong> ${formatNumero(segurosCNP, "$")} , lo que impacta en el cálculo final.</li><li>No se puede realizar la simulación <strong>por cargos separados</strong>, ya que como <strong>nos pagan menos en el segundo y tercer cargo</strong>, el resultado cambia si no se tiene en cuenta la cantidad total de cargos.</li><li>No se incluye que ciertos cargos con menos de dieciocho (18) horas reloj semanales de carga horaria laboral, <strong>percibe el 50% de las asignaciones</strong> a excepción de la de maternidad, previstas en el art. 25 de la ley N° 3.554/80.</li></ol></div></div></div></div>`;
    tablaResultados.insertAdjacentHTML("afterend", textFinalAcordeon);
    document.getElementById("tablaResultados").scrollIntoView({ behavior: "smooth", block: "start" });

    // Expande el acordeón temporalmente
    const acordeon = document.getElementById("collapseOne");
    acordeon.classList.remove("collapse"); // Expande el acordeón

    // Agrega un evento al botón "Volver a Simular" de la tabla
    document.getElementById("recalculateButtonTable").addEventListener("click", function () {
        document.getElementById('recalculateButton').click();
    });

    // Agrega un evento al botón "Bajar PDF"
    document.getElementById("bajarPDF").addEventListener("click", function () {
        const botonBajarPDF = document.getElementById("bajarPDF");
        const botonVolverSimular = document.getElementById("recalculateButtonTable");
        const tableHaber = document.getElementById("tableHaber");

        botonBajarPDF.disabled = true;
        if (botonVolverSimular) botonVolverSimular.classList.add("ocultar-boton");

        // Configuración para asegurar que la tabla salga completa en móviles
        const options = {
            scale: 2, // Mejor calidad
            windowWidth: 1200 // Simula pantalla de escritorio
        };

        html2canvas(tableHaber, options).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`simulacion${year}/${month}_salario_DAC.pdf`);

            botonBajarPDF.disabled = false;
            if (botonVolverSimular) botonVolverSimular.classList.remove("ocultar-boton");
        }).catch(error => {
            console.error("Error al generar el PDF:", error);
            botonBajarPDF.disabled = false;
            if (botonVolverSimular) botonVolverSimular.classList.remove("ocultar-boton");
            alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.");
        });
    });
}

// Función para generar el texto en el formato deseado
function generarTextoCompacto(contrato) {
    const ubicacionPorcentaje = parseFloat(contrato.ubicacionGeografica) * 100 + "%";
    const horasCatedraTexto = contrato.horasCatedra ? `con ${contrato.horasCatedra} Horas Cátedra` : "";
    return `Clase ${contrato.claseInfo.clase}: Cargo: ${contrato.claseInfo.cargo}, de Ubicación geográfica: ${ubicacionPorcentaje} ${horasCatedraTexto}`;
}
