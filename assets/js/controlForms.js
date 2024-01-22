const anoSelect = document.getElementById("anoSelect");
const mesSelect = document.getElementById("mesSelect");
const antiguedadSelect = document.getElementById("antiguedadSelect");
const hijosSelect = document.getElementById("hijosSelect");
const hijosEscSelect = document.getElementById("hijosEscSelect");
const unCargoRadio = document.getElementById("unCargoSelect");
const dosCargosRadio = document.getElementById("dosCargoSelect");
const gremioSiRadio = document.getElementById("gremioSiSelect");
const gremioNoRadio = document.getElementById("gremioNoSelect");

anoSelect.addEventListener("input", function () {
    const ano = anoSelect.value;
    document.getElementById('titleFormsH1').textContent = 'Simulación de Haberes ' + ano;
    var mes = mesSelect.value;
    if (mes === "6-SAC") {
        mes = "5";
    } else if (mes === "12-SAC") {
        mes = "11";
    };
    const fechaMin = new Date(ano, mes - 1, 1);
    const fechaMax = new Date(ano, mes, 0);

    const inicioSuplencia1 = document.getElementById("inicioSuplencia1");
    const finSuplencia1 = document.getElementById("finSuplencia1");

    inicioSuplencia1.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    inicioSuplencia1.setAttribute("max", fechaMax.toISOString().split('T')[0]);
    finSuplencia1.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    finSuplencia1.setAttribute("max", fechaMax.toISOString().split('T')[0]);

    const inicioSuplencia2 = document.getElementById("inicioSuplencia2");
    const finSuplencia2 = document.getElementById("finSuplencia2");

    inicioSuplencia2.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    inicioSuplencia2.setAttribute("max", fechaMax.toISOString().split('T')[0]);
    finSuplencia2.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    finSuplencia2.setAttribute("max", fechaMax.toISOString().split('T')[0]);
});

mesSelect.addEventListener("input", function () {
    const list5 = document.getElementById("list5");
    const list6 = document.getElementById("list6");
    const list7 = document.getElementById("list7");
    if (mesSelect.value === "3" && parseInt(hijosSelect.value) > 0) {
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
});

hijosSelect.addEventListener("input", function () {
    const list5 = document.getElementById("list5");
    const list6 = document.getElementById("list6");
    const list7 = document.getElementById("list7");
    if (mesSelect.value === "3" && parseInt(hijosSelect.value) > 0) {
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

hijosEscSelect.addEventListener('input', function () {
    if (parseInt(hijosEscSelect.value) < 0 || parseInt(hijosEscSelect.value) > parseInt(hijosSelect.value)) {
        hijosEscSelect.value = "";
    };
});

unCargoRadio.addEventListener("change", function () {
    if (unCargoRadio.checked) {
        document.getElementById("campos1CargoDiv").hidden = false;
        document.getElementById("campos2CargoDiv").hidden = true;
    }
});

dosCargosRadio.addEventListener("change", function () {
    if (dosCargosRadio.checked) {
        document.getElementById("campos1CargoDiv").hidden = false;
        document.getElementById("campos2CargoDiv").hidden = false;
    }
});

gremioSiRadio.addEventListener("change", function () {
    if (gremioSiRadio.checked) {
        document.getElementById("gremioNoSelect").checked = false;
        document.getElementById("gremioNoSelect").required = false;
    }
});
gremioNoRadio.addEventListener("change", function () {
    if (gremioNoRadio.checked) {
        document.getElementById("gremioSiSelect").checked = false;
        document.getElementById("gremioSiSelect").required = false;
    }
});




const plantaPerm1Checkbox = document.getElementById('plantaPerm1');
const temporario1Checkbox = document.getElementById('temporario1');
const letrab1 = document.getElementById("letrab1");
const letrac1 = document.getElementById("letrac1");
const letrad11 = document.getElementById("letrad11");
const letrad12 = document.getElementById("letrad12");
const letrae11 = document.getElementById("letrae11");
const letrae12 = document.getElementById("letrae12");

plantaPerm1Checkbox.addEventListener('change', function () {
    if (plantaPerm1Checkbox.checked) {
        temporario1Checkbox.checked = false;
        document.getElementById("suplencia1Div").hidden = true;
        letrab1.innerHTML = letrab1.innerHTML.replace("c", "b");
        letrac1.innerHTML = letrac1.innerHTML.replace("d", "c");
        letrad11.innerHTML = letrad11.innerHTML.replace("e", "d");
        letrad12.innerHTML = letrad12.innerHTML.replace("e", "d");
        letrae11.innerHTML = letrae11.innerHTML.replace("f", "e");
        letrae12.innerHTML = letrae12.innerHTML.replace("f", "e");
    } else {
        temporario1Checkbox.checked = true;
        document.getElementById("suplencia1Div").hidden = false;
        letrab1.innerHTML = letrab1.innerHTML.replace("b", "c");
        letrac1.innerHTML = letrac1.innerHTML.replace("c", "d");
        letrad11.innerHTML = letrad11.innerHTML.replace("d", "e");
        letrad12.innerHTML = letrad12.innerHTML.replace("d", "e");
        letrae11.innerHTML = letrae11.innerHTML.replace("e", "f");
        letrae12.innerHTML = letrae12.innerHTML.replace("e", "f");
    };
});

temporario1Checkbox.addEventListener('change', function () {
    if (temporario1Checkbox.checked) {
        plantaPerm1Checkbox.checked = false;
        document.getElementById("suplencia1Div").hidden = false;
        letrab1.innerHTML = letrab1.innerHTML.replace("b", "c");
        letrac1.innerHTML = letrac1.innerHTML.replace("c", "d");
        letrad11.innerHTML = letrad11.innerHTML.replace("d", "e");
        letrad12.innerHTML = letrad12.innerHTML.replace("d", "e");
        letrae11.innerHTML = letrae11.innerHTML.replace("e", "f");
        letrae12.innerHTML = letrae12.innerHTML.replace("e", "f");
    } else {
        plantaPerm1Checkbox.checked = true;
        document.getElementById("suplencia1Div").hidden = true;
        letrab1.innerHTML = letrab1.innerHTML.replace("c", "b");
        letrac1.innerHTML = letrac1.innerHTML.replace("d", "c");
        letrad11.innerHTML = letrad11.innerHTML.replace("e", "d");
        letrad12.innerHTML = letrad12.innerHTML.replace("e", "d");
        letrae11.innerHTML = letrae11.innerHTML.replace("f", "e");
        letrae12.innerHTML = letrae12.innerHTML.replace("f", "e");
    };
});


const plantaPerm2Checkbox = document.getElementById('plantaPerm2');
const temporario2Checkbox = document.getElementById('temporario2');
const letrab2 = document.getElementById("letrab2");
const letrac2 = document.getElementById("letrac2");
const letrad21 = document.getElementById("letrad21");
const letrad22 = document.getElementById("letrad22");
const letrae21 = document.getElementById("letrae21");
const letrae22 = document.getElementById("letrae22");

plantaPerm2Checkbox.addEventListener('change', function () {
    if (plantaPerm2Checkbox.checked) {
        temporario2Checkbox.checked = false;
        document.getElementById("suplencia2Div").hidden = true;
        letrab2.innerHTML = letrab2.innerHTML.replace("c", "b");
        letrac2.innerHTML = letrac2.innerHTML.replace("d", "c");
        letrad21.innerHTML = letrad21.innerHTML.replace("e", "d");
        letrad22.innerHTML = letrad22.innerHTML.replace("e", "d");
        letrae21.innerHTML = letrae21.innerHTML.replace("f", "e");
        letrae22.innerHTML = letrae22.innerHTML.replace("f", "e");
    } else {
        temporario2Checkbox.checked = true;
        document.getElementById("suplencia2Div").hidden = false;
        letrab2.innerHTML = letrab2.innerHTML.replace("b", "c");
        letrac2.innerHTML = letrac2.innerHTML.replace("c", "d");
        letrad21.innerHTML = letrad21.innerHTML.replace("d", "e");
        letrad22.innerHTML = letrad22.innerHTML.replace("d", "e");
        letrae21.innerHTML = letrae21.innerHTML.replace("e", "f");
        letrae22.innerHTML = letrae22.innerHTML.replace("e", "f");
    };
});

temporario2Checkbox.addEventListener('change', function () {
    if (temporario2Checkbox.checked) {
        plantaPerm2Checkbox.checked = false;
        document.getElementById("suplencia2Div").hidden = false;
        letrab2.innerHTML = letrab2.innerHTML.replace("b", "c");
        letrac2.innerHTML = letrac2.innerHTML.replace("c", "d");
        letrad21.innerHTML = letrad21.innerHTML.replace("d", "e");
        letrad22.innerHTML = letrad22.innerHTML.replace("d", "e");
        letrae21.innerHTML = letrae21.innerHTML.replace("e", "f");
        letrae22.innerHTML = letrae22.innerHTML.replace("e", "f");
    } else {
        plantaPerm2Checkbox.checked = true;
        document.getElementById("suplencia2Div").hidden = true;
        letrab2.innerHTML = letrab2.innerHTML.replace("c", "b");
        letrac2.innerHTML = letrac2.innerHTML.replace("d", "c");
        letrad21.innerHTML = letrad21.innerHTML.replace("e", "d");
        letrad22.innerHTML = letrad22.innerHTML.replace("e", "d");
        letrae21.innerHTML = letrae21.innerHTML.replace("f", "e");
        letrae22.innerHTML = letrae22.innerHTML.replace("f", "e");
    };
});



mesSelect.addEventListener("input", function () {
    const ano = anoSelect.value;
    var mes = mesSelect.value;
    if (mes === "5-SAC") {
        mes = "5";
    } else if (mes === "11-SAC") {
        mes = "11";
    };
    const fechaMin = new Date(ano, mes - 1, 1);
    const fechaMax = new Date(ano, mes, 0);

    const inicioSuplencia1 = document.getElementById("inicioSuplencia1");
    const finSuplencia1 = document.getElementById("finSuplencia1");

    inicioSuplencia1.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    inicioSuplencia1.setAttribute("max", fechaMax.toISOString().split('T')[0]);
    finSuplencia1.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    finSuplencia1.setAttribute("max", fechaMax.toISOString().split('T')[0]);

    const inicioSuplencia2 = document.getElementById("inicioSuplencia2");
    const finSuplencia2 = document.getElementById("finSuplencia2");

    inicioSuplencia2.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    inicioSuplencia2.setAttribute("max", fechaMax.toISOString().split('T')[0]);
    finSuplencia2.setAttribute("min", fechaMin.toISOString().split('T')[0]);
    finSuplencia2.setAttribute("max", fechaMax.toISOString().split('T')[0]);
});

document.getElementById("inicioSuplencia1").addEventListener("input", function () {
    document.getElementById("finSuplencia1").disabled = false;
    const fechaMin = new Date(document.getElementById("inicioSuplencia1").value);
    fechaMin.setDate(fechaMin.getDate() + 1);
    document.getElementById("finSuplencia1").setAttribute("min", fechaMin.toISOString().split('T')[0]);
});

document.getElementById("inicioSuplencia2").addEventListener("input", function () {
    document.getElementById("finSuplencia2").disabled = false;
    const fechaMin = new Date(document.getElementById("inicioSuplencia2").value);
    fechaMin.setDate(fechaMin.getDate() + 1);
    document.getElementById("finSuplencia2").setAttribute("min", fechaMin.toISOString().split('T')[0]);
});

const radio1Buttons = document.getElementsByName("nivel1Radio");
for (var i = 0; i < radio1Buttons.length; i++) {
    radio1Buttons[i].addEventListener("change", function () {
        var valorSeleccionado = null;
        for (var j = 0; j < radio1Buttons.length; j++) {
            if (radio1Buttons[j].checked) {
                valorSeleccionado = radio1Buttons[j].value;
                break;
            };
        };
        document.getElementById("clase1Select").disabled = false;
        if (valorSeleccionado === "inicial") {
            document.getElementById("zona1IPDiv").hidden = false;
            document.getElementById("zona1SSDiv").hidden = true;
        } else {
            document.getElementById("zona1IPDiv").hidden = true;
            document.getElementById("zona1SSDiv").hidden = false;
        }
    });
};

const clase1Input = document.getElementById("clase1Select");
clase1Input.addEventListener("input", function () {
    if (clase1Input.value === "191" || clase1Input.value === "192") {
        document.getElementById("horasCat1Div").hidden = false;
        document.getElementById("jornada1Div").hidden = true;
    } else if (clase1Input.value === "") {
        document.getElementById("horasCat1Div").hidden = true;
        document.getElementById("jornada1Div").hidden = true;
    } else {
        document.getElementById("horasCat1Div").hidden = true;
        document.getElementById("jornada1Div").hidden = false;
    };
});

const horasCatedras1 = document.getElementById('horasCat1Select');
const horasCatedras2 = document.getElementById('horasCat2Select');
horasCatedras1.addEventListener('input', function () {
    var hCat1 = horasCatedras1.value;
    if (hCat1 === '') {
        hCat1 = 0;
    };
    var hCat2 = horasCatedras2.value;
    if (hCat2 === '') {
        hCat2 = 0;
    };
    if (parseInt(horasCatedras1.value) < 1 || parseInt(hCat1) > 42 - parseInt(hCat2)) {
        horasCatedras1.value = ''
    };
    var min1;
    if (parseInt(hCat1) === 42) {
        min1 = 0;
    } else {
        min1 = 1;
    };
    var max1;
    if(parseInt(hCat1) < 0 || parseInt(hCat1)>42){
        max1 = 42;
    } else {
        max1 = 42 - parseInt(hCat1);
    };
    document.getElementById('horasCat2Abbr').title = 'Mínimo: ' + min1.toString() + ' y Máximo: ' + max1.toString();
    document.getElementById('horasCat2Select').placeholder = '¡Máximo es ' + max1.toString() + '!';
    document.getElementById('horasCat2Select').max = max1;
});
horasCatedras2.addEventListener('input', function () {
    var hCat1 = horasCatedras1.value;
    if (hCat1 === '') {
        hCat1 = 0;
    };
    var hCat2 = horasCatedras2.value;
    if (hCat2 === '') {
        hCat2 = 0;
    };
    if (parseInt(horasCatedras2.value) < 1 || parseInt(hCat2) > 42 - parseInt(hCat1)) {
        horasCatedras2.value = ''
    };
    var min2;
    if (parseInt(hCat2) === 42) {
        min2 = 0;
    } else {
        min2 = 1;
    };
    var max2;
    if(parseInt(hCat2) < 0 || parseInt(hCat2)>42){
        max2 = 42;
    } else {
        max2 = 42 - parseInt(hCat2);
    };
    document.getElementById('horasCat1Abbr').title = 'Mínimo: '+min2.toString()+' y Máximo: ' + max2.toString();
    document.getElementById('horasCat1Select').placeholder = '¡Máximo es ' + max2.toString() + '!';
    document.getElementById('horasCat1Select').max = max2;
});

const radio2Buttons = document.getElementsByName("nivel2Radio");
for (var i = 0; i < radio2Buttons.length; i++) {
    radio2Buttons[i].addEventListener("change", function () {
        var valorSeleccionado = null;
        for (var j = 0; j < radio2Buttons.length; j++) {
            if (radio2Buttons[j].checked) {
                valorSeleccionado = radio2Buttons[j].value;
                break;
            };
        };
        document.getElementById("clase2Select").disabled = false;
        if (valorSeleccionado === "inicial") {
            document.getElementById("zona2IPDiv").hidden = false;
            document.getElementById("zona2SSDiv").hidden = true;
        } else {
            document.getElementById("zona2IPDiv").hidden = true;
            document.getElementById("zona2SSDiv").hidden = false;
        }
    });
};

const clase2Input = document.getElementById("clase2Select");
clase2Input.addEventListener("input", function () {
    if (clase2Input.value === "191" || clase2Input.value === "192") {
        document.getElementById("horasCat2Div").hidden = false;
        document.getElementById("jornada2Div").hidden = true;
    } else if (clase2Input.value === "") {
        document.getElementById("horasCat2Div").hidden = true;
        document.getElementById("jornada2Div").hidden = true;
    } else {
        document.getElementById("horasCat2Div").hidden = true;
        document.getElementById("jornada2Div").hidden = false;
    };
});


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
        document.getElementById('calcButton').addEventListener('click', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();