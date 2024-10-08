// Datos Variables 2023,2024
function buscarDataMes(anoSelect, mesSelect) {
    let basico1, salarioFam3, ayudEscolar, zona36, antiguedad37, ayMatDidac62, asigEspLey140, sdmng, progNacCompDoc168,
        compProv171, adRemDoc193, plusRem603, conectNac609, bono622, jornadaExt624, plusRef625, adRemun2Cargo629,
        complDocPcial632, segVida210, obraSocial212;

    if (anoSelect === '2023') {
        switch (mesSelect) {
            case "0":
                basico1 = 29036.75,
                    salarioFam3 = 2 * 7500.0,
                    ayudEscolar = 2 * 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 7350.0,
                    sdmng = 87000.0,  //Salario Docente Mínimo Nacional Garantizado
                    progNacCompDoc168 = 0.0,
                    compProv171 = 25500.0,
                    adRemDoc193 = 0.0,
                    plusRem603 = 20650.0 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 50000.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 10000.0 * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 376.2,
                    obraSocial212 = 0.05;
                break;
            case "1":
                basico1 = 29036.75,
                    salarioFam3 = 7500.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 7350.0,
                    sdmng = 90338.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 25500.0,
                    adRemDoc193 = 0.0,
                    plusRem603 = 20650.0 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 10000.0 * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 376.2 + 56.43,
                    obraSocial212 = 0.05;
                break;
            case "2":
                basico1 = 29036.75 + 10000.0,
                    salarioFam3 = 7500.0 + 2500.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 7350.0 + 3086.0,
                    sdmng = 130000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 25500.0,
                    adRemDoc193 = 0.0,
                    plusRem603 = (20650.0 + 7000.0) * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = (10000.0 + 5000.0) * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 432.63,
                    obraSocial212 = 0.05;
                break;
            case "3":
                basico1 = 39036.75 + 6000.0,
                    salarioFam3 = 10000.0 + 5000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 10436.0,
                    sdmng = 130000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 25500.0,
                    adRemDoc193 = (0.0 + 23500.0) * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 15000.0 * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 432.63,
                    obraSocial212 = 0.05;
                break;
            case "4":
                basico1 = 45036.75 + 4500.0,
                    salarioFam3 = 15000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 10436.0, // 30HC
                    sdmng = 130000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 25500.0,
                    adRemDoc193 = (23500.0 + 10000.0) * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 15000.0 * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 432.63,
                    obraSocial212 = 0.05;
                break;
            case "5-SAC":
                basico1 = 49536.75 * 0.5,
                    salarioFam3 = 0.0,
                    ayudEscolar = 0.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 0.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 0.0,
                    adRemDoc193 = 33500.0 * (4 / 3) * 0.5,
                    plusRem603 = 27650.0 * (4 / 3) * 0.5,
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 15000.0 * (4 / 3) * 0.5,
                    adRemun2Cargo629 = 0.0 * 0.5,
                    complDocPcial632 = 0.0 * (4 / 3) * 0.5,
                    segVida210 = 0.0,
                    obraSocial212 = 0.05;
                break;
            case "5":
                basico1 = 49536.75,
                    salarioFam3 = 15000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 10436.0 + 2000.0,
                    sdmng = 145000.0,
                    progNacCompDoc168 = 0, //se implementa junio 2023
                    compProv171 = 25500.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 15000.0 * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 432.63 + 64.89,
                    obraSocial212 = 0.05;
                break;
            case "6":
                basico1 = 49536.75 + 10000.0,
                    salarioFam3 = 15000.0 + 5000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 12436.0 + 4014.0,
                    sdmng = 145000.0 + 20000.0,
                    progNacCompDoc168 = 0,
                    compProv171 = 25500.0 + 5000.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 20000.0,
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 497.52,
                    obraSocial212 = 0.05;
                break;
            case "7":
                basico1 = 59536.75,
                    salarioFam3 = 20000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 165000.0,
                    progNacCompDoc168 = 0,
                    compProv171 = 30500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 27650 * (4 / 3),
                    conectNac609 = 4750.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 15000.0 * (4 / 3),
                    adRemun2Cargo629 = 0.0,
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 497.52,
                    obraSocial212 = 0.05;
                break;
            case "8":
                basico1 = 59536.75 + 7000.0,
                    salarioFam3 = 20000.0 + 2000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 200000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 30500.0 + 13000.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 27650 * (4 / 3),
                    conectNac609 = 4750.0 + 7500.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = (15000.0 + 10000.0) * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),   //se implementa
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 656.73,
                    obraSocial212 = 0.05;
                break;
            case "9":
                basico1 = 66536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 220000.0,
                    progNacCompDoc168 = 0,
                    compProv171 = 43500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 27650 * (4 / 3),
                    conectNac609 = 12250.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 25000 * (4 / 3),
                    adRemun2Cargo629 = 10000 * (4 / 3),
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 656.73,
                    obraSocial212 = 0.05;
                break;
            case "10":
                basico1 = 66536.75 + 7000.0,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 220000.0,
                    progNacCompDoc168 = 0,
                    compProv171 = 43500.0 + 13000.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 12250.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 25000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 735.54,
                    obraSocial212 = 0.05;
                break;
            case "11-SAC":
                basico1 = 73536.75 * 0.5,
                    salarioFam3 = 0.0,
                    ayudEscolar = 0.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 0.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 0.0,
                    adRemDoc193 = 33500.0 * (4 / 3) * 0.5,
                    plusRem603 = 27650.0 * (4 / 3) * 0.5,
                    conectNac609 = 0.0,
                    bono622 = 50000.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 25000.0 * (4 / 3) * 0.5,
                    adRemun2Cargo629 = 10000.0 * (4 / 3) * 0.5,
                    complDocPcial632 = 0.0 * (4 / 3) * 0.5,
                    segVida210 = 0.0,
                    obraSocial212 = 0.05;
                break;
            case "11":
                basico1 = 73536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0,
                    compProv171 = 56500.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 12250.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 25000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 735.54,
                    obraSocial212 = 0.05;
                break;
        };
    } else if (anoSelect === '2024') {
        switch (mesSelect) {
            case "0":
                basico1 = 73536.75,
                    salarioFam3 = 2 * 22000.0,
                    ayudEscolar = 2 * 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0,
                    compProv171 = 56500.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 27650.0 * (4 / 3),
                    conectNac609 = 12250.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 25000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "1":
                basico1 = 73536.75 + 15000.0,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 56500.0 + 35000.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = (27650.0 + 5850.0) * (4 / 3),
                    conectNac609 = 12250.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = (25000.0 + 5000.0) * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 0.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "2":
                basico1 = 88536.75 + 9000.0,
                    salarioFam3 = 22000.0 + 8000.0, //45000.0 asigHijoDiscap
                    ayudEscolar = 60.0 + 20000.0 + 100000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 16450.0 * 0.0, // Desaparece Fonid
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 91500.0 + 50000.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 33500 * (4 / 3),
                    conectNac609 = 12250.0 * 0.0, // Desaparece Fonid
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 30000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000 * (4 / 3),
                    complDocPcial632 = 28700.0 * (4 / 3), // Aparece en lugar del Fonid
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "3":
                basico1 = 97536.75 + 15000.0,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 141500.0 + 40000.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 33500.0 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 30000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 28700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "4":
                basico1 = 112536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 181500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 33500 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 30000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 28700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "5-SAC":
                basico1 = 112536.75 * 0.5,
                    salarioFam3 = 0.0,
                    ayudEscolar = 0.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 0.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 0.0,
                    adRemDoc193 = 33500.0 * (4 / 3) * 0.5,
                    plusRem603 = 33500.0 * (4 / 3) * 0.5,
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 30000.0 * (4 / 3) * 0.5,
                    adRemun2Cargo629 = 10000.0 * (4 / 3) * 0.5,
                    complDocPcial632 = 28700.0 * (4 / 3) * 0.5,
                    segVida210 = 0.0,
                    obraSocial212 = 0.05;
                break;
            case "5":
                basico1 = 112536.75 + 15000.0,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 181500.0 + 35000.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = (33500.0 + 13500.0) * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = (30000.0 + 12000.0) * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = (28700.0 + 10000.0) * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "6":
                basico1 = 127536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 216500.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = 47000.0 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 42000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 38700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "7":
                basico1 = 127536.75 + 15000.0,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 216500.0 + 35000.0,
                    adRemDoc193 = 33500.0 * (4 / 3),
                    plusRem603 = (47000.0 + 8000.0) * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = (42000.0 + 8000.0) * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = (38700.0 + 10000.0) * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "8":
                basico1 = 142536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 251500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 55000.0 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 50000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 48700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "9":
                basico1 = 142536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 251500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 55000.0 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 50000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 48700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "10":
                basico1 = 142536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 251500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 55000.0 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 50000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 48700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
            case "11-SAC":
                basico1 = 142536.75 * 0.5,
                    salarioFam3 = 0.0,
                    ayudEscolar = 0.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 0.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 0.0,
                    adRemDoc193 = 33500.0 * (4 / 3) * 0.5,
                    plusRem603 = 55000.0 * (4 / 3) * 0.5,
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25,
                    plusRef625 = 50000.0 * (4 / 3) * 0.5,
                    adRemun2Cargo629 = 10000.0 * (4 / 3) * 0.5,
                    complDocPcial632 = 48700.0 * (4 / 3) * 0.5,
                    segVida210 = 0.0,
                    obraSocial212 = 0.05;
                break;
            case "11":
                basico1 = 142536.75,
                    salarioFam3 = 22000.0,
                    ayudEscolar = 60.0 + 20000.0,
                    zona36 = basico1,
                    antiguedad37 = basico1,
                    ayMatDidac62 = 0.1,
                    asigEspLey140 = 0.0,
                    sdmng = 250000.0,
                    progNacCompDoc168 = 0.0,
                    compProv171 = 251500.0,
                    adRemDoc193 = 33500 * (4 / 3),
                    plusRem603 = 55000.0 * (4 / 3),
                    conectNac609 = 0.0,
                    bono622 = 0.0,
                    jornadaExt624 = 0.25 * 0.0,
                    plusRef625 = 50000.0 * (4 / 3),
                    adRemun2Cargo629 = 10000.0 * (4 / 3),
                    complDocPcial632 = 48700.0 * (4 / 3),
                    segVida210 = 809.09,
                    obraSocial212 = 0.05;
                break;
        };
    };
    const dataMes = {
        'basico1': basico1, 'salarioFam3': salarioFam3, 'ayudEscolar': ayudEscolar, 'zona36': zona36, 'antiguedad37': antiguedad37,
        'ayMatDidac62': ayMatDidac62, 'asigEspLey140': asigEspLey140, 'sdmng': sdmng, 'progNacCompDoc168': progNacCompDoc168, 'compProv171': compProv171,
        'adRemDoc193': adRemDoc193, 'plusRem603': plusRem603, 'conectNac609': conectNac609, 'bono622': bono622, 'jornadaExt624': jornadaExt624,
        'plusRef625': plusRef625, 'adRemun2Cargo629': adRemun2Cargo629, 'complDocPcial632': complDocPcial632, 'segVida210': segVida210, 'obraSocial212': obraSocial212
    };
    return dataMes;
};
