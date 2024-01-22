function buscarDataClase(clase) {
    for (let i = 0; i < clases.length; i++) {
        if (clases[i].clase === clase) {
            return clases[i];
        };
    };
    return null;
};

function actualizar1Texto() {
    const claseSelect = document.getElementById("clase1Select").value;
    const resultado = buscarDataClase(parseInt(claseSelect));

    if (resultado) {
        const cargoTexto = resultado.cargo;
        const categoriaTexto = resultado.categoria;
        const indiceClaseTexto = resultado.indiceClase;

        const cargoResultado = `Cargo: ${cargoTexto}.`;
        document.getElementById("cargoClase1Select").innerHTML = cargoResultado;

        const categoriaResultado = `Categoria: ${categoriaTexto}`;
        document.getElementById("categoriaClase1Select").innerHTML = categoriaResultado;
        
        const claseResultado = `Índice de Clase: ${indiceClaseTexto}`;
        document.getElementById("claseClase1Select").innerHTML = claseResultado;
        
    } else {
        document.getElementById("cargoClase1Select").innerHTML = "Número de clase no encontrado.<br> Asegurate de revisar la clase en tu recibo.";
        document.getElementById("categoriaClase1Select").innerHTML = "Categoría: -----";
        document.getElementById("claseClase1Select").innerHTML = "Índice de Clase: -----";
    }
}
document.getElementById("clase1Select").addEventListener("input", function(){
    actualizar1Texto()
    document.getElementById("card1Div").hidden = false;
});

function actualizar2Texto() {
    const claseSelect = document.getElementById("clase2Select").value;
    const resultado = buscarDataClase(parseInt(claseSelect));

    if (resultado) {
        const cargoTexto = resultado.cargo;
        const categoriaTexto = resultado.categoria;
        const indiceClaseTexto = resultado.indiceClase;

        const cargoResultado = `Cargo: ${cargoTexto}.`;
        document.getElementById("cargoClase2Select").innerHTML = cargoResultado;

        const categoriaResultado = `Categoria: ${categoriaTexto}`;
        document.getElementById("categoriaClase2Select").innerHTML = categoriaResultado;
        
        const claseResultado = `Índice de Clase: ${indiceClaseTexto}`;
        document.getElementById("claseClase2Select").innerHTML = claseResultado;
        
    } else {
        document.getElementById("cargoClase2Select").innerHTML = "Número de clase no encontrado.<br> Asegurate de revisar la clase en tu recibo.";
        document.getElementById("categoriaClase2Select").innerHTML = "Categoría: -----";
        document.getElementById("claseClase2Select").innerHTML = "Índice de Clase: -----";
    }
}
document.getElementById("clase2Select").addEventListener("input", function(){
    actualizar2Texto()
    document.getElementById("card2Div").hidden = false;
});



const clase20 = { 'clase': 20, 'cargo': 'Presidente', 'categoria': 5, 'indiceClase': 4819, 'indiceBasico': 4819 / 1400, 'nivel': '','apjub':0.185 },
clase26 = { 'clase': 26, 'cargo': 'Secretario General', 'categoria': 5, 'indiceClase': 4329, 'indiceBasico': 4329 / 1400, 'nivel': '','apjub':0.185 },
clase27 = { 'clase': 27, 'cargo': 'Vocal', 'categoria': 5, 'indiceClase': 4609, 'indiceBasico': 4609 / 1400, 'nivel': '','apjub':0.185 },
clase101 = { 'clase': 101, 'cargo': 'Director de Nivel (General)', 'categoria': 5, 'indiceClase': 4609, 'indiceBasico': 4609 / 1400, 'nivel': '','apjub':0.185 },
clase102 = { 'clase': 102, 'cargo': 'Supervisor General', 'categoria': 5, 'indiceClase': 4248, 'indiceBasico': 4248 / 1400, 'nivel': '','apjub':0.185 },
clase103 = { 'clase': 103, 'cargo': 'Jefe de Normatización', 'categoria': 5, 'indiceClase': 4329, 'indiceBasico': 4329 / 1400, 'nivel': '','apjub':0.185 },
clase104 = { 'clase': 104, 'cargo': 'Secretario Técnico', 'categoria': 5, 'indiceClase': 4329, 'indiceBasico': 4329 / 1400, 'nivel': '','apjub':0.185 },
clase105 = { 'clase': 105, 'cargo': 'Supervisor General', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '','apjub':0.185 },
clase107 = { 'clase': 107, 'cargo': 'Rector de Educación Superior', 'categoria': 5, 'indiceClase': 3162, 'indiceBasico': 3162 / 1400, 'nivel': '','apjub':0.185 },
clase108 = { 'clase': 108, 'cargo': 'Vicerrector de Educación Superior', 'categoria': 5, 'indiceClase': 2604, 'indiceBasico': 2604 / 1400, 'nivel': '','apjub':0.185 },
clase109 = { 'clase': 109, 'cargo': 'Rector de Nivel Secundario de 1º Categoría', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '','apjub':0.185 },
clase110 = { 'clase': 110, 'cargo': 'Regente Superior', 'categoria': 5, 'indiceClase': 2009, 'indiceBasico': 2009 / 1400, 'nivel': '','apjub':0.185 },
clase111 = { 'clase': 111, 'cargo': 'Rector de Nivel Secundario de 2º Categoría', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase112 = { 'clase': 112, 'cargo': 'Rector de Nivel Secundario de 3º Categoría', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '','apjub':0.185 },
clase113 = { 'clase': 113, 'cargo': 'Director de Enseñanza Agraria de 3º Categoría', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '','apjub':0.185 },
clase114 = { 'clase': 114, 'cargo': 'Vicerrector de Nivel Secundario de 1º Categoría', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase115 = { 'clase': 115, 'cargo': 'Vicerrector de Nivel Secundario de 2º Categoría', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '','apjub':0.185 },
clase116 = { 'clase': 116, 'cargo': 'Vice-Director de 1º Centros Deportivos', 'categoria': 5, 'indiceClase': 1848, 'indiceBasico': 1848 / 1400, 'nivel': '','apjub':0.185 },
clase117 = { 'clase': 117, 'cargo': 'Vice-Director de 2º Centros Deportivos', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '','apjub':0.185 },
clase118 = { 'clase': 118, 'cargo': 'Vicerrector de Nivel Secundario de 3º Categoría', 'categoria': 5, 'indiceClase': 1915, 'indiceBasico': 1915 / 1400, 'nivel': '','apjub':0.185 },
clase119 = { 'clase': 119, 'cargo': 'Regente del Dpto de Aplicación de 1º', 'categoria': 5, 'indiceClase': 2021, 'indiceBasico': 2021 / 1400, 'nivel': '','apjub':0.185 },
clase120 = { 'clase': 120, 'cargo': 'Jefe General de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '','apjub':0.185 },
clase121 = { 'clase': 121, 'cargo': 'Regente del Dpto de Aplicación de 2º', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '','apjub':0.185 },
clase122 = { 'clase': 122, 'cargo': 'Subregente del Departamento de Aplicación', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '','apjub':0.185 },
clase123 = { 'clase': 123, 'cargo': 'Secretario de Educación Superior', 'categoria': 5, 'indiceClase': 1674, 'indiceBasico': 1674 / 1400, 'nivel': '','apjub':0.185 },
clase124 = { 'clase': 124, 'cargo': 'Secretario de Nivel Secundario de 1º', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '','apjub':0.185 },
clase125 = { 'clase': 125, 'cargo': 'Director de 1º Centros Deportivos', 'categoria': 5, 'indiceClase': 2310, 'indiceBasico': 2310 / 1400, 'nivel': '','apjub':0.185 },
clase126 = { 'clase': 126, 'cargo': 'Secretario de Nivel Secundario de 2º', 'categoria': 5, 'indiceClase': 1386, 'indiceBasico': 1386 / 1400, 'nivel': '','apjub':0.185 },
clase127 = { 'clase': 127, 'cargo': 'Director de 2º Centros Deportivos', 'categoria': 5, 'indiceClase': 1961, 'indiceBasico': 1961 / 1400, 'nivel': '','apjub':0.185 },
clase128 = { 'clase': 128, 'cargo': 'Director de 3º Centros Deportivos', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '','apjub':0.185 },
clase129 = { 'clase': 129, 'cargo': 'Secretario de Nivel Secundario de 3º', 'categoria': 5, 'indiceClase': 1270, 'indiceBasico': 1270 / 1400, 'nivel': '','apjub':0.185 },
clase130 = { 'clase': 130, 'cargo': 'Prosecretario de Educación Superior', 'categoria': 5, 'indiceClase': 1450, 'indiceBasico': 1450 / 1400, 'nivel': '','apjub':0.185 },
clase131 = { 'clase': 131, 'cargo': 'Jefe de Sección de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1540, 'indiceBasico': 1540 / 1400, 'nivel': '','apjub':0.2 },
clase132 = { 'clase': 132, 'cargo': 'Maestro de Jardín de Infantes', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase133 = { 'clase': 133, 'cargo': 'Bedel de Educación Superior', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.185 },
clase134 = { 'clase': 134, 'cargo': 'Maestra de Grado Dpto Aplicación', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase135 = { 'clase': 135, 'cargo': 'Auxiliar de Dirección', 'categoria': 5, 'indiceClase': 1070, 'indiceBasico': 1070 / 1400, 'nivel': '','apjub':0.185 },
clase136 = { 'clase': 136, 'cargo': 'Maestro de Sección Cultural', 'categoria': 5, 'indiceClase': 1155, 'indiceBasico': 1155 / 1400, 'nivel': '','apjub':0.2 },
clase137 = { 'clase': 137, 'cargo': 'Maestro Secretario', 'categoria': 5, 'indiceClase': 1288, 'indiceBasico': 1288 / 1400, 'nivel': '','apjub':0.185 },
clase138 = { 'clase': 138, 'cargo': 'Maestro de Enseñanza Práctica ', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase139 = { 'clase': 139, 'cargo': 'Maestro Especial', 'categoria': 5, 'indiceClase': 1205, 'indiceBasico': 1205 / 1400, 'nivel': '','apjub':0.2 },
clase140 = { 'clase': 140, 'cargo': 'Jefe de Laboratorio', 'categoria': 5, 'indiceClase': 1500, 'indiceBasico': 1500 / 1400, 'nivel': '','apjub':0.2 },
clase141 = { 'clase': 141, 'cargo': 'Maestro Ayudante de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 971, 'indiceBasico': 971 / 1400, 'nivel': '','apjub':0.2 },
clase142 = { 'clase': 142, 'cargo': 'Vice-Director de 3º Centros Deportivos', 'categoria': 5, 'indiceClase': 1617, 'indiceBasico': 1617 / 1400, 'nivel': '','apjub':0.185 },
clase143 = { 'clase': 143, 'cargo': 'Jefe de Preceptores de Nivel Secundario de 1º', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.185 },
clase144 = { 'clase': 144, 'cargo': 'Bibliotecario Nivel Medio', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.185 },
clase146 = { 'clase': 146, 'cargo': 'Subjefe de Preceptores de Nivel Secundario', 'categoria': 5, 'indiceClase': 1330, 'indiceBasico': 1330 / 1400, 'nivel': '','apjub':0.185 },
clase147 = { 'clase': 147, 'cargo': 'Jefe de Preceptores de Nivel Secundario de 2º', 'categoria': 5, 'indiceClase': 1330, 'indiceBasico': 1330 / 1400, 'nivel': '','apjub':0.185 },
clase148 = { 'clase': 148, 'cargo': 'Jefe de Preceptores de Nivel Secundario de 3º', 'categoria': 5, 'indiceClase': 1260, 'indiceBasico': 1260 / 1400, 'nivel': '','apjub':0.185 },
clase149 = { 'clase': 149, 'cargo': 'Jefe de Trabajos Prácticos Superior', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.2 },
clase150 = { 'clase': 150, 'cargo': 'Ayudante de Trabajos Prácticos de Educación Superior', 'categoria': 5, 'indiceClase': 962, 'indiceBasico': 962 / 1400, 'nivel': '','apjub':0.2 },
clase151 = { 'clase': 151, 'cargo': 'Ayudante de Clases Prácticas de Nivel Secundario', 'categoria': 5, 'indiceClase': 971, 'indiceBasico': 971 / 1400, 'nivel': '','apjub':0.2 },
clase152 = { 'clase': 152, 'cargo': 'Preceptor de Nivel Secundario', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.185 },
clase153 = { 'clase': 153, 'cargo': 'Regente de 1º', 'categoria': 5, 'indiceClase': 1732, 'indiceBasico': 1732 / 1400, 'nivel': '','apjub':0.185 },
clase154 = { 'clase': 154, 'cargo': 'Regente de 3º', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '','apjub':0.185 },
clase155 = { 'clase': 155, 'cargo': 'Jefe General de Ens. Práctica', 'categoria': 5, 'indiceClase': 1511, 'indiceBasico': 1511 / 1400, 'nivel': '','apjub':0.2 },
clase156 = { 'clase': 156, 'cargo': 'Miembro de Junta (Básico + Ded. Exclusiva)', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '','apjub':0.185 },
clase157 = { 'clase': 157, 'cargo': 'Director de Jardín de Infantes', 'categoria': 5, 'indiceClase': 2633, 'indiceBasico': 2633 / 1400, 'nivel': '','apjub':0.185 },
clase158 = { 'clase': 158, 'cargo': 'Vice director Jardines de Infantes 1ª', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase159 = { 'clase': 159, 'cargo': 'Jefe de Departamento Educación Física', 'categoria': 5, 'indiceClase': 753, 'indiceBasico': 753 / 1400, 'nivel': '','apjub':0.2 },
clase160 = { 'clase': 160, 'cargo': 'Preceptor de Educación Superior', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.185 },
clase161 = { 'clase': 161, 'cargo': 'Bibliotecario de Educación Superior', 'categoria': 5, 'indiceClase': 1450, 'indiceBasico': 1450 / 1400, 'nivel': '','apjub':0.185 },
clase162 = { 'clase': 162, 'cargo': 'Pro-Secretario 3º ', 'categoria': 5, 'indiceClase': 1155, 'indiceBasico': 1155 / 1400, 'nivel': '','apjub':0.185 },
clase163 = { 'clase': 163, 'cargo': 'Sub-Regente de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '','apjub':0.185 },
clase164 = { 'clase': 164, 'cargo': 'Coordinador General de Actividades Prácticas', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '','apjub':0.185 },
clase165 = { 'clase': 165, 'cargo': 'Jefe Sectorial de Trabajos Prácticos', 'categoria': 5, 'indiceClase': 1386, 'indiceBasico': 1386 / 1400, 'nivel': '','apjub':0.185 },
clase166 = { 'clase': 166, 'cargo': 'Instructor', 'categoria': 5, 'indiceClase': 1155, 'indiceBasico': 1155 / 1400, 'nivel': '','apjub':0.185 },
clase167 = { 'clase': 167, 'cargo': 'Técnico P.F. Alfabetización', 'categoria': 5, 'indiceClase': 2425, 'indiceBasico': 2425 / 1400, 'nivel': '','apjub':0.185 },
clase168 = { 'clase': 168, 'cargo': 'Responsable Zonal Plan', 'categoria': 5, 'indiceClase': 2310, 'indiceBasico': 2310 / 1400, 'nivel': '','apjub':0.185 },
clase169 = { 'clase': 169, 'cargo': 'Inspector Médico Sanidad Escolar', 'categoria': 5, 'indiceClase': 1960, 'indiceBasico': 1960 / 1400, 'nivel': '','apjub':0.185 },
clase170 = { 'clase': 170, 'cargo': 'Jefe de Preceptores Superior', 'categoria': 5, 'indiceClase': 1330, 'indiceBasico': 1330 / 1400, 'nivel': '','apjub':0.185 },
clase171 = { 'clase': 171, 'cargo': 'Jefe General de Enseñanza Práctica 2º', 'categoria': 5, 'indiceClase': 1617, 'indiceBasico': 1617 / 1400, 'nivel': '','apjub':0.185 },
clase172 = { 'clase': 172, 'cargo': 'Director de Misión Monotécnica', 'categoria': 5, 'indiceClase': 1501, 'indiceBasico': 1501 / 1400, 'nivel': '','apjub':0.185 },
clase173 = { 'clase': 173, 'cargo': 'Regente de 2º de Enseñanza Práctica', 'categoria': 5, 'indiceClase': 1617, 'indiceBasico': 1617 / 1400, 'nivel': '','apjub':0.185 },
clase175 = { 'clase': 175, 'cargo': 'Jefe de Departamento Educación Secundaria', 'categoria': 5, 'indiceClase': 462, 'indiceBasico': 462 / 1400, 'nivel': '','apjub':0.2 },
clase176 = { 'clase': 176, 'cargo': 'Director de Carrera Educación Superior', 'categoria': 5, 'indiceClase': 558, 'indiceBasico': 558 / 1400, 'nivel': '','apjub':0.185 },
clase191 = { 'clase': 191, 'cargo': 'Profesor de Educación Superior', 'categoria': 7, 'indiceClase': 93.02, 'indiceBasico': 93.02 / 1400, 'nivel': 'Superior','apjub':0.2},
clase192 = { 'clase': 192, 'cargo': 'Profesor de Educación Secundaria', 'categoria': 7, 'indiceClase': 77.01, 'indiceBasico': 77.01 / 1400, 'nivel': 'Medio','apjub':0.2 },
clase302 = { 'clase': 302, 'cargo': 'Sub-Supervisor General', 'categoria': 5, 'indiceClase': 4132, 'indiceBasico': 4132 / 1400, 'nivel': '','apjub':0.185 },
clase303 = { 'clase': 303, 'cargo': 'Director Técnico Docente', 'categoria': 5, 'indiceClase': 3830, 'indiceBasico': 3830 / 1400, 'nivel': '','apjub':0.185 },
clase304 = { 'clase': 304, 'cargo': 'Supervisor Secretario Supervisor General', 'categoria': 5, 'indiceClase': 4050, 'indiceBasico': 4050 / 1400, 'nivel': '','apjub':0.185 },
clase305 = { 'clase': 305, 'cargo': 'Supervisor', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '','apjub':0.185 },
clase307 = { 'clase': 307, 'cargo': 'Maestro Especial Escuela Jornada Extendida', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase308 = { 'clase': 308, 'cargo': 'Coordinador Técnico Docente', 'categoria': 5, 'indiceClase': 3730, 'indiceBasico': 3730 / 1400, 'nivel': '','apjub':0.185 },
clase309 = { 'clase': 309, 'cargo': 'Auxiliar Técnico Docente', 'categoria': 5, 'indiceClase': 1855, 'indiceBasico': 1855 / 1400, 'nivel': '','apjub':0.185 },
clase310 = { 'clase': 310, 'cargo': 'Director de Escuela de Educación Especial de 4º Categoría', 'categoria': 5, 'indiceClase': 2063, 'indiceBasico': 2063 / 1400, 'nivel': '','apjub':0.185 },
clase311 = { 'clase': 311, 'cargo': 'Director de Escuela de Educación Especial de 2º Categoría', 'categoria': 5, 'indiceClase': 2505, 'indiceBasico': 2505 / 1400, 'nivel': '','apjub':0.185 },
clase312 = { 'clase': 312, 'cargo': 'Vicedirector de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 2505, 'indiceBasico': 2505 / 1400, 'nivel': '','apjub':0.185 },
clase313 = { 'clase': 313, 'cargo': 'Director de 1º Categoría Escuela Jornada Extendida', 'categoria': 5, 'indiceClase': 2947, 'indiceBasico': 2947 / 1400, 'nivel': '','apjub':0.185 },
clase314 = { 'clase': 314, 'cargo': 'Director de 2º Categoría Escuela Jornada Extendida-Técnico de Alfabetización', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '','apjub':0.185 },
clase315 = { 'clase': 315, 'cargo': 'Vicedirector de Escuela Jornada Extendida', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '','apjub':0.185 },
clase316 = { 'clase': 316, 'cargo': 'Maestro de Grado Escuela de Jornada Completa (Plan Piloto)', 'categoria': 5, 'indiceClase': 2205, 'indiceBasico': 2205 / 1400, 'nivel': '','apjub':0.2 },
clase317 = { 'clase': 317, 'cargo': 'Maestro de Taller de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase318 = { 'clase': 318, 'cargo': 'Asistente Social', 'categoria': 5, 'indiceClase': 1640, 'indiceBasico': 1640 / 1400, 'nivel': '','apjub':0.185 },
clase319 = { 'clase': 319, 'cargo': 'Maestro de Orientación Laboral', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.2 },
clase320 = { 'clase': 320, 'cargo': 'Director de Escuela de Educación Especial de 1º Categoría-Responsable Zonal', 'categoria': 5, 'indiceClase': 2947, 'indiceBasico': 2947 / 1400, 'nivel': '','apjub':0.185 },
clase321 = { 'clase': 321, 'cargo': 'Secretario Técnico de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '','apjub':0.185 },
clase322 = { 'clase': 322, 'cargo': 'Maestro de Gabinete (Psicólogo, Foniátra, Fonoaudiólogo, Músico Terapéuta, Psicopedagógo, Psicólogo Educacional, Kinesiólogo)', 'categoria': 5, 'indiceClase': 1640, 'indiceBasico': 1640 / 1400, 'nivel': '','apjub':0.2 },
clase323 = { 'clase': 323, 'cargo': 'Maestro de Grado de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '','apjub':0.2 },
clase327 = { 'clase': 327, 'cargo': 'Maestro Especial de Escuela de Educación Especial', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase328 = { 'clase': 328, 'cargo': 'Director de 1º Categoría Escuela Común', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '','apjub':0.185 },
clase329 = { 'clase': 329, 'cargo': 'Director de 2º Categoría Escuela Común', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase330 = { 'clase': 330, 'cargo': 'Director de 3º Categoría Escuela común', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '','apjub':0.185 },
clase331 = { 'clase': 331, 'cargo': 'Director de 4º Categoría Escuela Común (Personal Único)', 'categoria': 5, 'indiceClase': 1915, 'indiceBasico': 1915 / 1400, 'nivel': '','apjub':0.185 },
clase332 = { 'clase': 332, 'cargo': 'Vicedirector Escuela Comun', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase333 = { 'clase': 333, 'cargo': 'Maestro de Grado Escuela Común', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': 'Inicial','apjub':0.2 },
clase334 = { 'clase': 334, 'cargo': 'Maestro de Jardín de Infantes', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase335 = { 'clase': 335, 'cargo': 'Maestro Especial Escuela Común', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.2 },
clase336 = { 'clase': 336, 'cargo': 'Director de 1º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '','apjub':0.185 },
clase337 = { 'clase': 337, 'cargo': 'Director de 2º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase338 = { 'clase': 338, 'cargo': 'Director de 3º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2136, 'indiceBasico': 2136 / 1400, 'nivel': '','apjub':0.185 },
clase339 = { 'clase': 339, 'cargo': 'Vicedirector de Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase340 = { 'clase': 340, 'cargo': 'Maestro de Grado Escuela Adultos', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase341 = { 'clase': 341, 'cargo': 'Director de Escuela de Educación Especial de 3º Categoría', 'categoria': 5, 'indiceClase': 2284, 'indiceBasico': 2284 / 1400, 'nivel': '','apjub':0.185 },
clase342 = { 'clase': 342, 'cargo': 'Director de 4º Categoría Escuela de Jóvenes y Adultos', 'categoria': 5, 'indiceClase': 1915, 'indiceBasico': 1915 / 1400, 'nivel': '','apjub':0.185 },
clase344 = { 'clase': 344, 'cargo': 'Director de 1º Categoría Escuela Hogar', 'categoria': 5, 'indiceClase': 3094, 'indiceBasico': 3094 / 1400, 'nivel': '','apjub':0.185 },
clase349 = { 'clase': 349, 'cargo': 'Vice-Director Escuela Hogar', 'categoria': 5, 'indiceClase': 2947, 'indiceBasico': 2947 / 1400, 'nivel': '','apjub':0.185 },
clase352 = { 'clase': 352, 'cargo': 'Maestro de Grado Escuela Hogar', 'categoria': 5, 'indiceClase': 2448, 'indiceBasico': 2448 / 1400, 'nivel': '','apjub':0.2 },
clase353 = { 'clase': 353, 'cargo': 'Maestro Especial Escuela Hogar', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase360 = { 'clase': 360, 'cargo': 'Directora de Escuela Jardín de 1º Categoría', 'categoria': 5, 'indiceClase': 2799, 'indiceBasico': 2799 / 1400, 'nivel': '','apjub':0.185 },
clase361 = { 'clase': 361, 'cargo': 'Directora de Escuela Jardín de 2º Categoría', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase365 = { 'clase': 365, 'cargo': 'Vicedirector de Jardín de Infantes', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase370 = { 'clase': 370, 'cargo': 'Maestro de Grado. Recup. Y Apoyo, Madur. Y Ap.', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '','apjub':0.2 },
clase371 = { 'clase': 371, 'cargo': 'Maestro de Grado Educación Especial Educación Domiciliaria', 'categoria': 5, 'indiceClase': 1583, 'indiceBasico': 1583 / 1400, 'nivel': '','apjub':0.2 },
clase375 = { 'clase': 375, 'cargo': 'Bibliotecario Nivel Primario', 'categoria': 5, 'indiceClase': 2357, 'indiceBasico': 2357 / 1400, 'nivel': '','apjub':0.185 },
clase377 = { 'clase': 377, 'cargo': 'Miembro de Junta (Básico + Ded. Exclusiva', 'categoria': 5, 'indiceClase': 4000, 'indiceBasico': 4000 / 1400, 'nivel': '','apjub':0.185 },
clase401 = { 'clase': 401, 'cargo': 'Jefe de Coordinador Servicio Médico Asistencial', 'categoria': 5, 'indiceClase': 2450, 'indiceBasico': 2450 / 1400, 'nivel': '','apjub':0.185 },
clase402 = { 'clase': 402, 'cargo': 'Jefe de División Servicio Médico Asistencial', 'categoria': 5, 'indiceClase': 2099, 'indiceBasico': 2099 / 1400, 'nivel': '','apjub':0.185 },
clase403 = { 'clase': 403, 'cargo': 'Odontólogo', 'categoria': 5, 'indiceClase': 1960, 'indiceBasico': 1960 / 1400, 'nivel': '','apjub':0.185 },
clase404 = { 'clase': 404, 'cargo': 'Médicos  o Terapéutas', 'categoria': 5, 'indiceClase': 1960, 'indiceBasico': 1960 / 1400, 'nivel': '','apjub':0.185 },
clase406 = { 'clase': 406, 'cargo': 'Jefe Servicio Social de Escuela Hogar', 'categoria': 5, 'indiceClase': 3121, 'indiceBasico': 3121 / 1400, 'nivel': '','apjub':0.185 },
clase407 = { 'clase': 407, 'cargo': 'Visitadora de Higiene de Escuela Hogar', 'categoria': 5, 'indiceClase': 2205, 'indiceBasico': 2205 / 1400, 'nivel': '','apjub':0.185 },
clase408 = { 'clase': 408, 'cargo': 'Maestro de Taller', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase409 = { 'clase': 409, 'cargo': 'Maestro Especial de Técnico Agropecuario', 'categoria': 5, 'indiceClase': 1200, 'indiceBasico': 1200 / 1400, 'nivel': '','apjub':0.2 },
clase410 = { 'clase': 410, 'cargo': 'Maestro de Grado Coordinador de Taller', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 },
clase411 = { 'clase': 411, 'cargo': 'Maestro de Grado Promotor Comunitario', 'categoria': 5, 'indiceClase': 1400, 'indiceBasico': 1400 / 1400, 'nivel': '','apjub':0.2 };

const clases = [clase20, clase26, clase27, clase101, clase102, clase103, clase104, clase105, clase107, clase108, clase109, clase110, clase111, clase112, clase113, clase114, clase115, clase116, clase117, clase118, clase119, clase120, clase121, clase122, clase123, clase124, clase125, clase126, clase127, clase128, clase129, clase130, clase131, clase132, clase133, clase134, clase135, clase136, clase137, clase138, clase139, clase140, clase141, clase142, clase143, clase144, clase146, clase147, clase148, clase149, clase150, clase151, clase152, clase153, clase154, clase155, clase156, clase157, clase158, clase159, clase160, clase161, clase162, clase163, clase164, clase165, clase166, clase167, clase168, clase169, clase170, clase171, clase172, clase173, clase175, clase176, clase191, clase192, clase302, clase303, clase304, clase305, clase307, clase308, clase309, clase310, clase311, clase312, clase313, clase314, clase315, clase316, clase317, clase318, clase319, clase320, clase321, clase322, clase323, clase327, clase328, clase329, clase330, clase331, clase332, clase333, clase334, clase335, clase336, clase337, clase338, clase339, clase340, clase341, clase342, clase344, clase349, clase352, clase353, clase360, clase361, clase365, clase370, clase371, clase375, clase377, clase401, clase402, clase403, clase404, clase406, clase407, clase408, clase409, clase410, clase411];
