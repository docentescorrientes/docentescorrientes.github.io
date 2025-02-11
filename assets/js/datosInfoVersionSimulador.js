// Start Versión
const version = "5.0", fecha = "Febrero de 2025";
document.getElementById("versionH6").insertAdjacentHTML("beforeend", `${version}<br>${fecha}<br>@augusalterats`);
// End Versión

import date from "./date.js";

console.log("Datos obtenidos de dateGeneral:", date());

const {
    canastaBasica,
    canastaBasicaA,
    inflacionNac: inflacion,
    canastaBasicaBT,
    canastaBasicaBA,
    dolarBlue,
    inflacionNea,
    sdmng
} = date;

// Fecha actual
const fechaHoy = new Date();
const mesActual = fechaHoy.getMonth();
const anoActual = fechaHoy.getFullYear();

// Mostrar el año actual en el título
document.getElementById("datosInfoH1").textContent += ` ${anoActual}`;

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Función para buscar el último dato disponible
const buscaUltimoDato = (array) => {
    if (!array) return [anoActual, 0]; // Validamos que el array exista

    let ano = anoActual;

    while (ano in array) { // Mientras haya datos en el año actual o anteriores
        let mes = array[ano]?.findLastIndex((val) => val !== "---");

        if (mes !== -1 && mes !== undefined) return [ano, mes]; // Si encontró un dato válido, lo devuelve

        ano--; // Si no encontró datos, retrocede un año
    }

    return [anoActual, 0]; // Si no encontró ningún dato, devuelve el año actual con 0
};





// Función para formatear números
const formatNumero = (num) => (num ? num.toLocaleString("es-AR") : "0");

// Función para calcular la inflación acumulada
const calcularInflacionAcumulada = (array, ano) => {
    if (!array[ano]) return "0,00";

    let acumulada = array[ano].reduce((acc, val) => (val !== "---" ? acc * (1 + val / 100) : acc), 1);

    return formatNumero(((acumulada - 1) * 100).toFixed(2));
};

// Cargar datos en los elementos del HTML
const cargarDatos = () => {
    // Dólar Blue
    const [anoCanastaBT, mesCanastaBT] = buscaUltimoDato(canastaBasicaBT);
    document.getElementById("fechaCanastaBasica").textContent = `${meses[mesCanastaBT]} / ${anoCanastaBT}`;
    document.getElementById("canastaBasica").textContent = formatNumero(dolarBlue[anoCanastaBT]?.[mesCanastaBT]);

    // Dólar Blue
    const [anoDolar, mesDolar] = buscaUltimoDato(dolarBlue);
    document.getElementById("fechaDolarBlue").textContent = `${meses[mesDolar]} / ${anoDolar}`;
    document.getElementById("dolarBlue").textContent = formatNumero(dolarBlue[anoDolar]?.[mesDolar]);

    // Canasta Básica Nacional
    const [anoCB, mesCB] = buscaUltimoDato(canastaBasica);
    document.getElementById("fechaCBNAC").textContent = `${meses[mesCB]} del ${anoCB}`;
    document.getElementById("cbtNAC").textContent = formatNumero(canastaBasica[anoCB]?.[mesCB]);
    document.getElementById("cbaNAC").textContent = formatNumero(canastaBasicaA[anoCB]?.[mesCB]);

    // Canasta Básica Corrientes (ISEPCI)
    const [anoCBT2, mesCBT2] = buscaUltimoDato(canastaBasicaBT);
    document.getElementById("fechaCBNEA").textContent = `${meses[mesCBT2]} del ${anoCBT2}`;
    document.getElementById("cbtNEA").textContent = formatNumero(canastaBasicaBT[anoCBT2]?.[mesCBT2]);
    document.getElementById("cbaNEA").textContent = formatNumero(canastaBasicaBA[anoCBT2]?.[mesCBT2]);

    // Inflación Nacional
    document.getElementById("anoAntInflacion").textContent = anoActual - 1;
    document.getElementById("inflacionAntAcumulada").textContent = calcularInflacionAcumulada(inflacion, anoActual - 1) + "%";
    document.getElementById("anoInflacion").textContent = anoActual;
    document.getElementById("inflacionAcumulada").textContent = calcularInflacionAcumulada(inflacion, buscaUltimoDato(inflacion)[0]) + "%";

    // Inflación NEA
    document.getElementById("anoAntInflacionNea").textContent = anoActual - 1;
    document.getElementById("inflacionAntAcumuladaNea").textContent = calcularInflacionAcumulada(inflacionNea, anoActual - 1) + "%";
    document.getElementById("anoInflacionNea").textContent = anoActual;
    document.getElementById("inflacionAcumuladaNea").textContent = calcularInflacionAcumulada(inflacionNea, buscaUltimoDato(inflacionNea)[0]) + "%";
};

// Llamar a la función para cargar los datos en el HTML
cargarDatos();
