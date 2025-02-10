
import { buscarDataClase } from "./datosClase.js";

export function capturarDatos(event) {
    event.preventDefault(); // Evita la recarga de la página

    // Deshabilitar todos los campos al presionar el botón de simular
    document.querySelectorAll("input, select, button").forEach(element => {
        element.disabled = true;
    });

    // Habilitar el botón "Volver a calcular"
    document.getElementById('recalculateButton').disabled = false;

    let formData = new FormData(event.target);
    let data = {};

    // Capturar Año, Mes y Antigüedad directamente
    data.year = document.getElementById("year").value || null;
    data.month = document.getElementById("month").value || null;
    data.seniority = document.getElementById("seniority").value || null;

    // Capturar todos los inputs y selects, incluso los ocultos
    formData.forEach((value, key) => {
        let inputElement = document.querySelector(`[name="${key}"]`);

        // Si el campo está oculto o deshabilitado y vacío, asignamos null
        if (inputElement && (window.getComputedStyle(inputElement).display === 'none' || inputElement.disabled) && !value) {
            data[key] = null;
        } else {
            data[key] = value;
        }
    });


    // childrenTotal childrenDisabled  childrenSchool  childrenSchoolDisabled
    // Capturar información de los hijos
    data.children = getValue("childrenTotal");
    data.disabledChildren = data.children > 0 ? getValue("childrenDisabled") : null;
    data.schoolChildren = data.children > 0 ? getValue("childrenSchool") : null;
    data.schoolDisabledChildren = data.schoolChildren > 0 ? getValue("childrenSchoolDisabled") : null;


    // Capturar información de los cargos dinámicos
    let maxCargos = 5;
    data.cargos = [];

    for (let i = 1; i <= maxCargos; i++) {
        let numeroClase = getValue(`numeroClase${i}`);
        let tipoContrato = getValue(`tipoContrato${i}`);
        let fechaInicio = tipoContrato === "temporario" ? getValue(`fechaInicio${i}`) : null;
        let fechaFin = tipoContrato === "temporario" ? getValue(`fechaFin${i}`) : null;
        let nivelCargo = getValue(`nivelCargo${i}`);
        let ubicacionGeografica = getValue(`ubicacionGeografica${i}`);

        // Obtener información de la clase con la función buscarDataClase()
        let claseInfo = buscarDataClase(numeroClase); // Devuelve toda la información de la clase

        let jornada = null;
        let horasCatedra = null;

        if (claseInfo) {
            if (claseInfo.categoria === 7) {
                horasCatedra = getValue(`horasCatedra${i}`); // Si es categoría 7, obtener horas cátedra
            } else {
                jornada = getValue(`jornada${i}`); // Si NO es categoría 7, obtener jornada
            }
        }

        let cargo = {
            numeroClase,
            tipoContrato,
            fechaInicio,
            fechaFin,
            nivelCargo,
            ubicacionGeografica,
            jornada,
            horasCatedra,

            // ✅ Incluir todos los datos de `buscarDataClase(numeroClase)`
            claseInfo: claseInfo ? claseInfo : null
        };

        // Si todos los valores son null, no se añade a la lista
        if (Object.values(cargo).some(val => val !== null)) {
            data.cargos.push(cargo);
        }
    };
    return data;
};

// document.getElementById("dataForm").addEventListener("submit", capturarDatos);

// Función para obtener el valor o null si no existe o está oculto o deshabilitado
function getValue(name) {
    let element = document.querySelector(`[name="${name}"]`);
    if (!element || (window.getComputedStyle(element).display === 'none' || element.disabled) && !element.value) {
        return null;
    }
    return element.value || null;
}

// Función para volver a calcular
document.getElementById('recalculateButton').addEventListener('click', function () {
    document.getElementById('dataForm').reset(); // Resetear todos los campos
    document.querySelectorAll("input, select, button").forEach(element => {
        element.disabled = false;
    });

    // Ocultar y limpiar TODOS los campos generados de cargos por clase
    const clasesContainer = document.querySelectorAll("div.border-success");
    clasesContainer.forEach(container => container.remove()); // Elimina cada contenedor de cargo generado

    this.disabled = true; // Volver a deshabilitar el botón hasta que se presione simular nuevamente
    const alertClases = document.querySelector(".alert-danger")
    alertClases.hidden = true;
    document.getElementById("tableHaber").hidden = true;
});
