const DESCUENTO_IOSCOR = 0.05;
const DESCUENTO_IPS = 0.20;
const AYUDA_MATERIAL_DIDACTICO = 0.10;

const ubicacionesPorNivel = {
    primaria: [
        { valor: 0.20, nombre: "Urbana (20%)" },
        { valor: 0.50, nombre: "Alejada del radio urbano (50%)" },
        { valor: 0.80, nombre: "Desfavorable (80%)" },
        { valor: 1.50, nombre: "Muy desfavorable (150%)" },
        { valor: 2.00, nombre: "Inhóspita (200%)" }
    ],
    medio: [
        { valor: 0.20, nombre: "Zona A (20%)" },
        { valor: 0.30, nombre: "Zona B (30%)" },
        { valor: 0.60, nombre: "Zona C (60%)" },
        { valor: 0.90, nombre: "Zona D (90%)" }
    ],
    superior: [
        { valor: 0.20, nombre: "Zona A (20%)" },
        { valor: 0.30, nombre: "Zona B (30%)" },
        { valor: 0.60, nombre: "Zona C (60%)" },
        { valor: 0.90, nombre: "Zona D (90%)" }
    ]
};

function crearAlternativa(codigo, nombre, bruto, detalle, remunerativo) {
    const ioscor = remunerativo ? bruto * DESCUENTO_IOSCOR : 0;
    const ips = remunerativo ? bruto * DESCUENTO_IPS : 0;

    return {
        codigo,
        nombre,
        detalle,
        bruto,
        ioscor,
        ips,
        neto: bruto - ioscor - ips
    };
}

export function calcularAlternativasAumento({
    monto,
    cargos,
    ubicacion,
    antiguedad,
    cargosJornadaExtendida = 0
}) {
    if (!Number.isFinite(monto) || monto <= 0 || ![1, 2, 3].includes(cargos)
        || !Number.isInteger(cargosJornadaExtendida) || cargosJornadaExtendida < 0
        || cargosJornadaExtendida > cargos) {
        throw new RangeError("Ingresá un monto positivo y seleccioná entre 1 y 3 cargos.");
    }

    const basico = monto * cargos;
    const ubicacionGeografica = basico * ubicacion;
    const antiguedadMonto = basico * antiguedad;
    const materialDidactico = basico * AYUDA_MATERIAL_DIDACTICO;
    const basicoConJornadaExtendida = monto * cargosJornadaExtendida;
    const jornadaExtendidaMonto = (basicoConJornadaExtendida
        + basicoConJornadaExtendida * ubicacion
        + basicoConJornadaExtendida * antiguedad
        + basicoConJornadaExtendida * AYUDA_MATERIAL_DIDACTICO) * 0.25;
    const detalleBasico = [
        { nombre: "Básico", valor: basico },
        { nombre: "Ubicación", valor: ubicacionGeografica },
        { nombre: "Antigüedad", valor: antiguedadMonto },
        { nombre: "Material didáctico (10%)", valor: materialDidactico }
    ];
    if (cargosJornadaExtendida > 0) {
        detalleBasico.push({
            nombre: `Jornada extendida (Cód. 624, 25% en ${cargosJornadaExtendida} ${cargosJornadaExtendida === 1 ? "cargo" : "cargos"})`,
            valor: jornadaExtendidaMonto
        });
    }

    const alternativas = [
        crearAlternativa(
            "1",
            "Básico bonificable",
            basico + ubicacionGeografica + antiguedadMonto + materialDidactico + jornadaExtendidaMonto,
            detalleBasico,
            true
        )
    ];

    [
        { codigo: "603", nombre: "Plus Unificado Remunerativo", tope: 1 },
        { codigo: "625", nombre: "Plus de Refuerzo Remunerativo", tope: 1 },
        { codigo: "193", nombre: "Adicional Remunerativo Docente C/A", tope: 2 },
        { codigo: "632", nombre: "Complemento Docente Provincial", tope: 2 },
        { codigo: "171", nombre: "Compensador Docente Provincial", tope: 2, remunerativo: false }
    ].forEach(item => {
        const cargosAplicados = Math.min(cargos, item.tope);
        const bruto = monto * cargosAplicados;
        alternativas.push(crearAlternativa(
            item.codigo,
            item.nombre,
            bruto,
            [{ nombre: `${cargosAplicados} ${cargosAplicados === 1 ? "cargo" : "cargos"} aplicado(s)`, valor: bruto }],
            item.remunerativo !== false
        ));
    });

    return alternativas;
}

export function formatearMontoIngresado(valor, posicionCursor = valor.length) {
    const caracteresAntesDelCursor = valor.slice(0, posicionCursor).replace(/[^\d,]/g, "").length;
    const caracteresValidos = valor.replace(/[^\d,]/g, "");
    const indiceDecimal = caracteresValidos.indexOf(",");
    const parteEntera = indiceDecimal === -1
        ? caracteresValidos
        : caracteresValidos.slice(0, indiceDecimal);
    const parteDecimal = indiceDecimal === -1
        ? ""
        : caracteresValidos.slice(indiceDecimal + 1).replace(/,/g, "").slice(0, 2);
    const enteroAgrupado = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const valorFormateado = enteroAgrupado + (indiceDecimal === -1 ? "" : `,${parteDecimal}`);

    let cursorFormateado = 0;
    let caracteresContados = 0;
    for (let i = 0; i < valorFormateado.length; i++) {
        if (/[\d,]/.test(valorFormateado[i])) {
            caracteresContados++;
            if (caracteresContados === caracteresAntesDelCursor) {
                cursorFormateado = i + 1;
                break;
            }
        }
    }
    if (caracteresAntesDelCursor === 0) cursorFormateado = 0;
    if (caracteresContados < caracteresAntesDelCursor) cursorFormateado = valorFormateado.length;

    return { valor: valorFormateado, cursor: cursorFormateado };
}

export function parsearMontoIngresado(valor) {
    const normalizado = valor.trim().replace(/\./g, "").replace(",", ".");
    return normalizado ? Number(normalizado) : NaN;
}

export function es171MayorConAntiguedadCero(alternativas, antiguedad) {
    if (antiguedad !== 0) return false;
    const alternativa171 = alternativas.find(alternativa => alternativa.codigo === "171");
    const otrasAlternativas = alternativas.filter(alternativa => alternativa.codigo !== "171");
    return alternativa171 !== undefined
        && otrasAlternativas.length > 0
        && otrasAlternativas.every(alternativa => alternativa171.neto > alternativa.neto);
}

if (typeof document !== "undefined") {
    const form = document.getElementById("simuladorAumentoForm");
    const montoInput = document.getElementById("montoAumento");
    const nivelSelect = document.getElementById("nivelAumento");
    const ubicacionRange = document.getElementById("ubicacionAumento");
    const ubicacionValor = document.getElementById("ubicacionAumentoValor");
    const cargosSelect = document.getElementById("cantidadCargosAumento");
    const antiguedadRange = document.getElementById("antiguedadAumento");
    const antiguedadValor = document.getElementById("antiguedadAumentoValor");
    const jornadaExtendidaCheckbox = document.getElementById("cargosJornadaExtendida");
    const horasInfo = document.getElementById("horasAumento");
    const resultado = document.getElementById("resultadoAumento");
    const compararButton = document.getElementById("compararAumento");
    const nivelesAntiguedad = [
        { valor: 0, texto: "0% - Menos de 1 año" },
        { valor: 0.10, texto: "10% - 1 año" },
        { valor: 0.15, texto: "15% - Entre 2 y 4 años" },
        { valor: 0.30, texto: "30% - Entre 5 y 6 años" },
        { valor: 0.40, texto: "40% - Entre 7 y 9 años" },
        { valor: 0.50, texto: "50% - Entre 10 y 11 años" },
        { valor: 0.60, texto: "60% - Entre 12 y 14 años" },
        { valor: 0.70, texto: "70% - Entre 15 y 16 años" },
        { valor: 0.80, texto: "80% - Entre 17 y 19 años" },
        { valor: 1, texto: "100% - Entre 20 y 21 años" },
        { valor: 1.10, texto: "110% - Entre 22 y 23 años" },
        { valor: 1.20, texto: "120% - 24 años o más" }
    ];
    const formatoMoneda = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2
    });

    function actualizarUbicaciones() {
        const ubicaciones = ubicacionesPorNivel[nivelSelect.value];
        ubicacionRange.max = String(ubicaciones.length - 1);
        ubicacionRange.value = "0";
        actualizarUbicacion();
    }

    function actualizarUbicacion() {
        const ubicaciones = ubicacionesPorNivel[nivelSelect.value];
        ubicacionValor.textContent = ubicaciones[Number(ubicacionRange.value)].nombre;
    }

    function actualizarReferenciaHoras() {
        const cargos = Number(cargosSelect.value);
        const nivel = nivelSelect.value;
        if (cargos === 3) {
            horasInfo.textContent = "Referencia seleccionada: 3 cargos equivalen a 42 horas cátedra.";
        } else if (nivel === "medio") {
            horasInfo.textContent = `Referencia seleccionada: ${cargos} ${cargos === 1 ? "cargo" : "cargos"} / ${cargos * 15} horas cátedra en Secundaria.`;
        } else if (nivel === "superior") {
            horasInfo.textContent = `Referencia seleccionada: ${cargos} ${cargos === 1 ? "cargo" : "cargos"} / ${cargos * 12} horas cátedra en Superior.`;
        } else {
            horasInfo.textContent = "La equivalencia de horas para este nivel no está especificada; para 3 cargos se toma la referencia de 42 horas cátedra.";
        }
    }

    function actualizarAntiguedad() {
        antiguedadValor.textContent = nivelesAntiguedad[Number(antiguedadRange.value)].texto;
    }

    function renderizarResultados(alternativas, antiguedad) {
        const mayorNeto = Math.max(...alternativas.map(alternativa => alternativa.neto));
        const mejores = alternativas.filter(alternativa => Math.abs(alternativa.neto - mayorNeto) < 0.005);
        const mejoresTexto = mejores.map(alternativa => `Código ${alternativa.codigo}`).join(" y ");
        const advertencia171 = es171MayorConAntiguedadCero(alternativas, antiguedad);
        const resumen = advertencia171
            ? `<div class="alert alert-danger" role="alert">
                <strong>Atención:</strong> Con 0% de antigüedad, el Código 171 es la única alternativa con mayor neto
                (${formatoMoneda.format(mayorNeto)}/mes) en esta comparación. Es un ítem no remunerativo y no bonificable
                (“en negro”); se da sin jornada extendida. No aporta a IOSCOR ni a IPS, y no se computa
                para el aguinaldo (SAC).
            </div>`
            : `<div class="alert alert-success" role="status">
                <strong>Mayor neto calculado:</strong> ${mejoresTexto}, con
                ${formatoMoneda.format(mayorNeto)}/mes.
            </div>`;
        const filas = alternativas.map(alternativa => {
            const esMejor = Math.abs(alternativa.neto - mayorNeto) < 0.005;
            const claseFila = advertencia171 && alternativa.codigo === "171"
                ? "table-danger fw-bold"
                : esMejor ? "table-success fw-bold" : "";
            const composicion = alternativa.detalle
                .map(item => `${item.nombre}: ${formatoMoneda.format(item.valor)}`)
                .join("<br>");
            return `
                <tr class="${claseFila}">
                    <th scope="row">Código ${alternativa.codigo}</th>
                    <td class="text-start">${alternativa.nombre}<br><small>${composicion}</small></td>
                    <td>${formatoMoneda.format(alternativa.bruto)}</td>
                    <td>${formatoMoneda.format(alternativa.ioscor)}</td>
                    <td>${formatoMoneda.format(alternativa.ips)}</td>
                    <td class="fw-bold">${formatoMoneda.format(alternativa.neto)}</td>
                </tr>`;
        }).join("");

        resultado.innerHTML = `
            ${resumen}
            <div class="table-responsive">
                <table class="table table-bordered table-hover text-center align-middle">
                    <caption class="caption-top">Comparación mensual calculada. ${advertencia171 ? "La fila roja destaca el Código 171 en esta situación." : "Las filas verdes muestran el mayor neto."}</caption>
                    <thead class="table-secondary">
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Concepto y composición</th>
                            <th scope="col">Aumento bruto</th>
                            <th scope="col">IOSCOR (5%)</th>
                            <th scope="col">IPS (20%)</th>
                            <th scope="col">Neto de bolsillo</th>
                        </tr>
                    </thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>
            <p class="form-text mb-0">
                Cálculo del incremento mensual según los datos ingresados; no incluye descuentos adicionales ni otros ítems del recibo.
            </p>`;
        if (window.matchMedia("(max-width: 767.98px)").matches) {
            requestAnimationFrame(() => {
                resultado.firstElementChild.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    }

    nivelSelect.addEventListener("change", actualizarUbicaciones);
    nivelSelect.addEventListener("change", actualizarReferenciaHoras);
    cargosSelect.addEventListener("change", actualizarReferenciaHoras);
    ubicacionRange.addEventListener("input", () => {
        actualizarUbicacion();
        if (montoInput.value.trim()) {
            form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
    });
    antiguedadRange.addEventListener("input", () => {
        actualizarAntiguedad();
        if (montoInput.value.trim()) {
            form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
    });
    actualizarUbicaciones();
    actualizarReferenciaHoras();
    actualizarAntiguedad();

    montoInput.addEventListener("input", () => {
        const formato = formatearMontoIngresado(montoInput.value, montoInput.selectionStart);
        montoInput.value = formato.valor;
        montoInput.setSelectionRange(formato.cursor, formato.cursor);
        montoInput.setCustomValidity("");
    });

    function calcularFormulario(event) {
        event.preventDefault();
        const monto = parsearMontoIngresado(montoInput.value);
        montoInput.setCustomValidity(Number.isFinite(monto) && monto > 0
            ? ""
            : "Ingresá un monto mayor que cero.");
        if (!form.reportValidity()) return;

        const cargos = Number(cargosSelect.value);
        const ubicaciones = ubicacionesPorNivel[nivelSelect.value];
        const ubicacion = ubicaciones[Number(ubicacionRange.value)].valor;
        const antiguedad = nivelesAntiguedad[Number(antiguedadRange.value)].valor;
        const cargosJornadaExtendida = jornadaExtendidaCheckbox.checked ? cargos : 0;
        const alternativas = calcularAlternativasAumento({
            monto,
            cargos,
            ubicacion,
            antiguedad,
            cargosJornadaExtendida
        });
        renderizarResultados(alternativas, antiguedad);
    }

    compararButton.addEventListener("click", calcularFormulario);
    form.addEventListener("submit", calcularFormulario);
}
