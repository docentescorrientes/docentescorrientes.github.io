//Start Versión
const version = "4.0", fecha = 'Agosto de 2024';
document.getElementById('versionH6').insertAdjacentHTML("beforeend", version + '<br>' + fecha + '<br> @augusalterats');
//End Versión

import dateGeneral from './date.js';
const date = dateGeneral();
var canastaBasica = date.canastaBasica;
var canastaBasicaA = date.canastaBasicaA;
var canastaBasicaBT = date.canastaBasicaBT;
var canastaBasicaBA = date.canastaBasicaBA;
var dolarBlue = date.dolarBlue;
var inflacion = date.inflacionNac;
var inflacionNea = date.inflacionNea;
var sdmng = date.sdmng;


/*Datos Informativos y version en Simulador*/
//Start Carga Datos Informativos
const fechaHoy = new Date()
let mesActual = fechaHoy.getMonth();
let anoActual = fechaHoy.getFullYear();
const h1ElementTitleDatosInfo = document.getElementById('datosInfoH1');
h1ElementTitleDatosInfo.textContent += anoActual;
const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
// End Carga Datos Informativos

// Start Busca último dato y lo carga Canasta Básica, Dolar Blue, Inlflación y SDNMG
const idFechas = ['fechaCanastaBasica', 'fechaDolarBlue', 'fechaInflacion', 'fechaSdmng'];
const idDatos = ['canastaBasica', 'dolarBlue', 'inflacion', 'sdmng'];
const arrayDatos = [canastaBasica, dolarBlue, inflacion, sdmng];
for (let i = 0; i < 4; i++) {
    let datos = arrayDatos[i];
    document.getElementById(idFechas[i]).textContent = mes[buscaUltimoDato(datos)[1]] + '/' + buscaUltimoDato(datos)[0];
    document.getElementById(idDatos[i]).textContent = formatNumero(datos[buscaUltimoDato(datos)[0]][buscaUltimoDato(datos)[1]]);
};
document.getElementById('fechaCanastaBasicaT').textContent = mes[buscaUltimoDato(canastaBasica)[1]] + ' del ' + buscaUltimoDato(canastaBasica)[0];
document.getElementById('canastaBasicaT').textContent = formatNumero(canastaBasica[buscaUltimoDato(canastaBasica)[0]][buscaUltimoDato(canastaBasica)[1]]);
document.getElementById('canastaBasicaA').textContent = formatNumero(canastaBasicaA[buscaUltimoDato(canastaBasicaA)[0]][buscaUltimoDato(canastaBasicaA)[1]]);

document.getElementById('fechaCanastaBasicaT2').textContent = mes[buscaUltimoDato(canastaBasicaBT)[1]] + ' del ' + buscaUltimoDato(canastaBasicaBT)[0];
document.getElementById('canastaBasicaT2').textContent = formatNumero(canastaBasicaBT[buscaUltimoDato(canastaBasicaBT)[0]][buscaUltimoDato(canastaBasicaBT)[1]]);
document.getElementById('canastaBasicaA2').textContent = formatNumero(canastaBasicaBA[buscaUltimoDato(canastaBasicaBA)[0]][buscaUltimoDato(canastaBasicaBA)[1]]);

document.getElementById("inflacionAntAcumulada").textContent = inflacionAcumulada(anoActual-1) + '%';
document.getElementById("anoAntInflacion").textContent = (anoActual-1);
document.getElementById("inflacionAcumulada").textContent = inflacionAcumulada(buscaUltimoDato(inflacion)[0]);
document.getElementById("anoInflacion").textContent = anoActual;

document.getElementById("inflacionAntAcumuladaNea").textContent = inflacionAcumuladaNea(anoActual-1) + '%';
document.getElementById("anoAntInflacionNea").textContent = (anoActual-1);
document.getElementById("inflacionAcumuladaNea").textContent = inflacionAcumuladaNea(buscaUltimoDato(inflacionNea)[0]);
document.getElementById("anoInflacionNea").textContent = anoActual;

//End Busca último dato y lo carga Canasta Básica, Dolar Blue, Inlflación y SDNMG

//Start Funciones
function mesText(mesN){
    let mesReturn = mesN;
    const mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    if(mesN === -1){
        mesReturn = 11;
    };
    mesReturn = mes[mesReturn];
    return mesReturn;
};

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

function inflacionAcumuladaNea(ano) {
    let n = 0;
    let acumulada = 1;
    for (let i = 0; i < 12; i++) {
        if (inflacionNea[ano][i] !== '---') {
            acumulada *= 1 + (inflacionNea[ano][n] / 100);
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