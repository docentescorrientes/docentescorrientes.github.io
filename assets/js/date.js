export default function dateGeneral() {
    // El valor de 1 (una) Canasta Básica Total tipo 2 según INDEC https://www.argentina.gob.ar/subsidios/canasta (valores a mediado del mes estan publicados)
    var canastaBasica = {
        2023: [163538.68, 177062.87, 191228.05, 203360.69, 217915.79, 232426.83, 248962.01, 284686.95, 319422.04, 345295.45, 390456.32, 495798.32],
        2024: [596823.18, 690.900, '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
        2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    },
        /* El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023 
        (dolar blue cotización los primeros días del mes)*/
        dolarBlue = {
            2023: [342, 381, 375, 395, 469, 480, 495, 560, 735, 800, 915, 955],
            2024: [1005, 1195, 1030, '---', '---', '---', '---', '---', '---', '---', '---',],
            2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
        },
        // El valor de la inflación IPC Nacional https://www.economia.gob.ar/datos/ (valores a mediado del mes estan publicados)
        inflacion = {
            2023: [6.02787356638426, 6.62772168092709, 7.67523984978356, 8.4, 7.8, 6.0, 6.3, 12.44163772869, 12.7, 8.31, 12.81, 25.5],
            2024: [20.6, 13.2, '---', '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
        },
        // Paritarias Nacionales Salario Docente Mínimo Nacional Garantizado (SDMNG)
        sdmng = {
            2023: [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000],
            2024: [250000, 250000, 250000, '---', '---', '---', '---', '---', '---', '---', '---', '---'],
            2025: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
        };
    //End Datos Informativos
    const date = { 'canastaBasica': canastaBasica, 'dolarBlue': dolarBlue, 'inflacion': inflacion, 'sdmng': sdmng };
    return date;
};
