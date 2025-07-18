export function dateGral() {
    //1) Nacional Canasta Básica Total (Pobreza) Hogar 2 según INDEC https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149 (ver informe cuadro 2)
    const canastaBTNac = {
        2023: [163538.68, 177062.87, 191228.05, 203360.69, 217915.79, 232426.83, 248962.01, 284686.95, 319422.04, 345295.45, 390456.32, 495798.32],
        2024: [596823.18, 690901.57, 773385.1, 828158.19, 851350.87, 873168.77, 900647.65, 939886.66, 964619.82, 986586.32, 1004466.22, 1024435.21],
        2025: [1033715.62, 1057923.42, 1100266.99, 1110063.43, 1110623.65, 1128398.01, '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    // Nacional Canasta Básica Alimentaria (Indigencia) Hogar 2 según INDEC https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149 (ver informe cuadro 2)
    const canastaBANac = {
        2023: [72043.47, 80483.13, 87719.29, 94148.47, 99052.64, 104227.28, 111642.16, 130590.35, 147880.57, 160602.53, 185050.40, 240678.80],
        2024: [285561.33, 322851.20, 358048.65, 373044.24, 386977.66, 393319.27, 405697.13, 421473.84, 428719.92, 434619.53, 439239.58, 449313.69],
        2025: [453384.05, 468107.72, 495615.76, 502291.15, 500280.92, 506008.08, '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    // El valor de la inflación IPC Nacional https://www.economia.gob.ar/datos/ (valores a mediado del mes estan publicados)
    const inflacionNac = {
        2023: [6.03, 6.63, 7.68, 8.40, 7.77, 5.95, 6.34, 12.44, 12.75, 8.30, 12.81, 25.47],
        2024: [20.61, 13.24, 11.01, 8.83, 4.20, 4.58, 4.0, 4.2, 3.5, 2.7, 2.4, 2.7],
        2025: [2.20, 2.4, 3.7, 2.8, 1.5, 1.6, '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    //2) NEA Canasta Básica Total (Pobreza) según IBP https://www.facebook.com/profile.php?id=100063494113015
    const canastaBTNea = {
        2023: [152724.78, 161375.05, 169869.21, 185673.06, 202591.33, 208488.39, 231913.89, 285939.07, 297330.52, 319882.37, 366403.87, 473565.32],
        2024: [532520.07, 581933.0, 653898.18, 701288.93, 736205.39, 752534.2, 790910.85, 822234.27, 841358.62, 885407.08, 852908.3, 905653.64],
        2025: [861443.55, 905038.64, 926655.27, 966341.61, 969276.81, '---', '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    // El valor de 1 (una) Canasta Básica Alimentaria (Indigencia) según IBP https://www.facebook.com/profile.php?id=100063494113015

    const canastaBANea = {
        2023: [67279.64, 71090.33, 75163.37, 83261.46, 90848.13, 93492.55, 103997.26, 128283.8, 133332.07, 148093.69, 170280.87, 224438.54],
        2024: [252378.18, 275821.33, 305559.9, 324670.8, 331624.04, 342061.0, 356266.15, 370375.8, 375606.53, 393514.26, 375730.53, 397216.51],
        2025: [377826.12, 396946.76, 406427.75, 423834.04, 425121.41, '---', '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    // El valor de la inflación IPC NEA https://www.economia.gob.ar/datos/ (valores a mediado del mes estan publicados)
    const inflacionNea = {
        2023: [5.65, 7.76, 6.25, 8.34, 7.29, 6.61, 6.26, 14.18, 12.95, 7.40, 12.83, 28.35],
        2024: [19.50, 10.9, 10.3, 6.3, 3.7, 4.4, 4.6, 4.4, 3.3, 2.6, 1.8, 2.9],
        2025: [2.50, 1.9, 3.1, 2.7, 1.3, 1.1, '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    // El valor del dólar blue https://www.dolarito.ar/cotizaciones-historicas/dolar/informal/2023/cotizacion-historica-del-dolar-informal-a%C3%B1o-2023 (dolar blue cotización fin del mes)*/
    const dolarBlue = {
        2023: [382, 376, 395, 469, 491.5, 495, 550.5, 737.5, 800, 917.5, 930, 1012.5],
        2024: [1205, 1037.5, 1015, 1042.5, 1227.5, 1385, 1375, 1392.5, 1307.5, 1217.5, 1190, 1095],
        2025: [1217.5, 1220, 1227.5, 1320.0, 1200, '---', '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };
    // Paritarias Nacionales Salario Docente Mínimo Nacional Garantizado (SDMNG)
    const sdmng = {
        2023: [87000, 90338, 130000, 130000, 130000, 145000, 165000, 165000, 200000, 220000, 220000, 250000],
        2024: [250000, 250000, 250000, 380000, 400000, 400000, 420000, 420000, 420000, 420000, 420000, 420000],
        2025: [420000, 500000, 500000, 500000, 500000, '---', '---', '---', '---', '---', '---', '---'],
        2026: ['---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---', '---']
    };

    return {
        canastaBTNac,
        canastaBANac,
        inflacionNac,
        canastaBTNea,
        canastaBANea,
        inflacionNea,
        dolarBlue,
        sdmng
    };
};

export function obtenerUltimoValorValido(datos, clave) {
    if (!datos[clave]) {
        console.error(`La clave '${clave}' no existe en los datos.`);
        return null;
    }

    const años = Object.keys(datos[clave]).sort((a, b) => b - a);

    for (const año of años) {
        const valores = datos[clave][año];
        for (let i = valores.length - 1; i >= 0; i--) {
            if (valores[i] !== "---") {
                return { valor: valores[i], año: parseInt(año), posicion: i };
            }
        }
    }

    return null; // Si no se encuentra ningún valor válido
};

export function calcularInflacionAcumulada(datos, clave) {
    if (!datos[clave]) {
        console.error(`La clave '${clave}' no existe en los datos.`);
        return null;
    }

    const inflacionAcumulada = {};

    for (const año in datos[clave]) {
        const valores = datos[clave][año];
        let acumulada = 1;

        for (const valor of valores) {
            if (valor !== "---") {
                acumulada *= (1 + valor / 100);
            }
        }

        inflacionAcumulada[año] = (acumulada - 1) * 100;
    }

    const anioActual = new Date().getFullYear();
    let resultado = [];
    let i = 0;

    while (resultado.length < 2) {
        let anio = anioActual - i;
        if (inflacionAcumulada[anio] !== undefined && inflacionAcumulada[anio] !== 0) {
            resultado.push({ anio, valor: inflacionAcumulada[anio] });
        }
        i += 1;
    }

    return resultado;
};
