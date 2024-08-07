//Start Selección de los principales datos del Formulario
const anoSelect = document.getElementById("anoSelect");
const mesSelect = document.getElementById("mesSelect");
const antiguedadSelect = document.getElementById("antiguedadSelect");
const hijosSelect = document.getElementById("hijosSelect");
const hijosEscSelect = document.getElementById("hijosEscSelect");
const gremioSelect = document.getElementById('gremioSelect');
const cantClasesSelect = document.getElementById('cantClasesSelect');
const verificSelect = {};
verificSelect.value = "";
const verifSelect = document.getElementById('verifSelect');
verifSelect.addEventListener("click", function () {
    const DATOS = prepararDatos();
    const llave = llaveVerif(DATOS);
    if (llave === 1) {
        if (document.getElementById('verifSelect').checked) {
            verificSelect.value = document.getElementById('verifSelect').checked;
            document.getElementById('alertVerific1').hidden = true;
            document.getElementById('alertVerific2').hidden = false;
        } else {
            verificSelect.value = "";
            document.getElementById('alertVerific1').hidden = false;
            document.getElementById('alertVerific2').hidden = true;
        };
    } else {
        var alertElement = document.getElementById('alertVerific1');
        if (document.getElementById('verifSelect').checked) {
            verificSelect.value = document.getElementById('verifSelect').checked;
            document.getElementById('alertVerific1').hidden = false;
            document.getElementById('alertVerific2').hidden = true;
            alertElement.classList.remove('alert-warning');
            alertElement.classList.add('alert-danger');
        } else {
            verificSelect.value = "";
            document.getElementById('alertVerific1').hidden = false;
            document.getElementById('alertVerific2').hidden = true;
            alertElement.classList.remove('alert-danger');
            alertElement.classList.add('alert-warning');
        };
    };
});
//Controla la carga del año en title y los Rangos de Fechas en Suplencias
anoSelect.addEventListener("input", function () {
    let ano = anoSelect.value;
    let mes = mesSelect.value;
    document.getElementById('titleFormsH1').textContent = 'Formulario de Simulación de Haberes ' + ano;
    document.getElementById('titleTableH1').textContent = 'Recibo de Simulación de Haberes ' + ano;
    if (ano !== '' && mes !== '') {
        ano = parseInt(anoSelect.value);
        mes = mesSelect.value.split('-')[0]; // Extraer solo el número del mes
        let mesNum = parseInt(mes) + 1;
        if (mes === "5-SAC") {
            mesNum = 5;
        } else if (mes === "11-SAC") {
            mesNum = 11;
        };
        const fechaMin = new Date(ano, mesNum - 1, 1);
        const fechaMax = new Date(ano, mesNum, 0);

        for (let i = 1; i <= 6; i++) {
            i = i.toString();
            array = ['min', 'max'];
            for (let j = 0; j < 2; j++) {
                document.getElementById('inicioSuplencia' + i).setAttribute(array[j], fechaMin.toISOString().split('T')[0]);
                document.getElementById('finSuplencia' + i).setAttribute(array[j], fechaMax.toISOString().split('T')[0]);
            };
        };
    };
});
//End Controla la carga del año en title y los Rangos de Fechas en Suplencias 


//Cambios mes Marzo - hijos > 0
mesSelect.addEventListener("input", function () {
    const list5 = document.getElementById("list5");
    const list6 = document.getElementById("list6");
    const list7 = document.getElementById("list7");
    if (mesSelect.value === "2" && parseInt(hijosSelect.value) > 0) {
        document.getElementById("hijosEscDiv").hidden = false;
        list5.innerHTML = list5.innerHTML.replace("5", "6");
        list6.innerHTML = list6.innerHTML.replace("6", "7");
        list7.innerHTML = list7.innerHTML.replace("7", "8");
        hijosEscSelect.setAttribute("max", parseInt(hijosSelect.value));
        document.getElementById("hijosSelectMax").title = "Mínimo: 0 y Máximo: " + parseInt(hijosSelect.value);
    } else {
        document.getElementById("hijosEscDiv").hidden = true;
        list5.innerHTML = list5.innerHTML.replace("6", "5");
        list6.innerHTML = list6.innerHTML.replace("7", "6");
        list7.innerHTML = list7.innerHTML.replace("8", "7");
        hijosEscSelect.value = "";
    };
    let ano = anoSelect.value;
    let mes = mesSelect.value;
    if (ano !== '' && mes !== '') {
        ano = parseInt(anoSelect.value);
        mes = mesSelect.value.split('-')[0]; // Obtener solo el número del mes

        let mesNum = parseInt(mes) + 1;
        if (mes === "5-SAC") {
            mes = 5;
        } else if (mes === "11-SAC") {
            mes = 11;
        };
        const fechaMin = new Date(ano, mesNum - 1, 1);
        const fechaMax = new Date(ano, mesNum, 0);
        for (let i = 1; i <= 6; i++) {
            i = i.toString();
            array = ['min', 'max'];
            for (let j = 0; j < 2; j++) {
                document.getElementById('inicioSuplencia' + i).setAttribute(array[j], fechaMin.toISOString().split('T')[0]);
                document.getElementById('finSuplencia' + i).setAttribute(array[j], fechaMax.toISOString().split('T')[0]);
            };
        };
    };
});

//Cambios hijos>0 - mes Marzo
hijosSelect.addEventListener("input", function () {
    const list5 = document.getElementById("list5");
    const list6 = document.getElementById("list6");
    const list7 = document.getElementById("list7");
    if (mesSelect.value === "2" && parseInt(hijosSelect.value) > 0) {
        document.getElementById("hijosEscDiv").hidden = false;
        list5.innerHTML = list5.innerHTML.replace("5", "6");
        list6.innerHTML = list6.innerHTML.replace("6", "7");
        list7.innerHTML = list7.innerHTML.replace("7", "8");
        hijosEscSelect.setAttribute("max", parseInt(hijosSelect.value));
        document.getElementById("hijosSelectMax").title = "Mínimo: 0 y Máximo: " + parseInt(hijosSelect.value);
    } else {
        document.getElementById("hijosEscDiv").hidden = true;
        list5.innerHTML = list5.innerHTML.replace("6", "5");
        list6.innerHTML = list6.innerHTML.replace("7", "6");
        list7.innerHTML = list7.innerHTML.replace("8", "7");
        hijosEscSelect.value = "";
    };
    if (parseInt(hijosSelect.value) < 0 || parseInt(hijosSelect.value) > 10) {
        hijosSelect.value = "";
    };
});
//Cambios hijosEsc
hijosEscSelect.addEventListener('input', function () {
    if (parseInt(hijosEscSelect.value) < 0 || parseInt(hijosEscSelect.value) > parseInt(hijosSelect.value)) {
        hijosEscSelect.value = "";
    };
});
//Cambios Cantidad de Clases
cantClasesSelect.addEventListener('change', function () {
    cantClasesSelect.hidden = false;
    const arrayClasesIdDiv = ['clase1Div', 'clase2Div', 'clase3Div', 'clase4Div', 'clase5Div', 'clase6Div'];
    const arrayCamposIdClase = [['contrato1Div', 'nivel1Div', 'numeroClase1Div'], ['contrato2Div', 'nivel2Div', 'numeroClase2Div'], ['contrato3Div', 'nivel3Div', 'numeroClase3Div'], ['contrato4Div', 'nivel4Div', 'numeroClase4Div'], ['contrato5Div', 'nivel5Div', 'numeroClase5Div'], ['contrato6Div', 'nivel6Div', 'numeroClase6Div']];
    const arrayValores = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]
    document.getElementById('camposClaseDiv').hidden = false;
    for (let i = 0; i < arrayClasesIdDiv.length; i++) {
        if (parseFloat(cantClasesSelect.value) >= arrayValores[i]) {
            document.getElementById(arrayClasesIdDiv[i]).hidden = false
            for (let j = 0; j < 3; j++) {
                document.getElementById(arrayCamposIdClase[i][j]).hidden = false;
            };
        } else {
            document.getElementById(arrayClasesIdDiv[i]).hidden = true;
            for (let k = 0; k < 3; k++) {
                document.getElementById(arrayCamposIdClase[i][k]).hidden = true;
            };
        };
    };
    document.getElementById('alertVerific1').hidden = false;
    document.getElementById('alertVerific2').hidden = true;
});


//Valiadación de formulario
(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        document.getElementById('resetButton').addEventListener('click', function (event) {
            event.preventDefault();
            form.classList.remove("was-validated");
        }, false);
    });
})();

(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        document.getElementById('resetButton2').addEventListener('click', function (event) {
            event.preventDefault();
            form.classList.remove("was-validated");
        }, false);
    });
})();

(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        document.getElementById('calcButton').addEventListener('click', function (event) {
            if (true) {  //!form.checkValidity()
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

for (let i = 1; i <= 6; i++) {
    i = i.toString();
    document.getElementById('plantaPerm' + i).addEventListener('change', function () {
        plantaPerm(i);
    });
    document.getElementById('temporario' + i).addEventListener('change', function () {
        temporario(i);
    });
};

function plantaPerm(n) {
    const i = n.toString();
    if (document.getElementById('plantaPerm' + i).checked) {
        document.getElementById('temporario' + i).checked = false;
        document.getElementById('suplencia' + i + 'Div').hidden = true;
        document.getElementById('letrab' + i).innerHTML = document.getElementById('letrab' + i).innerHTML.replace("c", "b");
        document.getElementById('letrac' + i).innerHTML = document.getElementById('letrac' + i).innerHTML.replace("d", "c");
        document.getElementById('letrad' + i + '1').innerHTML = document.getElementById('letrad' + i + '1').innerHTML.replace("e", "d");
        document.getElementById('letrad' + i + '2').innerHTML = document.getElementById('letrad' + i + '2').innerHTML.replace("e", "d");
        document.getElementById('letrae' + i + '1').innerHTML = document.getElementById('letrae' + i + '1').innerHTML.replace("f", "e");
        document.getElementById('letrae' + i + '2').innerHTML = document.getElementById('letrae' + i + '2').innerHTML.replace("f", "e");
    } else {
        document.getElementById('temporario' + i).checked = true;
        document.getElementById('suplencia' + i + 'Div').hidden = false;
        document.getElementById('letrab' + i).innerHTML = document.getElementById('letrab' + i).innerHTML.replace("b", "c");
        document.getElementById('letrac' + i).innerHTML = document.getElementById('letrac' + i).innerHTML.replace("c", "d");
        document.getElementById('letrad' + i + '1').innerHTML = document.getElementById('letrad' + i + '1').innerHTML.replace("d", "e");
        document.getElementById('letrad' + i + '2').innerHTML = document.getElementById('letrad' + i + '2').innerHTML.replace("d", "e");
        document.getElementById('letrae' + i + '1').innerHTML = document.getElementById('letrae' + i + '1').innerHTML.replace("e", "f");
        document.getElementById('letrae' + i + '2').innerHTML = document.getElementById('letrae' + i + '2').innerHTML.replace("e", "f");
    };
};

function temporario(n) {
    const i = n.toString();
    if (document.getElementById('temporario' + i).checked) {
        document.getElementById('plantaPerm' + i).checked = false;
        document.getElementById('suplencia' + i + 'Div').hidden = false;
        document.getElementById('letrab' + i).innerHTML = document.getElementById('letrab' + i).innerHTML.replace("b", "c");
        document.getElementById('letrac' + i).innerHTML = document.getElementById('letrac' + i).innerHTML.replace("c", "d");
        document.getElementById('letrad' + i + '1').innerHTML = document.getElementById('letrad' + i + '1').innerHTML.replace("d", "e");
        document.getElementById('letrad' + i + '2').innerHTML = document.getElementById('letrad' + i + '2').innerHTML.replace("d", "e");
        document.getElementById('letrae' + i + '1').innerHTML = document.getElementById('letrae' + i + '1').innerHTML.replace("e", "f");
        document.getElementById('letrae' + i + '2').innerHTML = document.getElementById('letrae' + i + '2').innerHTML.replace("e", "f");
    } else {
        document.getElementById('plantaPerm' + i).checked = true;
        document.getElementById('suplencia' + i + 'Div').hidden = true;
        document.getElementById('letrab' + i).innerHTML = document.getElementById('letrab' + i).innerHTML.replace("c", "b");
        document.getElementById('letrac' + i).innerHTML = document.getElementById('letrac' + i).innerHTML.replace("d", "c");
        document.getElementById('letrad' + i + '1').innerHTML = document.getElementById('letrad' + i + '1').innerHTML.replace("e", "d");
        document.getElementById('letrad' + i + '2').innerHTML = document.getElementById('letrad' + i + '2').innerHTML.replace("e", "d");
        document.getElementById('letrae' + i + '1').innerHTML = document.getElementById('letrae' + i + '1').innerHTML.replace("f", "e");
        document.getElementById('letrae' + i + '2').innerHTML = document.getElementById('letrae' + i + '2').innerHTML.replace("f", "e");
    };
};


for (let i = 1; i <= 6; i++) {
    document.getElementById('inicioSuplencia' + i).addEventListener('input', function () {
        topeFechaMin(i);
    });
    document.getElementById('finSuplencia' + i).addEventListener('input', function () {
        topeFechaMax(i);
    });
};

function topeFechaMin(n) {
    const i = n.toString();
    document.getElementById('finSuplencia' + i).disabled = false;
    const fechaMin = new Date(document.getElementById('inicioSuplencia' + i).value);
    fechaMin.setDate(fechaMin.getDate() + 1);
    document.getElementById('finSuplencia' + i).setAttribute('min', fechaMin.toISOString().split('T')[0]);
};
function topeFechaMax(n) {
    const i = n.toString();
    const fechaMax = new Date(document.getElementById('finSuplencia' + i).value);
    document.getElementById('inicioSuplencia' + i).setAttribute('max', fechaMax.toISOString().split('T')[0]);
};

for (let h = 1; h <= 6; h++) {
    h = h.toString()
    for (var i = 0; i < document.getElementsByName('nivel' + h + 'Radio').length; i++) {
        document.getElementsByName('nivel' + h + 'Radio')[i].addEventListener("change", function () {
            var valorSeleccionado = '';
            for (var j = 0; j < document.getElementsByName('nivel' + h + 'Radio').length; j++) {
                if (document.getElementsByName('nivel' + h + 'Radio')[j].checked) {
                    valorSeleccionado = document.getElementsByName('nivel' + h + 'Radio')[j].value;
                    break;
                };
            };
            document.getElementById('numeroClase' + h + 'Select').value = '';
            document.getElementById('zona' + h + 'IPSelect').value = '';
            document.getElementById('zona' + h + 'SSSelect').value = '';
            document.getElementById('simple' + h + 'Select').checked = false;
            document.getElementById('extendida' + h + 'Select').checked = false;
            document.getElementById('horasCat' + h + 'Select').value = '';
            document.getElementById('numeroClase' + h + 'Select').disabled = false;
            document.getElementById('zona' + h + 'IPDiv').hidden = true;
            document.getElementById('zona' + h + 'SSDiv').hidden = true;
            document.getElementById('jornada' + h + 'Div').hidden = true;
            document.getElementById('horasCat' + h + 'Div').hidden = true;
            if (valorSeleccionado === "inicial") {
                document.getElementById('zona' + h + 'IPDiv').hidden = false;
                document.getElementById('jornada' + h + 'Div').hidden = false;
            } else {
                document.getElementById('zona' + h + 'SSDiv').hidden = false;
            };
        });
    };
};

for (let i = 1; i <= 6; i++) {
    document.getElementById('numeroClase' + i + 'Select').addEventListener("input", function () {
        var nivelSeleccionado = '';
        for (var j = 0; j < document.getElementsByName('nivel' + i + 'Radio').length; j++) {
            if (document.getElementsByName('nivel' + i + 'Radio')[j].checked) {
                nivelSeleccionado = document.getElementsByName('nivel' + i + 'Radio')[j].value;
                break;
            };
        };
        const resultado = buscarDataClase(parseInt(document.getElementById('numeroClase' + i + 'Select').value));
        if (resultado.clase !== '') {
            if (resultado.clase === 191 || resultado.clase === 192) {
                document.getElementById('zona' + i + 'IPSelect').value = '';
                document.getElementById('zona' + i + 'IPDiv').hidden = true;

                document.getElementById('zona' + i + 'SSSelect').value = '';
                document.getElementById('zona' + i + 'SSDiv').hidden = false;

                document.getElementById('simple' + i + 'Select').checked = false;
                document.getElementById('extendida' + i + 'Select').checked = false;
                document.getElementById('jornada' + i + 'Div').hidden = true;

                document.getElementById('horasCat' + i + 'Select').value = '';
                document.getElementById('horasCat' + i + 'Div').hidden = false;

            } else {
                if (nivelSeleccionado === 'inicial') {
                    document.getElementById('zona' + i + 'IPSelect').value = '';
                    document.getElementById('zona' + i + 'IPDiv').hidden = false;

                    document.getElementById('zona' + i + 'SSSelect').value = '';
                    document.getElementById('zona' + i + 'SSDiv').hidden = true;

                    document.getElementById('simple' + i + 'Select').checked = false;
                    document.getElementById('extendida' + i + 'Select').checked = false;
                    document.getElementById('jornada' + i + 'Div').hidden = false;

                    document.getElementById('horasCat' + i + 'Select').value = '';
                    document.getElementById('horasCat' + i + 'Div').hidden = true;
                } else {
                    document.getElementById('zona' + i + 'IPSelect').value = '';
                    document.getElementById('zona' + i + 'IPDiv').hidden = true;

                    document.getElementById('zona' + i + 'SSSelect').value = '';
                    document.getElementById('zona' + i + 'SSDiv').hidden = false;

                    document.getElementById('simple' + i + 'Select').checked = false;
                    document.getElementById('extendida' + i + 'Select').checked = false;
                    document.getElementById('jornada' + i + 'Div').hidden = false;

                    document.getElementById('horasCat' + i + 'Select').value = '';
                    document.getElementById('horasCat' + i + 'Div').hidden = true;
                };
            };
        };
    });
};


for (let i = 1; i <= 6; i++) {
    document.getElementById('horasCat' + i + 'Select').addEventListener('input', function () {
        horasCat(i - 1)
    });
};

function horasCat(h) {
    const arrayHorasCatIds = ['horasCat1Select', 'horasCat2Select', 'horasCat3Select', 'horasCat4Select', 'horasCat5Select', 'horasCat6Select'];
    const arrayAbbr = ['horasCat1Abbr', 'horasCat2Abbr', 'horasCat3Abbr', 'horasCat4Abbr', 'horasCat5Abbr', 'horasCat6Abbr'];
    let hCat = document.getElementById(arrayHorasCatIds[h]).value;
    if (hCat === '') {
        hCat = 0;
    };
    const hcValor = parseInt(hCat);
    const hcTotal = sumaHcTotal(arrayHorasCatIds);
    if (hcTotal >= 0 && hcTotal <= 42) {
        const max = 42 - hcTotal;
        for (let i = 0; i < 6; i++) {
            document.getElementById(arrayAbbr[i]).title = 'Mínimo: 0 y Máximo: ' + max.toString();
            document.getElementById(arrayHorasCatIds[i]).placeholder = '¡Máximo es ' + max.toString() + '!';
            document.getElementById(arrayAbbr[i]).max = max;
            if (max === 0) {
                document.getElementById(arrayHorasCatIds[i]).disabled = true;
            };
        };
        document.getElementById(arrayHorasCatIds[h]).disabled = false;
    } else {
        document.getElementById(arrayHorasCatIds[h]).value = '';
        const max2 = 42 - hcTotal + hcValor;
        for (let j = 0; j < 6; j++) {
            document.getElementById(arrayAbbr[j]).title = 'Mínimo: 0 y Máximo: ' + max2.toString();
            document.getElementById(arrayHorasCatIds[j]).placeholder = '¡Máximo es ' + max2.toString() + '!';
            document.getElementById(arrayAbbr[j]).max = max2;
        };
    };
};

function sumaHcTotal(arrayHorasCatIds) {
    let sumaHcTotal = 0;
    for (let i = 0; i < arrayHorasCatIds.length; i++) {
        document.getElementById(arrayHorasCatIds[i]).disabled = false;
        if (document.getElementById(arrayHorasCatIds[i]).value !== '') {
            sumaHcTotal += parseInt(document.getElementById(arrayHorasCatIds[i]).value);
        };
    };
    return sumaHcTotal;
};

//Start Control de Clases
for (let i = 1; i <= 6; i++) {
    document.getElementById('numeroClase' + i + 'Select').addEventListener('input', function () {
        actualizarTexto(i);
    });
};


function actualizarTexto(i) {
    const claseSelect = document.getElementById('numeroClase' + i + 'Select').value;
    const resultado = buscarDataClase(parseInt(claseSelect));
    if (resultado.clase == claseSelect) {
        const cargoTexto = resultado.cargo;
        const categoriaTexto = resultado.categoria;
        const indiceBasicoTexto = resultado.indiceClase;
        document.getElementById('cargoClase' + i + 'Select').classList.remove('alert-danger');
        document.getElementById('cargoClase' + i + 'Select').classList.add('alert-primary');
        document.getElementById('numeroClase' + i + 'Select').classList.remove('is-invalid');
        const cargoResultado = '<strong>Cargo: </strong> ' + cargoTexto +
            '<br><strong>Categoria: </strong> ' + categoriaTexto +
            '<br><strong>Valor punto: </strong> ' + indiceBasicoTexto;
        document.getElementById('cargoClase' + i + 'Select').innerHTML = cargoResultado;
    } else {
        document.getElementById('numeroClase' + i + 'Select').classList.add('is-invalid');
        document.getElementById('cargoClase' + i + 'Select').classList.remove('alert-primary');
        document.getElementById('cargoClase' + i + 'Select').classList.add('alert-danger');
        document.getElementById('cargoClase' + i + 'Select').innerHTML = "<strong>Número de clase no encontrado.</strong><br> Asegurate de revisar la clase en tu recibo.";
    }
};

function buscarDataClase(numeroClase) {
    const clases = {
        clase20: { 'clase': 20, 'cargo': 'Presidente', 'categoria': 5, 'indiceClase': 4819, 'indiceBasico': 4819 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase26: { 'clase': 26, 'cargo': 'Secretario General', 'categoria': 5, 'indiceClase': 4329, 'indiceBasico': 4329 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase27: { 'clase': 27, 'cargo': 'Vocal', 'categoria': 5, 'indiceClase': 4609, 'indiceBasico': 4609 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase101: { 'clase': 101, 'cargo': 'Director de Nivel (General)', 'categoria': 5, 'indiceClase': 4609, 'indiceBasico': 4609 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase102: { 'clase': 102, 'cargo': 'Supervisor General', 'categoria': 5, 'indiceClase': 4248, 'indiceBasico': 4248 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase103: { 'clase': 103, 'cargo': 'Jefe de Normatización', 'categoria': 5, 'indiceClase': 4329, 'indiceBasico': 4329 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase104: { 'clase': 104, 'cargo': 'Secretario Técnico', 'categoria': 5, 'indiceClase': 4329, 'indiceBasico': 4329 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase105: { 'clase': 105, 'cargo': 'Supervisor General', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase107: { 'clase': 107, 'cargo': 'Rector de Educación Superior', 'categoria': 5, 'indiceClase': 3162, 'indiceBasico': 3162 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase108: { 'clase': 108, 'cargo': 'Vicerrector de Educación Superior', 'categoria': 5, 'indiceClase': 2604, 'indiceBasico': 2604 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase109: { 'clase': 109, 'cargo': 'Rector de Nivel Secundario de 1º Categoría', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase110: { 'clase': 110, 'cargo': 'Regente Superior', 'categoria': 5, 'indiceClase': 2009, 'indiceBasico': 2009 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase111: { 'clase': 111, 'cargo': 'Rector de Nivel Secundario de 2º Categoría', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase112: { 'clase': 112, 'cargo': 'Rector de Nivel Secundario de 3º Categoría', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase113: { 'clase': 113, 'cargo': 'Director de Enseñanza Agraria de 3º Categoría', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase114: { 'clase': 114, 'cargo': 'Vicerrector de Nivel Secundario de 1º Categoría', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase115: { 'clase': 115, 'cargo': 'Vicerrector de Nivel Secundario de 2º Categoría', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase116: { 'clase': 116, 'cargo': 'Vice-Director de 1º Centros Deportivos', 'categoria': 5, 'indiceClase': 1848, 'indiceBasico': 1848 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase117: { 'clase': 117, 'cargo': 'Vice-Director de 2º Centros Deportivos', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase118: { 'clase': 118, 'cargo': 'Vicerrector de Nivel Secundario de 3º Categoría', 'categoria': 5, 'indiceClase': 1915, 'indiceBasico': 1915 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase119: { 'clase': 119, 'cargo': 'Regente del Dpto de Aplicación de 1º', 'categoria': 5, 'indiceClase': 2021, 'indiceBasico': 2021 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase120: { 'clase': 120, 'cargo': 'Jefe General de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase121: { 'clase': 121, 'cargo': 'Regente del Dpto de Aplicación de 2º', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase122: { 'clase': 122, 'cargo': 'Subregente del Departamento de Aplicación', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase123: { 'clase': 123, 'cargo': 'Secretario de Educación Superior', 'categoria': 5, 'indiceClase': 1674, 'indiceBasico': 1674 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase124: { 'clase': 124, 'cargo': 'Secretario de Nivel Secundario de 1º', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase125: { 'clase': 125, 'cargo': 'Director de 1º Centros Deportivos', 'categoria': 5, 'indiceClase': 2310, 'indiceBasico': 2310 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase126: { 'clase': 126, 'cargo': 'Secretario de Nivel Secundario de 2º', 'categoria': 5, 'indiceClase': 1386, 'indiceBasico': 1386 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase127: { 'clase': 127, 'cargo': 'Director de 2º Centros Deportivos', 'categoria': 5, 'indiceClase': 1961, 'indiceBasico': 1961 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase128: { 'clase': 128, 'cargo': 'Director de 3º Centros Deportivos', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase129: { 'clase': 129, 'cargo': 'Secretario de Nivel Secundario de 3º', 'categoria': 5, 'indiceClase': 1270, 'indiceBasico': 1270 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase130: { 'clase': 130, 'cargo': 'Prosecretario de Educación Superior', 'categoria': 5, 'indiceClase': 1450, 'indiceBasico': 1450 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase131: { 'clase': 131, 'cargo': 'Jefe de Sección de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1540, 'indiceBasico': 1540 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase132: { 'clase': 132, 'cargo': 'Maestro de Jardín de Infantes', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase133: { 'clase': 133, 'cargo': 'Bedel de Educación Superior', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase134: { 'clase': 134, 'cargo': 'Maestra de Grado Dpto Aplicación', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase135: { 'clase': 135, 'cargo': 'Auxiliar de Dirección', 'categoria': 5, 'indiceClase': 1070, 'indiceBasico': 1070 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase136: { 'clase': 136, 'cargo': 'Maestro de Sección Cultural', 'categoria': 5, 'indiceClase': 1155, 'indiceBasico': 1155 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase137: { 'clase': 137, 'cargo': 'Maestro Secretario', 'categoria': 5, 'indiceClase': 1288, 'indiceBasico': 1288 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase138: { 'clase': 138, 'cargo': 'Maestro de Enseñanza Práctica ', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase139: { 'clase': 139, 'cargo': 'Maestro Especial', 'categoria': 5, 'indiceClase': 1205, 'indiceBasico': 1205 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase140: { 'clase': 140, 'cargo': 'Jefe de Laboratorio', 'categoria': 5, 'indiceClase': 1500, 'indiceBasico': 1500 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase141: { 'clase': 141, 'cargo': 'Maestro Ayudante de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 971, 'indiceBasico': 971 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase142: { 'clase': 142, 'cargo': 'Vice-Director de 3º Centros Deportivos', 'categoria': 5, 'indiceClase': 1617, 'indiceBasico': 1617 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase143: { 'clase': 143, 'cargo': 'Jefe de Preceptores de Nivel Secundario de 1º', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase144: { 'clase': 144, 'cargo': 'Bibliotecario Nivel Medio', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase146: { 'clase': 146, 'cargo': 'Subjefe de Preceptores de Nivel Secundario', 'categoria': 5, 'indiceClase': 1330, 'indiceBasico': 1330 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase147: { 'clase': 147, 'cargo': 'Jefe de Preceptores de Nivel Secundario de 2º', 'categoria': 5, 'indiceClase': 1330, 'indiceBasico': 1330 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase148: { 'clase': 148, 'cargo': 'Jefe de Preceptores de Nivel Secundario de 3º', 'categoria': 5, 'indiceClase': 1260, 'indiceBasico': 1260 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase149: { 'clase': 149, 'cargo': 'Jefe de Trabajos Prácticos Superior', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase150: { 'clase': 150, 'cargo': 'Ayudante de Trabajos Prácticos de Educación Superior', 'categoria': 5, 'indiceClase': 962, 'indiceBasico': 962 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase151: { 'clase': 151, 'cargo': 'Ayudante de Clases Prácticas de Nivel Secundario', 'categoria': 5, 'indiceClase': 971, 'indiceBasico': 971 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase152: { 'clase': 152, 'cargo': 'Preceptor de Nivel Secundario', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase153: { 'clase': 153, 'cargo': 'Regente de 1º', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase154: { 'clase': 154, 'cargo': 'Regente de 3º', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase155: { 'clase': 155, 'cargo': 'Jefe General de Ens. Práctica', 'categoria': 5, 'indiceClase': 1511, 'indiceBasico': 1511 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase156: { 'clase': 156, 'cargo': 'Miembro de Junta (Básico + Ded. Exclusiva)', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase157: { 'clase': 157, 'cargo': 'Director de Jardín de Infantes', 'categoria': 5, 'indiceClase': 2633, 'indiceBasico': 2633 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase158: { 'clase': 158, 'cargo': 'Vice director Jardines de Infantes 1ª', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase159: { 'clase': 159, 'cargo': 'Jefe de Departamento Educación Física', 'categoria': 5, 'indiceClase': 753, 'indiceBasico': 753 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase160: { 'clase': 160, 'cargo': 'Preceptor de Educación Superior', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase161: { 'clase': 161, 'cargo': 'Bibliotecario de Educación Superior', 'categoria': 5, 'indiceClase': 1450, 'indiceBasico': 1450 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase162: { 'clase': 162, 'cargo': 'Pro-Secretario 3º ', 'categoria': 5, 'indiceClase': 1155, 'indiceBasico': 1155 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase163: { 'clase': 163, 'cargo': 'Sub-Regente de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase164: { 'clase': 164, 'cargo': 'Coordinador General de Actividades Prácticas', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase165: { 'clase': 165, 'cargo': 'Jefe Sectorial de Trabajos Prácticos', 'categoria': 5, 'indiceClase': 1386, 'indiceBasico': 1386 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase166: { 'clase': 166, 'cargo': 'Instructor', 'categoria': 5, 'indiceClase': 1155, 'indiceBasico': 1155 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase167: { 'clase': 167, 'cargo': 'Técnico P.F. Alfabetización', 'categoria': 5, 'indiceClase': 2425, 'indiceBasico': 2425 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase168: { 'clase': 168, 'cargo': 'Responsable Zonal Plan', 'categoria': 5, 'indiceClase': 2310, 'indiceBasico': 2310 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase169: { 'clase': 169, 'cargo': 'Inspector Médico Sanidad Escolar', 'categoria': 5, 'indiceClase': 1960, 'indiceBasico': 1960 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase170: { 'clase': 170, 'cargo': 'Jefe de Preceptores Superior', 'categoria': 5, 'indiceClase': 1330, 'indiceBasico': 1330 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase171: { 'clase': 171, 'cargo': 'Jefe General de Enseñanza Práctica 2º', 'categoria': 5, 'indiceClase': 1617, 'indiceBasico': 1617 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase172: { 'clase': 172, 'cargo': 'Director de Misión Monotécnica', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase173: { 'clase': 173, 'cargo': 'Regente de 2º de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1617, 'indiceBasico': 1617 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase175: { 'clase': 175, 'cargo': 'Jefe de Departamento Educación Secundaria', 'categoria': 5, 'indiceClase': 462, 'indiceBasico': 462 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase176: { 'clase': 176, 'cargo': 'Director de Carrera Educación Superior', 'categoria': 5, 'indiceClase': 558, 'indiceBasico': 558 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase191: { 'clase': 191, 'cargo': 'Profesor de Educación Superior', 'categoria': 7, 'indiceClase': 93.02, 'indiceBasico': 93.02 / 1400, 'nivel': 'superior', 'apJub': 0.2 },
        clase192: { 'clase': 192, 'cargo': 'Profesor de Educación Secundaria', 'categoria': 7, 'indiceClase': 77.01, 'indiceBasico': 77.01 / 1400, 'nivel': 'medio', 'apJub': 0.2 },
        clase302: { 'clase': 302, 'cargo': 'Sub-Supervisor General', 'categoria': 5, 'indiceClase': 4132, 'indiceBasico': 4132 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase303: { 'clase': 303, 'cargo': 'Director Técnico Docente', 'categoria': 5, 'indiceClase': 3830, 'indiceBasico': 3830 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase304: { 'clase': 304, 'cargo': 'Supervisor Secretario Supervisor General', 'categoria': 5, 'indiceClase': 4050, 'indiceBasico': 4050 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase305: { 'clase': 305, 'cargo': 'Supervisor', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase307: { 'clase': 307, 'cargo': 'Maestro Especial Escuela Jornada Extendida', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase308: { 'clase': 308, 'cargo': 'Coordinador Técnico Docente', 'categoria': 5, 'indiceClase': 3730, 'indiceBasico': 3730 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase309: { 'clase': 309, 'cargo': 'Auxiliar Técnico Docente', 'categoria': 5, 'indiceClase': 1855, 'indiceBasico': 1855 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase310: { 'clase': 310, 'cargo': 'Director de Escuela de Educación Especial de 4º Categoría', 'categoria': 5, 'indiceClase': 2063, 'indiceBasico': 2063 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase311: { 'clase': 311, 'cargo': 'Director de Escuela de Educación Especial de 2º Categoría', 'categoria': 5, 'indiceClase': 2505, 'indiceBasico': 2505 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase312: { 'clase': 312, 'cargo': 'Vicedirector de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 2505, 'indiceBasico': 2505 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase313: { 'clase': 313, 'cargo': 'Director de 1º Categoría Escuela Jornada Extendida', 'categoria': 5, 'indiceClase': 2947, 'indiceBasico': 2947 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase314: { 'clase': 314, 'cargo': 'Director de 2º Categoría Escuela Jornada Extendida-Técnico de Alfabetización', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase315: { 'clase': 315, 'cargo': 'Vicedirector de Escuela Jornada Extendida', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase316: { 'clase': 316, 'cargo': 'Maestro de Grado Escuela de Jornada Completa (Plan Piloto)', 'categoria': 5, 'indiceClase': 2205, 'indiceBasico': 2205 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase317: { 'clase': 317, 'cargo': 'Maestro de Taller de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase318: { 'clase': 318, 'cargo': 'Asistente Social', 'categoria': 5, 'indiceClase': 1640, 'indiceBasico': 1640 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase319: { 'clase': 319, 'cargo': 'Maestro de Orientación Laboral', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase320: { 'clase': 320, 'cargo': 'Director de Escuela de Educación Especial de 1º Categoría-Responsable Zonal', 'categoria': 5, 'indiceClase': 2947, 'indiceBasico': 2947 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase321: { 'clase': 321, 'cargo': 'Secretario Técnico de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase322: { 'clase': 322, 'cargo': 'Maestro de Gabinete (Psicólogo, Foniátra, Fonoaudiólogo, Músico Terapéuta, Psicopedagógo, Psicólogo Educacional, Kinesiólogo)', 'categoria': 5, 'indiceClase': 1640, 'indiceBasico': 1640 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase323: { 'clase': 323, 'cargo': 'Maestro de Grado de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase327: { 'clase': 327, 'cargo': 'Maestro Especial de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase328: { 'clase': 328, 'cargo': 'Director de 1º Categoría Escuela Común', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase329: { 'clase': 329, 'cargo': 'Director de 2º Categoría Escuela Común', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase330: { 'clase': 330, 'cargo': 'Director de 3º Categoría Escuela común', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase331: { 'clase': 331, 'cargo': 'Director de 4º Categoría Escuela Común (Personal Único)', 'categoria': 5, 'indiceClase': 1915, 'indiceBasico': 1915 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase332: { 'clase': 332, 'cargo': 'Vicedirector Escuela Comun', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase333: { 'clase': 333, 'cargo': 'Maestro de Grado Escuela Común', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': 'Inicial', 'apJub': 0.2 },
        clase334: { 'clase': 334, 'cargo': 'Maestro de Jardín de Infantes', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase335: { 'clase': 335, 'cargo': 'Maestro Especial Escuela Común', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase336: { 'clase': 336, 'cargo': 'Director de 1º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase337: { 'clase': 337, 'cargo': 'Director de 2º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase338: { 'clase': 338, 'cargo': 'Director de 3º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase339: { 'clase': 339, 'cargo': 'Vicedirector de Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase340: { 'clase': 340, 'cargo': 'Maestro de Grado Escuela Adultos', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase341: { 'clase': 341, 'cargo': 'Director de Escuela de Educación Especial de 3º Categoría', 'categoria': 5, 'indiceClase': 2284, 'indiceBasico': 2284 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase342: { 'clase': 342, 'cargo': 'Director de 4º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 1915, 'indiceBasico': 1915 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase344: { 'clase': 344, 'cargo': 'Director de 1º Categoría Escuela Hogar', 'categoria': 5, 'indiceClase': 3094, 'indiceBasico': 3094 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase349: { 'clase': 349, 'cargo': 'Vice-Director Escuela Hogar', 'categoria': 5, 'indiceClase': 2947, 'indiceBasico': 2947 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase352: { 'clase': 352, 'cargo': 'Maestro de Grado Escuela Hogar', 'categoria': 5, 'indiceClase': 2448, 'indiceBasico': 2448 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase353: { 'clase': 353, 'cargo': 'Maestro Especial Escuela Hogar', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase360: { 'clase': 360, 'cargo': 'Directora de Escuela Jardín de 1º Categoría', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase361: { 'clase': 361, 'cargo': 'Directora de Escuela Jardín de 2º Categoría', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase365: { 'clase': 365, 'cargo': 'Vicedirector de Jardín de Infantes', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase370: { 'clase': 370, 'cargo': 'Maestro de Grado. Recup. Y Apoyo, Madur. Y Ap.', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase371: { 'clase': 371, 'cargo': 'Maestro de Grado Educación Especial Educación Domiciliaria', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase375: { 'clase': 375, 'cargo': 'Bibliotecario Nivel Primario', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase377: { 'clase': 377, 'cargo': 'Miembro de Junta (Básico + Ded. Exclusiva', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase401: { 'clase': 401, 'cargo': 'Jefe de Coordinador Servicio Médico Asistencial', 'categoria': 5, 'indiceClase': 2450, 'indiceBasico': 2450 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase402: { 'clase': 402, 'cargo': 'Jefe de División Servicio Médico Asistencial', 'categoria': 5, 'indiceClase': 2099, 'indiceBasico': 2099 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase403: { 'clase': 403, 'cargo': 'Odontólogo', 'categoria': 5, 'indiceClase': 1960, 'indiceBasico': 1960 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase404: { 'clase': 404, 'cargo': 'Médicos  o Terapéutas', 'categoria': 5, 'indiceClase': 1960, 'indiceBasico': 1960 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase406: { 'clase': 406, 'cargo': 'Jefe Servicio Social de Escuela Hogar', 'categoria': 5, 'indiceClase': 3121, 'indiceBasico': 3121 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase407: { 'clase': 407, 'cargo': 'Visitadora de Higiene de Escuela Hogar', 'categoria': 5, 'indiceClase': 2205, 'indiceBasico': 2205 / 1400, 'nivel': '', 'apJub': 0.185 },
        clase408: { 'clase': 408, 'cargo': 'Maestro de Taller', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase409: { 'clase': 409, 'cargo': 'Maestro Especial de Técnico Agropecuario', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase410: { 'clase': 410, 'cargo': 'Maestro de Grado Coordinador de Taller', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 },
        clase411: { 'clase': 411, 'cargo': 'Maestro de Grado Promotor Comunitario', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '', 'apJub': 0.2 }
    };
    const infoClase = clases[`clase${numeroClase}`];
    if (infoClase) {
        return infoClase;
    } else {
        return { 'clase': '', 'cargo': '', 'categoria': '', 'indiceClase': '', 'indiceBasico': '', 'nivel': '', 'apJub': '' };
    };
};
//End Control de Clases
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