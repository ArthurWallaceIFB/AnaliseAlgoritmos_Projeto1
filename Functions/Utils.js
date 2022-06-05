function separar(base, maximo) {
    var resultado = [[]];
    var grupo = 0;

    for (var indice = 0; indice < base.length; indice++) {
        if (resultado[grupo] === undefined) {
            resultado[grupo] = [];
        }

        resultado[grupo].push(base[indice]);

        if ((indice + 1) % maximo === 0) {
            grupo = grupo + 1;
        }
    }

    return resultado;
}

function calcularMediaTempos(arr) {
    let qnt = arr.length;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += parseFloat(arr[i]);
    }

    return (sum / qnt).toFixed(3);

}

function gerarArrayAleatorio(tamanho) {
    let a = [];
    for (let i = 0; i < tamanho; i++) {
        a.push(Math.floor(Math.random() * (1000 - 0 + 1)))
    }
    return a;
}

module.exports.separar = separar;
module.exports.calcularMediaTempos = calcularMediaTempos;
module.exports.gerarArrayAleatorio = gerarArrayAleatorio;