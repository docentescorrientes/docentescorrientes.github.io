
function procesarDatos() {
    var dataSelectObjet = {
        'ano': { 'visible': true, 'valor': false },
        'mes': { 'visible': true, 'valor': false },
        'antiguedad': { 'visible': true, 'valor': false },
        'hijos': { 'visible': true, 'valor': false },
        'hijosEsc': { 'visible': false, 'valor': false },
        'cargos': { 'visible': true, 'valor': false },
        'contrato1': { 'visible': false, 'valor': false },
        'nivel1': { 'visible': false, 'valor': false },
        'clase1': { 'visible': false, 'valor': false },
        'zona1': { 'visible': false, 'valor': false },
        'jornada1': { 'visible': false, 'valor': false },
        'horasCatedras1': { 'visible': false, 'valor': false },
        'contrato2': { 'visible': false, 'valor': false },
        'nivel2': { 'visible': false, 'valor': false },
        'clase2': { 'visible': false, 'valor': false },
        'zona2': { 'visible': false, 'valor': false },
        'jornada2': { 'visible': false, 'valor': false },
        'horasCatedras2': { 'visible': false, 'valor': false },
        'verificacion': { 'visible': true, 'valor': false }
    };

    if (document.getElementById('verifSelect').checked) {
        if (document.getElementById('anoSelect').value !== "") {
            dataSelectObjet.ano.valor = parseFloat(document.getElementById('anoSelect').value);
        } else if (document.getElementById('anoSelect').value === ""){
            dataSelectObjet.ano.valor = 0.0;
        };

        if (document.getElementById('mesSelect').value !== "") {
            dataSelectObjet.mes.valor = parseFloat(document.getElementById('mesSelect').value);
        } else if (document.getElementById('mesSelect').value === ""){
            dataSelectObjet.mes.valor = 0.0;
        };

        if (document.getElementById('antiguedadSelect').value !== "") {
            dataSelectObjet.antiguedad.valor = parseFloat(document.getElementById('antiguedadSelect').value);
        } else if (document.getElementById('antiguedadSelect').value === ""){
            dataSelectObjet.antiguedad.valor = 0.0;
        };

        if (document.getElementById('hijosSelect').value !== "") {
            dataSelectObjet.hijos.valor = parseFloat(document.getElementById('hijosSelect').value);
        } else if (document.getElementById('hijosSelect').value === ""){
            dataSelectObjet.hijos.valor = 0.0;
        };

        dataSelectObjet.hijosEsc.visible = !document.getElementById('hijosEscDiv').hidden;
        if (!document.getElementById('hijosEscDiv').hidden && document.getElementById('hijosEscSelect').value !== "") {
            if (parseFloat(document.getElementById('hijosSelect').value) >= parseFloat(document.getElementById('hijosEscSelect').value)) {
                dataSelectObjet.hijosEsc.valor = parseFloat(document.getElementById('hijosEscSelect').value);
            };
        } else if (!document.getElementById('hijosEscDiv').hidden && document.getElementById('hijosEscSelect').value === ""){
                dataSelectObjet.hijosEsc.valor = 0.0;
        };
        
        const radioCargos = document.getElementsByName('cargosRadio');
        dataSelectObjet.cargos.valor =0.0;
        for (var i = 0; i < radioCargos.length; i++) {
            if (radioCargos[i].checked) {
                dataSelectObjet.cargos.valor = parseFloat(radioCargos[i].value);
            };
        };

        dataSelectObjet.contrato1.visible = !document.getElementById('campos1CargoDiv').hidden;
        dataSelectObjet.contrato2.visible = !document.getElementById('campos2CargoDiv').hidden;
        if (document.getElementById('anoSelect').value !== "" && document.getElementById('mesSelect').value !== "") {
            const ano = document.getElementById('anoSelect').value;
            var mes = document.getElementById('mesSelect').value;
            if (mes === "6.5") {
                mes = "5";
            } else if (mes === "12.5") {
                mes = "11";
            };

            if (!document.getElementById('campos1CargoDiv').hidden || !document.getElementById('campos2CargoDiv').hidden) {
                if (document.getElementById('plantaPerm1').checked) {
                    dataSelectObjet.contrato1.valor = new Date(ano, mes, 0).getDate();
                } else if (document.getElementById('temporario1').checked && document.getElementById("inicioSuplencia1").value !== "" && document.getElementById("finSuplencia1").value !== "") {
                    const inicioSuplencia1 = new Date(document.getElementById("inicioSuplencia1").value);
                    const finSuplencia1 = new Date(document.getElementById("finSuplencia1").value);
                    dataSelectObjet.contrato1.valor = 1 + (finSuplencia1 - inicioSuplencia1) / (1000 * 3600 * 24);
                };
            };
            if (!document.getElementById('campos2CargoDiv').hidden) {
                if (document.getElementById('plantaPerm2').checked) {
                    dataSelectObjet.contrato2.valor = new Date(ano, mes, 0).getDate();
                } else if (document.getElementById('temporario2').checked && document.getElementById("inicioSuplencia2").value !== "" && document.getElementById("finSuplencia2").value !== "") {
                    const inicioSuplencia2 = new Date(document.getElementById("inicioSuplencia2").value);
                    const finSuplencia2 = new Date(document.getElementById("finSuplencia2").value);
                    dataSelectObjet.contrato2.valor = 1 + (finSuplencia2 - inicioSuplencia2) / (1000 * 3600 * 24);
                };
            };
        };
        dataSelectObjet.nivel1.visible = !document.getElementById('campos1CargoDiv').hidden;
        const radioNivel1 = document.getElementsByName('nivel1Radio');
        for (var i = 0; i < radioNivel1.length; i++) {
            if (radioNivel1[i].checked) {
                dataSelectObjet.nivel1.valor = radioNivel1[i].value;
            };
        };

        dataSelectObjet.clase1.visible = !document.getElementById('campos1CargoDiv').hidden;
        if (!document.getElementById('campos1CargoDiv').hidden && document.getElementById('clase1Select').value !== "") {
            if (buscarDataClase(parseInt(document.getElementById('clase1Select').value)) !== null) {
                dataSelectObjet.clase1.valor = buscarDataClase(parseInt(document.getElementById('clase1Select').value)).indiceClase;
            } else {
                document.getElementById('clase1Select').value = ""
            };
        };

        if (!document.getElementById("zona1SSDiv").hidden) {
            dataSelectObjet.zona1.visible = !document.getElementById("zona1SSDiv").hidden;
            dataSelectObjet.zona1.valor = document.getElementById("zona1SSSelect").value;
        } else if (!document.getElementById("zona1IPDiv").hidden) {
            dataSelectObjet.zona1.visible = !document.getElementById("zona1IPDiv").hidden;
            dataSelectObjet.zona1.valor = document.getElementById("zona1IPSelect").value;
        };
        const radioJornada1 = document.getElementsByName('jornada1Radio');
        for (var i = 0; i < radioJornada1.length; i++) {
            if (radioJornada1[i].checked) {
                dataSelectObjet.jornada1.visible = radioJornada1[i].checked;
                dataSelectObjet.jornada1.valor = radioJornada1[i].value;
            };
        };
        dataSelectObjet.horasCatedras1.visible = !document.getElementById('horasCat1Div').hidden;
        if (!document.getElementById('horasCat1Div').hidden) {
            dataSelectObjet.horasCatedras1.valor = document.getElementById('horasCat1Select').value;
        };

        dataSelectObjet.nivel2.visible = !document.getElementById('campos2CargoDiv').hidden;
        const radioNivel2 = document.getElementsByName('nivel2Radio');
        for (var i = 0; i < radioNivel2.length; i++) {
            if (radioNivel2[i].checked) {
                dataSelectObjet.nivel2.valor = radioNivel2[i].value;
            };
        };
        dataSelectObjet.clase2.visible = !document.getElementById('campos2CargoDiv').hidden;
        if (!document.getElementById('campos2CargoDiv').hidden && document.getElementById('clase2Select').value !== "") {
            if (buscarDataClase(parseInt(document.getElementById('clase2Select').value)) !== null) {
                dataSelectObjet.clase2.valor = buscarDataClase(parseInt(document.getElementById('clase2Select').value)).indiceClase;
            } else {
                document.getElementById('clase2Select').value = ""
            };
        
        };

        if (!document.getElementById("zona2SSDiv").hidden) {
            dataSelectObjet.zona2.visible = !document.getElementById("zona2SSDiv").hidden;
            dataSelectObjet.zona2.valor = document.getElementById("zona2SSSelect").value;
        } else if (!document.getElementById("zona2IPDiv").hidden) {
            dataSelectObjet.zona2.visible = !document.getElementById("zona2IPDiv").hidden;
            dataSelectObjet.zona2.valor = document.getElementById("zona2IPSelect").value;
        };
        const radioJornada2 = document.getElementsByName('jornada2Radio');
        for (var i = 0; i < radioJornada2.length; i++) {
            if (radioJornada2[i].checked) {
                dataSelectObjet.jornada2.visible = radioJornada2[i].checked;
                dataSelectObjet.jornada2.valor = radioJornada2[i].value;
            };
        };
        dataSelectObjet.horasCatedras2.visible = !document.getElementById('horasCat2Div').hidden;
        if (!document.getElementById('horasCat2Div').hidden) {
            dataSelectObjet.horasCatedras2.valor = document.getElementById('horasCat2Select').value;
        };
        dataSelectObjet.verificacion.valor = document.getElementById('verifSelect').checked
    };

    var llave = true;
    for (var key in dataSelectObjet) {
        if (dataSelectObjet.hasOwnProperty(key)) {
            if (dataSelectObjet[key].visible === true && (dataSelectObjet[key].valor === false || dataSelectObjet[key].valor === "")) {
                llave = false;
            };
        };
    };
    if (llave) {
        document.getElementById('anoSelect').disabled = true;
        document.getElementById('mesSelect').disabled = true;
        document.getElementById('antiguedadSelect').disabled = true;
        document.getElementById('hijosSelect').disabled = true;
        document.getElementById('hijosEscSelect').disabled = true;
        document.getElementById('unCargoSelect').disabled = true;
        document.getElementById('dosCargoSelect').disabled = true;
        document.getElementById('plantaPerm1').disabled = true;
        document.getElementById('temporario1').disabled = true;
        document.getElementById('inicioSuplencia1').disabled = true;
        document.getElementById('finSuplencia1').disabled = true;
        document.getElementById('nivelI1Select').disabled = true;
        document.getElementById('nivelM1Select').disabled = true;
        document.getElementById('nivelS1Select').disabled = true;
        document.getElementById('clase1Select').disabled = true;
        document.getElementById('zona1IPSelect').disabled = true;
        document.getElementById('zona1SSSelect').disabled = true;
        document.getElementById('simple1Select').disabled = true;
        document.getElementById('extendida1Select').disabled = true;
        document.getElementById('horasCat1Select').disabled = true;

        document.getElementById('plantaPerm2').disabled = true;
        document.getElementById('temporario2').disabled = true;
        document.getElementById('inicioSuplencia2').disabled = true;
        document.getElementById('finSuplencia2').disabled = true;
        document.getElementById('nivelI2Select').disabled = true;
        document.getElementById('nivelM2Select').disabled = true;
        document.getElementById('nivelS2Select').disabled = true;
        document.getElementById('clase2Select').disabled = true;
        document.getElementById('zona2IPSelect').disabled = true;
        document.getElementById('zona2SSSelect').disabled = true;
        document.getElementById('simple2Select').disabled = true;
        document.getElementById('extendida2Select').disabled = true;
        document.getElementById('horasCat2Select').disabled = true;

        document.getElementById('verifSelect').disabled = true;
        document.getElementById('calcButton').disabled = true;
        document.getElementById('resetButton').disabled = false;

        return dataSelectObjet;
    };
};

function resetearDatos() {
    document.getElementById("forms").reset();
    document.getElementById('anoSelect').disabled = false;
    document.getElementById('mesSelect').disabled = false;
    document.getElementById('antiguedadSelect').disabled = false;
    document.getElementById('hijosSelect').disabled = false;
    document.getElementById('hijosEscSelect').disabled = false;
    document.getElementById('unCargoSelect').disabled = false;
    document.getElementById('dosCargoSelect').disabled = false;
    document.getElementById('plantaPerm1').disabled = false;
    document.getElementById('temporario1').disabled = false;
    document.getElementById('inicioSuplencia1').disabled = false;
    document.getElementById('finSuplencia1').disabled = false;
    document.getElementById('nivelI1Select').disabled = false;
    document.getElementById('nivelM1Select').disabled = false;
    document.getElementById('nivelS1Select').disabled = false;
    document.getElementById('clase1Select').disabled = false;
    document.getElementById('zona1IPSelect').disabled = false;
    document.getElementById('zona1SSSelect').disabled = false;
    document.getElementById('simple1Select').disabled = false;
    document.getElementById('extendida1Select').disabled = false;
    document.getElementById('horasCat1Select').disabled = false;

    document.getElementById('plantaPerm2').disabled = false;
    document.getElementById('temporario2').disabled = false;
    document.getElementById('inicioSuplencia2').disabled = false;
    document.getElementById('finSuplencia2').disabled = false;
    document.getElementById('nivelI2Select').disabled = false;
    document.getElementById('nivelM2Select').disabled = false;
    document.getElementById('nivelS2Select').disabled = false;
    document.getElementById('clase2Select').disabled = false;
    document.getElementById('zona2IPSelect').disabled = false;
    document.getElementById('zona2SSSelect').disabled = false;
    document.getElementById('simple2Select').disabled = false;
    document.getElementById('extendida2Select').disabled = false;
    document.getElementById('horasCat2Select').disabled = false;

    document.getElementById('verifSelect').disabled = false;
    document.getElementById('calcButton').disabled = false;
    document.getElementById('resetButton').disabled = true;

    document.getElementById('hijosEscDiv').hidden = true;
    document.getElementById('campos1CargoDiv').hidden = true;
    document.getElementById('campos2CargoDiv').hidden = true;
    document.getElementById('titleFormsH1').textContent = 'Simulación de Haberes ';
    document.getElementById('titleTableH1').textContent = 'Tabla de Simulación de Haberes ';

};