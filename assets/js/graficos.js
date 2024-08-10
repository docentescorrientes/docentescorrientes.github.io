import dateGeneral from './date.js';
const date = dateGeneral();
const dateInflacion = date.inflacionNac;

cargarChart1('2023', 'barras', 'Haber', dateInflacion, 'C1');
cargarChart1('2024', 'barras', 'Haber', dateInflacion, 'C1');
cargarChart1('2023', 'barras', 'Haber', dateInflacion, 'C2');
cargarChart1('2024', 'barras', 'Haber', dateInflacion, 'C2');
cargarChart1('2023', 'barras', 'Haber', dateInflacion, 'CT');
cargarChart1('2024', 'barras', 'Haber', dateInflacion, 'CT');
cargarChart2('2023', 'combinado', 'Inflacion', dateInflacion, 'C1');
cargarChart2('2024', 'combinado', 'Inflacion', dateInflacion, 'C1');
cargarChart2('2023', 'combinado', 'Inflacion', dateInflacion, 'C2');
cargarChart2('2024', 'combinado', 'Inflacion', dateInflacion, 'C2');
cargarChart2('2023', 'combinado', 'Inflacion', dateInflacion, 'CT');
cargarChart2('2024', 'combinado', 'Inflacion', dateInflacion, 'CT');
cargarChart3('2023', 'lineal', 'Lineal');
cargarChart3('2024', 'lineal', 'Lineal');

function cargarChart1(ano, tipo, graficoId, objeto, cargo) {
    const DATOS = objeto;

    let arrayAcumuladoInflacion23 = [];
    const ultimaInflacion22 = 1.0;
    arrayAcumuladoInflacion23.push(ultimaInflacion22 * ((DATOS['2023'][0] / 100) + 1));
    for (let i = 1; i < 12; i++) {
        arrayAcumuladoInflacion23[i] = arrayAcumuladoInflacion23[i - 1] * ((DATOS['2023'][i] / 100) + 1);
    };

    let arrayAcumuladoInflacion24 = [];
    const ultimaInflacion23 = ultimoIndice(arrayAcumuladoInflacion23);
    arrayAcumuladoInflacion24.push(ultimaInflacion23 * ((DATOS['2024'][0] / 100) + 1));
    for (let i = 1; i < 12; i++) {
        arrayAcumuladoInflacion24[i] = arrayAcumuladoInflacion24[i - 1] * ((DATOS['2024'][i] / 100) + 1);
    };

    const ultimaInflacion24 = ultimoIndice(arrayAcumuladoInflacion24);
    let ultimaInflacionAcumulada;
    if (ano === '2023') {
        ultimaInflacionAcumulada = ultimaInflacion23;
    } else if (ano === '2024') {
        ultimaInflacionAcumulada = ultimaInflacion23 * ultimaInflacion24;
    };
    const cargoN = cargo;
    const zonaIndice = 0.2;
    const antiguegadIndice = 0.0;
    const jornadaExt = 0.0;
    const hijos = 0.0;
    const desc = 0.25;
    let blancos, grises, negros, haber;
    const arrayHaber1 = [];
    const arrayHaber2 = [];
    let arrayHaberTotal = [];
    const arrayBarras = [[], [], [], []];
    for (let i = 0; i < 12; i++) {
        const DATOS_SALARIO = buscarDataMes(ano, i.toString());
        let blancos1 = (1 - desc) * (DATOS_SALARIO.basico1 + DATOS_SALARIO.zona36 * zonaIndice + DATOS_SALARIO.antiguedad37 * antiguegadIndice + DATOS_SALARIO.ayMatDidac62 * DATOS_SALARIO.basico1 + DATOS_SALARIO.jornadaExt624 * DATOS_SALARIO.basico1 * jornadaExt);
        let grises1 = (1 - desc) * (DATOS_SALARIO.adRemDoc193 + DATOS_SALARIO.plusRem603 + DATOS_SALARIO.plusRef625);
        let negros1 = (DATOS_SALARIO.salarioFam3 + DATOS_SALARIO.ayudEscolar) * hijos + DATOS_SALARIO.asigEspLey140 + DATOS_SALARIO.compProv171 + DATOS_SALARIO.conectNac609;
        let haber1 = blancos1 + grises1 + negros1;
        let blancos2 = blancos1;
        let grises2 = (1 - desc) * DATOS_SALARIO.adRemun2Cargo629;
        let negros2 = negros1 + DATOS_SALARIO.progNacCompDoc168;
        let haber2 = blancos2 + grises2 + negros2;
        let sdmng = DATOS_SALARIO.sdmng;
        let progNacCompDoc168 = sdmng - (haber1 + haber2);
        if (progNacCompDoc168 <= 0) {
            progNacCompDoc168 = 0.0;
        };
        haber2 = haber2 + progNacCompDoc168;
        arrayHaber1.push(haber1);
        arrayHaber2.push(haber2);
        arrayHaberTotal.push(haber1 + haber2);

        if (cargoN === 'C1') {
            blancos = blancos1;
            grises = grises1;
            negros = negros1;
            haber = haber1;
            arrayHaberTotal = arrayHaber1;
        } else if (cargoN === 'C2') {
            blancos = blancos2;
            grises = grises2;
            negros = negros2;
            haber = haber2;
            arrayHaberTotal = arrayHaber2;
        } else if (cargoN === 'CT') {
            blancos = blancos1 + blancos2;
            grises = grises1 + grises2;
            negros = negros1 + negros2;
            haber = haber1 + haber2;
            arrayHaberTotal = arrayHaberTotal;
        };
        arrayBarras[0].push(blancos);
        arrayBarras[1].push(grises);
        arrayBarras[2].push(negros);
        arrayBarras[3].push(haber);
    };

    const arrayBarrasDif = [
        [arrayBarras[0][0] / (arrayBarras[0][0] + arrayBarras[1][0] + arrayBarras[2][0])],
        [arrayBarras[1][0] / (arrayBarras[0][0] + arrayBarras[1][0] + arrayBarras[2][0])],
        [arrayBarras[2][0] / (arrayBarras[0][0] + arrayBarras[1][0] + arrayBarras[2][0])],
        [arrayBarras[3][0] / (arrayBarras[0][0] + arrayBarras[1][0] + arrayBarras[2][0])]
    ];

    for (let j = 0; j < 11; j++) {
        const difBlancos = (arrayBarras[0][j + 1] / arrayBarras[0][j]) * arrayBarrasDif[0][j];
        let difGrises = (arrayBarras[1][j + 1] / arrayBarras[1][j]) * arrayBarrasDif[1][j];
        if (arrayBarras[1][j] === 0 && isNaN(difGrises)) {
            difGrises = (arrayBarras[1][j + 1]) / (arrayBarras[0][j] + arrayBarras[1][j] + arrayBarras[2][j])
        };
        const difNegros = (arrayBarras[2][j + 1] / arrayBarras[2][j]) * arrayBarrasDif[2][j];
        const difHaber = (arrayBarras[3][j + 1] / arrayBarras[3][j]) * arrayBarrasDif[3][j];
        arrayBarrasDif[0].push(difBlancos.toFixed(2));
        arrayBarrasDif[1].push(difGrises.toFixed(2));
        arrayBarrasDif[2].push(difNegros.toFixed(2));
        arrayBarrasDif[3].push(difHaber.toFixed(2));
    };
    const opciones = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                        style: 'italic',
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    text: 'Índice Incremento Salarial',
                    display: true,
                    font: {
                        size: 22,
                        style: 'italic',
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 20
                    },
                }
            },
            x: {
                title: {
                    text: 'Meses - ' + ano,
                    display: true,
                    font: {
                        size: 20,
                        style: 'italic',
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 18
                    }
                }
            }
        }
    };
    const labelMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    if (tipo === 'barras') {
        chartBarras(ano, graficoId, [arrayBarrasDif[0], arrayBarrasDif[1], arrayBarrasDif[2], arrayBarrasDif[3]], labelMeses, opciones, cargoN);
        const aumentoRealAcumulado = ((arrayBarras[3][11] / arrayBarras[3][0]) - 1) * 100;
        let aumentoRealAcumuladoText = '👉 El gráfico muestra como fue incrementándose el salario en el primer cargo, partiendo de un salario unidad, y el crecimiento' +
            ' en proporciones de los distintos grupos de ítems.<br>El aumento real porcentual acumulado docente ' + ano + ', solo el primer cargo, fue de un ' + format(aumentoRealAcumulado) + '%<br>' +
            'Mientras que nuestro salario quedó 😡 sin compensar en un: ' + format((ultimaInflacionAcumulada - 1) * 100 - aumentoRealAcumulado) + '%';
        document.getElementById('aumento' + graficoId + ano + cargoN).innerHTML = aumentoRealAcumuladoText;
        return aumentoRealAcumulado;
    };
};

function cargarChart2(ano, tipo, graficoId, objeto, cargo) {
    const cargoN = cargo;
    const DATOS = objeto;
    let arrayAcumuladoInflacion = [];
    let arrayAcumuladoInflacionDesc = [];
    arrayAcumuladoInflacion.push((DATOS[ano][0] / 100) + 1);
    arrayAcumuladoInflacionDesc.push(arrayAcumuladoInflacion[0] - 1);
    for (let i = 1; i < 12; i++) {
        arrayAcumuladoInflacion[i] = arrayAcumuladoInflacion[i - 1] * ((DATOS[ano][i] / 100) + 1);
        arrayAcumuladoInflacionDesc.push(arrayAcumuladoInflacion[i] - 1);
    };

    const arrayHaber1 = [];
    const arrayHaber2 = [];
    let arrayHaberTotal = [];
    const zonaIndice = 0.2;
    const antiguegadIndice = 0.0;
    const jornadaExt = 0.0;
    const hijos = 0.0;
    const desc = 0.25;
    for (let i = 0; i < 12; i++) {
        const DATOS_SALARIO = buscarDataMes(ano, i.toString());
        let blancos1 = (1 - desc) * (DATOS_SALARIO.basico1 + DATOS_SALARIO.zona36 * zonaIndice + DATOS_SALARIO.antiguedad37 * antiguegadIndice + DATOS_SALARIO.ayMatDidac62 * DATOS_SALARIO.basico1 + DATOS_SALARIO.jornadaExt624 * DATOS_SALARIO.basico1 * jornadaExt);
        let gris1 = (1 - desc) * (DATOS_SALARIO.adRemDoc193 + DATOS_SALARIO.plusRem603 + DATOS_SALARIO.plusRef625);
        let negro1 = (DATOS_SALARIO.salarioFam3 + DATOS_SALARIO.ayudEscolar) * hijos + DATOS_SALARIO.asigEspLey140 + DATOS_SALARIO.compProv171 + DATOS_SALARIO.conectNac609;
        let haber1 = blancos1 + gris1 + negro1;
        let haber2 = blancos1 + negro1 + DATOS_SALARIO.adRemun2Cargo629;
        let sdmng = DATOS_SALARIO.sdmng;
        let progNacCompDoc168 = sdmng - (haber1 + haber2);
        if (progNacCompDoc168 <= 0) {
            progNacCompDoc168 = 0.0;
        };
        haber2 = haber2 + progNacCompDoc168;
        arrayHaber1.push(haber1);
        arrayHaber2.push(haber2);
        arrayHaberTotal.push(haber1 + haber2);
    };
    if (cargoN === 'C1') {
        arrayHaberTotal = arrayHaber1;
    } else if (cargoN === 'C2') {
        arrayHaberTotal = arrayHaber2;
    } else if (cargoN === 'CT') {
        arrayHaberTotal = arrayHaberTotal;
    }
    const salarioAumentoAcum = (arrayHaberTotal[11] / arrayHaberTotal[0]);
    const arrayHaberDif = [];
    for (let j = 0; j < 12; j++) {
        const difHaber = arrayHaberTotal[j] / arrayHaberTotal[0];
        const haberReal = difHaber - arrayAcumuladoInflacionDesc[j];
        arrayHaberDif.push(haberReal);
    };

    const opciones = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                        style: 'italic',
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    text: 'Índice Desvalorización Salarial',
                    display: true,
                    font: {
                        size: 22,
                        style: 'italic',
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 20
                    },
                }
            },
            x: {
                title: {
                    text: 'Meses - ' + ano,
                    display: true,
                    font: {
                        size: 20,
                        style: 'italic',
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 18
                    }
                }
            }
        }
    };
    const labelMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    if (tipo === 'combinado') {
        chartCombinado(ano, graficoId, arrayHaberDif, labelMeses, opciones, cargoN);
        let ultimoIndice;
        for (let k = 0; k < 12; k++) {
            if (!isNaN(arrayAcumuladoInflacion[k])) {
                ultimoIndice = arrayAcumuladoInflacion[k];
            };
        };
        const aumentoRealAcumulado = format((ultimoIndice - 1) * 100);
        if (ano === '2023') {
            let aumentoRealAcumuladoText = '👉 El gráfico muestra el salario real con aumentos, es decir, el salario nominal desvalorizado con la inflación.<br>' +
                'Los aumentos salariales fueron muy por debajo de la inflación y nunca se compensó la pérdida.<br>La inflación anual acumulada ' + ano + ' fue de un ' + aumentoRealAcumulado + '%';
            const variacion = salarioAumentoAcum - ultimoIndice;
            let variacionText;
            if (variacion > 0) {
                variacionText = '.<br>Por lo que nuestro salario nominal con aumentos, superó 😎 a la inflación en un ' + format(Math.abs(variacion * 100)) + '%';
            } else if (variacion === 0) {
                variacionText = '.<br>Por lo que nuestro salario nominal con aumentos, igualó 😬 a la inflación en un ' + format(Math.abs(variacion * 100)) + '%';
            } else if (variacion < 0) {
                variacionText = '.<br>Por lo que nuestro salario nominal con aumentos, cayó 😡 con la inflación en un ' + format(Math.abs(variacion * 100)) + '%';
            };

            document.getElementById('aumento' + graficoId + ano + cargoN).innerHTML = aumentoRealAcumuladoText + variacionText;
        } else {
            let aumentoRealAcumuladoText = '👉 El gráfico muestra el salario real con aumentos, es decir, el salario nominal desvalorizado con la inflación.<br>' +
                'Los aumentos salariales fueron muy por debajo de la inflación y nunca se compensó la pérdida.<br>La inflación anual acumulada ' + ano + ' es de un ' + aumentoRealAcumulado + '%';
            const variacion = salarioAumentoAcum - ultimoIndice;
            let variacionText;
            if (variacion > 0) {
                variacionText = '.<br>Por lo que nuestro salario nominal con aumentos, supera 😎 a la inflación en un ' + format(Math.abs(variacion * 100)) + '%';
            } else if (variacion === 0) {
                variacionText = '.<br>Por lo que nuestro salario nominal con aumentos, iguala 😬 a la inflación en un ' + format(Math.abs(variacion * 100)) + '%';
            } else if (variacion < 0) {
                variacionText = '.<br>Por lo que nuestro salario nominal con aumentos, cae 😡 con la inflación en un ' + format(Math.abs(variacion * 100)) + '%';
            };

            document.getElementById('aumento' + graficoId + ano + cargoN).innerHTML = aumentoRealAcumuladoText + variacionText + '<br>(sin tener en cuenta la caida del año pasado).';
        };
    };
};

function cargarChart3(ano, tipo, graficoId) {
    const arrayHaber1 = [];
    const arrayHaber2 = [];
    const arrayHaberTotal = [];
    const arrayHaberTotal2 = [];
    const zonaIndice = 0.2;
    const antiguegadIndice = 0.0;
    const jornadaExt = 0.0;
    const hijos = 0.0;
    const desc = 0.25;
    for (let i = 0; i < 12; i++) {
        const DATOS_SALARIO = buscarDataMes(ano, i.toString());
        let blancos1 = (1 - desc) * (DATOS_SALARIO.basico1 + DATOS_SALARIO.zona36 * zonaIndice + DATOS_SALARIO.antiguedad37 * antiguegadIndice + DATOS_SALARIO.ayMatDidac62 * DATOS_SALARIO.basico1 + DATOS_SALARIO.jornadaExt624 * DATOS_SALARIO.basico1 * jornadaExt);
        let gris1 = (1 - desc) * (DATOS_SALARIO.adRemDoc193 + DATOS_SALARIO.plusRem603 + DATOS_SALARIO.plusRef625);
        let negro1 = (DATOS_SALARIO.salarioFam3 + DATOS_SALARIO.ayudEscolar) * hijos + DATOS_SALARIO.asigEspLey140 + DATOS_SALARIO.compProv171 + DATOS_SALARIO.conectNac609;
        let haber1 = blancos1 + gris1 + negro1;
        let haber2 = blancos1 + negro1 + DATOS_SALARIO.adRemun2Cargo629;
        let sdmng = DATOS_SALARIO.sdmng;
        let progNacCompDoc168 = sdmng - (haber1 + haber2);
        if (progNacCompDoc168 <= 0) {
            progNacCompDoc168 = 0.0;
        };
        haber2 = haber2 + progNacCompDoc168;
        arrayHaber1.push(haber1);
        arrayHaber2.push(haber2);
        arrayHaberTotal.push(haber1 + haber2);
        arrayHaberTotal2.push(2 * haber1);
    };
    const opciones = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                        style: 'italic',
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    text: 'Salario nominal',
                    display: true,
                    font: {
                        size: 22,
                        style: 'italic',
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 20
                    },
                    callback: function (value, index, values) {
                        return '$' + value.toLocaleString();
                    }
                }
            },
            x: {
                title: {
                    text: 'Meses - ' + ano,
                    display: true,
                    font: {
                        size: 20,
                        style: 'italic',
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 18
                    }
                }
            }
        }
    };
    const labelMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    if (tipo === 'lineal') {
        const sdmng = date.sdmng[ano];
        let ultimoIndice = -1;
        for (let i = 0; i < sdmng.length; i++) {
            if (sdmng[i] !== '---') {
                ultimoIndice += 1;
            };
        };
        for (let j = 0; j < sdmng.length; j++) {
            if (sdmng[j] === '---') {
                sdmng[j] = sdmng[ultimoIndice];
            };
        };
        chartLineal(ano, graficoId, [date.canastaBasica[ano], date.sdmng[ano], arrayHaber1, arrayHaber2, arrayHaberTotal, arrayHaberTotal2], labelMeses, opciones);
        let aumentoRealAcumuladoText = '👉 Este gráfico muestra como fueron cambiando en el ' + ano + ' los valores absolutos de la Canasta Básica, el Salario Docente Mínimo Garantizado ' +
            'Nacional de paritarias, el neto del salario de un docente con un cargo, el neto del salario solo en un segundo cargo, que nos pagan con los códigos 629 y 168 ' +
            '(solo se encuentran en los segundos cargos), el salario neto si tuviese dos cargos. El "salario que debería ser" es, dos cargos, dos sueldos iguales, ¡Es lo lógico!<br>' +
            '⚠️ Ni siquiera algunas curvas están encima de la amarilla y todas deberían estar por encima de la azul.<br>¡Queremos que nos paguen como pagan en una provincia 🙄 normal!';
        document.getElementById('aumento' + graficoId + ano).innerHTML = aumentoRealAcumuladoText;
    };
};

function chartBarras(ano, grafico, array, labelMeses, opciones, cargo) {
    const ctx = document.getElementById('myChart' + grafico.toString() + ano + cargo).getContext('2d');
    const colores = [
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 99, 132, 0.4)'
    ];
    const bordes = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)'
    ];
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Ítems Blancos',
                data: array[0],
                borderWidth: 1,
                order: 1,
                backgroundColor: colores[0],
                borderColor: bordes[0]
            }, {
                label: 'Ítems Grises',
                data: array[1],
                borderWidth: 1,
                order: 2,
                backgroundColor: colores[1],
                borderColor: bordes[1]
            }, {
                label: 'Ítems Negros',
                data: array[2],
                borderWidth: 1,
                order: 3,
                backgroundColor: colores[2],
                borderColor: bordes[2]
            }, {
                label: 'Haber Total',
                data: array[3],
                type: 'line',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                fill: false,
                order: 4
            }],
            labels: labelMeses
        },
        options: opciones
    });
};

function chartCombinado(ano, grafico, array, labelMeses, opciones, cargoN) {
    const ctx = document.getElementById('myChart' + grafico.toString() + ano + cargoN).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Barra Salarial',
                data: array,
                backgroundColor: colorBarras(0.2),
                borderColor: colorBarras(1),
                borderWidth: 1,
                order: 1
            }, {
                label: 'Curva Salarial',
                data: array,
                type: 'line',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
                order: 2
            }],
            labels: labelMeses
        },
        options: opciones
    });
};

function chartLineal(ano, grafico, array, labelMeses, opciones) {
    const ctx = document.getElementById('myChart' + grafico.toString() + ano).getContext('2d');
    const colores = [
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(128, 191, 157, 0.4)',
        'rgba(0, 0, 0, 0.4)',
        'rgba(0, 0, 0, 0.1)'
    ];
    const bordes = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(128, 191, 157, 1)',
        'rgba(0, 0, 0, 0.4)',
        'rgba(0, 0, 0, 0.1)'
    ];
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Canasta Básica ',
                data: array[0],
                type: 'line',
                backgroundColor: colores[0],
                borderColor: bordes[0],
                fill: false,
                order: 1
            }, {
                label: 'SDMGN ',
                data: array[1],
                type: 'line',
                backgroundColor: colores[1],
                borderColor: bordes[1],
                fill: false,
                order: 2
            }, {
                label: 'Salario en 1° Cargo ',
                data: array[2],
                type: 'line',
                backgroundColor: colores[2],
                borderColor: bordes[2],
                fill: false,
                order: 3
            }, {
                label: 'Salario en 2° Cargo ',
                data: array[3],
                type: 'line',
                backgroundColor: colores[3],
                borderColor: bordes[3],
                fill: false,
                order: 4
            }, {
                label: 'Salario Total (con dos cargos)',
                data: array[4],
                type: 'line',
                backgroundColor: colores[4],
                borderColor: bordes[4],
                fill: false,
                order: 5
            }, {
                label: 'Salario que debería ser',
                data: array[5],
                type: 'line',
                backgroundColor: colores[5],
                borderColor: bordes[5],
                fill: false,
                order: 6
            }],
            labels: labelMeses
        },
        options: opciones
    });
};

function colorBarras(tono = 0.2) {
    return ['rgba(255, 99, 132, ' + tono + ')', 'rgba(255, 159, 64, ' + tono + ')', 'rgba(75, 192, 192, ' + tono + ')', 'rgba(255, 205, 86, ' + tono + ')', 'rgba(54, 162, 235, ' + tono + ')', 'rgba(153, 102, 255, ' + tono + ')', 'rgba(0, 0, 0, ' + tono + ')', 'rgba(255, 0, 0, ' + tono + ')', 'rgba(255, 165, 0, ' + tono + ')', 'rgba(255, 255, 0, ' + tono + ')', 'rgba(0, 128, 0, ' + tono + ')', 'rgba(0, 0, 255, ' + tono + ')'];
};

document.getElementsByName('chart1Radio').forEach(function (radio) {
    radio.addEventListener('click', function () {
        var anoSeleccionado = document.querySelector('input[name="chart1Radio"]:checked').value;
        var cargoSeleccionado = document.querySelector('input[name="chart1CRadio"]:checked').value;
        if (anoSeleccionado === '2023') {
            if (cargoSeleccionado === 'C1') {
                document.getElementById('myChartHaber2023C1Div').hidden = false;
                document.getElementById('myChartHaber2024C1Div').hidden = true;
                document.getElementById('myChartHaber2023C2Div').hidden = true;
                document.getElementById('myChartHaber2024C2Div').hidden = true;
                document.getElementById('myChartHaber2023CTDiv').hidden = true;
                document.getElementById('myChartHaber2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'C2') {
                document.getElementById('myChartHaber2023C1Div').hidden = true;
                document.getElementById('myChartHaber2024C1Div').hidden = true;
                document.getElementById('myChartHaber2023C2Div').hidden = false;
                document.getElementById('myChartHaber2024C2Div').hidden = true;
                document.getElementById('myChartHaber2023CTDiv').hidden = true;
                document.getElementById('myChartHaber2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'CT') {
                document.getElementById('myChartHaber2023C1Div').hidden = true;
                document.getElementById('myChartHaber2024C1Div').hidden = true;
                document.getElementById('myChartHaber2023C2Div').hidden = true;
                document.getElementById('myChartHaber2024C2Div').hidden = true;
                document.getElementById('myChartHaber2023CTDiv').hidden = false;
                document.getElementById('myChartHaber2024CTDiv').hidden = true;
            };
        } else if (anoSeleccionado === '2024') {
            if (cargoSeleccionado === 'C1') {
                document.getElementById('myChartHaber2023C1Div').hidden = true;
                document.getElementById('myChartHaber2024C1Div').hidden = false;
                document.getElementById('myChartHaber2023C2Div').hidden = true;
                document.getElementById('myChartHaber2024C2Div').hidden = true;
                document.getElementById('myChartHaber2023CTDiv').hidden = true;
                document.getElementById('myChartHaber2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'C2') {
                document.getElementById('myChartHaber2023C1Div').hidden = true;
                document.getElementById('myChartHaber2024C1Div').hidden = true;
                document.getElementById('myChartHaber2023C2Div').hidden = true;
                document.getElementById('myChartHaber2024C2Div').hidden = false;
                document.getElementById('myChartHaber2023CTDiv').hidden = true;
                document.getElementById('myChartHaber2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'CT') {
                document.getElementById('myChartHaber2023C1Div').hidden = true;
                document.getElementById('myChartHaber2024C1Div').hidden = true;
                document.getElementById('myChartHaber2023C2Div').hidden = true;
                document.getElementById('myChartHaber2024C2Div').hidden = true;
                document.getElementById('myChartHaber2023CTDiv').hidden = true;
                document.getElementById('myChartHaber2024CTDiv').hidden = false;
            };
        };
    });
});

document.getElementsByName('chart1CRadio').forEach(function (radioC) {
    radioC.addEventListener('click', function () {
        var cargoSeleccionado = document.querySelector('input[name="chart1CRadio"]:checked').value;
        var anoSeleccionado = document.querySelector('input[name="chart1Radio"]:checked').value;
        if (cargoSeleccionado === 'C1') {
            if (anoSeleccionado === '2023') {
                document.getElementById('myChartHaber2023C1Div').hidden = false;
                document.getElementById('myChartHaber2024C1Div').hidden = true;
            } else if (anoSeleccionado === '2024') {
                document.getElementById('myChartHaber2023C1Div').hidden = true;
                document.getElementById('myChartHaber2024C1Div').hidden = false;
            };
            document.getElementById('myChartHaber2023C2Div').hidden = true;
            document.getElementById('myChartHaber2024C2Div').hidden = true;
            document.getElementById('myChartHaber2023CTDiv').hidden = true;
            document.getElementById('myChartHaber2024CTDiv').hidden = true;
        } else if (cargoSeleccionado === 'C2') {
            document.getElementById('myChartHaber2023C1Div').hidden = true;
            document.getElementById('myChartHaber2024C1Div').hidden = true;
            if (anoSeleccionado === '2023') {
                document.getElementById('myChartHaber2023C2Div').hidden = false;
                document.getElementById('myChartHaber2024C2Div').hidden = true;
            } else if (anoSeleccionado === '2024') {
                document.getElementById('myChartHaber2023C2Div').hidden = true;
                document.getElementById('myChartHaber2024C2Div').hidden = false;
            };
            document.getElementById('myChartHaber2023CTDiv').hidden = true;
            document.getElementById('myChartHaber2024CTDiv').hidden = true;
        } else if (cargoSeleccionado === 'CT') {
            document.getElementById('myChartHaber2023C1Div').hidden = true;
            document.getElementById('myChartHaber2024C1Div').hidden = true;
            document.getElementById('myChartHaber2023C2Div').hidden = true;
            document.getElementById('myChartHaber2024C2Div').hidden = true;
            if (anoSeleccionado === '2023') {
                document.getElementById('myChartHaber2023CTDiv').hidden = false;
                document.getElementById('myChartHaber2024CTDiv').hidden = true;
            } else if (anoSeleccionado === '2024') {
                document.getElementById('myChartHaber2023CTDiv').hidden = true;
                document.getElementById('myChartHaber2024CTDiv').hidden = false;
            };
        };
    });
});

document.getElementsByName('chart2Radio').forEach(function (radio) {
    radio.addEventListener('click', function () {
        var anoSeleccionado = document.querySelector('input[name="chart2Radio"]:checked').value;
        var cargoSeleccionado = document.querySelector('input[name="chart2CRadio"]:checked').value;
        if (anoSeleccionado === '2023') {
            if (cargoSeleccionado === 'C1') {
                document.getElementById('myChartInflacion2023C1Div').hidden = false;
                document.getElementById('myChartInflacion2023C2Div').hidden = true;
                document.getElementById('myChartInflacion2023CTDiv').hidden = true;
                document.getElementById('myChartInflacion2024C1Div').hidden = true;
                document.getElementById('myChartInflacion2024C2Div').hidden = true;
                document.getElementById('myChartInflacion2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'C2') {
                document.getElementById('myChartInflacion2023C1Div').hidden = true;
                document.getElementById('myChartInflacion2023C2Div').hidden = false;
                document.getElementById('myChartInflacion2023CTDiv').hidden = true;
                document.getElementById('myChartInflacion2024C1Div').hidden = true;
                document.getElementById('myChartInflacion2024C2Div').hidden = true;
                document.getElementById('myChartInflacion2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'CT') {
                document.getElementById('myChartInflacion2023C1Div').hidden = true;
                document.getElementById('myChartInflacion2023C2Div').hidden = true;
                document.getElementById('myChartInflacion2023CTDiv').hidden = false;
                document.getElementById('myChartInflacion2024C1Div').hidden = true;
                document.getElementById('myChartInflacion2024C2Div').hidden = true;
                document.getElementById('myChartInflacion2024CTDiv').hidden = true;
            };
        } else {
            if (cargoSeleccionado === 'C1') {
                document.getElementById('myChartInflacion2023C1Div').hidden = true;
                document.getElementById('myChartInflacion2023C2Div').hidden = true;
                document.getElementById('myChartInflacion2023CTDiv').hidden = true;
                document.getElementById('myChartInflacion2024C1Div').hidden = false;
                document.getElementById('myChartInflacion2024C2Div').hidden = true;
                document.getElementById('myChartInflacion2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'C2') {
                document.getElementById('myChartInflacion2023C1Div').hidden = true;
                document.getElementById('myChartInflacion2023C2Div').hidden = true;
                document.getElementById('myChartInflacion2023CTDiv').hidden = true;
                document.getElementById('myChartInflacion2024C1Div').hidden = true;
                document.getElementById('myChartInflacion2024C2Div').hidden = false;
                document.getElementById('myChartInflacion2024CTDiv').hidden = true;
            } else if (cargoSeleccionado === 'CT') {
                document.getElementById('myChartInflacion2023C1Div').hidden = true;
                document.getElementById('myChartInflacion2023C2Div').hidden = true;
                document.getElementById('myChartInflacion2023CTDiv').hidden = true;
                document.getElementById('myChartInflacion2024C1Div').hidden = true;
                document.getElementById('myChartInflacion2024C2Div').hidden = true;
                document.getElementById('myChartInflacion2024CTDiv').hidden = false;
            };
        };
    });
});

document.getElementsByName('chart2CRadio').forEach(function (radioC) {
    radioC.addEventListener('click', function () {
        var cargoSeleccionado = document.querySelector('input[name="chart2CRadio"]:checked').value;
        var anoSeleccionado = document.querySelector('input[name="chart2Radio"]:checked').value;
        if (cargoSeleccionado === 'C1') {
            if (anoSeleccionado === '2023') {
                document.getElementById('myChartInflacion2023C1Div').hidden = false;
                document.getElementById('myChartInflacion2024C1Div').hidden = true;
            } else if (anoSeleccionado === '2024') {
                document.getElementById('myChartInflacion2023C1Div').hidden = true;
                document.getElementById('myChartInflacion2024C1Div').hidden = false;
            };
            document.getElementById('myChartInflacion2023C2Div').hidden = true;
            document.getElementById('myChartInflacion2024C2Div').hidden = true;
            document.getElementById('myChartInflacion2023CTDiv').hidden = true;
            document.getElementById('myChartInflacion2024CTDiv').hidden = true;
        } else if (cargoSeleccionado === 'C2') {
            document.getElementById('myChartInflacion2023C1Div').hidden = true;
            document.getElementById('myChartInflacion2024C1Div').hidden = true;
            if (anoSeleccionado === '2023') {
                document.getElementById('myChartInflacion2023C2Div').hidden = false;
                document.getElementById('myChartInflacion2024C2Div').hidden = true;
            } else if (anoSeleccionado === '2024') {
                document.getElementById('myChartInflacion2023C2Div').hidden = true;
                document.getElementById('myChartInflacion2024C2Div').hidden = false;
            };
            document.getElementById('myChartInflacion2023CTDiv').hidden = true;
            document.getElementById('myChartInflacion2024CTDiv').hidden = true;
        } else if (cargoSeleccionado === 'CT') {
            document.getElementById('myChartInflacion2023C1Div').hidden = true;
            document.getElementById('myChartInflacion2024C1Div').hidden = true;
            document.getElementById('myChartInflacion2023C2Div').hidden = true;
            document.getElementById('myChartInflacion2024C2Div').hidden = true;
            if (anoSeleccionado === '2023') {
                document.getElementById('myChartInflacion2023CTDiv').hidden = false;
                document.getElementById('myChartInflacion2024CTDiv').hidden = true;
            } else if (anoSeleccionado === '2024') {
                document.getElementById('myChartInflacion2023CTDiv').hidden = true;
                document.getElementById('myChartInflacion2024CTDiv').hidden = false;
            };
        };
    });
});

document.getElementsByName('chart3Radio').forEach(function (radio) {
    radio.addEventListener('click', function () {
        var anoSeleccionado = document.querySelector('input[name="chart3Radio"]:checked').value;
        if (anoSeleccionado === '2023') {
            document.getElementById('myChartLineal2023Div').hidden = false;
            document.getElementById('myChartLineal2024Div').hidden = true;
        } else {
            document.getElementById('myChartLineal2023Div').hidden = true;
            document.getElementById('myChartLineal2024Div').hidden = false;
        };
    });
});

function ultimoIndice(array) {
    let ultimoIndice;
    for (let k = 0; k < 12; k++) {
        if (!isNaN(array[k])) {
            ultimoIndice = array[k];
        };
    };
    return ultimoIndice;
};

function format(number) {
    let numberFromat = number * 1;
    if ((typeof numberFromat) === 'number') {
        numberFromat = Number((numberFromat).toFixed(2));
        numberFromat = numberFromat.toLocaleString('es-AR', {
            //            style: 'currency',
            //            currency: 'ARS',
        });
    } else if (numberFromat === '') {
        numberFromat = '----------';
    };
    return numberFromat;
};