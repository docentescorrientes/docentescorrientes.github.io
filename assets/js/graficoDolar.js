import { dateGral } from './date.js';
import { obtenerValores, formatNumero } from '../../scriptSimulador/dataSalario.js';

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

    const rangoAntiguedad = document.getElementById("antiguedadRangeDolar");
    const valorAntiguedad = document.getElementById("antiguedadValorDolar");

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

    function actualizarAntiguedad() {
        const indice = parseInt(rangoAntiguedad.value, 10);
        const textoSeleccionado = antiguedadOpciones[indice] || "Seleccione su antigüedad";
        valorAntiguedad.textContent = `Antigüedad seleccionada: ${textoSeleccionado}`;
        const arrayTextValorAntiguedad = { text: textoSeleccionado, valor: valoresAntiguedad[indice] };
        return arrayTextValorAntiguedad;
    };

    document.querySelectorAll('input[name="grupoOpcionesDolar"]').forEach(input => {
        input.addEventListener("change", function () {
            const arrayTextValorDolar = obtenerValorYTextoSeleccionado("Dolar");
            const arrayTextValorCargosDolar = obtenerValorYTextoSeleccionado("CargosDolar");
            const arrayTextValorAntiguedadDolar = actualizarAntiguedad();
            crearGrafico("chartDolar", arrayTextValorDolar.valor, arrayTextValorAntiguedadDolar.valor, arrayTextValorDolar.text, arrayTextValorCargosDolar.valor);
        });
    });

    document.querySelectorAll('input[name="grupoOpcionesCargosDolar"]').forEach(input => {
        input.addEventListener("change", function () {
            const arrayTextValorDolar = obtenerValorYTextoSeleccionado("Dolar");
            const arrayTextValorCargosDolar = obtenerValorYTextoSeleccionado("CargosDolar");
            const arrayTextValorAntiguedadDolar = actualizarAntiguedad();
            crearGrafico("chartDolar", arrayTextValorDolar.valor, arrayTextValorAntiguedadDolar.valor, arrayTextValorDolar.text, arrayTextValorCargosDolar.valor);
        });
    });

    // Evento para actualizar el valor en tiempo real
    rangoAntiguedad.addEventListener("input", function () {
        const arrayTextValorDolar = obtenerValorYTextoSeleccionado("Dolar");
        const arrayTextValorCargosDolar = obtenerValorYTextoSeleccionado("CargosDolar");
        const arrayTextValorAntiguedadDolar = actualizarAntiguedad();
        crearGrafico("chartDolar", arrayTextValorDolar.valor, arrayTextValorAntiguedadDolar.valor, arrayTextValorDolar.text, arrayTextValorCargosDolar.valor);
    });
});


function inicioGrafico() {
    const opcionesDolar = document.getElementsByName("grupoOpcionesDolar");
    const rango = document.getElementById("antiguedadRangeDolar");
    const valor = document.getElementById("antiguedadValorDolar");

    opcionesDolar.value = 0;
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
    valor.innerText = antiguedadOpciones[0];
    crearGrafico("chartDolar", opcionesDolar.value, 0, "En Pesos", 1);
};

let chartInstance = null;
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
    const arrayRef = ["pesos", "dolarBlue"];

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear() - 1;
    const mes = fechaActual.getMonth();
    let arrayDivisor = new Array(12).fill(1);
    if (radioCheck == 1) {
        arrayDivisor = date[arrayRef[radioCheck]][anio];
    };

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
        const divisor = arrayDivisor[i];
        if (divisor === '---') continue; // Saltar si no hay dato
        const n = i + 1;
        let blanco = sumaGrupo(anio, n, tipoB);
        let gris = sumaGrupo(anio, n, tipoG1C) * factor[0] + sumaGrupo(anio, n, tipoG2C) * factor[1];
        let negro = sumaGrupo(anio, n, tipoN) * factor[2];
        let total = sumaGrupo(anio, n, tipoB) + sumaGrupo(anio, n, tipoG1C) * factor[0] + sumaGrupo(anio, n, tipoG2C) * factor[1] + sumaGrupo(anio, n, tipoN) * factor[2];

        arrayBlanco.push(blanco / divisor);
        arrayGrisC.push(gris / divisor);
        arrayNegro.push(negro / divisor);
        arrayTotalC.push(total / divisor);
    };


    const maxValor = Math.max(...arrayTotalC);
    const maxConMargen = Math.ceil(maxValor * 1.1 / 100) * 100;


    // Datos actualizados con los 12 meses
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: `En ${comparacion}`,
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
                fill: false,
                datalabels: {
                    anchor: 'end',
                    align: 'bottom',
                    color: 'rgba(8, 8, 8, 0.7)',
                    font: {
                        size: 10,
                        weight: 'normal'
                    },
                    formatter: (value) => '$ ' + formatNumero(value),
                    clamp: true
                }
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
                    text: `Gráfico Salarial - Evolución del Salario Docente (${cargo}° Cargo) Mensual`,
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                },
                subtitle: { // 👈 Agregamos el subtítulo aquí
                    display: true,
                    text: `Comparación mensual del salario ${comparacion.toLowerCase()} a lo largo del año ${anio}`,
                    font: {
                        size: 14,
                        weight: 'normal'
                    },
                    color: 'gray' // Color opcional del subtítulo
                },
                datalabels: {  // Mostrar valores en barras y líneas
                    anchor: 'end',
                    align: 'top',
                    color: 'rgba(8, 8, 8, 0.7)',
                    font: {
                        size: 10,
                        weight: 'normal'
                    },
                    formatter: (value) => '$ ' + formatNumero(value),
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
                    max: maxConMargen, // 👈 valor calculado dinámicamente
                    ticks: {
                        callback: (value) => '$ ' + formatNumero(value)
                    },
                    title: { // 👈 Agregamos el título del eje Y
                        display: true,
                        text: comparacion,
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

function sumaGrupo(anio, mes, tipo) {
    let suma = 0;
    const objeto = obtenerValores(anio, mes, tipo[0]);
    let desc = 0.75;
    if (tipo[0] == "n") {
        desc = 1;
    }
    objeto.forEach((item, index) => {
        suma += desc * item.valor * tipo[index + 1];
    });
    return suma;
};