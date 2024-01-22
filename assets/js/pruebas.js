const n = 3
const idArray = ['anoSelect', 'mesSelect', 'antiguedadSelect', 'hijosSelect','hijosEscSelect']
const id = idArray[n]

const dato = parseFloat(document.getElementById(id).value);
document.getElementById('objeto').innerHTML = typeof dato + ' - ' + dato;
document.getElementById(id).addEventListener('input', function () {
    const dato = parseFloat(document.getElementById(id).value);
    document.getElementById('objeto').innerHTML = typeof dato + ' - ' + dato;
})