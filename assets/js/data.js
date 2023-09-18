const mesSelect = 8;
const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// El valor de 1 (una) Canasta Básica Total tipo 2 según INDEC
var canastaBasica = [163538.68, 177062.87, 191228.05, 191228.05, 217915.79, 232426.83, 248962.01, 284686.95, "---", "---", "---", "---"];

document.getElementById("fechaCanastaBasica").textContent = mes[mesSelect - 1];
document.getElementById("canastaBasica").textContent = formatPesos(canastaBasica[mesSelect - 1]);
// El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023
var dolarBlue = [342, 381, 375, 395, 469, 480, 495, 560, 722, "---", "---", "---"];

document.getElementById("fechaDolarBlue").textContent = mes[mesSelect];
document.getElementById("dolarBlue").textContent = formatPesos(dolarBlue[mesSelect]);
// El valor de la inflación
var inflacion = [6.0, 6.6, 7.7, 8.4, 7.8, 6.0, 6.3, 12.4, "---", "---", "---", "---"];

function inflacionAcumulada() {
    var n = 0;
    var acumulada = 1;
    while (inflacion[n] !== "---") {
        acumulada *= 1 + (inflacion[n] / 100);
        n += 1;
    };
    acumulada = formatNumero(((acumulada - 1) * 100).toFixed(2)) + " %"
    return acumulada;
};
document.getElementById('inflacionAcumulada').textContent = inflacionAcumulada();
document.getElementById("fechaInflacion").textContent = mes[mesSelect - 1];
document.getElementById("inflacion").textContent = formatNumero(inflacion[mesSelect - 1]) + " %";

// Paritarias nacionales 
var sdmng = [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000];
document.getElementById("fechaParitarias").textContent = mes[mesSelect];
document.getElementById("paritarias").textContent = formatPesos(sdmng[mesSelect]);

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

