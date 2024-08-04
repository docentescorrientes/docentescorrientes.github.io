export default function dateGeneral() {
    // El valor de 1 (una) Canasta Básica Total Hogar 2 según INDEC https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149 (ver informe cuadro 2)
    var canastaBasica = {
        2023: [163538.68, 177062.87, 191228.05, 203360.69, 217915.79, 232426.83, 248962.01, 284686.95, 319422.04, 345295.45, 390456.32, 495798.32],
        2024: [596823.18, 690901.57, 773385.1, 828158.19, 851350.87, 873168.77, '---', '---', '---', '---', '---', '---'],
        2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    },
        // El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023 (dolar blue cotización fin del mes)*/
        dolarBlue = {
            2023: [382, 376, 395, 469, 491.5, 495, 550.5, 737.5, 800, 917.5, 930, 1012.5],
            2024: [1205, 1037.5, 1015, 1042.5, 1227.5, 1385, 1375, '---', '---', '---', '---', '---',],
            2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
        },
        // El valor de la inflación IPC NEA https://www.economia.gob.ar/datos/ (valores a mediado del mes estan publicados)
        inflacion = {
            2023: [5.65, 7.76, 6.25, 8.34, 7.29, 6.61, 6.26, 14.18, 12.95, 7.40, 12.83, 28.35],
            2024: [19.50, 10.09, 10.35, 6.29, 3.70, 4.38, '---', '---', '---', '---', '---', '---'],
            2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
        },
        // Paritarias Nacionales Salario Docente Mínimo Nacional Garantizado (SDMNG)
        sdmng = {
            2023: [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000],
            2024: [250000, 250000, 250000, 250000, 250000, 250000, 250000, '---', '---', '---', '---', '---'],
            2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
        };
    //End Datos Informativos
    const date = { 'canastaBasica': canastaBasica, 'dolarBlue': dolarBlue, 'inflacion': inflacion, 'sdmng': sdmng };
    return date;
};

/* El valor de la inflación IPC Nacional 
    2023: [6.03, 6.63, 7.68, 8.40, 7.77, 5.95, 6.34, 12.44, 12.75, 8.30, 12.81, 25.47],
    2024: [20.61, 13.24, , 11.01, 8.83, , 4.20, 4.58, '---', '---', '---', '---'], */