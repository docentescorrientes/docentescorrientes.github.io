const fechaHoy = new Date()
const mesActual = fechaHoy.getMonth();
const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// El valor de 1 (una) Canasta Básica Total tipo 2 según INDEC https://www.argentina.gob.ar/subsidios/canasta
var canastaBasica = [163538.68, 177062.87, 191228.05, 191228.05, 217915.79, 232426.83, 248962.01, 284686.95, "---", "---", "---", "---"];
// El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023
var dolarBlue = [342, 381, 375, 395, 469, 480, 495, 560, 735, "---", "---", "---"];
// El valor de la inflación IPC Nacional https://www.economia.gob.ar/datos/
var inflacion = [6.02787356638426, 6.62772168092709, 7.67523984978356, 8.4, 7.8, 6.0, 6.3, 12.44163772869, "---", "---", "---", "---"];
// Paritarias Nacionales Salario Docente Mínimo Nacional Garantizado (SDMNG)
var sdmng = [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000];

document.getElementById("fechaCanastaBasica").textContent = mes[mesActual-1];
document.getElementById("canastaBasica").textContent = formatPesos(canastaBasica[mesActual-1]);


document.getElementById("fechaDolarBlue").textContent = mes[mesActual];
document.getElementById("dolarBlue").textContent = formatPesos(dolarBlue[mesActual]);

function inflacionAcumulada() {
    var n = 0;
    var acumulada = 1;
    while (inflacion[n] !== "---") {
        acumulada *= 1 + (inflacion[n] / 100);
        n += 1;
    };
    acumulada = formatNumero(((acumulada - 1) * 100).toFixed(2)) + "%"
    return [acumulada,n-1];
};
var inflacionMes ="---";
if(inflacion[mesActual-1] !=="---"){
    inflacionMes = formatNumero(inflacion[mesActual-1].toFixed(2));
};
document.getElementById('inflacion').textContent = inflacionMes + "%";
document.getElementById("fechaInflacion").textContent = mes[mesActual-1];
document.getElementById("inflacionAcumulada").textContent = inflacionAcumulada()[0];
document.getElementById("fechaInflacionAcumulada1").textContent = mes[inflacionAcumulada()[1]];
document.getElementById("fechaInflacionAcumulada2").textContent = mes[inflacionAcumulada()[1]];

document.getElementById("fechaParitarias").textContent = mes[mesActual];
document.getElementById("paritarias").textContent = formatPesos(sdmng[mesActual]);

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

