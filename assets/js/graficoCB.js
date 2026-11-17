import { dateGral } from './date.js';
import { obtenerValores, formatNumero, formatNumeroCompacto } from '../../scriptSimulador/dataSalario.js';

document.addEventListener("DOMContentLoaded", function () {
    inicioGrafico();

    function obtenerValorYTextoSeleccionado(variable) {
        const seleccionado = document.querySelector(`input[name="grupoOpciones${variable}"]:checked`);
        if (seleccionado) {
            const textoSeleccionado = document.querySelector(`label[for="${seleccionado.id}"]`).textContent;
            const arrayTextValor = { text: textoSeleccionado, valor: seleccionado.value };
            return arrayTextValor;
        };
    };

    const rangoAntiguedad = document.getElementById("antiguedadRange");
    const valorAntiguedad = document.getElementById("antiguedadValor");

    const antiguedadOpciones = [
        "Menos a 1 año - 0%",
        "1 año - 10%",
        "Entre 2 y 4 años (15%)",
        "Entre 5 y 6 años (30%)",
        "Entre 7 y 9 años (40%)",
        "Entre 10 y 11 años (50%)",
        "Entre 12 y 14 años (60%)",
        "Entre 15 y 16 años (70%)",
        "Entre 17 y 19 años (80%)",
        "Entre 20 y 21 años (100%)",
        "Entre 22 y 23 años (110%)",
        "24 años o más (120%)"
    ];

    const valoresAntiguedad = [0.0, 0.1, 0.15, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0, 1.1, 1.2];
    const rangoAntiguedadPoderAdquisitivo = document.getElementById("antiguedadRangePoderAdquisitivo");
    const valorAntiguedadPoderAdquisitivo = document.getElementById("antiguedadValorPoderAdquisitivo");

    function actualizarAntiguedad() {
        const indice = parseInt(rangoAntiguedad.value, 10);
        const textoSeleccionado = antiguedadOpciones[indice] || "Seleccione su antigüedad";
        valorAntiguedad.textContent = `Antigüedad seleccionada: ${textoSeleccionado}`;
        const arrayTextValorAntiguedad = { text: textoSeleccionado, valor: valoresAntiguedad[indice] };
        return arrayTextValorAntiguedad;
    };

    function actualizarGraficos() {
        const arrayTextValorCB = obtenerValorYTextoSeleccionado("CB");
        const arrayTextValorCargos = obtenerValorYTextoSeleccionado("Cargos");
        const arrayTextValorAntiguedad = actualizarAntiguedad();
        crearGrafico("chartCB", arrayTextValorCB.valor, arrayTextValorAntiguedad.valor, arrayTextValorCB.text, arrayTextValorCargos.valor);
    }

    function actualizarGraficoPoderAdquisitivo() {
        const indiceAntiguedad = parseInt(rangoAntiguedadPoderAdquisitivo.value, 10);
        const textoAntiguedad = antiguedadOpciones[indiceAntiguedad] || "Seleccione su antigüedad";
        const antiguedad = valoresAntiguedad[indiceAntiguedad] ?? 0;
        const cargo = document.querySelector('input[name="grupoOpcionesCargoPoderAdquisitivo"]:checked').value;
        const modo = document.querySelector('input[name="modoPoderAdquisitivo"]:checked').value;
        const anio = parseInt(document.getElementById("anioSelectPoderAdquisitivo").value, 10);

        valorAntiguedadPoderAdquisitivo.textContent = `Antigüedad seleccionada: ${textoAntiguedad}`;
        crearGraficoPoderAdquisitivo(antiguedad, cargo, anio, modo);
    }

    document.querySelectorAll('input[name="grupoOpcionesCB"]').forEach(input => {
        input.addEventListener("change", actualizarGraficos);
    });

    document.querySelectorAll('input[name="grupoOpcionesCargos"]').forEach(input => {
        input.addEventListener("change", actualizarGraficos);
    });

    const anioSelect = document.getElementById("anioSelectCB");
    if (anioSelect) {
        anioSelect.addEventListener("change", actualizarGraficos);
    }

    // Evento para actualizar el valor en tiempo real
    rangoAntiguedad.addEventListener("input", actualizarGraficos);

    document.getElementById("anioSelectPoderAdquisitivo").addEventListener("change", actualizarGraficoPoderAdquisitivo);
    rangoAntiguedadPoderAdquisitivo.addEventListener("input", actualizarGraficoPoderAdquisitivo);
    document.querySelectorAll('input[name="modoPoderAdquisitivo"], input[name="grupoOpcionesCargoPoderAdquisitivo"]')
        .forEach(input => input.addEventListener("change", actualizarGraficoPoderAdquisitivo));
});


function inicioGrafico() {
    const opcionCB = document.querySelector('input[name="grupoOpcionesCB"]:checked');
    const opcionCargo = document.querySelector('input[name="grupoOpcionesCargos"]:checked');
    const opcionCargoPoderAdquisitivo = document.querySelector('input[name="grupoOpcionesCargoPoderAdquisitivo"]:checked');
    const rango = document.getElementById("antiguedadRange");
    const valor = document.getElementById("antiguedadValor");
    const rangoPoderAdquisitivo = document.getElementById("antiguedadRangePoderAdquisitivo");
    const valorPoderAdquisitivo = document.getElementById("antiguedadValorPoderAdquisitivo");
    const anioPoderAdquisitivo = parseInt(document.getElementById("anioSelectPoderAdquisitivo").value, 10);
    const modoPoderAdquisitivo = document.querySelector('input[name="modoPoderAdquisitivo"]:checked').value;

    const antiguedadOpciones = [
        "Menos a 1 año - 0%",
        "1 año - 10%",
        "Entre 2 y 4 años (15%)",
        "Entre 5 y 6 años (30%)",
        "Entre 7 y 9 años (40%)",
        "Entre 10 y 11 años (50%)",
        "Entre 12 y 14 años (60%)",
        "Entre 15 y 16 años (70%)",
        "Entre 17 y 19 años (80%)",
        "Entre 20 y 21 años (100%)",
        "Entre 22 y 23 años (110%)",
        "24 años o más (120%)"
    ];
    rango.value = 0;
    valor.innerText = `Antigüedad seleccionada: ${antiguedadOpciones[0]}`;
    rangoPoderAdquisitivo.value = 0;
    valorPoderAdquisitivo.innerText = `Antigüedad seleccionada: ${antiguedadOpciones[0]}`;

    const comparacion = document.querySelector(`label[for="${opcionCB.id}"]`).textContent;
    crearGrafico("chartCB", opcionCB.value, 0, comparacion, opcionCargo.value);
    crearGraficoPoderAdquisitivo(0, opcionCargoPoderAdquisitivo.value, anioPoderAdquisitivo, modoPoderAdquisitivo);
};

let chartInstance = null;
let chartPoderAdquisitivoInstance = null;
//crearGrafico()
function crearGrafico(chart, radioCheck = 0, antiguedad = 0, comparacion, cargo) {
    const ctx = document.getElementById(chart).getContext('2d');

    if (chartInstance !== null) {
        chartInstance.destroy();
        chartInstance = null; // Se asegura de que no haya referencias obsoletas
    };

    const ChartDataLabels = window.ChartDataLabels;
    Chart.register(ChartDataLabels);

    const date = dateGral();
    const arrayRef = ["canastaBTNac", "canastaBTNea", "canastaBANac", "canastaBANea"];

    const fechaActual = new Date();
    const anioSelect = document.getElementById("anioSelectCB");
    const anio = anioSelect ? parseInt(anioSelect.value) : fechaActual.getFullYear();
    console.log("Año seleccionado para el gráfico:", anio);
    const mes = fechaActual.getMonth();
    const arrayDivisor = date[arrayRef[radioCheck]][anio] || []; // Prevención por si el año aún no está definido

    const tipoB = ["b", 1.3 + antiguedad];
    const tipoG1C = ["g", 1, 1, 1, 0, 1];
    const tipoG2C = ["g", 0, 0, 0, 1, 1];
    const tipoN = ["n", 1, 0, 0, 0, 0, 0];

    const arrayBlanco = [];
    const arrayGrisC = [];
    const arrayNegro = [];
    const arrayTotalC = [];

    const numeroCargos = cargo;
    let factor = [1, 0, 1];
    if (numeroCargos == 2) {
        factor = [0, 1, 1];
        //   factor = [1, 1, 2];
    } else if (numeroCargos == 3) {
        factor = [0, 0, 0];
        //    factor = [1, 1, 2];
    };

    for (let i = 0; i < 12; i++) {
        let divisor = arrayDivisor[i] || null;
        if (typeof divisor === 'string' && divisor !== '---') {
            divisor = parseFloat(divisor.replace(/\./g, '').replace(',', '.'));
        }
        if (divisor === '---' || !divisor) {
            arrayBlanco.push(null);
            arrayGrisC.push(null);
            arrayNegro.push(null);
            arrayTotalC.push(null);
            continue; // Dejar hueco en el gráfico si no hay dato
        }
        const n = i + 1;
        let blanco = sumaGrupo(anio, n, tipoB);
        let gris = sumaGrupo(anio, n, tipoG1C) * factor[0] + sumaGrupo(anio, n, tipoG2C) * factor[1];
        let negro = sumaGrupo(anio, n, tipoN) * factor[2];
        const total = blanco + gris + negro;
        // El seguro ya tiene signo negativo y se descuenta solo en el primer cargo.
        const seguroVida = numeroCargos == 1
            ? (obtenerValores(anio, n, 'd').find(item => item.name.startsWith('210 '))?.valor ?? 0)
            : 0;
        const neto = total + seguroVida;

        arrayBlanco.push(100 * blanco / total);
        arrayGrisC.push(100 * gris / total);
        arrayNegro.push(100 * negro / total);
        arrayTotalC.push(100 * neto / divisor);
    };

    // Calcular el máximo valor de las barras
    const maxValor = Math.max(...arrayTotalC);
    const maxConMargen = Math.ceil(maxValor * 1.1 / 10) * 10;

    // Datos actualizados con los 12 meses
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: `Relativo a la ${comparacion}`,
                type: 'bar',
                data: arrayTotalC,

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(146, 197, 126, 0.2)',
                    'rgba(255, 140, 140, 0.2)',
                    'rgba(140, 140, 255, 0.2)',
                    'rgba(140, 255, 140, 0.2)',
                    'rgba(255, 215, 0, 0.2)',
                    'rgba(133, 105, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(146, 197, 126)',
                    'rgb(255, 140, 140)',
                    'rgb(140, 140, 255)',
                    'rgb(140, 255, 140)',
                    'rgb(255, 215, 0)',
                    'rgb(133, 105, 255)'
                ],
                borderWidth: 1
            },
            {
                label: 'Blancos',
                type: 'line',
                data: arrayBlanco,
                borderColor: 'rgb(13, 110, 253)',
                backgroundColor: 'rgba(13, 110, 253, 0.2)',
                borderWidth: 2,
                tension: 0, // Línea recta
                fill: false
            },
            {
                label: 'Grises',
                type: 'line',
                data: arrayGrisC,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
                tension: 0, // Línea recta
                fill: false
            },
            {
                label: 'Negro',
                type: 'line',
                data: arrayNegro,
                borderColor: 'rgba(220, 53, 69, 1)',
                backgroundColor: 'rgba(220, 53, 69, 0.2)',
                borderWidth: 2,
                tension: 0, // Línea recta
                fill: false
            }
        ]
    };

    // Configuración del gráfico con títulos y etiquetas
    // Agregar el plugin ChartDataLabels
    // Registrar el plugin antes de crear el gráfico
    Chart.register(ChartDataLabels);
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Gráfico CB - Evolución del Salario Docente (${cargo}° Cargo) Mensual`,
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                },
                subtitle: { // 👈 Agregamos el subtítulo aquí
                    display: true,
                    text: `Comparación con ${comparacion} a lo largo del año ${anio}`,
                    font: {
                        size: 14,
                        weight: 'normal'
                    },
                    color: 'gray' // Color opcional del subtítulo
                },
                datalabels: {  // Mostrar valores en barras y líneas
                    display: true,
                    anchor: function(context) {
                        return 'end';
                    },
                    align: function(context) {
                        if (context.datasetIndex === 0) return 'top';

                        const index = context.dataIndex;
                        const datasets = context.chart.data.datasets;
                        const currentVal = context.dataset.data[index];

                        if (currentVal === null || currentVal === undefined) return 'top';

                        const barValue = datasets[0].data[index];
                        if (barValue !== null && barValue !== undefined) {
                            const yScale = context.chart.scales.y;
                            const currentY = yScale.getPixelForValue(currentVal);
                            const barY = yScale.getPixelForValue(barValue);
                            if (Math.abs(currentY - barY) < 24) return 'bottom';
                        }

                        // Obtener todos los valores de las líneas en este mes
                        let lines = [];
                        for (let i = 1; i < datasets.length; i++) {
                            const val = datasets[i].data[index];
                            if (val !== null && val !== undefined) {
                                lines.push({ val: val, dsIndex: i });
                            }
                        }
                        if (lines.length <= 1) return 'top';
                        lines.sort((a, b) => a.val - b.val);
                        const myRank = lines.findIndex(v => v.dsIndex === context.datasetIndex);
                        return myRank === 0 ? 'bottom' : 'top';
                    },
                    offset: 8,
                    color: 'rgba(8, 8, 8, 0.7)',
                    font: {
                        size: 10,
                        weight: 'normal'
                    },
                    formatter: (value) => value === null ? '' : value.toFixed(1) + '%',
                    clamp: true
                }
            },
            scales: {
                x: { // 👈 Agregamos el título del eje X
                    title: {
                        display: true,
                        text: 'Meses del Año',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: 'black'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: maxConMargen, // 👈 Usamos el valor calculado dinámicamente
                    ticks: {
                        callback: (value) => value + '%'
                    },
                    title: { // 👈 Agregamos el título del eje Y
                        display: true,
                        text: 'Porcentaje',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: 'black'
                    }
                }
            }
        }
    };



    // Crear el gráfico
    chartInstance = new Chart(ctx, config);
};

function crearGraficoPoderAdquisitivo(antiguedad = 0, cargo = 1, anio = 2026, modo = "nominal") {
    const canvas = document.getElementById("chartPoderAdquisitivo");
    const ctx = canvas.getContext("2d");

    if (chartPoderAdquisitivoInstance !== null) {
        chartPoderAdquisitivoInstance.destroy();
    }

    const { inflacionNea } = dateGral();
    const inflacionAnual = inflacionNea[anio] || [];
    const mostrarPorcentaje = modo === "porcentaje";
    const formatPesosGrafico = valor => `$${Math.round(valor).toLocaleString('es-AR')}`;
    const tipoB = ["b", 1.3 + antiguedad];
    const tipoG1C = ["g", 1, 1, 1, 0, 1];
    const tipoG2C = ["g", 0, 0, 0, 1, 1];
    const tipoN = ["n", 1, 0, 0, 0, 0, 0];

    let factor = [1, 0, 1];
    if (cargo == 2) {
        factor = [0, 1, 1];
    } else if (cargo == 3) {
        factor = [0, 0, 0];
    }

    const salarios = Array.from({ length: 12 }, (_, indice) => {
        const inflacion = inflacionAnual[indice];
        if (typeof inflacion !== "number" || !Number.isFinite(inflacion)) {
            return null;
        }

        const mes = indice + 1;
        const blanco = sumaGrupo(anio, mes, tipoB);
        const gris = sumaGrupo(anio, mes, tipoG1C) * factor[0] + sumaGrupo(anio, mes, tipoG2C) * factor[1];
        const negro = sumaGrupo(anio, mes, tipoN) * factor[2];
        const seguroVida = cargo == 1
            ? (obtenerValores(anio, mes, "d").find(item => item.name.startsWith("210 "))?.valor ?? 0)
            : 0;
        const totalComponentes = blanco + gris + negro;
        const neto = totalComponentes + seguroVida;

        return Number.isFinite(neto) && neto > 0
            ? { neto, blanco, gris, negro, totalComponentes }
            : null;
    });

    let mesReferencia = -1;
    for (let indice = salarios.length - 1; indice >= 0; indice--) {
        if (salarios[indice] && salarios[indice].neto > 0) {
            mesReferencia = indice;
            break;
        }
    }

    const salariosPesosReferencia = salarios.map((salario, indice) => {
        if (!salario || mesReferencia < 0 || indice > mesReferencia) {
            return null;
        }

        let factorInflacion = 1;
        for (let mes = indice + 1; mes <= mesReferencia; mes++) {
            const inflacion = inflacionAnual[mes];
            if (typeof inflacion !== "number" || !Number.isFinite(inflacion)) {
                return null;
            }
            factorInflacion *= 1 + inflacion / 100;
        }

        return salario.neto * factorInflacion;
    });

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesReferenciaNombre = mesReferencia >= 0 ? meses[mesReferencia] : null;
    const salarioReferencia = mesReferencia >= 0 ? salarios[mesReferencia].neto : 0;
    const valoresGrafico = mostrarPorcentaje
        ? salariosPesosReferencia.map(salario => salario === null || salarioReferencia === 0 ? null : salario / salarioReferencia * 100)
        : salariosPesosReferencia;
    const porcentajesBlancos = salarios.map(salario => salario ? salario.blanco / salario.totalComponentes * 100 : null);
    const porcentajesGrises = salarios.map(salario => salario ? salario.gris / salario.totalComponentes * 100 : null);
    const porcentajesNegros = salarios.map(salario => salario ? salario.negro / salario.totalComponentes * 100 : null);
    const valorReferencia = mostrarPorcentaje ? 100 : salarioReferencia;
    const maxValor = Math.max(valorReferencia, ...valoresGrafico.filter(Number.isFinite));
    const intervaloEje = mostrarPorcentaje
        ? 10
        : maxValor > 0 ? 10 ** (Math.floor(Math.log10(maxValor)) - 1) : 1;
    const maxConMargen = maxValor > 0
        ? Math.ceil(maxValor * 1.1 / intervaloEje) * intervaloEje
        : 1;
    const seriesComposicion = [
        { label: 'Blancos', data: porcentajesBlancos, color: 'rgb(13, 110, 253)' },
        { label: 'Grises', data: porcentajesGrises, color: 'rgba(255, 193, 7, 1)' },
        { label: 'Negros', data: porcentajesNegros, color: 'rgba(220, 53, 69, 1)' }
    ];

    const data = {
        labels: meses,
        datasets: [
            {
                label: 'Salario',
                type: 'bar',
                data: valoresGrafico,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(146, 197, 126, 0.2)',
                    'rgba(255, 140, 140, 0.2)',
                    'rgba(140, 140, 255, 0.2)',
                    'rgba(140, 255, 140, 0.2)',
                    'rgba(255, 215, 0, 0.2)',
                    'rgba(133, 105, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(146, 197, 126)',
                    'rgb(255, 140, 140)',
                    'rgb(140, 140, 255)',
                    'rgb(140, 255, 140)',
                    'rgb(255, 215, 0)',
                    'rgb(133, 105, 255)'
                ],
                borderWidth: 1
            },
            {
                label: 'Evolución',
                type: 'line',
                data: valoresGrafico,
                borderColor: 'rgb(73, 80, 87)',
                backgroundColor: 'rgb(73, 80, 87)',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgb(73, 80, 87)',
                pointBorderColor: 'white',
                pointBorderWidth: 1,
                tension: 0,
                spanGaps: false,
                datalabels: { display: false }
            },
            {
                label: mostrarPorcentaje
                    ? 'Salario del mes de referencia (100%)'
                    : 'Salario nominal del mes de referencia',
                type: 'line',
                data: salarios.map((salario, indice) => salario && indice <= mesReferencia ? valorReferencia : null),
                borderColor: 'rgb(13, 110, 253)',
                backgroundColor: 'rgba(13, 110, 253, 0.2)',
                borderWidth: 2,
                borderDash: [6, 4],
                pointRadius: 0,
                datalabels: { display: false }
            },
            ...seriesComposicion.map(serie => ({
                label: serie.label,
                type: 'line',
                data: serie.data,
                yAxisID: 'yComposicion',
                borderColor: serie.color,
                backgroundColor: serie.color,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: serie.color,
                pointBorderColor: 'white',
                pointBorderWidth: 1,
                tension: 0,
                spanGaps: false,
                datalabels: {
                    display: false
                }
            }))
        ]
    };

    const config = {
        type: 'bar',
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Poder adquisitivo del salario (${cargo}° cargo)`,
                    font: { size: 20, weight: 'bold' }
                },
                subtitle: {
                    display: true,
                    text: mesReferencia >= 0
                        ? mostrarPorcentaje
                            ? `Salarios anteriores ajustados por IPC NEA; último salario disponible = 100%`
                            : `Montos expresados en pesos de ${mesReferenciaNombre} ${anio}; salario de referencia: ${formatNumero(salarioReferencia, "$")}`
                        : `No hay salarios disponibles para comparar en ${anio}`,
                    font: { size: 14, weight: 'normal' },
                    color: 'gray'
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            const label = context.dataset.label ? `${context.dataset.label}: ` : '';
                            const value = context.parsed.y;
                            if (context.dataset.yAxisID === 'yComposicion') {
                                return `${label}${value.toFixed(1)}%`;
                            }
                            return `${label}${mostrarPorcentaje ? `${value.toFixed(1)}%` : formatPesosGrafico(value)}`;
                        }
                    }
                },
                datalabels: {
                    display: context => context.datasetIndex === 0 && context.raw !== null,
                    anchor: 'end',
                    align: 'top',
                    offset: 4,
                    color: 'rgba(8, 8, 8, 0.7)',
                    font: { size: 10, weight: 'normal' },
                    formatter: value => Number.isFinite(value)
                        ? mostrarPorcentaje ? `${value.toFixed(1)}%` : formatPesosGrafico(value)
                        : '',
                    clamp: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses del Año',
                        font: { size: 14, weight: 'bold' },
                        color: 'black'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: maxConMargen,
                    ticks: {
                        callback: value => mostrarPorcentaje ? `${value}%` : formatNumeroCompacto(value, "$")
                    },
                    title: {
                        display: true,
                        text: mostrarPorcentaje
                            ? 'Porcentaje del último salario disponible'
                            : mesReferenciaNombre
                                ? `Salario neto en pesos de ${mesReferenciaNombre} ${anio}`
                                : 'Salario neto en pesos',
                        font: { size: 14, weight: 'bold' },
                        color: 'black'
                    }
                },
                yComposicion: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: { callback: value => `${value}%` },
                    title: {
                        display: true,
                        text: 'Composición del salario',
                        font: { size: 14, weight: 'bold' },
                        color: 'black'
                    }
                }
            }
        }
    };

    chartPoderAdquisitivoInstance = new Chart(ctx, config);
}

function sumaGrupo(anio, mes, tipo) {
    let suma = 0;
    const objeto = obtenerValores(anio, mes, tipo[0]);
    let desc = 0.75;
    if (tipo[0] == "n") {
        desc = 1;
    }
//    console.log(objeto)
    objeto.forEach((item, index) => {
        suma += desc * item.valor * tipo[index + 1];
    });
    return suma;
};
