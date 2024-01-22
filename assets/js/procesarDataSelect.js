
function procesarDatos() {
    const DATOS = prepararDatos();
    const llave = llaveVerif(DATOS);
    if (llave === 1) {
        disabledTrue(llave);
        const totalHaber = calculoHaber();
        document.getElementById('titleTableDiv').hidden = false;
        document.getElementById('tableDiv').hidden = false;
        const ano = DATOS.datosSelect.ano.valor;
        const mes = DATOS.datosSelect.mes.valor;
        document.getElementById('subtitleTableH5').innerHTML = '📑 ' + mesTexto(mes) + ' - ' + ano + ' <br> 💸  Neto Total: ' + formatPesos(totalHaber.totalHaberNeto);
        const array1 = ['basico1Bruto', 'salFam3Bruto', 'zona36Bruto', 'antiguedad37Bruto', 'ayMatDidac62Bruto',
            'asigEspLey140Bruto', 'progNacCompDoc168Bruto', 'sac150Bruto', 'compProv171Bruto', 'adRemDoc193Bruto', 'plusRem603Bruto',
            'conectNac609Bruto', 'bono622Bruto', 'jornadaExt624Bruto', 'plusRef625Bruto', 'adRemun2Cargo629Bruto',
            'totalRemBonifBruto', 'totalRemNoBonifBruto', 'totalNoRemNoBonifBruto'];
        ocultarFilas('haber1Table', array1);
        const array2 = ['apGrem199Desc', 'apJub208Desc', 'segVida210Desc', 'obraSocial212Desc', 'apGrem235Desc', 'apGrem241Desc', 'apGrem334Desc', 'apGrem399Desc', 'totalDesc'];
        ocultarFilas('desc1Table', array2);
        const array3 = ['plusRemCuota1Bruto', 'plusRefCuota2Bruto', 'totalCuota3Bruto', 'totalHaberBruto'];
        ocultarFilas('cuotas1Table', array3);

    };
};


function ocultarFilas(id, array) {
    let tabla = document.getElementById(id);
    if (tabla) {
        let filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const arrayIds = array;
        for (let i = 0; i < arrayIds.length; i++) {
            let celdaId = '#' + arrayIds[i];
            for (let j = 0; j < filas.length; j++) {
                let celda = filas[j].querySelector(celdaId);
                if (celda && celda.textContent.trim() === formatPesos(0.0)) {
                    filas[j].style.display = 'none';
                };
            };
        };
    };
};

function llaveVerif(datos) {
    let llave = 0;
    if (datos.datosSelect.verificacion.valor) {
        llave = 1;
        for (const categoria in datos) {
            const categoriaDatos = datos[categoria];
            for (const clave in categoriaDatos) {
                const elemento = categoriaDatos[clave];
                if (!elemento.oculto && elemento.valor === '') {
                    llave *= 0;
                } else if (!elemento.oculto && elemento.valor !== '') {
                    llave *= 1;
                };
            };
        };
    };
    return llave;
};
function disabledTrue(llave) {
    if (llave === 1) {
        const ids = [
            'anoSelect', 'mesSelect', 'antiguedadSelect', 'hijosSelect', 'hijosEscSelect', 'gremioSelect', 'cantClasesSelect', 'verifSelect',
            'plantaPerm1', 'temporario1', 'inicioSuplencia1', 'finSuplencia1', 'nivelI1Select', 'nivelM1Select', 'nivelS1Select', 'numeroClase1Select',
            'zona1IPSelect', 'zona1SSSelect', 'simple1Select', 'extendida1Select', 'horasCat1Select',
            'plantaPerm2', 'temporario2', 'inicioSuplencia2', 'finSuplencia2', 'nivelI2Select', 'nivelM2Select', 'nivelS2Select', 'numeroClase2Select',
            'zona2IPSelect', 'zona2SSSelect', 'simple2Select', 'extendida2Select', 'horasCat2Select',
            'plantaPerm3', 'temporario3', 'inicioSuplencia3', 'finSuplencia3', 'nivelI3Select', 'nivelM3Select', 'nivelS3Select', 'numeroClase3Select',
            'zona3IPSelect', 'zona3SSSelect', 'simple3Select', 'extendida3Select', 'horasCat3Select',
            'plantaPerm4', 'temporario4', 'inicioSuplencia4', 'finSuplencia4', 'nivelI4Select', 'nivelM4Select', 'nivelS4Select', 'numeroClase4Select',
            'zona4IPSelect', 'zona4SSSelect', 'simple4Select', 'extendida4Select', 'horasCat4Select',
            'plantaPerm5', 'temporario5', 'inicioSuplencia5', 'finSuplencia5', 'nivelI5Select', 'nivelM5Select', 'nivelS5Select', 'numeroClase5Select',
            'zona5IPSelect', 'zona5SSSelect', 'simple5Select', 'extendida5Select', 'horasCat5Select',
            'plantaPerm6', 'temporario6', 'inicioSuplencia6', 'finSuplencia6', 'nivelI6Select', 'nivelM6Select', 'nivelS6Select', 'numeroClase6Select',
            'zona6IPSelect', 'zona6SSSelect', 'simple6Select', 'extendida6Select', 'horasCat6Select',
            'calcButton'
        ];
        ids.forEach(id => {
            document.getElementById(id).disabled = true;
        });
        document.getElementById('resetButton').disabled = false;

    };
};

//Prepara los datos extraidos del forms en un objeto
function prepararDatos() {
    const anoSelect = document.getElementById('anoSelect').value;
    const mesSelect = document.getElementById('mesSelect').value;
    let oculto = true;
    let datosSalario = {
        'basico1': '',
        'salarioFam3': '',
        'ayudEscolar': '',
        'zona36': '',
        'antiguedad37': '',
        'ayMatDidac62': '',
        'asigEspLey140': '',
        'sdmng': '',
        'progNacCompDoc168': '',
        'compProv171': '',
        'adRemDoc193': '',
        'plusRem603': '',
        'conectNac609': '',
        'bono622': '',
        'jornadaExt624': '',
        'plusRef625': '',
        'adRemun2Cargo629': '',
        'segVida210': '',
        'obraSocial212': ''
    };

    if (anoSelect !== '' && mesSelect !== '') {
        oculto = false;
        datosSalario = buscarDataMes(anoSelect, mesSelect);
    };

    const datosClase1 = buscarDataClase(document.getElementById('numeroClase1Select').value);
    const datosClase2 = buscarDataClase(document.getElementById('numeroClase2Select').value);
    const datosClase3 = buscarDataClase(document.getElementById('numeroClase3Select').value);
    const datosClase4 = buscarDataClase(document.getElementById('numeroClase4Select').value);
    const datosClase5 = buscarDataClase(document.getElementById('numeroClase5Select').value);
    const datosClase6 = buscarDataClase(document.getElementById('numeroClase6Select').value);

    const datosSelect = {
        'datosSelect': {
            'ano': { 'oculto': false, 'valor': anoSelect },
            'mes': { 'oculto': false, 'valor': mesSelect },
            'antiguedad': { 'oculto': false, 'valor': document.getElementById('antiguedadSelect').value },
            'hijos': { 'oculto': false, 'valor': document.getElementById('hijosSelect').value },
            'hijosEsc': { 'oculto': document.getElementById('hijosEscDiv').hidden, 'valor': document.getElementById('hijosEscSelect').value },
            'nameGremio': { 'oculto': false, 'valor': nameGremioEsp() },
            'gremio': { 'oculto': false, 'valor': document.getElementById('gremioSelect').value },
            'cantidadClases': { 'oculto': false, 'valor': document.getElementById('cantClasesSelect').value },
            'verificacion': { 'oculto': false, 'valor': document.getElementById('verifSelect').checked },
        },
        'datosSalario': {
            'basico1': { 'oculto': oculto, 'valor': datosSalario.basico1 },
            'salarioFam3': { 'oculto': oculto, 'valor': datosSalario.salarioFam3 },
            'ayudEscolar': { 'oculto': oculto, 'valor': datosSalario.ayudEscolar },
            'zona36': { 'oculto': oculto, 'valor': datosSalario.zona36 },
            'antiguedad37': { 'oculto': oculto, 'valor': datosSalario.antiguedad37 },
            'ayMatDidac62': { 'oculto': oculto, 'valor': datosSalario.ayMatDidac62 },
            'asigEspLey140': { 'oculto': oculto, 'valor': datosSalario.asigEspLey140 },
            'sdmng': { 'oculto': oculto, 'valor': datosSalario.sdmng },
            'progNacCompDoc168': { 'oculto': oculto, 'valor': datosSalario.progNacCompDoc168 },
            'compProv171': { 'oculto': oculto, 'valor': datosSalario.compProv171 },
            'adRemDoc193': { 'oculto': oculto, 'valor': datosSalario.adRemDoc193 },
            'plusRem603': { 'oculto': oculto, 'valor': datosSalario.plusRem603 },
            'conectNac609': { 'oculto': oculto, 'valor': datosSalario.conectNac609 },
            'bono622': { 'oculto': oculto, 'valor': datosSalario.bono622 },
            'jornadaExt624': { 'oculto': oculto, 'valor': datosSalario.jornadaExt624 },
            'plusRef625': { 'oculto': oculto, 'valor': datosSalario.plusRef625 },
            'adRemun2Cargo629': { 'oculto': oculto, 'valor': datosSalario.adRemun2Cargo629 },
            'segVida210': { 'oculto': oculto, 'valor': datosSalario.segVida210 },
            'obraSocial212': { 'oculto': oculto, 'valor': datosSalario.obraSocial212 }
        },
        'clase1': {
            'contrato': { 'oculto': document.getElementById('contrato1Div').hidden, 'valor': checkboxSeleccionado('contrato1Radio') }, //permantente o temporario
            'suplencia': { 'oculto': document.getElementById('contrato1Div').hidden, 'valor': diaFechaSuplenciaEsp(1) },
            'nivel': { 'oculto': document.getElementById('nivel1Div').hidden, 'valor': checkboxSeleccionado('nivel1Radio') },
            'numeroClase': { 'oculto': document.getElementById('numeroClase1Div').hidden, 'valor': document.getElementById('numeroClase1Select').value },
            'cargo': { 'oculto': document.getElementById('clase1Div').hidden, 'valor': datosClase1.cargo },
            'indiceClase': { 'oculto': document.getElementById('clase1Div').hidden, 'valor': datosClase1.indiceBasico },
            'apJub': { 'oculto': document.getElementById('clase1Div').hidden, 'valor': datosClase1.apJub },
            'zona': { 'oculto': zonaEsp('zona1')[0], 'valor': zonaEsp('zona1')[1] },
            'jornada': { 'oculto': document.getElementById('jornada1Div').hidden, 'valor': checkboxSeleccionado('jornada1Radio') },
            'horasCatedras': { 'oculto': false, 'valor': horasCatedrasEsp(1) },
        },
        'clase2': {
            'contrato': { 'oculto': document.getElementById('contrato2Div').hidden, 'valor': checkboxSeleccionado('contrato2Radio') },
            'suplencia': { 'oculto': document.getElementById('contrato2Div').hidden, 'valor': diaFechaSuplenciaEsp(2) },
            'nivel': { 'oculto': document.getElementById('nivel2Div').hidden, 'valor': checkboxSeleccionado('nivel2Radio') },
            'numeroClase': { 'oculto': document.getElementById('numeroClase2Div').hidden, 'valor': document.getElementById('numeroClase2Select').value },
            'cargo': { 'oculto': document.getElementById('clase2Div').hidden, 'valor': datosClase2.cargo },
            'indiceClase': { 'oculto': document.getElementById('clase2Div').hidden, 'valor': datosClase2.indiceBasico },
            'apJub': { 'oculto': document.getElementById('clase2Div').hidden, 'valor': datosClase2.apJub },
            'zona': { 'oculto': zonaEsp('zona2')[0], 'valor': zonaEsp('zona2')[1] },
            'jornada': { 'oculto': document.getElementById('jornada2Div').hidden, 'valor': checkboxSeleccionado('jornada2Radio') },
            'horasCatedras': { 'oculto': false, 'valor': horasCatedrasEsp(2) },
        },
        'clase3': {
            'contrato': { 'oculto': document.getElementById('contrato3Div').hidden, 'valor': checkboxSeleccionado('contrato3Radio') },
            'suplencia': { 'oculto': document.getElementById('contrato3Div').hidden, 'valor': diaFechaSuplenciaEsp(3) },
            'nivel': { 'oculto': document.getElementById('nivel3Div').hidden, 'valor': checkboxSeleccionado('nivel3Radio') },
            'numeroClase': { 'oculto': document.getElementById('numeroClase3Div').hidden, 'valor': document.getElementById('numeroClase3Select').value },
            'cargo': { 'oculto': document.getElementById('clase3Div').hidden, 'valor': datosClase3.cargo },
            'indiceClase': { 'oculto': document.getElementById('clase3Div').hidden, 'valor': datosClase3.indiceBasico },
            'apJub': { 'oculto': document.getElementById('clase3Div').hidden, 'valor': datosClase3.apJub },
            'zona': { 'oculto': zonaEsp('zona3')[0], 'valor': zonaEsp('zona3')[1] },
            'jornada': { 'oculto': document.getElementById('jornada3Div').hidden, 'valor': checkboxSeleccionado('jornada3Radio') },
            'horasCatedras': { 'oculto': false, 'valor': horasCatedrasEsp(3) },
        },
        'clase4': {
            'contrato': { 'oculto': document.getElementById('contrato4Div').hidden, 'valor': checkboxSeleccionado('contrato4Radio') },
            'suplencia': { 'oculto': document.getElementById('contrato4Div').hidden, 'valor': diaFechaSuplenciaEsp(4) },
            'nivel': { 'oculto': document.getElementById('nivel4Div').hidden, 'valor': checkboxSeleccionado('nivel4Radio') },
            'numeroClase': { 'oculto': document.getElementById('numeroClase4Div').hidden, 'valor': document.getElementById('numeroClase4Select').value },
            'cargo': { 'oculto': document.getElementById('clase4Div').hidden, 'valor': datosClase4.cargo },
            'indiceClase': { 'oculto': document.getElementById('clase4Div').hidden, 'valor': datosClase4.indiceBasico },
            'apJub': { 'oculto': document.getElementById('clase4Div').hidden, 'valor': datosClase4.apJub },
            'zona': { 'oculto': zonaEsp('zona4')[0], 'valor': zonaEsp('zona4')[1] },
            'jornada': { 'oculto': document.getElementById('jornada4Div').hidden, 'valor': checkboxSeleccionado('jornada4Radio') },
            'horasCatedras': { 'oculto': false, 'valor': horasCatedrasEsp(4) },
        },
        'clase5': {
            'contrato': { 'oculto': document.getElementById('contrato5Div').hidden, 'valor': checkboxSeleccionado('contrato5Radio') },
            'suplencia': { 'oculto': document.getElementById('contrato5Div').hidden, 'valor': diaFechaSuplenciaEsp(5) },
            'nivel': { 'oculto': document.getElementById('nivel5Div').hidden, 'valor': checkboxSeleccionado('nivel5Radio') },
            'numeroClase': { 'oculto': document.getElementById('numeroClase5Div').hidden, 'valor': document.getElementById('numeroClase5Select').value },
            'cargo': { 'oculto': document.getElementById('clase5Div').hidden, 'valor': datosClase5.cargo },
            'indiceClase': { 'oculto': document.getElementById('clase5Div').hidden, 'valor': datosClase5.indiceBasico },
            'apJub': { 'oculto': document.getElementById('clase5Div').hidden, 'valor': datosClase5.apJub },
            'zona': { 'oculto': zonaEsp('zona5')[0], 'valor': zonaEsp('zona5')[1] },
            'jornada': { 'oculto': document.getElementById('jornada5Div').hidden, 'valor': checkboxSeleccionado('jornada5Radio') },
            'horasCatedras': { 'oculto': false, 'valor': horasCatedrasEsp(5) },
        },
        'clase6': {
            'contrato': { 'oculto': document.getElementById('contrato6Div').hidden, 'valor': checkboxSeleccionado('contrato6Radio') },
            'suplencia': { 'oculto': document.getElementById('contrato6Div').hidden, 'valor': diaFechaSuplenciaEsp(6) },
            'nivel': { 'oculto': document.getElementById('nivel6Div').hidden, 'valor': checkboxSeleccionado('nivel6Radio') },
            'numeroClase': { 'oculto': document.getElementById('numeroClase6Div').hidden, 'valor': document.getElementById('numeroClase6Select').value },
            'cargo': { 'oculto': document.getElementById('clase6Div').hidden, 'valor': datosClase6.cargo },
            'indiceClase': { 'oculto': document.getElementById('clase6Div').hidden, 'valor': datosClase6.indiceBasico },
            'apJub': { 'oculto': document.getElementById('clase6Div').hidden, 'valor': datosClase6.apJub },
            'zona': { 'oculto': zonaEsp('zona6')[0], 'valor': zonaEsp('zona6')[1] },
            'jornada': { 'oculto': document.getElementById('jornada6Div').hidden, 'valor': checkboxSeleccionado('jornada6Radio') },
            'horasCatedras': { 'oculto': false, 'valor': horasCatedrasEsp(6) },
        },
    };
    return datosSelect;
};

function nameGremioEsp() {
    const gremioSelect = document.getElementById('gremioSelect');
    let gremioText = gremioSelect.options[gremioSelect.selectedIndex].text;
    if (gremioSelect.value === '') {
        gremioText = '';
    };
    return gremioText;
};

function horasCatedrasEsp(n) {
    const numeroClase = document.getElementById('numeroClase' + n + 'Select').value;
    let valor = 1;
    if (numeroClase === '191' || numeroClase === '192') {
        valor = document.getElementById('horasCat' + n + 'Select').value
    };
    return valor;
};

function checkboxSeleccionado(idName) {
    const checkboxSeleccionado = document.querySelector('input[name="' + idName + '"]:checked');
    let valorCheckbox = "";
    if (checkboxSeleccionado) {
        valorCheckbox = checkboxSeleccionado.value;
    };
    return valorCheckbox;
};
function diaFechaSuplenciaEsp(n) {
    const inicioId = 'inicioSuplencia' + n.toString();
    const finalId = 'finSuplencia' + n.toString();
    const inicioSuplenciaInput = document.getElementById(inicioId);
    const finSuplenciaInput = document.getElementById(finalId);
    let fechaInicio, fechaFin, indice;
    const ano = parseInt(document.getElementById('anoSelect').value);
    const mes = parseInt(document.getElementById('mesSelect').value);
    if (inicioSuplenciaInput.value !== '' && finSuplenciaInput.value !== '' && ano !== '' && mes !== '') {
        fechaInicio = new Date(inicioSuplenciaInput.value);
        fechaFin = new Date(finSuplenciaInput.value);
        fechaFin.setDate(fechaFin.getDate() + 1);
        const primerDia = new Date(ano, mes, 1);
        let ultimoDia = new Date(ano, mes + 1, 0);
        if (mes === 11) {
            ultimoDia = new Date(ano + 1, 0, 0);
        };
        ultimoDia.setDate(ultimoDia.getDate() + 1);
        indice = (fechaFin - fechaInicio) / (ultimoDia - primerDia);
    } else {
        indice = 1;
    };
    const indiceSuplencia = indice;
    return indiceSuplencia;
};
function zonaEsp(nameId) {
    const selects = document.querySelectorAll('select[name="' + nameId + '"]');
    const divs = document.querySelectorAll('div[name="' + nameId + 'Div"]')
    let oculto = true;
    let select = '';
    for (var i = 0; i < selects.length; i++) {
        if (!divs[i].hidden) {
            oculto = divs[i].hidden;
            select = selects[i].value;
        };
    };
    return [oculto, select]
};

function resetearDatos() {
    document.getElementById("forms").reset();
    const idsInput = [
        'anoSelect', 'mesSelect', 'antiguedadSelect', 'hijosSelect', 'hijosEscSelect', 'gremioSelect', 'cantClasesSelect', 'verifSelect',
        'plantaPerm1', 'temporario1', 'inicioSuplencia1', 'finSuplencia1', 'nivelI1Select', 'nivelM1Select', 'nivelS1Select', 'numeroClase1Select',
        'zona1IPSelect', 'zona1SSSelect', 'simple1Select', 'extendida1Select', 'horasCat1Select',
        'plantaPerm2', 'temporario2', 'inicioSuplencia2', 'finSuplencia2', 'nivelI2Select', 'nivelM2Select', 'nivelS2Select', 'numeroClase2Select',
        'zona2IPSelect', 'zona2SSSelect', 'simple2Select', 'extendida2Select', 'horasCat2Select',
        'plantaPerm3', 'temporario3', 'inicioSuplencia3', 'finSuplencia3', 'nivelI3Select', 'nivelM3Select', 'nivelS3Select', 'numeroClase3Select',
        'zona3IPSelect', 'zona3SSSelect', 'simple3Select', 'extendida3Select', 'horasCat3Select',
        'plantaPerm4', 'temporario4', 'inicioSuplencia4', 'finSuplencia4', 'nivelI4Select', 'nivelM4Select', 'nivelS4Select', 'numeroClase4Select',
        'zona4IPSelect', 'zona4SSSelect', 'simple4Select', 'extendida4Select', 'horasCat4Select',
        'plantaPerm5', 'temporario5', 'inicioSuplencia5', 'finSuplencia5', 'nivelI5Select', 'nivelM5Select', 'nivelS5Select', 'numeroClase5Select',
        'zona5IPSelect', 'zona5SSSelect', 'simple5Select', 'extendida5Select', 'horasCat5Select',
        'plantaPerm6', 'temporario6', 'inicioSuplencia6', 'finSuplencia6', 'nivelI6Select', 'nivelM6Select', 'nivelS6Select', 'numeroClase6Select',
        'zona6IPSelect', 'zona6SSSelect', 'simple6Select', 'extendida6Select', 'horasCat6Select',
        'calcButton'
    ];
    idsInput.forEach(id => {
        document.getElementById(id).disabled = false;
    });
    document.getElementById('resetButton').disabled = true;

    const idsDiv = [
        'hijosEscDiv', 'camposClaseDiv',
        'clase1Div', 'contrato1Div', 'suplencia1Div', 'nivel1Div', 'numeroClase1Div', 'card1Div', 'zona1IPDiv', 'zona1SSDiv', 'jornada1Div', 'horasCat1Div',
        'clase2Div', 'contrato2Div', 'suplencia2Div', 'nivel2Div', 'numeroClase2Div', 'card2Div', 'zona2IPDiv', 'zona2SSDiv', 'jornada2Div', 'horasCat2Div',
        'clase3Div', 'contrato3Div', 'suplencia3Div', 'nivel3Div', 'numeroClase3Div', 'card3Div', 'zona3IPDiv', 'zona3SSDiv', 'jornada3Div', 'horasCat3Div',
        'clase4Div', 'contrato4Div', 'suplencia4Div', 'nivel4Div', 'numeroClase4Div', 'card4Div', 'zona4IPDiv', 'zona4SSDiv', 'jornada4Div', 'horasCat4Div',
        'clase5Div', 'contrato5Div', 'suplencia5Div', 'nivel5Div', 'numeroClase5Div', 'card5Div', 'zona5IPDiv', 'zona5SSDiv', 'jornada5Div', 'horasCat5Div',
        'clase6Div', 'contrato6Div', 'suplencia6Div', 'nivel6Div', 'numeroClase6Div', 'card6Div', 'zona6IPDiv', 'zona6SSDiv', 'jornada6Div', 'horasCat6Div'
    ];
    idsDiv.forEach(id => {
        document.getElementById(id).hidden = true;
    });

    document.getElementById('alertVerific1').hidden = true;
    document.getElementById('alertVerific2').hidden = true;

    for (let i = 1; i <= 6; i++) {
        document.getElementById('plantaPerm' + i).checked = true;
        document.getElementById('temporario' + i).checked = false;
        document.getElementById('numeroClase' + i + 'Select').disabled = true;
    };
    mostrarTodasLasFilas('haber1Table');
    mostrarTodasLasFilas('desc1Table');
    mostrarTodasLasFilas('cuotas1Table');

    document.getElementById('titleFormsH1').textContent = 'Recibo de Simulación de Haberes ';
    document.getElementById('titleTableDiv').hidden = true;
    document.getElementById('tableDiv').hidden = true;
};

function mostrarTodasLasFilas(id) {
    let tabla = document.getElementById(id);
    if (tabla) {
        let filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const arrayIds = array;
        for (let j = 0; j < filas.length; j++) {
            filas[j].style.display = ''; // Restaura la visualización predeterminada
        }
    }
}

function mesTexto(mesNumber) {
    var mes;
    switch (mesNumber) {
        case '0':
            mes = 'Enero';
            break;
        case '1':
            mes = 'Febrero';
            break;
        case '2':
            mes = 'Marzo';
            break;
        case '3':
            mes = 'Abril';
            break;
        case '4':
            mes = 'Mayo';
            break;
        case '5-SAC':
            mes = 'Medio Aguinaldo (SAC de Mayo)';
            break;
        case '5':
            mes = 'Junio';
            break;
        case '6':
            mes = 'Julio';
            break;
        case '7':
            mes = 'Agosto';
            break;
        case '8':
            mes = 'Septiembre';
            break;
        case '9':
            mes = 'Octubre';
            break;
        case '10':
            mes = 'Noviembre';
            break;
        case '11-SAC':
            mes = 'Medio Aguinaldo (SAC de Diciembre)';
            break;
        case '11':
            mes = 'Diciembre';
            break;
        default:
            mes = 'Mes inválido';
    }
    return mes;
};
