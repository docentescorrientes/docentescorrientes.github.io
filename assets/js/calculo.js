function calculoHaber() {
    const DATOS = prepararDatos();
    //Proporcional por clase con indice
    const proporcionalIndiceClase = [
        1 * DATOS.clase1.indiceClase.valor * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor,
        1 * DATOS.clase2.indiceClase.valor * DATOS.clase2.horasCatedras.valor * DATOS.clase2.suplencia.valor,
        1 * DATOS.clase3.indiceClase.valor * DATOS.clase3.horasCatedras.valor * DATOS.clase3.suplencia.valor,
        1 * DATOS.clase4.indiceClase.valor * DATOS.clase4.horasCatedras.valor * DATOS.clase4.suplencia.valor,
        1 * DATOS.clase5.indiceClase.valor * DATOS.clase5.horasCatedras.valor * DATOS.clase5.suplencia.valor,
        1 * DATOS.clase6.indiceClase.valor * DATOS.clase6.horasCatedras.valor * DATOS.clase6.suplencia.valor
    ];
    const proporcionalHorasCatClase = [
        1 * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor,
        1 * DATOS.clase2.horasCatedras.valor * DATOS.clase2.suplencia.valor,
        1 * DATOS.clase3.horasCatedras.valor * DATOS.clase3.suplencia.valor,
        1 * DATOS.clase4.horasCatedras.valor * DATOS.clase4.suplencia.valor,
        1 * DATOS.clase5.horasCatedras.valor * DATOS.clase5.suplencia.valor,
        1 * DATOS.clase6.horasCatedras.valor * DATOS.clase6.suplencia.valor
    ];

    //Descuento por Clase
    const descClase = [
        1 * DATOS.clase1.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor + 1 * DATOS.datosSelect.gremio.valor,
        1 * DATOS.clase2.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor + 1 * DATOS.datosSelect.gremio.valor,
        1 * DATOS.clase3.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor + 1 * DATOS.datosSelect.gremio.valor,
        1 * DATOS.clase4.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor + 1 * DATOS.datosSelect.gremio.valor,
        1 * DATOS.clase5.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor + 1 * DATOS.datosSelect.gremio.valor,
        1 * DATOS.clase6.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor + 1 * DATOS.datosSelect.gremio.valor,
    ];
    const descClasePlus = [
        1 * DATOS.clase1.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase2.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase3.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase4.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase5.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase6.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
    ];
    //Calculos ítems Blancos
    //Cód.1 Básico - Blanco
    const basico1Bruto = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] +
        proporcionalIndiceClase[1] +
        proporcionalIndiceClase[2] +
        proporcionalIndiceClase[3] +
        proporcionalIndiceClase[4] +
        proporcionalIndiceClase[5]
    );
    const basico1Desc = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * descClase[0] +
        proporcionalIndiceClase[1] * descClase[1] +
        proporcionalIndiceClase[2] * descClase[2] +
        proporcionalIndiceClase[3] * descClase[3] +
        proporcionalIndiceClase[4] * descClase[4] +
        proporcionalIndiceClase[5] * descClase[5]
    );
    const basico1Neto = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * (1 - descClase[0]) +
        proporcionalIndiceClase[1] * (1 - descClase[1]) +
        proporcionalIndiceClase[2] * (1 - descClase[2]) +
        proporcionalIndiceClase[3] * (1 - descClase[3]) +
        proporcionalIndiceClase[4] * (1 - descClase[4]) +
        proporcionalIndiceClase[5] * (1 - descClase[5])
    );
    document.getElementById('basico1Bruto').innerHTML = formatPesos(basico1Bruto);
    document.getElementById('basico1Desc').innerHTML = formatPesos(basico1Desc);
    document.getElementById('basico1Neto').innerHTML = formatPesos(basico1Neto);

    //Cód.36 Ubicación Geografica - Blanco
    const zona36Bruto = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * DATOS.clase1.zona.valor +
        proporcionalIndiceClase[1] * DATOS.clase2.zona.valor +
        proporcionalIndiceClase[2] * DATOS.clase3.zona.valor +
        proporcionalIndiceClase[3] * DATOS.clase4.zona.valor +
        proporcionalIndiceClase[4] * DATOS.clase5.zona.valor +
        proporcionalIndiceClase[5] * DATOS.clase6.zona.valor
    );
    const zona36Desc = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * DATOS.clase1.zona.valor * descClase[0] +
        proporcionalIndiceClase[1] * DATOS.clase2.zona.valor * descClase[1] +
        proporcionalIndiceClase[2] * DATOS.clase3.zona.valor * descClase[2] +
        proporcionalIndiceClase[3] * DATOS.clase4.zona.valor * descClase[3] +
        proporcionalIndiceClase[4] * DATOS.clase5.zona.valor * descClase[4] +
        proporcionalIndiceClase[5] * DATOS.clase6.zona.valor * descClase[5]
    );
    const zona36Neto = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * DATOS.clase1.zona.valor * (1 - descClase[0]) +
        proporcionalIndiceClase[1] * DATOS.clase2.zona.valor * (1 - descClase[1]) +
        proporcionalIndiceClase[2] * DATOS.clase3.zona.valor * (1 - descClase[2]) +
        proporcionalIndiceClase[3] * DATOS.clase4.zona.valor * (1 - descClase[3]) +
        proporcionalIndiceClase[4] * DATOS.clase5.zona.valor * (1 - descClase[4]) +
        proporcionalIndiceClase[5] * DATOS.clase6.zona.valor * (1 - descClase[5])
    );
    document.getElementById('zona36Bruto').innerHTML = formatPesos(zona36Bruto);
    document.getElementById('zona36Desc').innerHTML = formatPesos(zona36Desc);
    document.getElementById('zona36Neto').innerHTML = formatPesos(zona36Neto);

    //Cód. 37 Antigüedad - Blanco
    const antiguedad37Bruto = DATOS.datosSelect.antiguedad.valor * basico1Bruto;
    const antiguedad37Desc = DATOS.datosSelect.antiguedad.valor * basico1Desc;
    const antiguedad37Neto = DATOS.datosSelect.antiguedad.valor * basico1Neto;
    document.getElementById('antiguedad37Bruto').innerHTML = formatPesos(antiguedad37Bruto);
    document.getElementById('antiguedad37Desc').innerHTML = formatPesos(antiguedad37Desc);
    document.getElementById('antiguedad37Neto').innerHTML = formatPesos(antiguedad37Neto);

    //Cód. 62 Ayuda Material Didactico - Blanco
    const ayMatDidac62Bruto = DATOS.datosSalario.ayMatDidac62.valor * basico1Bruto;
    const ayMatDidac62Desc = DATOS.datosSalario.ayMatDidac62.valor * basico1Desc;
    const ayMatDidac62Neto = DATOS.datosSalario.ayMatDidac62.valor * basico1Neto;
    document.getElementById('ayMatDidac62Bruto').innerHTML = formatPesos(ayMatDidac62Bruto);
    document.getElementById('ayMatDidac62Desc').innerHTML = formatPesos(ayMatDidac62Desc);
    document.getElementById('ayMatDidac62Neto').innerHTML = formatPesos(ayMatDidac62Neto);
    //Cód. 624 Jornada Extendida - Blanco
    const jornadaExt624Bruto = 1 * DATOS.datosSalario.jornadaExt624.valor * DATOS.datosSalario.basico1.valor * (
        DATOS.clase1.jornada.valor * (proporcionalIndiceClase[0] * (1 + 1 * DATOS.clase1.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) +
        DATOS.clase2.jornada.valor * (proporcionalIndiceClase[1] * (1 + 1 * DATOS.clase2.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) +
        DATOS.clase3.jornada.valor * (proporcionalIndiceClase[2] * (1 + 1 * DATOS.clase3.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) +
        DATOS.clase4.jornada.valor * (proporcionalIndiceClase[3] * (1 + 1 * DATOS.clase4.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) +
        DATOS.clase5.jornada.valor * (proporcionalIndiceClase[4] * (1 + 1 * DATOS.clase5.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) +
        DATOS.clase6.jornada.valor * (proporcionalIndiceClase[5] * (1 + 1 * DATOS.clase6.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor))
    );
    const jornadaExt624Desc = DATOS.datosSalario.jornadaExt624.valor * DATOS.datosSalario.basico1.valor * (
        DATOS.clase1.jornada.valor * (proporcionalIndiceClase[0] * (1 + 1 * DATOS.clase1.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClase[0] +
        DATOS.clase2.jornada.valor * (proporcionalIndiceClase[1] * (1 + 1 * DATOS.clase2.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClase[1] +
        DATOS.clase3.jornada.valor * (proporcionalIndiceClase[2] * (1 + 1 * DATOS.clase3.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClase[2] +
        DATOS.clase4.jornada.valor * (proporcionalIndiceClase[3] * (1 + 1 * DATOS.clase4.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClase[3] +
        DATOS.clase5.jornada.valor * (proporcionalIndiceClase[4] * (1 + 1 * DATOS.clase5.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClase[4] +
        DATOS.clase6.jornada.valor * (proporcionalIndiceClase[5] * (1 + 1 * DATOS.clase6.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClase[5]
    );
    const jornadaExt624Neto = DATOS.datosSalario.jornadaExt624.valor * DATOS.datosSalario.basico1.valor * (
        DATOS.clase1.jornada.valor * (proporcionalIndiceClase[0] * (1 + 1 * DATOS.clase1.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * (1 - descClase[0]) +
        DATOS.clase2.jornada.valor * (proporcionalIndiceClase[1] * (1 + 1 * DATOS.clase2.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * (1 - descClase[1]) +
        DATOS.clase3.jornada.valor * (proporcionalIndiceClase[2] * (1 + 1 * DATOS.clase3.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * (1 - descClase[2]) +
        DATOS.clase4.jornada.valor * (proporcionalIndiceClase[3] * (1 + 1 * DATOS.clase4.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * (1 - descClase[3]) +
        DATOS.clase5.jornada.valor * (proporcionalIndiceClase[4] * (1 + 1 * DATOS.clase5.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * (1 - descClase[4]) +
        DATOS.clase6.jornada.valor * (proporcionalIndiceClase[5] * (1 + 1 * DATOS.clase6.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * (1 - descClase[5])
    );
    document.getElementById('jornadaExt624Bruto').innerHTML = formatPesos(jornadaExt624Bruto);
    document.getElementById('jornadaExt624Desc').innerHTML = formatPesos(jornadaExt624Desc);
    document.getElementById('jornadaExt624Neto').innerHTML = formatPesos(jornadaExt624Neto);

    //Calculos Totales Blancos
    const totalRemBonifBruto = basico1Bruto + zona36Bruto + antiguedad37Bruto + ayMatDidac62Bruto + jornadaExt624Bruto;
    const totalRemBonifDesc = basico1Desc + zona36Desc + antiguedad37Desc + ayMatDidac62Desc + jornadaExt624Desc;
    const totalRemBonifNeto = basico1Neto + zona36Neto + antiguedad37Neto + ayMatDidac62Neto + jornadaExt624Neto;
    document.getElementById('totalRemBonifBruto').innerHTML = formatPesos(totalRemBonifBruto);
    document.getElementById('totalRemBonifDesc').innerHTML = formatPesos(totalRemBonifDesc);
    document.getElementById('totalRemBonifNeto').innerHTML = formatPesos(totalRemBonifNeto);

    //Calculos de ítems Grises
    const tope15 = topeClase();
    //Cód. 193 Ad. Remun. Docente - Gris
    const adRemDoc193Tope = 1 * DATOS.datosSalario.adRemDoc193.valor;
    let adRemDoc193Bruto = 1 * DATOS.datosSalario.adRemDoc193.valor * (
        proporcionalHorasCatClase[0] / tope15[0] +
        proporcionalHorasCatClase[1] / tope15[1] +
        proporcionalHorasCatClase[2] / tope15[2] +
        proporcionalHorasCatClase[3] / tope15[3] +
        proporcionalHorasCatClase[4] / tope15[4] +
        proporcionalHorasCatClase[5] / tope15[5]);
    let adRemDoc193BrutoCarga, adRemDoc193Desc, adRemDoc193Neto;
    if (adRemDoc193Bruto < adRemDoc193Tope) {
        adRemDoc193BrutoCarga = adRemDoc193Bruto;
        adRemDoc193Desc = 1 * DATOS.datosSalario.adRemDoc193.valor * (
            proporcionalHorasCatClase[0] * descClase[0] / tope15[0] +
            proporcionalHorasCatClase[1] * descClase[1] / tope15[1] +
            proporcionalHorasCatClase[2] * descClase[2] / tope15[2] +
            proporcionalHorasCatClase[3] * descClase[3] / tope15[3] +
            proporcionalHorasCatClase[4] * descClase[4] / tope15[4] +
            proporcionalHorasCatClase[5] * descClase[5] / tope15[5]);
        adRemDoc193Neto = 1 * DATOS.datosSalario.adRemDoc193.valor * (
            proporcionalHorasCatClase[0] * (1 - descClase[0]) / tope15[0] +
            proporcionalHorasCatClase[1] * (1 - descClase[1]) / tope15[1] +
            proporcionalHorasCatClase[2] * (1 - descClase[2]) / tope15[2] +
            proporcionalHorasCatClase[3] * (1 - descClase[3]) / tope15[3] +
            proporcionalHorasCatClase[4] * (1 - descClase[4]) / tope15[4] +
            proporcionalHorasCatClase[5] * (1 - descClase[5]) / tope15[5]);
    } else if (adRemDoc193Bruto >= adRemDoc193Tope) {
        adRemDoc193BrutoCarga = adRemDoc193Tope;
        adRemDoc193Desc = 1 * DATOS.datosSalario.adRemDoc193.valor * descClase[0];
        adRemDoc193Neto = 1 * DATOS.datosSalario.adRemDoc193.valor * (1 - descClase[0]);
    };
    document.getElementById('adRemDoc193Bruto').innerHTML = formatPesos(adRemDoc193BrutoCarga);
    document.getElementById('adRemDoc193Desc').innerHTML = formatPesos(adRemDoc193Desc);
    document.getElementById('adRemDoc193Neto').innerHTML = formatPesos(adRemDoc193Neto);

    //Cód. 603 Plus Remun. Unif. - Gris
    const plusRem603Tope = 1 * DATOS.datosSalario.plusRem603.valor;
    const plusBruto603 = 1 * DATOS.datosSalario.plusRem603.valor;
    let plusRem603Bruto = (
        plusSegunApJub(0, plusBruto603) * proporcionalHorasCatClase[0] / tope15[0] +
        plusSegunApJub(1, plusBruto603) * proporcionalHorasCatClase[1] / tope15[1] +
        plusSegunApJub(2, plusBruto603) * proporcionalHorasCatClase[2] / tope15[2] +
        plusSegunApJub(3, plusBruto603) * proporcionalHorasCatClase[3] / tope15[3] +
        plusSegunApJub(4, plusBruto603) * proporcionalHorasCatClase[4] / tope15[4] +
        plusSegunApJub(5, plusBruto603) * proporcionalHorasCatClase[5] / tope15[5]);
    let plusRem603BrutoCarga, plusRem603Desc, plusRem603Neto;
    if (plusRem603Bruto < plusRem603Tope) {
        plusRem603BrutoCarga = plusRem603Bruto;
        plusRem603Desc = (
            plusSegunApJub(0,plusBruto603) * proporcionalHorasCatClase[0] * descClasePlus[0] / tope15[0] +
            plusSegunApJub(1,plusBruto603) * proporcionalHorasCatClase[1] * descClasePlus[1] / tope15[1] +
            plusSegunApJub(2,plusBruto603) * proporcionalHorasCatClase[2] * descClasePlus[2] / tope15[2] +
            plusSegunApJub(3,plusBruto603) * proporcionalHorasCatClase[3] * descClasePlus[3] / tope15[3] +
            plusSegunApJub(4,plusBruto603) * proporcionalHorasCatClase[4] * descClasePlus[4] / tope15[4] +
            plusSegunApJub(5,plusBruto603) * proporcionalHorasCatClase[5] * descClasePlus[5] / tope15[5]);
        plusRem603Neto = (
            plusSegunApJub(0,plusBruto603) * proporcionalHorasCatClase[0] * (1 - descClasePlus[0]) / tope15[0] +
            plusSegunApJub(1,plusBruto603) * proporcionalHorasCatClase[1] * (1 - descClasePlus[1]) / tope15[1] +
            plusSegunApJub(2,plusBruto603) * proporcionalHorasCatClase[2] * (1 - descClasePlus[2]) / tope15[2] +
            plusSegunApJub(3,plusBruto603) * proporcionalHorasCatClase[3] * (1 - descClasePlus[3]) / tope15[3] +
            plusSegunApJub(4,plusBruto603) * proporcionalHorasCatClase[4] * (1 - descClasePlus[4]) / tope15[4] +
            plusSegunApJub(5,plusBruto603) * proporcionalHorasCatClase[5] * (1 - descClasePlus[5]) / tope15[5]);
    } else if (plusRem603Bruto >= plusRem603Tope) {
        plusRem603BrutoCarga = plusRem603Tope;
        plusRem603Desc = plusSegunApJub(0,plusBruto603) * descClasePlus[0];
        plusRem603Neto = plusSegunApJub(0,plusBruto603) * (1 - descClasePlus[0]);
    };
    document.getElementById('plusRem603Bruto').innerHTML = formatPesos(plusRem603BrutoCarga);
    document.getElementById('plusRem603Desc').innerHTML = formatPesos(plusRem603Desc);
    document.getElementById('plusRem603Neto').innerHTML = formatPesos(plusRem603Neto);

    //Cód. 625 Plus de Refuerzo - Gris
    const plusRef625Tope = 1 * DATOS.datosSalario.plusRef625.valor;
    const plusBruto625 = 1 * DATOS.datosSalario.plusRef625.valor;    
    let plusRef625Bruto = (
        plusSegunApJub(0, plusBruto625) * proporcionalHorasCatClase[0] / tope15[0] +
        plusSegunApJub(1, plusBruto625) * proporcionalHorasCatClase[1] / tope15[1] +
        plusSegunApJub(2, plusBruto625) * proporcionalHorasCatClase[2] / tope15[2] +
        plusSegunApJub(3, plusBruto625) * proporcionalHorasCatClase[3] / tope15[3] +
        plusSegunApJub(4, plusBruto625) * proporcionalHorasCatClase[4] / tope15[4] +
        plusSegunApJub(5, plusBruto625) * proporcionalHorasCatClase[5] / tope15[5]);
    let plusRef625BrutoCarga, plusRef625Desc, plusRef625Neto;
    if (plusRef625Bruto < plusRef625Tope) {
        plusRef625BrutoCarga = plusRef625Bruto;
        plusRef625Desc = (
            plusSegunApJub(0, plusBruto625) * proporcionalHorasCatClase[0] * descClasePlus[0] / tope15[0] +
            plusSegunApJub(1, plusBruto625) * proporcionalHorasCatClase[1] * descClasePlus[1] / tope15[1] +
            plusSegunApJub(2, plusBruto625) * proporcionalHorasCatClase[2] * descClasePlus[2] / tope15[2] +
            plusSegunApJub(3, plusBruto625) * proporcionalHorasCatClase[3] * descClasePlus[3] / tope15[3] +
            plusSegunApJub(4, plusBruto625) * proporcionalHorasCatClase[4] * descClasePlus[4] / tope15[4] +
            plusSegunApJub(5, plusBruto625) * proporcionalHorasCatClase[5] * descClasePlus[5] / tope15[5]);
        plusRef625Neto = (
            plusSegunApJub(0, plusBruto625) * proporcionalHorasCatClase[0] * (1 - descClasePlus[0]) / tope15[0] +
            plusSegunApJub(1, plusBruto625) * proporcionalHorasCatClase[1] * (1 - descClasePlus[1]) / tope15[1] +
            plusSegunApJub(2, plusBruto625) * proporcionalHorasCatClase[2] * (1 - descClasePlus[2]) / tope15[2] +
            plusSegunApJub(3, plusBruto625) * proporcionalHorasCatClase[3] * (1 - descClasePlus[3]) / tope15[3] +
            plusSegunApJub(4, plusBruto625) * proporcionalHorasCatClase[4] * (1 - descClasePlus[4]) / tope15[4] +
            plusSegunApJub(5, plusBruto625) * proporcionalHorasCatClase[5] * (1 - descClasePlus[5]) / tope15[5]);
    } else if (plusRef625Bruto >= plusRef625Tope) {
        plusRef625BrutoCarga = plusRef625Tope;
        plusRef625Desc = plusSegunApJub(0, plusBruto625) * descClasePlus[0];
        plusRef625Neto = plusSegunApJub(0, plusBruto625) *  (1 - descClasePlus[0]);
    };
    document.getElementById('plusRef625Bruto').innerHTML = formatPesos(plusRef625BrutoCarga);
    document.getElementById('plusRef625Desc').innerHTML = formatPesos(plusRef625Desc);
    document.getElementById('plusRef625Neto').innerHTML = formatPesos(plusRef625Neto);

    //Cód. 629 Ad. Remun 2do Cargo - Gris
    const adRemun2Cargo629Tope = 2 * DATOS.datosSalario.adRemun2Cargo629.valor;
    let adRemun2Cargo629Bruto = 1 * DATOS.datosSalario.adRemun2Cargo629.valor * (
        proporcionalHorasCatClase[0] / tope15[0] +
        proporcionalHorasCatClase[1] / tope15[1] +
        proporcionalHorasCatClase[2] / tope15[2] +
        proporcionalHorasCatClase[3] / tope15[3] +
        proporcionalHorasCatClase[4] / tope15[4] +
        proporcionalHorasCatClase[5] / tope15[5]);
    let adRemun2Cargo629BrutoCarga, adRemun2Cargo629Desc, adRemun2Cargo629Neto;
    if (adRemun2Cargo629Bruto < adRemun2Cargo629Tope && (adRemun2Cargo629Bruto <= (adRemun2Cargo629Tope / 2))) {
        adRemun2Cargo629BrutoCarga = 0.0;
        adRemun2Cargo629Desc = 0.0;
        adRemun2Cargo629Neto = 0.0;
    } else if (adRemun2Cargo629Bruto < adRemun2Cargo629Tope && (adRemun2Cargo629Bruto > (adRemun2Cargo629Tope / 2))) {
        adRemun2Cargo629BrutoCarga = adRemun2Cargo629Bruto - adRemun2Cargo629Tope / 2;
        adRemun2Cargo629Desc = adRemun2Cargo629BrutoCarga * (
            proporcionalHorasCatClase[0] * descClase[0] / tope15[0] +
            proporcionalHorasCatClase[1] * descClase[1] / tope15[1] +
            proporcionalHorasCatClase[2] * descClase[2] / tope15[2] +
            proporcionalHorasCatClase[3] * descClase[3] / tope15[3] +
            proporcionalHorasCatClase[4] * descClase[4] / tope15[4] +
            proporcionalHorasCatClase[5] * descClase[5] / tope15[5]);
        adRemun2Cargo629Neto = adRemun2Cargo629BrutoCarga * (
            proporcionalHorasCatClase[0] * (1 - descClase[0]) / tope15[0] +
            proporcionalHorasCatClase[1] * (1 - descClase[1]) / tope15[1] +
            proporcionalHorasCatClase[2] * (1 - descClase[2]) / tope15[2] +
            proporcionalHorasCatClase[3] * (1 - descClase[3]) / tope15[3] +
            proporcionalHorasCatClase[4] * (1 - descClase[4]) / tope15[4] +
            proporcionalHorasCatClase[5] * (1 - descClase[5]) / tope15[5]);
    } else if (adRemun2Cargo629Bruto >= adRemun2Cargo629Tope) {
        adRemun2Cargo629BrutoCarga = adRemun2Cargo629Tope / 2;
        adRemun2Cargo629Desc = adRemun2Cargo629BrutoCarga * descClase[0];
        adRemun2Cargo629Neto = adRemun2Cargo629BrutoCarga * (1 - descClase[0]);
    };
    document.getElementById('adRemun2Cargo629Bruto').innerHTML = formatPesos(adRemun2Cargo629BrutoCarga);
    document.getElementById('adRemun2Cargo629Desc').innerHTML = formatPesos(adRemun2Cargo629Desc);
    document.getElementById('adRemun2Cargo629Neto').innerHTML = formatPesos(adRemun2Cargo629Neto);

    //Calculos Total Gris
    const totalRemNoBonifBruto = adRemDoc193BrutoCarga + plusRem603BrutoCarga + plusRef625BrutoCarga + adRemun2Cargo629BrutoCarga;
    const totalRemNoBonifDesc = adRemDoc193Desc + plusRem603Desc + plusRef625Desc + adRemun2Cargo629Desc;
    const totalRemNoBonifNeto = adRemDoc193Neto + plusRem603Neto + plusRef625Neto + adRemun2Cargo629Neto;
    document.getElementById('totalRemNoBonifBruto').innerHTML = formatPesos(totalRemNoBonifBruto);
    document.getElementById('totalRemNoBonifDesc').innerHTML = formatPesos(totalRemNoBonifDesc);
    document.getElementById('totalRemNoBonifNeto').innerHTML = formatPesos(totalRemNoBonifNeto);

    //Calculo ítems Negros
    //Cód.3 Salario Familiar - Negro
    const salFam3Bruto = ( 1 * DATOS.datosSalario.salarioFam3.valor + 1 * DATOS.datosSalario.ayudEscolar.valor) * 1 * DATOS.datosSelect.hijos.valor;
    const salFam3Desc = '';
    const salFam3Neto = salFam3Bruto;
    document.getElementById('salFam3Bruto').innerHTML = formatPesos(salFam3Bruto);
    document.getElementById('salFam3Desc').innerHTML = formatPesos(salFam3Desc);
    document.getElementById('salFam3Neto').innerHTML = formatPesos(salFam3Neto);

    //Cód. 140 Asig. Especial Ley 25.053 - Negro
    const asigEspLey140Tope = 2 * DATOS.datosSalario.asigEspLey140.valor;
    let asigEspLey140Bruto = 1 * DATOS.datosSalario.asigEspLey140.valor * (
        proporcionalHorasCatClase[0] / tope15[0] +
        proporcionalHorasCatClase[1] / tope15[1] +
        proporcionalHorasCatClase[2] / tope15[2] +
        proporcionalHorasCatClase[3] / tope15[3] +
        proporcionalHorasCatClase[4] / tope15[4] +
        proporcionalHorasCatClase[5] / tope15[5]);
    if (asigEspLey140Bruto > asigEspLey140Tope) {
        asigEspLey140Bruto = asigEspLey140Tope;
    };
    const asigEspLey140Desc = '';
    const asigEspLey140Neto = asigEspLey140Bruto;
    document.getElementById('asigEspLey140Bruto').innerHTML = formatPesos(asigEspLey140Bruto);
    document.getElementById('asigEspLey140Desc').innerHTML = formatPesos(asigEspLey140Desc);
    document.getElementById('asigEspLey140Neto').innerHTML = formatPesos(asigEspLey140Neto);

    //Cód. 171 Comp. Docente Provincial - Negro
    const compProv171Tope = 2 * DATOS.datosSalario.compProv171.valor;
    let compProv171Bruto = 1 * DATOS.datosSalario.compProv171.valor * (
        proporcionalHorasCatClase[0] / tope15[0] +
        proporcionalHorasCatClase[1] / tope15[1] +
        proporcionalHorasCatClase[2] / tope15[2] +
        proporcionalHorasCatClase[3] / tope15[3] +
        proporcionalHorasCatClase[4] / tope15[4] +
        proporcionalHorasCatClase[5] / tope15[5]);
    if (compProv171Bruto > compProv171Tope) {
        compProv171Bruto = compProv171Tope;
    };
    const compProv171Desc = '';
    const compProv171Neto = compProv171Bruto;
    document.getElementById('compProv171Bruto').innerHTML = formatPesos(compProv171Bruto);
    document.getElementById('compProv171Desc').innerHTML = formatPesos(compProv171Desc);
    document.getElementById('compProv171Neto').innerHTML = formatPesos(compProv171Neto);

    //Cód. 609 Conectividad Nacional - Negro
    const conectNac609Tope = 2 * DATOS.datosSalario.conectNac609.valor;
    let conectNac609Bruto = 1 * DATOS.datosSalario.conectNac609.valor * (
        proporcionalHorasCatClase[0] / tope15[0] +
        proporcionalHorasCatClase[1] / tope15[1] +
        proporcionalHorasCatClase[2] / tope15[2] +
        proporcionalHorasCatClase[3] / tope15[3] +
        proporcionalHorasCatClase[4] / tope15[4] +
        proporcionalHorasCatClase[5] / tope15[5]);
    if (conectNac609Bruto > conectNac609Tope) {
        conectNac609Bruto = conectNac609Tope;
    };
    const conectNac609Desc = '';
    const conectNac609Neto = conectNac609Bruto;
    document.getElementById('conectNac609Bruto').innerHTML = formatPesos(conectNac609Bruto);
    document.getElementById('conectNac609Desc').innerHTML = formatPesos(conectNac609Desc);
    document.getElementById('conectNac609Neto').innerHTML = formatPesos(conectNac609Neto);

    //cód. 622 Bono Navideño - Negro
    const bono622Bruto = DATOS.datosSalario.bono622.valor;
    const bono622Desc = '';
    const bono622Neto = bono622Bruto;
    document.getElementById('bono622Bruto').innerHTML = formatPesos(bono622Bruto);
    document.getElementById('bono622Desc').innerHTML = formatPesos(bono622Desc);
    document.getElementById('bono622Neto').innerHTML = formatPesos(bono622Neto);

    document.getElementById('sac150Bruto').innerHTML = formatPesos(0.0);
    document.getElementById('sac150Desc').innerHTML = formatPesos(0.0);
    document.getElementById('sac150Neto').innerHTML = formatPesos(0.0);

    //Cód. 168 Programa Nacional Comp. Docente - Negro                      FALTA CALCULAR
    let progNacCompDoc168Bruto = DATOS.datosSalario.progNacCompDoc168.valor;
    let progNacCompDoc168Desc = '';
    let progNacCompDoc168Neto = progNacCompDoc168Bruto;
    document.getElementById('progNacCompDoc168Bruto').innerHTML = formatPesos(progNacCompDoc168Bruto);
    document.getElementById('progNacCompDoc168Desc').innerHTML = formatPesos(progNacCompDoc168Desc);
    document.getElementById('progNacCompDoc168Neto').innerHTML = formatPesos(progNacCompDoc168Neto);

    //Calculo Total Negro
    const totalNoRemNoBonifBruto = salFam3Bruto + asigEspLey140Bruto + compProv171Bruto + conectNac609Bruto + bono622Bruto + progNacCompDoc168Bruto;
    const totalNoRemNoBonifDesc = '';
    const totalNoRemNoBonifNeto = totalNoRemNoBonifBruto;
    document.getElementById('totalNoRemNoBonifBruto').innerHTML = formatPesos(totalNoRemNoBonifBruto);
    document.getElementById('totalNoRemNoBonifDesc').innerHTML = formatPesos(totalNoRemNoBonifDesc);
    document.getElementById('totalNoRemNoBonifNeto').innerHTML = formatPesos(totalNoRemNoBonifNeto);

    //Calculos Descuentos
    const segVida210Desc = DATOS.datosSalario.segVida210.valor;
    document.getElementById('segVida210Desc').innerHTML = formatPesos(segVida210Desc);

    const obraSocial212Desc = DATOS.datosSalario.obraSocial212.valor * (totalRemBonifBruto + totalRemNoBonifBruto);
    document.getElementById('obraSocial212Desc').innerHTML = formatPesos(obraSocial212Desc);

    const descClaseApJub = [
        1 * DATOS.clase1.apJub.valor,
        1 * DATOS.clase2.apJub.valor,
        1 * DATOS.clase3.apJub.valor,
        1 * DATOS.clase4.apJub.valor,
        1 * DATOS.clase5.apJub.valor,
        1 * DATOS.clase6.apJub.valor
    ];

    const basico1ApJubDesc = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * descClaseApJub[0] +
        proporcionalIndiceClase[1] * descClaseApJub[1] +
        proporcionalIndiceClase[2] * descClaseApJub[2] +
        proporcionalIndiceClase[3] * descClaseApJub[3] +
        proporcionalIndiceClase[4] * descClaseApJub[4] +
        proporcionalIndiceClase[5] * descClaseApJub[5]
    );

    const zona36ApJubDesc = DATOS.datosSalario.basico1.valor * (
        proporcionalIndiceClase[0] * DATOS.clase1.zona.valor * descClaseApJub[0] +
        proporcionalIndiceClase[1] * DATOS.clase2.zona.valor * descClaseApJub[1] +
        proporcionalIndiceClase[2] * DATOS.clase3.zona.valor * descClaseApJub[2] +
        proporcionalIndiceClase[3] * DATOS.clase4.zona.valor * descClaseApJub[3] +
        proporcionalIndiceClase[4] * DATOS.clase5.zona.valor * descClaseApJub[4] +
        proporcionalIndiceClase[5] * DATOS.clase6.zona.valor * descClaseApJub[5]
    );

    const antiguedad37ApJubDesc = DATOS.datosSelect.antiguedad.valor * basico1ApJubDesc;
    const ayMatDidac62ApJubDesc = DATOS.datosSalario.ayMatDidac62.valor * basico1ApJubDesc;
    const jornadaExt624ApJubDesc = DATOS.datosSalario.jornadaExt624.valor * DATOS.datosSalario.basico1.valor * (
        DATOS.clase1.jornada.valor * (proporcionalIndiceClase[0] * (1 + 1 * DATOS.clase1.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClaseApJub[0] +
        DATOS.clase2.jornada.valor * (proporcionalIndiceClase[1] * (1 + 1 * DATOS.clase2.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClaseApJub[1] +
        DATOS.clase3.jornada.valor * (proporcionalIndiceClase[2] * (1 + 1 * DATOS.clase3.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClaseApJub[2] +
        DATOS.clase4.jornada.valor * (proporcionalIndiceClase[3] * (1 + 1 * DATOS.clase4.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClaseApJub[3] +
        DATOS.clase5.jornada.valor * (proporcionalIndiceClase[4] * (1 + 1 * DATOS.clase5.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClaseApJub[4] +
        DATOS.clase6.jornada.valor * (proporcionalIndiceClase[5] * (1 + 1 * DATOS.clase6.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)) * descClaseApJub[5]
    );

    let adRemDoc193ApJubDesc;
    if (adRemDoc193Bruto < adRemDoc193Tope) {
        adRemDoc193ApJubDesc = 1 * DATOS.datosSalario.adRemDoc193.valor * (
            proporcionalHorasCatClase[0] * descClaseApJub[0] / tope15[0] +
            proporcionalHorasCatClase[1] * descClaseApJub[1] / tope15[1] +
            proporcionalHorasCatClase[2] * descClaseApJub[2] / tope15[2] +
            proporcionalHorasCatClase[3] * descClaseApJub[3] / tope15[3] +
            proporcionalHorasCatClase[4] * descClaseApJub[4] / tope15[4] +
            proporcionalHorasCatClase[5] * descClaseApJub[5] / tope15[5]);
    } else if (adRemDoc193Bruto >= adRemDoc193Tope) {
        adRemDoc193ApJubDesc = 1 * DATOS.datosSalario.adRemDoc193.valor * descClaseApJub[0];
    };

    let plusRem603ApJubDesc;
    if (plusRem603Bruto < plusRem603Tope) {
        plusRem603ApJubDesc = 1 * DATOS.datosSalario.plusRem603.valor * (
            proporcionalHorasCatClase[0] * descClaseApJub[0] / tope15[0] +
            proporcionalHorasCatClase[1] * descClaseApJub[1] / tope15[1] +
            proporcionalHorasCatClase[2] * descClaseApJub[2] / tope15[2] +
            proporcionalHorasCatClase[3] * descClaseApJub[3] / tope15[3] +
            proporcionalHorasCatClase[4] * descClaseApJub[4] / tope15[4] +
            proporcionalHorasCatClase[5] * descClaseApJub[5] / tope15[5]);
    } else if (plusRem603Bruto >= plusRem603Tope) {
        plusRem603ApJubDesc = 1 * DATOS.datosSalario.plusRem603.valor * descClaseApJub[0];
    };

    let plusRef625ApJubDesc;
    if (plusRef625Bruto < plusRef625Tope) {
        plusRef625ApJubDesc = 1 * DATOS.datosSalario.plusRef625.valor * (
            proporcionalHorasCatClase[0] * descClaseApJub[0] / tope15[0] +
            proporcionalHorasCatClase[1] * descClaseApJub[1] / tope15[1] +
            proporcionalHorasCatClase[2] * descClaseApJub[2] / tope15[2] +
            proporcionalHorasCatClase[3] * descClaseApJub[3] / tope15[3] +
            proporcionalHorasCatClase[4] * descClaseApJub[4] / tope15[4] +
            proporcionalHorasCatClase[5] * descClaseApJub[5] / tope15[5]);
    } else if (plusRef625Bruto >= plusRef625Tope) {
        plusRef625ApJubDesc = 1 * DATOS.datosSalario.plusRef625.valor * descClaseApJub[0];
    };

    let adRemun2Cargo629ApJubDesc;
    if (adRemun2Cargo629Bruto < adRemun2Cargo629Tope && (adRemun2Cargo629Bruto <= (adRemun2Cargo629Tope / 2))) {
        adRemun2Cargo629ApJubDesc = 0.0;
    } else if (adRemun2Cargo629Bruto < adRemun2Cargo629Tope && (adRemun2Cargo629Bruto > (adRemun2Cargo629Tope / 2))) {
        adRemun2Cargo629ApJubDesc = adRemun2Cargo629BrutoCarga * (
            proporcionalHorasCatClase[0] * descClaseApJub[0] / tope15[0] +
            proporcionalHorasCatClase[1] * descClaseApJub[1] / tope15[1] +
            proporcionalHorasCatClase[2] * descClaseApJub[2] / tope15[2] +
            proporcionalHorasCatClase[3] * descClaseApJub[3] / tope15[3] +
            proporcionalHorasCatClase[4] * descClaseApJub[4] / tope15[4] +
            proporcionalHorasCatClase[5] * descClaseApJub[5] / tope15[5]);
    } else if (adRemun2Cargo629Bruto >= adRemun2Cargo629Tope) {
        adRemun2Cargo629ApJubDesc = adRemun2Cargo629BrutoCarga * descClaseApJub[0];
    };
    const apJub208Desc = basico1ApJubDesc + zona36ApJubDesc + antiguedad37ApJubDesc + ayMatDidac62ApJubDesc + jornadaExt624ApJubDesc + adRemDoc193ApJubDesc + plusRem603ApJubDesc + plusRef625ApJubDesc + adRemun2Cargo629ApJubDesc;
    document.getElementById('apJub208Desc').innerHTML = formatPesos(apJub208Desc);


    //Gremios
    const remunerativosAmet = totalRemBonifBruto + totalRemNoBonifBruto - (plusRem603BrutoCarga + plusRef625BrutoCarga);
    const nameGremio = DATOS.datosSelect.nameGremio.valor;
    const gremio = DATOS.datosSelect.gremio.valor;
    let apGrem199Desc = 0; //SUTECO
    let apGrem235Desc = 0; //AMET
    let apGrem241Desc = 0; //ACDP
    let apGrem334Desc = 0; //ACDP incen.
    let apGrem399Desc = 0; //Suteco incen.
    if (nameGremio === 'Asoc. Mag. Ens. Técnica') {
        apGrem199Desc = 0;
        apGrem235Desc = 1 * gremio * remunerativosAmet; //AMET
        apGrem241Desc = 0;
        apGrem334Desc = 0;
        apGrem399Desc = 0;
    } else if (nameGremio === 'A.C.D.P') {
        apGrem199Desc = 0;
        apGrem235Desc = 0;
        apGrem241Desc = 1 * gremio * DATOS.datosSalario.basico1.valor * DATOS.clase1.indiceClase.valor * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor; //ACDP
        apGrem334Desc = 0.007322173 * DATOS.datosSalario.basico1.valor * DATOS.clase1.indiceClase.valor * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor;
        apGrem399Desc = 0;
    } else if (nameGremio === 'Suteco Docentes') {
        apGrem199Desc = 1 * gremio * DATOS.datosSalario.basico1.valor * DATOS.clase1.indiceClase.valor * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor; //SUTECO
        apGrem235Desc = 0;
        apGrem241Desc = 0;
        apGrem334Desc = 0;
        apGrem399Desc = 0.007322173 * DATOS.datosSalario.basico1.valor * DATOS.clase1.indiceClase.valor * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor * (1 * DATOS.clase1.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor); //Suteco inc suma zona antiguedad ayuda
    };
    document.getElementById('apGrem199Desc').innerHTML = formatPesos(apGrem199Desc);
    document.getElementById('apGrem235Desc').innerHTML = formatPesos(apGrem235Desc);
    document.getElementById('apGrem241Desc').innerHTML = formatPesos(apGrem241Desc);
    document.getElementById('apGrem334Desc').innerHTML = formatPesos(apGrem334Desc);
    document.getElementById('apGrem399Desc').innerHTML = formatPesos(apGrem399Desc);

    const apGremial = apGrem199Desc + apGrem235Desc + apGrem241Desc + apGrem334Desc + apGrem399Desc;
    const totalDesc = segVida210Desc + obraSocial212Desc + apJub208Desc + apGremial;
    document.getElementById('totalDesc').innerHTML = formatPesos(totalDesc);

    //Calculo Haber en Cuotas
    document.getElementById('plusRemCuota1Bruto').innerHTML = formatPesos(plusRem603Bruto);
    document.getElementById('plusRemCuota1Desc').innerHTML = formatPesos(plusRem603Desc);
    document.getElementById('plusRemCuota1Neto').innerHTML = formatPesos(plusRem603Neto);

    document.getElementById('plusRefCuota2Bruto').innerHTML = formatPesos(plusRef625Bruto);
    document.getElementById('plusRefCuota2Desc').innerHTML = formatPesos(plusRef625Desc);
    document.getElementById('plusRefCuota2Neto').innerHTML = formatPesos(plusRef625Neto);

    const totalCuota3Bruto = totalRemBonifBruto + adRemDoc193Bruto + adRemun2Cargo629Bruto + totalNoRemNoBonifBruto;
    const totalCuota3Desc = totalRemBonifDesc + adRemDoc193Desc + adRemun2Cargo629Desc + segVida210Desc;
    const totalCuota3Neto = totalRemBonifNeto + adRemDoc193Neto + adRemun2Cargo629Neto + totalNoRemNoBonifBruto - segVida210Desc;
    document.getElementById('totalCuota3Bruto').innerHTML = formatPesos(totalCuota3Bruto);
    document.getElementById('totalCuota3Desc').innerHTML = formatPesos(totalCuota3Desc);
    document.getElementById('totalCuota3Neto').innerHTML = formatPesos(totalCuota3Neto);

    const totalHaberBruto = totalRemBonifBruto + totalRemNoBonifBruto + totalNoRemNoBonifBruto;
    const totalHaberDesc = totalRemBonifDesc + totalRemNoBonifDesc + segVida210Desc;
    const totalHaberNeto = totalRemBonifNeto + totalRemNoBonifNeto + totalNoRemNoBonifBruto - segVida210Desc;
    document.getElementById('totalHaberBruto').innerHTML = formatPesos(totalHaberBruto);
    document.getElementById('totalHaberDesc').innerHTML = formatPesos(totalHaberDesc);
    document.getElementById('totalHaberNeto').innerHTML = formatPesos(totalHaberNeto);


    //Cód. 150 SAC
    if (DATOS.datosSelect.mes.valor === '5-SAC' || DATOS.datosSelect.mes.valor === '11-SAC') {
        document.getElementById('basico1Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('basico1Desc').innerHTML = formatPesos(0.0);
        document.getElementById('basico1Neto').innerHTML = formatPesos(0.0);

        document.getElementById('salFam3Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('salFam3Desc').innerHTML = formatPesos(0.0);
        document.getElementById('salFam3Neto').innerHTML = formatPesos(0.0);

        document.getElementById('zona36Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('zona36Desc').innerHTML = formatPesos(0.0);
        document.getElementById('zona36Neto').innerHTML = formatPesos(0.0);

        document.getElementById('antiguedad37Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('antiguedad37Desc').innerHTML = formatPesos(0.0);
        document.getElementById('antiguedad37Neto').innerHTML = formatPesos(0.0);

        document.getElementById('ayMatDidac62Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('ayMatDidac62Desc').innerHTML = formatPesos(0.0);
        document.getElementById('ayMatDidac62Neto').innerHTML = formatPesos(0.0);

        document.getElementById('asigEspLey140Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('asigEspLey140Desc').innerHTML = formatPesos(0.0);
        document.getElementById('asigEspLey140Neto').innerHTML = formatPesos(0.0);

        const sac150Bruto = totalRemBonifBruto + totalRemNoBonifBruto;
        const sac150Desc = totalRemBonifDesc + totalRemNoBonifDesc;
        const sac150Neto = totalRemBonifNeto + totalRemNoBonifNeto;
        document.getElementById('sac150Bruto').innerHTML = formatPesos(sac150Bruto);
        document.getElementById('sac150Desc').innerHTML = formatPesos(sac150Desc);
        document.getElementById('sac150Neto').innerHTML = formatPesos(sac150Neto);

        document.getElementById('progNacCompDoc168Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('progNacCompDoc168Desc').innerHTML = formatPesos(0.0);
        document.getElementById('progNacCompDoc168Neto').innerHTML = formatPesos(0.0);

        document.getElementById('compProv171Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('compProv171Desc').innerHTML = formatPesos(0.0);
        document.getElementById('compProv171Neto').innerHTML = formatPesos(0.0);

        document.getElementById('adRemDoc193Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('adRemDoc193Desc').innerHTML = formatPesos(0.0);
        document.getElementById('adRemDoc193Neto').innerHTML = formatPesos(0.0);

        document.getElementById('plusRem603Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('plusRem603Desc').innerHTML = formatPesos(0.0);
        document.getElementById('plusRem603Neto').innerHTML = formatPesos(0.0);

        document.getElementById('conectNac609Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('conectNac609Desc').innerHTML = formatPesos(0.0);
        document.getElementById('conectNac609Neto').innerHTML = formatPesos(0.0);

        if (DATOS.datosSelect.mes.valor === '11-SAC') {
            document.getElementById('bono').innerHTML = '🎄 Bono Navideño Cuota 1/2*';
        };

        document.getElementById('jornadaExt624Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('jornadaExt624Desc').innerHTML = formatPesos(0.0);
        document.getElementById('jornadaExt624Neto').innerHTML = formatPesos(0.0);

        document.getElementById('plusRef625Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('plusRef625Desc').innerHTML = formatPesos(0.0);
        document.getElementById('plusRef625Neto').innerHTML = formatPesos(0.0);

        document.getElementById('adRemun2Cargo629Bruto').innerHTML = formatPesos(0.0);
        document.getElementById('adRemun2Cargo629Desc').innerHTML = formatPesos(0.0);
        document.getElementById('adRemun2Cargo629Neto').innerHTML = formatPesos(0.0);

        document.getElementById('totalRemBonifBruto').innerHTML = formatPesos(totalRemBonifBruto);
        document.getElementById('totalRemBonifDesc').innerHTML = formatPesos(totalRemBonifDesc);
        document.getElementById('totalRemBonifNeto').innerHTML = formatPesos(totalRemBonifNeto);

        document.getElementById('totalRemNoBonifBruto').innerHTML = formatPesos(totalRemNoBonifBruto);
        document.getElementById('totalRemNoBonifDesc').innerHTML = formatPesos(totalRemNoBonifDesc);
        document.getElementById('totalRemNoBonifNeto').innerHTML = formatPesos(totalRemNoBonifNeto);

        document.getElementById('totalNoRemNoBonifBruto').innerHTML = formatPesos(bono622Bruto);
        document.getElementById('totalNoRemNoBonifDesc').innerHTML = formatPesos(0.0);
        document.getElementById('totalNoRemNoBonifNeto').innerHTML = formatPesos(bono622Bruto);

        document.getElementById('totalCuotasDiv').hidden = true;
    };
    return ({ 'totalHaberBruto': totalHaberBruto, 'totalHaberNeto': totalHaberNeto })
};

function formatPesos(number) {
    let numberFromat = number * 1;
    if ((typeof numberFromat) === 'number') {
        numberFromat = Number((numberFromat).toFixed(2));
        numberFromat = numberFromat.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
        });
    } else if (numberFromat === '') {
        numberFromat = '----------';
    };
    return numberFromat;
};
function topeClase() {
    let tope = [1, 1, 1, 1, 1, 1];
    const DATOS = prepararDatos();
    const array15NumerosClases = [DATOS.clase1.numeroClase.valor, DATOS.clase2.numeroClase.valor, DATOS.clase3.numeroClase.valor, DATOS.clase4.numeroClase.valor, DATOS.clase5.numeroClase.valor, DATOS.clase6.numeroClase.valor];
    for (let i = 0; i < 6; i++) {
        if (array15NumerosClases[i] === '191') {
            tope[i] = 12;
        } else if (array15NumerosClases[i] === '192') {
            tope[i] = 15;
        };
    };
    return tope;
};

function plusSegunApJub(i, plusBruto) {
    const DATOS = prepararDatos();
    const descClaseApJub = [
        1 * DATOS.clase1.apJub.valor,
        1 * DATOS.clase2.apJub.valor,
        1 * DATOS.clase3.apJub.valor,
        1 * DATOS.clase4.apJub.valor,
        1 * DATOS.clase5.apJub.valor,
        1 * DATOS.clase6.apJub.valor
    ];
    const factor = 1.02;
    let plusChange = plusBruto;
    if (descClaseApJub[i] === 0.185) {
        plusChange = plusChange / factor;
    };
    return plusChange;
};


