/*Datos Informativos y version en Simulador*/
//Start Carga Datos Informativos
const fechaHoy = new Date()
let mesActual = fechaHoy.getMonth();
let anoActual = fechaHoy.getFullYear();
const h1ElementTitleDatosInfo = document.getElementById('datosInfoH1');
h1ElementTitleDatosInfo.textContent += anoActual;
const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
// End Carga Datos Informativos

//Start Datos Informativos
// El valor de 1 (una) Canasta Básica Total tipo 2 según INDEC https://www.argentina.gob.ar/subsidios/canasta (valores a mediado del mes estan publicados)
var canastaBasica = {
    2023: [163538.68, 177062.87, 191228.05, 203360.69, 217915.79, 232426.83, 248962.01, 284686.95, 319422.04, 345295.45, 390456.32, 495798.32],
    2024: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
    2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
},
    /* El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023 
    (dolar blue cotización los primeros días del mes)*/
    dolarBlue = {
        2023: [342, 381, 375, 395, 469, 480, 495, 560, 735, 800, 915, 955],
        2024: [1025, '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---',],
        2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    },
    // El valor de la inflación IPC Nacional https://www.economia.gob.ar/datos/ (valores a mediado del mes estan publicados)
    inflacion = {
        2023: [6.02787356638426, 6.62772168092709, 7.67523984978356, 8.4, 7.8, 6.0, 6.3, 12.44163772869, 12.7, 8.31, 12.81, 25.5],
        2024: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
        2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    },
    // Paritarias Nacionales Salario Docente Mínimo Nacional Garantizado (SDMNG)
    sdmng = {
        2023: [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000],
        2024: [250000, '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
        2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
//End Datos Informativos

// Start Busca último dato y lo carga Canasta Básica, Dolar Blue, Inlflación y SDNMG
const idFechas = ['fechaCanastaBasica', 'fechaDolarBlue', 'fechaInflacion', 'fechaSdmng'];
const idDatos = ['canastaBasica', 'dolarBlue', 'inflacion', 'sdmng'];
const arrayDatos = [canastaBasica, dolarBlue, inflacion, sdmng];
for (let i = 0; i < 4; i++) {
    let datos = arrayDatos[i];
    document.getElementById(idFechas[i]).textContent = mes[buscaUltimoDato(datos)[1]] + '/' + buscaUltimoDato(datos)[0];
    document.getElementById(idDatos[i]).textContent = formatNumero(datos[buscaUltimoDato(datos)[0]][buscaUltimoDato(datos)[1]]);
}

document.getElementById("inflacionAcumulada").textContent = inflacionAcumulada(buscaUltimoDato(inflacion)[0]);
//End Busca último dato y lo carga Canasta Básica, Dolar Blue, Inlflación y SDNMG

//Start Funciones
function buscaUltimoDato(array) {
    let ano = anoActual;
    let mes;
    if (array[ano][0] === '---') {
        ano -= 1;
        for (let i = 0; i < 12; i++) {
            if (array[ano][i] !== '---') {
                mes = i;
            }
        }
    } else {
        for (let i = 0; i < 12; i++) {
            if (array[ano][i] !== '---') {
                mes = i;
            }
        }
    }
    return [ano, mes];
};

function inflacionAcumulada(ano) {
    let n = 0;
    let acumulada = 1;
    for (let i = 0; i < 12; i++) {
        if (inflacion[ano][i] !== '---') {
            acumulada *= 1 + (inflacion[ano][n] / 100);
            n += 1;
        }
    }
    acumulada = formatNumero(((acumulada - 1) * 100).toFixed(2))
    return acumulada;
};

function formatNumero(number) {
    const formattedNumber = number.toString().replace('.', ',');
    const numberFormat = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return numberFormat;
};
//End Funciones

//Start Versión
const version = "8.0", fecha = 'enero de 2024';
document.getElementById('versionH6').insertAdjacentHTML("beforeend", version + '<br>' + fecha + '<br> @augusalterats');
//End Versión
