// Start Versión
const version = "5.0", fecha = "Febrero de 2025";
document.getElementById("versionH6").insertAdjacentHTML("beforeend", `${version}<br>${fecha}<br>@augusalterats`);
// End Versión

import { dateGral, obtenerUltimoValorValido, calcularInflacionAcumulada } from "./date.js";
import { formatNumero } from "../../scriptSimulador/dataSalario.js";
const datos = dateGral();

const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// Cargar datos en los elementos del HTML
const cargarDatos = () => {
    // Canasta Básica Nacional
    const cbtNac = obtenerUltimoValorValido(datos, 'canastaBTNac');
    const cbaNac = obtenerUltimoValorValido(datos, 'canastaBANac');

    document.getElementById("fechacbtNac").textContent = `${meses[cbtNac.posicion]} del ${cbtNac.año}`;
    document.getElementById("cbtNac").textContent = formatNumero(cbtNac.valor);
    document.getElementById("cbaNac").textContent = formatNumero(cbaNac.valor);

    // Canasta Básica Nea
    const cbtNea = obtenerUltimoValorValido(datos, 'canastaBTNea');
    const cbaNea = obtenerUltimoValorValido(datos, 'canastaBANea');

    document.getElementById("fechacbtNea").textContent = `${meses[cbtNea.posicion]} del ${cbtNea.año}`;
    document.getElementById("cbtNea").textContent = formatNumero(cbtNea.valor);
    document.getElementById("cbaNea").textContent = formatNumero(cbaNea.valor);

    const inflacionNac = calcularInflacionAcumulada(datos, 'inflacionNac');
    // Inflación Nacional
    document.getElementById("anioAntInflAcumNac").textContent = inflacionNac[1].anio;
    document.getElementById("inflAntAcumNac").textContent = formatNumero(inflacionNac[1].valor) + "%";
    document.getElementById("anioInflAcumNac").textContent = inflacionNac[0].anio;
    document.getElementById("inflAcumNac").textContent = formatNumero(inflacionNac[0].valor) + "%";

    const inflacionNea = calcularInflacionAcumulada(datos, 'inflacionNea');
    // Inflación Nacional
    document.getElementById("anioAntInflAcumNea").textContent = inflacionNea[1].anio;
    document.getElementById("inflAntAcumNea").textContent = formatNumero(inflacionNea[1].valor) + "%";
    document.getElementById("anioInflAcumNea").textContent = inflacionNea[0].anio;
    document.getElementById("inflAcumNea").textContent = formatNumero(inflacionNea[0].valor) + "%";

    // Info card
    document.getElementById("mescbtNac").textContent = `${meses[cbtNac.posicion]}`;
    document.getElementById("infocbtNac").textContent = `${formatNumero(cbtNac.valor)}`;

    const inflacion = obtenerUltimoValorValido(datos, 'inflacionNac');
    document.getElementById("mesInflacion").textContent = `${meses[inflacion.posicion]}`;
    document.getElementById("inflacion").textContent = `${formatNumero(inflacion.valor)}`;

    const dolarBlue = obtenerUltimoValorValido(datos, 'dolarBlue');
    document.getElementById("mesDolarBlue").textContent = `${meses[dolarBlue.posicion]}`;
    document.getElementById("dolarBlue").textContent = `${formatNumero(dolarBlue.valor)}`;

    const sdmng = obtenerUltimoValorValido(datos, 'sdmng');
    document.getElementById("mesSdmng").textContent = `${meses[sdmng.posicion]}`;
    document.getElementById("sdmng").textContent = `${formatNumero(sdmng.valor)}`;

};

// Llamar a la función para cargar los datos en el HTML
cargarDatos();
