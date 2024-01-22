document.getElementById('calcButton').addEventListener('click', function () {
    const dataSelectObjet = procesarDatos();
    var llave = true;
    for (var key in dataSelectObjet) {
        if (dataSelectObjet.hasOwnProperty(key)) {
            if (dataSelectObjet[key].visible === true && (dataSelectObjet[key].valor === false || dataSelectObjet[key].valor === "")) {
                llave = false;
            };
        };
    };
    if (llave) {
        document.getElementById('subtitleTableH5').innerHTML = mesText(dataSelectObjet.mes.valor) + ' - ' + dataSelectObjet.ano.valor;
        document.getElementById('primerCargoH4').innerHTML = 'Primer Cargo 👇 (Liquidación por ' + dataSelectObjet.contrato1.valor + ' días del mes de ' + mesText(dataSelectObjet.mes.valor) + ')';
        document.getElementById('segundoCargoH4').innerHTML = 'Segundo Cargo 👇 (Liquidación por ' + dataSelectObjet.contrato2.valor + ' días del mes de ' + mesText(dataSelectObjet.mes.valor) + ')';

        if (dataSelectObjet.cargos.valor === '1') {
            document.getElementById('titleTableDiv').hidden = false;
            document.getElementById('tableDiv').hidden = false;
            document.getElementById('haberDesc2Div').hidden = true;
        } else if (dataSelectObjet.cargos.valor === '2') {
            document.getElementById('titleTableDiv').hidden = false;
            document.getElementById('tableDiv').hidden = false;
            document.getElementById('haberDesc2Div').hidden = false;
        };
        const ano = dataSelectObjet.ano.valor;
        const mes = dataSelectObjet.mes.valor;
        const cantDias = new Date(ano, mes, 0).getDate();
        const dataSalarioObjet = buscarDataMes(mes, ano);

        function crearFactor() {
            // Crea factor 30
            var factor30C_HC1, factor30C_HC2;
            if (parseFloat(dataSelectObjet.cargos.valor) === 1) {

                if (dataSelectObjet.horasCatedras1.valor === false) {
                    factor30C_HC1 = 1;
                } else if (dataSelectObjet.horasCatedras1.valor !== false) {
                    if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= 30) {
                        factor30C_HC1 = 2;
                    } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < 30) {
                        factor30C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 30;
                    };
                };
                factor30C_HC2 = 0;

            } else if (parseFloat(dataSelectObjet.cargos.valor) === 2) {

                if (dataSelectObjet.horasCatedras1.valor === false && dataSelectObjet.horasCatedras2.valor === false) {
                    factor30C_HC1 = 1;
                    factor30C_HC2 = 1;
                } else if (dataSelectObjet.horasCatedras1.valor === false && dataSelectObjet.horasCatedras2.valor !== false) {
                    factor30C_HC1 = 1;
                    if (parseFloat(dataSelectObjet.horasCatedras2.valor) >= 30) {
                        factor30C_HC2 = 2;
                    } else if (parseFloat(dataSelectObjet.horasCatedras2.valor) < 30) {
                        factor30C_HC2 = parseFloat(dataSelectObjet.horasCatedras2.valor) / 30;
                    };
                } else if (dataSelectObjet.horasCatedras1.valor !== false && dataSelectObjet.horasCatedras2.valor === false) {
                    if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= 30) {
                        factor30C_HC1 = 2;
                    } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < 30) {
                        factor30C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 30;
                    };
                    factor30C_HC2 = 1;
                } else if (dataSelectObjet.horasCatedras1.valor !== false && dataSelectObjet.horasCatedras2.valor !== false) {
                    if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= 30) {
                        factor30C_HC1 = 2;
                        factor30C_HC2 = 0;
                    } else if (parseFloat(dataSelectObjet.horasCatedras2.valor) >= 30) {
                        factor30C_HC1 = 0;
                        factor30C_HC2 = 2;
                    } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < 30 && parseFloat(dataSelectObjet.horasCatedras2.valor) < 30) {
                        if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= parseFloat(dataSelectObjet.horasCatedras2.valor)) {
                            factor30C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 30;
                            if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) >= 30) {
                                factor30C_HC2 = 1 - parseFloat(dataSelectObjet.horasCatedras1.valor) / 30;
                            } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) < 30) {
                                factor30C_HC2 = parseFloat(dataSelectObjet.horasCatedras2.valor) / 30;
                            };
                        } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < parseFloat(dataSelectObjet.horasCatedras2.valor)) {
                            if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) >= 30) {
                                factor30C_HC1 = 1 - parseFloat(dataSelectObjet.horasCatedras2.valor) / 30;
                            } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) < 30) {
                                factor30C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 30;
                            };
                            factor30C_HC2 = parseFloat(dataSelectObjet.horasCatedras2.valor) / 30;
                        };
                    };
                };
            };
            // Crea factor 15
            var factor15C_HC1, factor15C_HC2;
            if (parseFloat(dataSelectObjet.cargos.valor) === 1) {

                if (dataSelectObjet.horasCatedras1.valor === false || (dataSelectObjet.horasCatedras1.valor !== false && parseFloat(dataSelectObjet.horasCatedras1.valor) >= 15)) {
                    factor15C_HC1 = 1;
                } else if (dataSelectObjet.horasCatedras1.valor === false || (dataSelectObjet.horasCatedras1.valor !== false && parseFloat(dataSelectObjet.horasCatedras1.valor) < 15)) {
                    factor15C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 15;
                };
                factor15C_HC2 = 0;

            } else if (parseFloat(dataSelectObjet.cargos.valor) === 2) {

                if (dataSelectObjet.horasCatedras1.valor === false && (dataSelectObjet.horasCatedras2.valor === false || dataSelectObjet.horasCatedras2.valor !== false)) {
                    factor15C_HC1 = 1;
                    factor15C_HC2 = 0;
                } else if (dataSelectObjet.horasCatedras1.valor !== false && dataSelectObjet.horasCatedras2.valor === false) {
                    if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= 15) {
                        factor15C_HC1 = 1;
                        factor15C_HC2 = 0;
                    } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < 15) {
                        factor15C_HC1 = 0;
                        factor15C_HC2 = 1;
                    };
                } else if (dataSelectObjet.horasCatedras1.valor !== false && dataSelectObjet.horasCatedras2.valor !== false) {
                    if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= 15 && parseFloat(dataSelectObjet.horasCatedras1.valor) >= parseFloat(dataSelectObjet.horasCatedras2.valor)) {
                        factor15C_HC1 = 1;
                        factor15C_HC2 = 0;
                    } else if (parseFloat(dataSelectObjet.horasCatedras2.valor) >= 15 && parseFloat(dataSelectObjet.horasCatedras1.valor) < parseFloat(dataSelectObjet.horasCatedras2.valor)) {
                        factor15C_HC1 = 0;
                        factor15C_HC2 = 1;

                    } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < 15 && parseFloat(dataSelectObjet.horasCatedras2.valor) < 15) {
                        if (parseFloat(dataSelectObjet.horasCatedras1.valor) >= parseFloat(dataSelectObjet.horasCatedras2.valor)) {
                            factor15C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 15;
                            if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) >= 15) {
                                factor15C_HC2 = 1 - parseFloat(dataSelectObjet.horasCatedras1.valor) / 15;
                            } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) < 15) {
                                factor15C_HC2 = parseFloat(dataSelectObjet.horasCatedras2.valor) / 15;
                            };
                        } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) < parseFloat(dataSelectObjet.horasCatedras2.valor)) {
                            if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) >= 15) {
                                factor15C_HC1 = 1 - parseFloat(dataSelectObjet.horasCatedras2.valor) / 15;
                            } else if (parseFloat(dataSelectObjet.horasCatedras1.valor) + parseFloat(dataSelectObjet.horasCatedras2.valor) < 15) {
                                factor15C_HC1 = parseFloat(dataSelectObjet.horasCatedras1.valor) / 15;
                            };
                            factor15C_HC2 = parseFloat(dataSelectObjet.horasCatedras2.valor) / 15;
                        };
                    };
                };
            };
            return [factor30C_HC1, factor30C_HC2, factor15C_HC1, factor15C_HC2];
        };
        const factor30C_HC1 = crearFactor()[0];
        const factor30C_HC2 = crearFactor()[1];
        const factor15C_HC1 = crearFactor()[2];
        const factor15C_HC2 = crearFactor()[3];

        var basico1Bruto1, basico1Bruto2;
        if (dataSelectObjet.horasCatedras1.valor !== false) {
            basico1Bruto1 = dataSalarioObjet.basico1 * parseFloat(dataSelectObjet.clase1.valor) * parseFloat(dataSelectObjet.horasCatedras1.valor) * parseFloat(dataSelectObjet.contrato1.valor) / (1400 * cantDias);
        } else if (dataSelectObjet.horasCatedras1.valor === false) {
            basico1Bruto1 = dataSalarioObjet.basico1 * parseFloat(dataSelectObjet.clase1.valor) * parseFloat(dataSelectObjet.contrato1.valor) / (1400 * cantDias);
        };
        if (dataSelectObjet.horasCatedras2.valor !== false) {
            basico1Bruto2 = dataSalarioObjet.basico1 * parseFloat(dataSelectObjet.clase2.valor) * parseFloat(dataSelectObjet.horasCatedras2.valor) * parseFloat(dataSelectObjet.contrato2.valor) / (1400 * cantDias);
        } else if (dataSelectObjet.horasCatedras2.valor === false) {
            basico1Bruto2 = dataSalarioObjet.basico1 * parseFloat(dataSelectObjet.clase2.valor) * parseFloat(dataSelectObjet.contrato2.valor) / (1400 * cantDias);
        };
        const desc = (dataSalarioObjet.apJub208 + dataSalarioObjet.obraSocial212);
        const neto = (1 - dataSalarioObjet.apJub208 - dataSalarioObjet.obraSocial212);

        // Carga Table Blanco Cargo 1 
        const basico1 = basico1Bruto1;
        document.getElementById('1Bruto1').innerHTML = formatPesos(basico1);
        document.getElementById('1Desc1').innerHTML = formatPesos(basico1 * desc);
        document.getElementById('1Neto1').innerHTML = formatPesos(basico1 * neto);

        const zona1 = basico1Bruto1 * parseFloat(dataSelectObjet.zona1.valor);
        document.getElementById('36Bruto1').innerHTML = formatPesos(zona1);
        document.getElementById('36Desc1').innerHTML = formatPesos(zona1 * desc);
        document.getElementById('36Neto1').innerHTML = formatPesos(zona1 * neto);

        const antiguedad1 = basico1Bruto1 * parseFloat(dataSelectObjet.antiguedad.valor);
        document.getElementById('37Bruto1').innerHTML = formatPesos(antiguedad1);
        document.getElementById('37Desc1').innerHTML = formatPesos(antiguedad1 * desc);
        document.getElementById('37Neto1').innerHTML = formatPesos(antiguedad1 * neto);

        const materialDidactico1 = basico1Bruto1 * dataSalarioObjet.ayMatDidac62;
        document.getElementById('62Bruto1').innerHTML = formatPesos(materialDidactico1);
        document.getElementById('62Desc1').innerHTML = formatPesos(materialDidactico1 * desc);
        document.getElementById('62Neto1').innerHTML = formatPesos(materialDidactico1 * neto);

        const brutoBlanco1 = basico1 + zona1 + antiguedad1 + materialDidactico1;
        document.getElementById('totalRemBonifBruto1').innerHTML = formatPesos(brutoBlanco1);
        document.getElementById('totalRemBonifDesc1').innerHTML = formatPesos(brutoBlanco1 * desc);
        document.getElementById('totalRemBonifNeto1').innerHTML = formatPesos(brutoBlanco1 * neto);

        // Carga Table Blanco Cargo 2
        const basico2 = basico1Bruto2;
        document.getElementById('1Bruto2').innerHTML = formatPesos(basico2);
        document.getElementById('1Desc2').innerHTML = formatPesos(basico2 * desc);
        document.getElementById('1Neto2').innerHTML = formatPesos(basico2 * neto);

        const zona2 = basico1Bruto2 * parseFloat(dataSelectObjet.zona2.valor);
        document.getElementById('36Bruto2').innerHTML = formatPesos(zona2);
        document.getElementById('36Desc2').innerHTML = formatPesos(zona2 * desc);
        document.getElementById('36Neto2').innerHTML = formatPesos(zona2 * neto);

        const antiguedad2 = basico1Bruto2 * parseFloat(dataSelectObjet.antiguedad.valor);
        document.getElementById('37Bruto2').innerHTML = formatPesos(antiguedad2);
        document.getElementById('37Desc2').innerHTML = formatPesos(antiguedad2 * desc);
        document.getElementById('37Neto2').innerHTML = formatPesos(antiguedad2 * neto);

        const materialDidactico2 = basico1Bruto2 * dataSalarioObjet.ayMatDidac62;
        document.getElementById('62Bruto2').innerHTML = formatPesos(materialDidactico2);
        document.getElementById('62Desc2').innerHTML = formatPesos(materialDidactico2 * desc);
        document.getElementById('62Neto2').innerHTML = formatPesos(materialDidactico2 * neto);

        const brutoBlanco2 = basico2 + zona2 + antiguedad2 + materialDidactico2;
        document.getElementById('totalRemBonifBruto2').innerHTML = formatPesos(brutoBlanco2);
        document.getElementById('totalRemBonifDesc2').innerHTML = formatPesos(brutoBlanco2 * desc);
        document.getElementById('totalRemBonifNeto2').innerHTML = formatPesos(brutoBlanco2 * neto);

        // Carga Table Gris Cargo 1
        const adRemDoc1 = dataSalarioObjet.adRemDoc193 * factor15C_HC1;
        document.getElementById('193Bruto1').innerHTML = formatPesos(adRemDoc1);
        document.getElementById('193Desc1').innerHTML = formatPesos(adRemDoc1 * desc);
        document.getElementById('193Neto1').innerHTML = formatPesos(adRemDoc1 * neto);

        const plusRem1 = dataSalarioObjet.plusRem603 * factor15C_HC1;
        document.getElementById('603Bruto1').innerHTML = formatPesos(plusRem1);
        document.getElementById('603Desc1').innerHTML = formatPesos(plusRem1 * desc);
        document.getElementById('603Neto1').innerHTML = formatPesos(plusRem1 * neto);

        const jornada1 = brutoBlanco1 * dataSalarioObjet.jornadaExt624 * dataSelectObjet.jornada1.valor;
        document.getElementById('624Bruto1').innerHTML = formatPesos(jornada1);
        document.getElementById('624Desc1').innerHTML = formatPesos(jornada1 * desc);
        document.getElementById('624Neto1').innerHTML = formatPesos(jornada1 * neto);

        const plusRef1 = dataSalarioObjet.plusRef625 * factor15C_HC1;
        document.getElementById('625Bruto1').innerHTML = formatPesos(plusRef1);
        document.getElementById('625Desc1').innerHTML = formatPesos(plusRef1 * desc);
        document.getElementById('625Neto1').innerHTML = formatPesos(plusRef1 * neto);

        const adRemun2Cargo1 = dataSalarioObjet.adRemun2Cargo629 * factor15C_HC1;
        document.getElementById('629Bruto1').innerHTML = formatPesos(adRemun2Cargo1);
        document.getElementById('629Desc1').innerHTML = formatPesos(adRemun2Cargo1 * desc);
        document.getElementById('629Neto1').innerHTML = formatPesos(adRemun2Cargo1 * neto);

        const brutoGris1 = adRemDoc1 + plusRem1 + jornada1 + plusRef1 + adRemun2Cargo1;
        document.getElementById('totalRemNoBonifBruto1').innerHTML = formatPesos(brutoGris1);
        document.getElementById('totalRemNoBonifDesc1').innerHTML = formatPesos(brutoGris1 * desc);
        document.getElementById('totalRemNoBonifNeto1').innerHTML = formatPesos(brutoGris1 * neto);

        // Carga Table Gris Cargo 2
        const adRemDoc2 = dataSalarioObjet.adRemDoc193 * factor15C_HC2;
        document.getElementById('193Bruto2').innerHTML = formatPesos(adRemDoc2);
        document.getElementById('193Desc2').innerHTML = formatPesos(adRemDoc2 * desc);
        document.getElementById('193Neto2').innerHTML = formatPesos(adRemDoc2 * neto);

        const plusRem2 = dataSalarioObjet.plusRem603 * factor15C_HC2;
        document.getElementById('603Bruto2').innerHTML = formatPesos(plusRem2);
        document.getElementById('603Desc2').innerHTML = formatPesos(plusRem2 * desc);
        document.getElementById('603Neto2').innerHTML = formatPesos(plusRem2 * neto);

        const jornada2 = brutoBlanco2 * dataSalarioObjet.jornadaExt624 * dataSelectObjet.jornada2.valor;
        document.getElementById('624Bruto2').innerHTML = formatPesos(jornada2);
        document.getElementById('624Desc2').innerHTML = formatPesos(jornada2 * desc);
        document.getElementById('624Neto2').innerHTML = formatPesos(jornada2 * neto);

        const plusRef2 = dataSalarioObjet.plusRef625 * factor15C_HC2;
        document.getElementById('625Bruto2').innerHTML = formatPesos(plusRef2);
        document.getElementById('625Desc2').innerHTML = formatPesos(plusRef2 * desc);
        document.getElementById('625Neto2').innerHTML = formatPesos(plusRef2 * neto);

        const adRemun2Cargo2 = dataSalarioObjet.adRemun2Cargo629 * factor15C_HC2;
        document.getElementById('629Bruto2').innerHTML = formatPesos(adRemun2Cargo2);
        document.getElementById('629Desc2').innerHTML = formatPesos(adRemun2Cargo2 * desc);
        document.getElementById('629Neto2').innerHTML = formatPesos(adRemun2Cargo2 * neto);

        const brutoGris2 = adRemDoc2 + plusRem2 + jornada2 + plusRef2 + adRemun2Cargo2;
        document.getElementById('totalRemNoBonifBruto2').innerHTML = formatPesos(brutoGris2);
        document.getElementById('totalRemNoBonifDesc2').innerHTML = formatPesos(brutoGris2 * desc);
        document.getElementById('totalRemNoBonifNeto2').innerHTML = formatPesos(brutoGris2 * neto);

        // Carga Table Negro Cargo 1
        const salarioFam1 = dataSalarioObjet.salarioFam3 * dataSelectObjet.hijos.valor + dataSalarioObjet.ayudEscolar * dataSelectObjet.hijosEsc.valor;
        document.getElementById('3Bruto1').innerHTML = formatPesos(salarioFam1);
        document.getElementById('3Desc1').innerHTML = formatPesos(0.0);
        document.getElementById('3Neto1').innerHTML = formatPesos(salarioFam1);

        const asigEspLey1 = dataSalarioObjet.asigEspLey140 * factor30C_HC1;
        document.getElementById('140Bruto1').innerHTML = formatPesos(asigEspLey1);
        document.getElementById('140Desc1').innerHTML = formatPesos(0.0);
        document.getElementById('140Neto1').innerHTML = formatPesos(asigEspLey1);

        const progNacCompDoc1 = dataSalarioObjet.progNacCompDoc168 * factor30C_HC1;
        document.getElementById('168Bruto1').innerHTML = formatPesos(progNacCompDoc1);
        document.getElementById('168Desc1').innerHTML = formatPesos(0.0);
        document.getElementById('168Neto1').innerHTML = formatPesos(progNacCompDoc1);

        const compProv1 = dataSalarioObjet.compProv171 * factor30C_HC1;
        document.getElementById('171Bruto1').innerHTML = formatPesos(compProv1);
        document.getElementById('171Desc1').innerHTML = formatPesos(0.0);
        document.getElementById('171Neto1').innerHTML = formatPesos(compProv1);

        const conectNac1 = dataSalarioObjet.conectNac609 * factor30C_HC1;
        document.getElementById('609Bruto1').innerHTML = formatPesos(conectNac1);
        document.getElementById('609Desc1').innerHTML = formatPesos(0.0);
        document.getElementById('609Neto1').innerHTML = formatPesos(conectNac1);

        const brutoNegro1 = salarioFam1 + asigEspLey1 + progNacCompDoc1 + compProv1 + conectNac1;
        document.getElementById('totalNoRemNoBonifBruto1').innerHTML = formatPesos(brutoNegro1);
        document.getElementById('totalNoRemNoBonifDesc1').innerHTML = formatPesos(0.0);
        document.getElementById('totalNoRemNoBonifNeto1').innerHTML = formatPesos(brutoNegro1);

        // Carga Table Negro Cargo 2
        const salarioFam2 = 0.0;
        document.getElementById('3Bruto2').innerHTML = formatPesos(salarioFam2);
        document.getElementById('3Desc2').innerHTML = formatPesos(0.0);
        document.getElementById('3Neto2').innerHTML = formatPesos(salarioFam2);

        const asigEspLey2 = dataSalarioObjet.asigEspLey140 * factor30C_HC2;
        document.getElementById('140Bruto2').innerHTML = formatPesos(asigEspLey2);
        document.getElementById('140Desc2').innerHTML = formatPesos(0.0);
        document.getElementById('140Neto2').innerHTML = formatPesos(asigEspLey2);

        const progNacCompDoc2 = dataSalarioObjet.progNacCompDoc168 * factor30C_HC2;
        document.getElementById('168Bruto2').innerHTML = formatPesos(progNacCompDoc2);
        document.getElementById('168Desc2').innerHTML = formatPesos(0.0);
        document.getElementById('168Neto2').innerHTML = formatPesos(progNacCompDoc2);

        const compProv2 = dataSalarioObjet.compProv171 * factor30C_HC2;
        document.getElementById('171Bruto2').innerHTML = formatPesos(compProv2);
        document.getElementById('171Desc2').innerHTML = formatPesos(0.0);
        document.getElementById('171Neto2').innerHTML = formatPesos(compProv2);

        const conectNac2 = dataSalarioObjet.conectNac609 * factor30C_HC2;
        document.getElementById('609Bruto2').innerHTML = formatPesos(conectNac2);
        document.getElementById('609Desc2').innerHTML = formatPesos(0.0);
        document.getElementById('609Neto2').innerHTML = formatPesos(conectNac2);

        const brutoNegro2 = salarioFam2 + asigEspLey2 + progNacCompDoc2 + compProv2 + conectNac2;
        document.getElementById('totalNoRemNoBonifBruto2').innerHTML = formatPesos(brutoNegro2);
        document.getElementById('totalNoRemNoBonifDesc2').innerHTML = formatPesos(0.0);
        document.getElementById('totalNoRemNoBonifNeto2').innerHTML = formatPesos(brutoNegro2);

        // Carga Table Cargo 1 Descuento
        const brutoRem1 = brutoBlanco1 + brutoGris1;
        const segVida1 = dataSalarioObjet.segVida210;
        document.getElementById('208Desc1').innerHTML = formatPesos(brutoRem1 * dataSalarioObjet.apJub208);
        document.getElementById('210Desc1').innerHTML = formatPesos(segVida1);
        document.getElementById('212Desc1').innerHTML = formatPesos(brutoRem1 * dataSalarioObjet.obraSocial212);
        document.getElementById('totalDesc1').innerHTML = formatPesos(brutoRem1 * desc + segVida1);

        // Carga Table Cargo 2 Descuento
        const brutoRem2 = brutoBlanco2 + brutoGris2;
        const segVida2 = 0.0;
        document.getElementById('208Desc2').innerHTML = formatPesos(brutoRem2 * dataSalarioObjet.apJub208);
        document.getElementById('210Desc2').innerHTML = formatPesos(segVida2);
        document.getElementById('212Desc2').innerHTML = formatPesos(brutoRem2 * dataSalarioObjet.obraSocial212);
        document.getElementById('totalDesc2').innerHTML = formatPesos(brutoRem2 * desc + segVida2);


        // Carga Table SAC
        const brutoSAC = brutoBlanco1 + brutoGris1 + brutoBlanco2 + brutoGris2;
        document.getElementById('150Bruto').innerHTML = basico1Bruto1 //formatPesos(brutoBlanco1);
        document.getElementById('150Desc').innerHTML = formatPesos(brutoSAC * desc);
        document.getElementById('150Neto').innerHTML = formatPesos(brutoSAC * neto);

    };
});


function formatPesos(number) {
    const numberFromat = number.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
    return numberFromat;
};
function mesText(mesNumber) {
    var mes;
    switch (mesNumber) {
        case '1':
            mes = 'Enero';
            break;
        case '2':
            mes = 'Febrero';
            break;
        case '3':
            mes = 'Marzo';
            break;
        case '4':
            mes = 'Abril';
            break;
        case '5':
            mes = 'Mayo';
            break;
        case '5-SAC':
            mes = 'Medio Aguinaldo (SAC de Mayo)';
            break;
        case '6':
            mes = 'Junio';
            break;
        case '7':
            mes = 'Julio';
            break;
        case '8':
            mes = 'Agosto';
            break;
        case '9':
            mes = 'Septiembre';
            break;
        case '10':
            mes = 'Octubre';
            break;
        case '11':
            mes = 'Noviembre';
            break;
        case '11-SAC':
            mes = 'Medio Aguinaldo (SAC de Diciembre)';
            break;
        case '12':
            mes = 'Diciembre';
            break;
        default:
            mes = 'Mes inválido';
    }
    return mes;
};
