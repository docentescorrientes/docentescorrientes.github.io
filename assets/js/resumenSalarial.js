import { dateGral } from './date.js';
import { obtenerValores } from '../../scriptSimulador/dataSalario.js';

export function sueldoMaestra333(anio, mes, plusesAlBasico = false) {
    const valor = (tipo, codigo) => obtenerValores(anio, mes, tipo)
        .find(item => item.name.startsWith(`${codigo} `))?.valor ?? 0;
    // Un cargo, indice 1, zona 20%, material didactico 10%, sin antiguedad.
    const codigos = ['193', '603', '625', '632'];
    const plusesBrutos = valor('g', '603') + valor('g', '625');
    if (plusesAlBasico === 'todos') {
        const basicoSimulado = valor('b', '1') + valor('n', '171')
            + codigos.reduce((suma, codigo) => suma + valor('g', codigo), 0);
        return basicoSimulado * 1.3 * 0.75 + valor('d', '210');
    }
    const remunerativo = (valor('b', '1') + (plusesAlBasico ? plusesBrutos : 0)) * 1.3
        + codigos.reduce((suma, codigo) => suma + valor('g', codigo), 0)
        - (plusesAlBasico ? plusesBrutos : 0);
    return remunerativo * 0.75 + valor('n', '171') + valor('d', '210');
}

export function compararSalario(datos, fecha = new Date(), plusesAlBasico = false) {
    const anio = fecha.getFullYear();
    const ipc = datos.inflacionNea[anio] ?? [];
    const ipcNacional = datos.inflacionNac[anio] ?? [];
    const canastas = datos.canastaBTNac[anio] ?? [];
    // No mezclar meses ni saltar huecos en la serie acumulada.
    let indice = -1;
    for (let i = 0; i <= fecha.getMonth(); i++) {
        if (!Number.isFinite(ipc[i]) || !Number.isFinite(ipcNacional[i])) break;
        if (Number.isFinite(canastas[i]) && canastas[i] > 0) indice = i;
    }
    if (indice < 0) return null;
    const enero = sueldoMaestra333(anio, 1);
    const netoActual = sueldoMaestra333(anio, indice + 1);
    const neto = sueldoMaestra333(anio, indice + 1, plusesAlBasico);
    const pluses = obtenerValores(anio, indice + 1, 'g')
        .filter(item => ['603', '625'].some(codigo => item.name.startsWith(`${codigo} `)))
        .reduce((suma, item) => suma + item.valor * 0.75, 0);
    if (enero <= 0 || neto <= 0) return null;
    const factorAnual = ipc.slice(0, indice + 1).reduce((factor, tasa) => factor * (1 + tasa / 100), 1);
    const factorAnualNacional = ipcNacional.slice(0, indice + 1).reduce((factor, tasa) => factor * (1 + tasa / 100), 1);
    const factorReferencia = Math.max(factorAnual, factorAnualNacional);
    const regionReferencia = factorAnual >= factorAnualNacional ? 'NEA' : 'nacional';
    const cbtDiciembre = datos.canastaBTNac[anio - 1]?.[11];
    return {
        anio, mes: indice + 1, enero, neto, pluses, sueldoSinPluses: neto - pluses, cbt: canastas[indice],
        netoActual, mejora: neto - netoActual,
        aumento: (neto / enero - 1) * 100,
        inflacion: (factorAnual - 1) * 100,
        inflacionNacional: (factorAnualNacional - 1) * 100,
        regionReferencia,
        inflacionReferencia: (factorReferencia - 1) * 100,
        real: (neto / enero / factorReferencia - 1) * 100,
        cobertura: neto / canastas[indice] * 100,
        aumentoCbt: Number.isFinite(cbtDiciembre) && cbtDiciembre > 0
            ? (canastas[indice] / cbtDiciembre - 1) * 100
            : null
    };
}

function renderizarResumen(prefijo, plusesAlBasico = false) {
const elemento = id => document.getElementById(`${prefijo}-${id}`);
const estado = elemento('salarial-estado');
if (estado) {
    const resumen = compararSalario(dateGral(), new Date(), plusesAlBasico);
    if (!resumen) {
        estado.textContent = 'Todav\u00eda no hay datos completos para comparar el salario de este a\u00f1o.';
    } else {
        const pesos = valor => new Intl.NumberFormat('es-AR', {
            style: 'currency', currency: 'ARS', maximumFractionDigits: 2
        }).format(valor);
        const porcentaje = valor => `${valor.toLocaleString('es-AR', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}%`;
        const conSigno = valor => `${valor > 0 ? '+' : ''}${porcentaje(valor)}`;
        const escribir = (id, texto) => { elemento(id).textContent = texto; };
        const mes = new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(new Date(resumen.anio, resumen.mes - 1, 1));
        escribir('periodo', `${mes} de ${resumen.anio} \u00b7 \u00daltimo mes con datos comparables cargados`);
        escribir('neto', `${pesos(resumen.sueldoSinPluses)} de sueldo neto + ${pesos(resumen.pluses)} de pluses netos`);
        escribir('enero', `Enero de ${resumen.anio}: ${pesos(resumen.enero)}`);
        if (plusesAlBasico) {
            escribir('neto', `${pesos(resumen.neto)} de sueldo neto`);
            escribir('enero', `Enero de ${resumen.anio} (sin traspaso): ${pesos(resumen.enero)}`);
            escribir('escenario', `Pluses brutos incorporados al b\u00e1sico: ${pesos(resumen.pluses / 0.75)}. Bonificaci\u00f3n neta adicional: ${pesos(resumen.pluses * 0.2)} por zona + ${pesos(resumen.pluses * 0.1)} por material did\u00e1ctico. Mejora mensual: ${pesos(resumen.mejora)} frente al sueldo actual de ${pesos(resumen.netoActual)}. Se simula el traspaso en el mes mostrado; enero conserva el sueldo original.`);
        }
        if (plusesAlBasico === 'todos') {
            escribir('escenario', `Los importes de los c\u00f3digos 171, 193, 632, 603 y 625 se incorporan al b\u00e1sico, sin duplicarlos. Todo el nuevo b\u00e1sico bonifica 20% de zona y 10% de material did\u00e1ctico, con aportes del 25%. El 171 pasa a tener aportes. Diferencia neta mensual: ${pesos(resumen.mejora)} frente al sueldo actual de ${pesos(resumen.netoActual)}. Enero conserva el sueldo original.`);
        }
        escribir('aumento', conSigno(resumen.aumento));
        escribir('inflacion', conSigno(resumen.inflacion));
        escribir('inflacion-nacional', conSigno(resumen.inflacionNacional));
        escribir('real-titulo', `Salario frente a la inflaci\u00f3n anual (${resumen.regionReferencia})`);
        escribir('real', conSigno(resumen.real));
        elemento('real').classList.add(resumen.real < 0 ? 'text-danger' : 'text-success');
        escribir('bar-neto', pesos(resumen.neto));
        escribir('cbt', pesos(resumen.cbt));
        const maximo = Math.max(resumen.neto, resumen.cbt);
        elemento('bar-sueldo').style.width = `${resumen.neto / maximo * 100}%`;
        elemento('bar-canasta').style.width = `${resumen.cbt / maximo * 100}%`;
        const textoCbt = resumen.aumentoCbt === null
            ? ' Aumento acumulado de la CBT no disponible: falta el valor de diciembre anterior.'
            : ` Variaci\u00f3n acumulada de la CBT tipo 2 de enero a ${mes}: ${conSigno(resumen.aumentoCbt)}.`;
        escribir('cobertura', `Este sueldo cubre el ${porcentaje(resumen.cobertura)} de la CBT.${textoCbt}`);
        escribir('brecha', resumen.neto < resumen.cbt
            ? `Faltan ${pesos(resumen.cbt - resumen.neto)} para alcanzar una CBT.`
            : `Supera una CBT en ${pesos(resumen.neto - resumen.cbt)}.`);
        escribir('metodo', `Inflaci\u00f3n ${resumen.regionReferencia} utilizada: ${conSigno(resumen.inflacionReferencia)} acumulada de enero a ${mes}. Variaci\u00f3n de compra = [(1 + aumento salarial / 100) / (1 + inflaci\u00f3n / 100) - 1] \u00d7 100.`);
        estado.hidden = true;
        elemento('salarial-datos').hidden = false;
    }
}
}

const original = document.getElementById('resumen-salarial');
if (original) {
    const escenario = original.cloneNode(true);
    escenario.id = 'basico-salarial';
    escenario.classList.remove('active');
    escenario.querySelectorAll('[id]').forEach(elemento => {
        elemento.id = elemento.id.replace(/^resumen-/, 'basico-');
    });
    escenario.querySelector('h2').textContent = 'Maestra de grado com\u00fan \u00b7 Pluses al b\u00e1sico';
    escenario.querySelector('h3').textContent = 'Sueldo neto mensual simulado';
    escenario.querySelector('.resumen-bar-label span').textContent = 'Sueldo neto simulado';
    const detalle = document.createElement('p');
    detalle.id = 'basico-escenario';
    detalle.className = 'small text-muted';
    escenario.querySelector('#basico-enero').after(detalle);
    original.after(escenario);
    const todos = escenario.cloneNode(true);
    todos.id = 'todos-salarial';
    todos.querySelectorAll('[id]').forEach(elemento => {
        elemento.id = elemento.id.replace(/^basico-/, 'todos-');
    });
    todos.querySelector('h2').textContent = 'Maestra de grado com\u00fan \u00b7 Todos los adicionales al b\u00e1sico';
    escenario.after(todos);
    const carousel = original.closest('.carousel');
    carousel.querySelector('.carousel-indicators').replaceChildren(
        ...Array.from(carousel.querySelectorAll('.carousel-item'), (item, indice) => {
            const indicador = document.createElement('li');
            indicador.setAttribute('data-bs-target', `#${carousel.id}`);
            indicador.setAttribute('data-bs-slide-to', indice);
            indicador.classList.toggle('active', item.classList.contains('active'));
            return indicador;
        })
    );
    renderizarResumen('resumen');
    renderizarResumen('basico', true);
    renderizarResumen('todos', 'todos');
}
