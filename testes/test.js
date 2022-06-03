const { insertionSort, bubbleSort, heapSort, quickSort, mergeSort } = require('sort-algorithms-js');


//ExecutarBubble(tamanhosArrays);
//executarHeap(tamanhosArrays);


//console.log(Math.sqrt(meuArray.length));
//let arr = gerarArrayAleatorio(300000);

//sqrtSortBubble(arr);
//console.log("Finished");
/* let teste = [[],[1,2]]
teste.splice(0, 1);
console.log(teste);
console.log(teste.length); */

let tamanhosTeste = [1000, 10000, 100000, 1000000, 10000000];
let tempos = ExecutarSqrtSortBubble(tamanhosTeste, 1);
console.log(tempos);

function ExecutarSqrtSortBubble(arr, qntReps) {
    let resultados = {};
    arr.forEach((item) => {
        let tempo = criarSqrtSortBubble(item, qntReps);
        console.log(`Done! Tempo: ${tempo}s`);
        resultados[item] = tempo;
    })

    return resultados;
}

function criarSqrtSortBubble(tamArray, qntRepeticoes) {
    let tempos = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        let arr = gerarArrayAleatorio(tamArray);
        let t0 = performance.now();
        let result = sqrtSortBubble(arr);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3) / 1000);
    }
    let tempoMedio = calcularMediaTempos(tempos);
    return tempoMedio;
}

function sqrtSortBubble(arr) {
    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = separar(arr, tamPartes);
    let res = [];
    let temp = [];

    for(let i = 0; i < arrays.length; i++){
        bubbleSort(arrays[i]);
        temp.push(arrays[i][arrays[i].length - 1]);
    }

    for (let i = 0; i < arr.length; i++) {
        let max = Math.max(...temp);
        let index = temp.indexOf(max);
        res.unshift(max);
        arrays[index].pop();
        temp[index] = (arrays[index][(arrays[index].length - 1)]) ? arrays[index][(arrays[index].length - 1)] : 0;
    }

}

/* function sqrtSortBubble(arr) {
    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = separar(arr, tamPartes);
    let res = [];
    let temp = [];

    arrays.forEach((item, i) => {
        bubbleSort(item);
    });
    for (let i = 0; i < arr.length; i++) {
        arrays.forEach((item, i) => {
            if (item.length > 0) {
                temp.push(item[item.length - 1]);
            }
            else {
                temp.push(0);
            }
        });
        let max = Math.max(...temp);
        arrays[temp.indexOf(max)].pop();
        temp = [];
        res.unshift(max);
    }
} */

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

function sqrtSortHeap(arr) {
    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = separar(arr, tamPartes);
    let res = [];
    arrays.forEach((item) => {
        console.log(item);
        let ordenado = heapSort(item);
        console.log("Ordenado: " + ordenado);
        res.push(ordenado[item.length]);
    })

}

function ExecutarBubble(arr) {
    let resultados = {};
    arr.forEach((item) => {
        let tempo = criarBubbleSort(item, 1);
        resultados[item] = tempo;
    })

    console.log(resultados);
}

function criarBubbleSort(tamArray, qntRepeticoes) {
    let tempos = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        let arr = gerarArrayAleatorio(tamArray);
        let t0 = performance.now();
        let result = bubbleSort(arr);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3) / 1000);
    }
    let tempoMedio = calcularMediaTempos(tempos);
    console.log(tempoMedio);
    return tempoMedio;
}

function executarHeap(arr) {
    let resultados = {};
    arr.forEach((item) => {
        let tempo = criarHeapSort(item, 2);
        resultados[item] = tempo;
    })

    console.log(resultados);
}

function criarHeapSort(tamArray, qntRepeticoes) {
    let tempos = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        let arr = gerarArrayAleatorio(tamArray);
        let t0 = performance.now();
        let result = heapSort(arr);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3) / 1000);
    }

    let tempoMedio = calcularMediaTempos(tempos);
    return tempoMedio;
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
        a.push(Math.round(Math.random() * 10000))
    }
    return a;
}

