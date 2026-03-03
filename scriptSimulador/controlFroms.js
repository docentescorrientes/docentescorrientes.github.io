import { buscarDataClase, clases } from "./datosClase.js";

document.addEventListener("DOMContentLoaded", function () {
    controlHijos();
    const cantidadClasesInputs = document.querySelectorAll('input[name="cantidadClases"]');
    const clasesContainer = document.createElement("div");  // Creamos un contenedor
    const alertClases = document.querySelector(".alert-danger"); // Buscamos la alerta
    alertClases.after(clasesContainer); // Insertamos el contenedor después del alert

    cantidadClasesInputs.forEach(input => {
        input.addEventListener("change", function () {
            const cantidad = parseInt(this.value) || 0;
            // Si es más de una clase, mostramos el alert y generamos los campos
            alertClases.hidden = cantidad <= 0;
            clasesContainer.innerHTML = "";
            if (cantidad > 0) generarCamposClases(cantidad);
        });
    });


    function generarCamposClases(cantidad) {
        clasesContainer.innerHTML = ""; // Limpiar contenido previo

        for (let i = 1; i <= cantidad; i++) {
            const keys = Object.keys(clases);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const placeholderText = `Ejemplo: ${randomKey} (${clases[randomKey].cargo})`;

            const divClase = document.createElement("div");
            divClase.classList.add("mb-3", "border", "border-success", "p-3", "rounded");

            divClase.innerHTML = `
                <h5 class="text-success">${i}° Clase del Cargo</h5>
    
                <!-- Número de Clase -->
                <label class="form-label" for="numeroClase${i}">a - Número de Clase del ${i}° Cargo</label>
                <input type="number" class="form-control" id="numeroClase${i}" name="numeroClase${i}" min="20" max="411" placeholder="${placeholderText}" required>
                <p id="descripcionClase${i}" class="text-muted">Ingrese un número de clase válido entre 20 y 411.</p>
    
                <!-- Tipo de Contrato -->
                <label class="form-label mt-2" for="tipoContrato${i}">b - Tipo de contrato del ${i}° cargo</label>
                <select class="form-select tipoContrato" id="tipoContrato${i}" name="tipoContrato${i}" data-index="${i}" required disabled>
                    <option value="" disabled selected>Seleccione si es permanente o temporario</option>
                    <option value="permanente" selected>Permanente o Temporario (Titular, Interino o Suplente)</option>
                    <option value="temporario" disabled>Temporario (Suplente)</option>
                </select>
                <p class="text-muted">Indique si el contrato es temporal o permanente.</p>
    
                <!-- Rango de días de suplencia (Oculto inicialmente) -->
                <div id="alertContainerYearMonth${i}"></div>
                <div class="rangoSuplencia" id="rangoSuplencia${i}" style="display: none;">
                    <label class="form-label mt-2" for="fechaInicio${i}">🗓️ Rango de días de suplencia en el mes</label>
                    <div class="d-flex gap-2">
                        <input type="date" class="form-control" name="fechaInicio${i}" id="fechaInicio${i}" data-index="${i}">
                        <input type="date" class="form-control" name="fechaFin${i}" id="fechaFin${i}" data-index="${i}">
                    </div>
                    <p class="text-muted">Cambie las fecha de inicio y fin de la suplencia.</p>
                </div>
    
                <!-- Nivel del Cargo -->
                <label class="form-label mt-2" for="nivelCargo${i}">c - Nivel en el que ejerce el ${i}° cargo</label>
                <select class="form-select nivelCargo" id="nivelCargo${i}" name="nivelCargo${i}" data-index="${i}" required>
                    <option value="" disabled selected>Seleccione el nivel correspondiente</option>
                    <option value="Inicial">Inicial/Primaria</option>
                    <option value="Efa">Escuelas de Familia Agrícola (EFA)</option>
                    <option value="Medio">Medio/Secundaria</option>
                    <option value="Superior">Superior/Terciario</option>
                </select>
                <p class="text-muted">Seleccione el nivel educativo donde ejerce este cargo.</p>
    
                <!-- Ubicación Geográfica -->
                <label class="form-label mt-2" for="ubicacionGeografica${i}">d - Ubicación Geográfica del ${i}° cargo</label>
                <select class="form-select ubicacionGeografica" name="ubicacionGeografica${i}" id="ubicacionGeografica${i}" required>
                    <option value="" disabled selected>Seleccione la ubicación</option>
                </select>
                <p class="text-muted">Art. N° 43 del Estatuto Docente - Ley N° 3.723/82 y Decretos Reglamentarios.</p>
    
                <!-- Selección de Jornada -->
                <div id="jornadaContainer${i}" style="display: none;">
                <label class="form-label mt-2" for="jornada${i}">e - Selección de Jornada del ${i}° cargo</label>
                <select class="form-select" id="jornada${i}" name="jornada${i}" required>
                    <option value="" disabled selected>Seleccione la jornada</option>
                    <option value="0.0">Jornada Simple</option>
                    <option value="0.25">Jornada Extendida</option>
                </select>
                <p class="text-muted">Seleccione si la jornada es simple o extendida.</p>
                </div> 
                <!-- Contenedor de Horas Cátedra (Oculto por defecto) -->
                <div id="horasCatedraContainer${i}" style="display: none;">
                    <label class="form-label mt-2" for="horasCatedra${i}">e - Cantidad de Horas Cátedra del ${i}° cargo</label>
                    <input type="number" class="form-control" id="horasCatedra${i}" name="horasCatedra${i}" min="1" max="42" placeholder="Ingrese cantidad de horas cátedra" required>
                <p class="text-muted">Ingrese entre 1 y 42 horas cátedra si corresponde.</p>
    </div>
            `;

            clasesContainer.appendChild(divClase);
        };


        clasesContainer.addEventListener("input", function (event) {
            // Verifica si el evento ocurrió en un input de número de clase
            if (event.target.matches("input[id^='numeroClase']")) {
                const numeroClase = parseInt(event.target.value); // Convertimos a número
                const index = event.target.id.replace("numeroClase", ""); // Extraemos el índice
                const descripcion = document.getElementById(`descripcionClase${index}`);
                const jornadaContainer = document.getElementById(`jornadaContainer${index}`);
                const horasCatedraContainer = document.getElementById(`horasCatedraContainer${index}`);
                const jornadaElement = document.getElementById(`jornada${index}`);
                const horasCatedraElement = document.getElementById(`horasCatedra${index}`);

                if (!isNaN(numeroClase)) {
                    const claseInfo = buscarDataClase(numeroClase);
                    if (claseInfo) {
                        descripcion.textContent = claseInfo ? `Cargo: ${claseInfo.cargo}, Categoría: ${claseInfo.categoria}, 
                        Punto valor: ${claseInfo.valorClase} y Índice clase: ${claseInfo.indiceClase}` : "Esperando el ingreso de un número de clase válido entre 20 y 411.";
                        // Si la categoría es 7, ocultar jornada y mostrar horas cátedra
                        if (claseInfo.categoria === 7) {
                            jornadaContainer.style.display = "none";
                            horasCatedraContainer.style.display = "block";
                            // Si es categoría 7, requerir horas cátedra y quitar required de jornada
                            if (horasCatedraElement) horasCatedraElement.setAttribute("required", "required");
                            if (jornadaElement) jornadaElement.removeAttribute("required");
                        } else {
                            jornadaContainer.style.display = "block";
                            horasCatedraContainer.style.display = "none";
                            // Si es otra categoría, requerir jornada y quitar required de horas cátedra
                            if (jornadaElement) jornadaElement.setAttribute("required", "required");
                            if (horasCatedraElement) horasCatedraElement.removeAttribute("required");
                        }
                    } else {
                        descripcion.textContent = "Número de clase no encontrado. Ingrese un valor entre 20 y 411.";
                        jornadaContainer.style.display = "none";
                        horasCatedraContainer.style.display = "none";
                    };
                } else {
                    descripcion.textContent = "Ingrese un número de clase válido entre 20 y 411.";
                    jornadaContainer.style.display = "none";
                    horasCatedraContainer.style.display = "none";
                };
            };
        });

        // Función para actualizar las opciones de ubicación según el nivel seleccionado
        function actualizarUbicacion(selectNivel) {
            const index = selectNivel.getAttribute('data-index');
            const ubicacionSelect = document.getElementById(`ubicacionGeografica${index}`);

            const opcionesInicialPrimaria = `
                <option value="" disabled selected>Seleccione la ubicación</option>
                <option value="0.20">Urbana (20%)</option>
                <option value="0.50">Alejadas del radio urbano (50%)</option>
                <option value="0.80">Desfavorable (80%)</option>
                <option value="1.50">Muy desfavorable (150%)</option>
                <option value="2.00">Inhóspitas (200%)</option>
            `;

            const opcionesMedioSuperior = `
                <option value="" disabled selected>Seleccione la ubicación</option>
                <option value="0.20">Zona A (20%)</option>
                <option value="0.30">Zona B (30%)</option>
                <option value="0.60">Zona C (60%)</option>
                <option value="0.90">Zona D (90%)</option>
            `;

            if (selectNivel.value === "Inicial" || selectNivel.value === "Efa") {
                ubicacionSelect.innerHTML = opcionesInicialPrimaria;
            } else {
                ubicacionSelect.innerHTML = opcionesMedioSuperior;
            }
        }

        // Evento para mostrar/ocultar el rango de suplencia según el tipo de contrato
        document.querySelectorAll('.tipoContrato').forEach(select => {
            select.addEventListener('change', function () {
                const index = this.getAttribute('data-index');
                const rangoSuplencia = document.getElementById(`rangoSuplencia${index}`);

                // Obtener los campos de year y month usando sus id
                const yearField = document.getElementById("year");
                const monthField = document.getElementById("month");

                // Verificar que los campos existen antes de acceder a su valor
                if (!yearField || !monthField) {
                    console.error("Los campos 'year' o 'month' no están disponibles.");
                    return; // Detener ejecución si los campos no están disponibles
                }

                // Verificar si los campos de año y mes están vacíos
                const alertContainer = document.getElementById(`alertContainerYearMonth${index}`);


                // Si el tipo de contrato es "temporario"
                if (this.value === "temporario") {
                    rangoSuplencia.style.display = "none";  // Ocultar el rango de fechas inicialmente
                    alertContainer.hidden = false;

                    // Si no hay año o mes, mostrar alerta y resetear la selección de "temporario"
                    if (!yearField.value && !monthField.value) {
                        showAlert(index, "Por favor, complete el año y el mes.", "both");
                        this.value = "";  // Restablecer tipo de contrato a la opción inicial
                    } else if (!yearField.value) {
                        showAlert(index, "Por favor, complete el año.", "year");
                        this.value = "";  // Restablecer tipo de contrato a la opción inicial
                    } else if (!monthField.value) {
                        showAlert(index, "Por favor, complete el mes.", "month");
                        this.value = "";  // Restablecer tipo de contrato a la opción inicial
                    } else {
                        // Eliminar alert si ya está presente
                        if (alertContainer) {
                            alertContainer.innerHTML = "";
                        }

                        // Calcular las fechas de inicio y fin
                        const startDate = new Date(yearField.value, monthField.value - 1, 1); // Primer día del mes
                        const endDate = new Date(yearField.value, monthField.value, 0); // Último día del mes

                        // Obtener los inputs de fecha de inicio y fin
                        const fechaInicio = document.querySelector(`input[name='fechaInicio${index}']`);
                        const fechaFin = document.querySelector(`input[name='fechaFin${index}']`);

                        // Poner en los inputs de fecha el mes y año seleccionados, dejando que el usuario elija solo el día
                        const formattedStartDate = startDate.toISOString().split('T')[0]; // Solo año-mes-día

                        fechaInicio.value = formattedStartDate;
                        fechaFin.value = endDate.toISOString().split('T')[0]; // Último día del mes


                        // Establecer los valores mínimos para las fechas en base al mes y año
                        fechaInicio.setAttribute("min", formattedStartDate);
                        fechaFin.setAttribute("min", formattedStartDate);

                        // Establecer el valor máximo para la fecha final (último día del mes)
                        fechaInicio.setAttribute("max", endDate.toISOString().split('T')[0]);
                        fechaFin.setAttribute("max", endDate.toISOString().split('T')[0]);

                        // Mostrar el rango de fechas
                        rangoSuplencia.style.display = "block";
                    }
                } else {
                    alertContainer.hidden = true;
                    rangoSuplencia.style.display = "none"; // Ocultar el rango si el contrato no es temporario
                }
            });
        });

        // Asegurar que la fecha final sea posterior a la fecha de inicio
        document.querySelectorAll('input[name^="fechaInicio"]').forEach(fechaInicio => {
            fechaInicio.addEventListener('change', function () {
                const index = this.getAttribute('data-index');
                const fechaFin = document.querySelector(`input[name='fechaFin${index}']`);

                // Si la fecha de inicio es seleccionada, asegurarse de que la fecha final sea posterior
                const fechaInicioDate = new Date(this.value);
                fechaFin.setAttribute("min", this.value); // Establecer fecha mínima para la fecha de fin

                // Si la fecha final seleccionada es anterior a la fecha de inicio, ajustarla
                if (fechaFin.value && new Date(fechaFin.value) <= fechaInicioDate) {
                    fechaFin.value = "";
                }
            });
        });

        // Asegurar que la fecha de fin siempre sea posterior a la de inicio
        document.querySelectorAll('input[name^="fechaFin"]').forEach(fechaFin => {
            fechaFin.addEventListener('change', function () {
                const index = this.getAttribute('data-index');
                const fechaInicio = document.querySelector(`input[name='fechaInicio${index}']`);

                // Si la fecha de fin seleccionada es anterior a la fecha de inicio, se limpia la fecha final
                if (new Date(this.value) <= new Date(fechaInicio.value)) {
                    showAlert(index, "La fecha de fin debe ser posterior a la fecha de inicio.", "");
                    this.value = ""; // Limpiar la fecha final si no es válida
                }
            });
        });

        // Función para mostrar el alert de Bootstrap
        function showAlert(i, message, missing) {
            const alertContainer = document.getElementById(`alertContainerYearMonth${i}`);
            // Crear el alert de Bootstrap
            const alert = document.createElement("div");
            alert.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
            alert.role = "alert";

            // Determinar el mensaje según qué falta (año, mes o ambos)
            alert.innerHTML = `
                <strong>📢 ¡Atención!</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;

            // Agregar el alert al contenedor
            if (alertContainer) {
                alertContainer.innerHTML = ""; // Limpiar alertas previas
                alertContainer.appendChild(alert);
            }

            // Evento para cerrar el alert cuando se complete el mes y el año
            const alertCloseBtn = alert.querySelector('.btn-close');
            alertCloseBtn.addEventListener('click', () => {
                const yearField = document.getElementById("year");
                const monthField = document.getElementById("month");
                if (missing === "both" || missing === "year") {
                    yearField.focus();
                } else if (missing === "month") {
                    monthField.focus();
                } else {
                };
            });
        }

        // Evento para actualizar ubicación según el nivel seleccionado
        document.querySelectorAll('.nivelCargo').forEach(select => {
            select.addEventListener('change', function () {
                actualizarUbicacion(this);
            });
        });
    };

});

document.addEventListener("input", function (event) {
    if (event.target.matches("input[id^='horasCatedra']")) {
        let input = event.target;
        let value = parseInt(input.value);

        // Si el valor está fuera del rango, corregirlo automáticamente
        if (value < 1) {
            input.value = 1;
        } else if (value > 42) {
            input.value = 42;
        }
    }
});


// 1° - Función de Control de cantidad de Hijos 
function controlHijos() {
    const childrenInput = document.getElementById("childrenTotal"); // Hijos a cargo
    const schoolChildrenInput = document.getElementById("childrenSchool"); // Hijos escolarizados
    const disabledChildrenInput = document.getElementById("childrenDisabled"); // Hijos con discapacidad
    const additionalChildrenFields = document.getElementById("additionalChildrenFields"); // Contenedor hijos con discapacidad
    const additionalSchoolFields = document.getElementById("additionalSchoolFields"); // Contenedor hijos escolarizados con discapacidad
    const schoolDisabledChildrenInput = document.getElementById("childrenSchoolDisabled"); // Hijos escolarizados con discapacidad
    const childrenSchoolContainer = document.getElementById("childrenSchoolContainer"); // Contenedor Hijos escolarizados
    const labelCantidadClases = document.getElementById("labelCantidadClases"); // Label cantidad clases

    childrenInput.addEventListener("input", function (event) {
        let totalHijos = parseInt(event.target.value) || 0;

        // Controla que el valor sea entre 0 y 9
        if (totalHijos < 0 || totalHijos > 9) {
            event.target.value = "";
            totalHijos = 0;
        }

        // Mostrar u ocultar los campos adicionales
        additionalChildrenFields.style.display = totalHijos > 0 ? "block" : "none";

        if (totalHijos > 0) {
            childrenSchoolContainer.style.display = "block";
            labelCantidadClases.textContent = "6 - Cantidad de números de clases por cargo.";
            if (schoolChildrenInput.value == 0) schoolChildrenInput.value = "";
        } else {
            childrenSchoolContainer.style.display = "none";
            schoolChildrenInput.value = 0;
            schoolChildrenInput.dispatchEvent(new Event('input'));
            labelCantidadClases.textContent = "5 - Cantidad de números de clases por cargo.";
        }

        // Hacer requeridos los campos solo si hay hijos a cargo
        disabledChildrenInput.required = totalHijos > 0;
        schoolChildrenInput.required = totalHijos > 0;

        // Ajustar los límites de los otros campos
        schoolChildrenInput.max = totalHijos;
        disabledChildrenInput.max = totalHijos;

        // Ajustar valores si superan el total de hijos a cargo
        if (parseInt(schoolChildrenInput.value) > totalHijos) {
            schoolChildrenInput.value = totalHijos;
        }
        if (parseInt(disabledChildrenInput.value) > totalHijos) {
            disabledChildrenInput.value = totalHijos;
        }
    });

    // Control para hijos escolarizados
    schoolChildrenInput.addEventListener("input", function (event) {
        let max = parseInt(childrenInput.value) || 0;
        let value = parseInt(event.target.value) || 0;

        if (value > max) {
            event.target.value = max;
        }

        // Mostrar u ocultar campo de hijos escolarizados con discapacidad
        additionalSchoolFields.style.display = value > 0 ? "block" : "none";
        schoolDisabledChildrenInput.required = value > 0;
        schoolDisabledChildrenInput.max = value;

        // Ajustar el valor si es mayor al de hijos escolarizados
        if (parseInt(schoolDisabledChildrenInput.value) > value) {
            schoolDisabledChildrenInput.value = value;
        }
    });

    // Control para hijos con discapacidad
    disabledChildrenInput.addEventListener("input", function (event) {
        let max = parseInt(childrenInput.value) || 0;
        let value = parseInt(event.target.value) || 0;

        if (value > max) {
            event.target.value = max;
        }
    });

    // Control para hijos escolarizados con discapacidad
    schoolDisabledChildrenInput.addEventListener("input", function (event) {
        let max = parseInt(schoolChildrenInput.value) || 0;
        let value = parseInt(event.target.value) || 0;

        if (value > max) {
            event.target.value = max;
        }
    });
};
