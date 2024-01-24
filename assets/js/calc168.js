function calculoHaber30() {
    const DATOS = prepararDatos();
    const proporcionalIndiceClase = [
        1 * DATOS.clase1.indiceClase.valor * DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor,
        1 * DATOS.clase2.indiceClase.valor * DATOS.clase2.horasCatedras.valor * DATOS.clase2.suplencia.valor,
        1 * DATOS.clase3.indiceClase.valor * DATOS.clase3.horasCatedras.valor * DATOS.clase3.suplencia.valor,
        1 * DATOS.clase4.indiceClase.valor * DATOS.clase4.horasCatedras.valor * DATOS.clase4.suplencia.valor,
        1 * DATOS.clase5.indiceClase.valor * DATOS.clase5.horasCatedras.valor * DATOS.clase5.suplencia.valor,
        1 * DATOS.clase6.indiceClase.valor * DATOS.clase6.horasCatedras.valor * DATOS.clase6.suplencia.valor
    ];
    const descClase = [
        1 * DATOS.clase1.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase2.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase3.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase4.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase5.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
        1 * DATOS.clase6.apJub.valor + 1 * DATOS.datosSalario.obraSocial212.valor,
    ];

    const arrayBlancosNeto = [
        1 * (1 - descClase[0]) * DATOS.datosSalario.basico1.valor * proporcionalIndiceClase[0] * (1 + DATOS.datosSalario.jornadaExt624.valor * DATOS.clase1.jornada.valor) * (1 + 1 * DATOS.clase1.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor),
        1 * (1 - descClase[1]) * DATOS.datosSalario.basico1.valor * proporcionalIndiceClase[1] * (1 + DATOS.datosSalario.jornadaExt624.valor * DATOS.clase2.jornada.valor) * (1 + 1 * DATOS.clase2.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor),
        1 * (1 - descClase[2]) * DATOS.datosSalario.basico1.valor * proporcionalIndiceClase[2] * (1 + DATOS.datosSalario.jornadaExt624.valor * DATOS.clase3.jornada.valor) * (1 + 1 * DATOS.clase3.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor),
        1 * (1 - descClase[3]) * DATOS.datosSalario.basico1.valor * proporcionalIndiceClase[3] * (1 + DATOS.datosSalario.jornadaExt624.valor * DATOS.clase4.jornada.valor) * (1 + 1 * DATOS.clase4.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor),
        1 * (1 - descClase[4]) * DATOS.datosSalario.basico1.valor * proporcionalIndiceClase[4] * (1 + DATOS.datosSalario.jornadaExt624.valor * DATOS.clase5.jornada.valor) * (1 + 1 * DATOS.clase5.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor),
        1 * (1 - descClase[5]) * DATOS.datosSalario.basico1.valor * proporcionalIndiceClase[5] * (1 + DATOS.datosSalario.jornadaExt624.valor * DATOS.clase6.jornada.valor) * (1 + 1 * DATOS.clase6.zona.valor + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)
    ];
    const objetoClases = {
        'clase1': { 'valor': DATOS.clase1.numeroClase.valor, 'indiceClase': DATOS.clase1.indiceClase.valor, 'horasCat': DATOS.clase1.horasCatedras.valor * DATOS.clase1.suplencia.valor, 'neto': arrayBlancosNeto[0], 'desc': descClase[0], 'jornada': DATOS.clase1.jornada.valor, 'zona': DATOS.clase1.zona.valor },
        'clase2': { 'valor': DATOS.clase2.numeroClase.valor, 'indiceClase': DATOS.clase2.indiceClase.valor, 'horasCat': DATOS.clase2.horasCatedras.valor * DATOS.clase2.suplencia.valor, 'neto': arrayBlancosNeto[1], 'desc': descClase[1], 'jornada': DATOS.clase2.jornada.valor, 'zona': DATOS.clase2.zona.valor },
        'clase3': { 'valor': DATOS.clase3.numeroClase.valor, 'indiceClase': DATOS.clase3.indiceClase.valor, 'horasCat': DATOS.clase3.horasCatedras.valor * DATOS.clase3.suplencia.valor, 'neto': arrayBlancosNeto[2], 'desc': descClase[2], 'jornada': DATOS.clase3.jornada.valor, 'zona': DATOS.clase3.zona.valor },
        'clase4': { 'valor': DATOS.clase4.numeroClase.valor, 'indiceClase': DATOS.clase4.indiceClase.valor, 'horasCat': DATOS.clase4.horasCatedras.valor * DATOS.clase4.suplencia.valor, 'neto': arrayBlancosNeto[3], 'desc': descClase[3], 'jornada': DATOS.clase4.jornada.valor, 'zona': DATOS.clase4.zona.valor },
        'clase5': { 'valor': DATOS.clase5.numeroClase.valor, 'indiceClase': DATOS.clase5.indiceClase.valor, 'horasCat': DATOS.clase5.horasCatedras.valor * DATOS.clase5.suplencia.valor, 'neto': arrayBlancosNeto[4], 'desc': descClase[4], 'jornada': DATOS.clase5.jornada.valor, 'zona': DATOS.clase5.zona.valor },
        'clase6': { 'valor': DATOS.clase6.numeroClase.valor, 'indiceClase': DATOS.clase6.indiceClase.valor, 'horasCat': DATOS.clase6.horasCatedras.valor * DATOS.clase6.suplencia.valor, 'neto': arrayBlancosNeto[5], 'desc': descClase[5], 'jornada': DATOS.clase6.jornada.valor, 'zona': DATOS.clase6.zona.valor }
    };

    let sumaHCSup = 0;
    let sumaHCMed = 0;
    let sumaCargos = 0;
    for (const clase in objetoClases) {
        if (objetoClases[clase].valor === '191') {
            sumaHCSup += objetoClases[clase].horasCat;
        } else if (objetoClases[clase].valor === '192') {
            sumaHCMed += objetoClases[clase].horasCat;
        } else if (objetoClases[clase].valor === '') {
            sumaCargos += objetoClases[clase].horasCat;
        };
    };
    sumaCargos += sumaHCSup / 12 + sumaHCMed / 15;

    const clasesUnicas = {};
    Object.values(objetoClases).forEach(clase => {
        const clave = clase.valor;
        if (clave !== '') {
            if (!clasesUnicas[clave]) {
                clasesUnicas[clave] = { 'valor': clave, 'indiceClase': clase.indiceClase, 'horasCat': clase.horasCat, 'neto': clase.neto, 'desc': clase.desc, 'jornada': clase.jornada, 'zona': clase.zona };
            } else {
                clasesUnicas[clave].horasCat += clase.horasCat;
                clasesUnicas[clave].neto += clase.neto;
            };
        };
    });

    const resultados = Object.keys(clasesUnicas).reduce((topDos, clase) => {
        const neto = clasesUnicas[clase].neto;

        if (neto > topDos.primerMaxNeto) {
            topDos.segundoMaxClase = topDos.primerMaxClase;
            topDos.segundoMaxNeto = topDos.primerMaxNeto;
            topDos.segundoMaxDesc = topDos.primerMaxDesc;
            topDos.segundoMaxIndiceClase = topDos.primerMaxIndiceClase;
            topDos.segundoMaxJornada = topDos.primerMaxJornada;
            topDos.segundoMaxZona = topDos.primerMaxZona;
            topDos.segundoMaxHorasCat = topDos.primerMaxHorasCat;
            topDos.primerMaxClase = clase;
            topDos.primerMaxNeto = neto;
            topDos.primerMaxDesc = clasesUnicas[clase].desc;
            topDos.primerMaxIndiceClase = clasesUnicas[clase].indiceClase;
            topDos.primerMaxJornada = clasesUnicas[clase].jornada;
            topDos.primerMaxZona = clasesUnicas[clase].zona;
            topDos.primerMaxHorasCat = clasesUnicas[clase].horasCat;
        } else if (neto > topDos.segundoMaxNeto) {
            topDos.segundoMaxClase = clase;
            topDos.segundoMaxNeto = neto;
            topDos.segundoMaxDesc = clasesUnicas[clase].desc;
            topDos.segundoMaxIndiceClase = clasesUnicas[clase].indiceClase;
            topDos.segundoMaxJornada = clasesUnicas[clase].jornada;
            topDos.segundoMaxZona = clasesUnicas[clase].zona;
            topDos.segundoMaxHorasCat = clasesUnicas[clase].horasCat;
        }

        return topDos;
    }, {
        primerMaxClase: '',
        primerMaxNeto: 0.0,
        primerMaxDesc: 1.0,
        primerMaxIndiceClase: 0.0,
        primerMaxJornada: 0.0,
        primerMaxZona: 0.0,
        primerMaxHorasCat: 0.0,
        segundoMaxClase: '',
        segundoMaxNeto: 0.0,
        segundoMaxDesc: 1.0,
        segundoMaxIndiceClase: 0.0,
        segundoMaxJornada: 0.0,
        segundoMaxZona: 0.0,
        segundoMaxHorasCat: 0.0
    });

    const clase1 = resultados.primerMaxClase;
    const desc1 = 1 * resultados.primerMaxDesc;
    const indiceClase1 = resultados.primerMaxIndiceClase;
    const jornada1 = resultados.primerMaxJornada;
    const zona1 = resultados.primerMaxZona;
    let horasCat1 = 2;
    if (clase1 === '191') {
        horasCat1 = 24;
    } else if (clase1 === '192') {
        horasCat1 = 30;
    };
    const clase2 = resultados.segundoMaxClase;
    const desc2 = 1 * resultados.segundoMaxDesc;
    const indiceClase2 = resultados.segundoMaxIndiceClase;
    const jornada2 = resultados.segundoMaxJornada;
    const zona2 = resultados.segundoMaxZona;
    let horasCat2 = 2;
    if (clase2 === '191') {
        horasCat2 = 24;
    } else if (clase2 === '192') {
        horasCat2 = 30;
    };

    let n = 1;
    if (desc1 > 0 && desc2 > 0 && desc1 < 1 && desc2 < 1) {
        n = 2;
    };
    const blancoNeto = [
        (1 - desc1) * DATOS.datosSalario.basico1.valor * indiceClase1 * horasCat1 *
        (1 + DATOS.datosSalario.jornadaExt624.valor * jornada1) * (1 + 1 * zona1 + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor),
        1 * (1 - desc2) * DATOS.datosSalario.basico1.valor * indiceClase2 * horasCat2 *
        (1 + DATOS.datosSalario.jornadaExt624.valor * jornada2) * (1 + 1 * zona2 + 1 * DATOS.datosSelect.antiguedad.valor + 1 * DATOS.datosSalario.ayMatDidac62.valor)
    ];

    const sdmng2 = 2 * DATOS.datosSalario.sdmng.valor;
    const sumaItemsConstantes1 = (1 - desc1) * (1 * DATOS.datosSalario.adRemDoc193.valor + 1 * DATOS.datosSalario.plusRem603.valor + 1 * DATOS.datosSalario.plusRef625.valor + 1 * DATOS.datosSalario.adRemun2Cargo629.valor) +
        (2 * DATOS.datosSalario.asigEspLey140.valor + 2 * DATOS.datosSalario.compProv171.valor + 2 * DATOS.datosSalario.conectNac609.valor - DATOS.datosSalario.segVida210.valor);
    const sumaItemsConstantes2 = (1 - desc2) * (1 * DATOS.datosSalario.adRemDoc193.valor + 1 * DATOS.datosSalario.plusRem603.valor + 1 * DATOS.datosSalario.plusRef625.valor + 1 * DATOS.datosSalario.adRemun2Cargo629.valor) +
        (2 * DATOS.datosSalario.asigEspLey140.valor + 2 * DATOS.datosSalario.compProv171.valor + 2 * DATOS.datosSalario.conectNac609.valor) * (n - 1);
    let sumaTope = sdmng2 - (sumaItemsConstantes1 + blancoNeto[0] + sumaItemsConstantes2 + blancoNeto[1]) / n;

    let horasCat1Cargo = resultados.primerMaxHorasCat;
    let horasCat2Cargo = resultados.segundoMaxHorasCat;
    if (clase1 === '191' && clase2 === '' && horasCat1Cargo > 24) {
        horasCat1Cargo = 24;
    } else if (clase1 === '192' && clase2 === '' && horasCat1Cargo > 30) {
        horasCat1Cargo = 30;
    } else if (clase2 === '191' && horasCat2Cargo > 24) {
        horasCat2Cargo = 24;
    } else if (clase2 === '192' && horasCat2Cargo > 30) {
        horasCat2Cargo = 30;
    };

    let factorHc = 1;
    if (clase1 === '191' && clase2 === '') {
        factorHc = (horasCat1Cargo - 12) / 12;
    } else if (clase1 === '192' && clase2 === '') {
        factorHc = (horasCat1Cargo - 15) / 15;
    } else if (clase2 === '191') {
        factorHc = (horasCat2Cargo - 12) / 12;
    } else if (clase2 === '192') {
        factorHc = (horasCat2Cargo - 12) / 15;
    };
    let suma168 = sumaTope * factorHc;
    if (sumaCargos <= 1 || suma168 < 0) {
        suma168 = 0.0;
    };

    return suma168;
};



