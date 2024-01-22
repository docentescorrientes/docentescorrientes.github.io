const fechaHoy = new Date()
let mesActual = fechaHoy.getMonth();
let anoActual = fechaHoy.getFullYear();


// El valor de 1 (una) Canasta Básica Total tipo 2 según INDEC https://www.argentina.gob.ar/subsidios/canasta (valores a mediado del mes estan publicados)
var canastaBasica = {
    2023: [163538.68, 177062.87, 191228.05, 203360.69, 217915.79, 232426.83, 248962.01, 284686.95, 319422.04, 345295.45, 390456.32, '---'],
    2024: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
},
    // El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023 (dolar blue cotización los primeros días del mes)
    dolarBlue = {
        2023: [342, 381, 375, 395, 469, 480, 495, 560, 735, 800, 915, 955],
        2024: [1025, '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---',]
    },
    // El valor de la inflación IPC Nacional https://www.economia.gob.ar/datos/ (valores a mediado del mes estan publicados)
    inflacion = {
        2023: [6.02787356638426, 6.62772168092709, 7.67523984978356, 8.4, 7.8, 6.0, 6.3, 12.44163772869, 12.7, 8.31, 12.81, '---'],
        2024: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    },
    // Paritarias Nacionales Salario Docente Mínimo Nacional Garantizado (SDMNG)
    sdmng = {
        2023: [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000],
        2024: [250000, '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };

var h1ElementTitleDatosInfo = document.getElementById('datosInfoH1');
h1ElementTitleDatosInfo.textContent += anoActual; //dolarBlue[anoActual-1][1];
const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let anoCanastaBasica = anoActual;
let mesCanastaBasica;
let barraAnoCanastaBasica;
if (canastaBasica[anoCanastaBasica][0] === '---') {
    anoCanastaBasica -= 1;
    for (let i = 0; i < 12; i++) {
        if (canastaBasica[anoCanastaBasica][i] !== '---') {
            mesCanastaBasica = i;
            barraAnoCanastaBasica = '/' + anoCanastaBasica
        }
    }
} else {
    for (let i = 0; i < 12; i++) {
        if (canastaBasica[anoCanastaBasica][i] !== '---') {
            mesCanastaBasica = i;
            barraAnoCanastaBasica = ''
        }
    }
}
document.getElementById("fechaCanastaBasica").textContent = mes[mesCanastaBasica] + barraAnoCanastaBasica;
document.getElementById("canastaBasica").textContent = formatPesos(canastaBasica[anoCanastaBasica][mesCanastaBasica]);

let anoDolarBlue = anoActual;
let mesDolarBlue;
let barraAnoDolarBlue;
if (dolarBlue[anoDolarBlue][0] === '---') {
    anoDolarBlue -= 1;
    for (let i = 0; i < 12; i++) {
        if (dolarBlue[anoDolarBlue][i] !== '---') {
            mesDolarBlue = i;
            barraAnoDolarBlue = '/' + anoDolarBlue
        }
    }
} else {
    for (let i = 0; i < 12; i++) {
        if (dolarBlue[anoDolarBlue][i] !== '---') {
            mesDolarBlue = i;
            barraAnoDolarBlue = ''
        }
    }
}
document.getElementById("fechaDolarBlue").textContent = mes[mesDolarBlue] + barraAnoDolarBlue;
document.getElementById("dolarBlue").textContent = formatPesos(dolarBlue[anoDolarBlue][mesDolarBlue]);

let anoInflacion = anoActual;
let mesInflacion;
let barraAnoInflacion;
if (inflacion[anoInflacion][0] === '---') {
    anoInflacion -= 1;
    for (let i = 0; i < 12; i++) {
        if (inflacion[anoInflacion][i] !== '---') {
            mesInflacion = i;
            barraAnoInflacion = '/' + anoInflacion
        }
    }
} else {
    for (let i = 0; i < 12; i++) {
        if (inflacion[anoInflacion][i] !== '---') {
            mesInflacion = i;
            barraAnoInflacion = ''
        }
    }
}
document.getElementById("fechaInflacion").textContent = mes[mesInflacion] + barraAnoInflacion;
document.getElementById('inflacion').textContent = inflacion[anoInflacion][mesInflacion] + '%';

function inflacionAcumulada() {
    let n = 0;
    let acumulada = 1;
    for (let i = 0; i < 12; i++) {
        if (inflacion[anoInflacion][i] !== '---') {
            acumulada *= 1 + (inflacion[anoInflacion][n] / 100);
            n += 1;
        }
    }
    acumulada = formatNumero(((acumulada - 1) * 100).toFixed(2))
    return acumulada;
};

document.getElementById("inflacionAcumulada").textContent = inflacionAcumulada();

let anoSdmng = anoActual;
let mesSdmng;
let barraAnoSdmng;
if (sdmng[anoSdmng][0] === '---') {
    anoSdmng -= 1;
    for (let i = 0; i < 12; i++) {
        if (sdmng[anoSdmng][i] !== '---') {
            mesSdmng = i;
            barraAnoSdmng = '/' + anoSdmng
        }
    }
} else {
    for (let i = 0; i < 12; i++) {
        if (sdmng[anoSdmng][i] !== '---') {
            mesSdmng = i;
            barraAnoSdmng = ''
        }
    }
}
document.getElementById("fechaParitarias").textContent = mes[mesSdmng] + barraAnoSdmng;
document.getElementById("paritarias").textContent = formatPesos(sdmng[anoSdmng][mesSdmng]);


function formatPesos(number) {
    const numberFormat = number.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
    return numberFormat;
};

function formatNumero(number) {
    const formattedNumber = number.toString().replace('.', ',');
    const numberFormat = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return numberFormat;
};

