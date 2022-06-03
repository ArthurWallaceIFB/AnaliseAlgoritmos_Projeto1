const { insertionSort, bubbleSort, heapSort, quickSort, mergeSort } = require('sort-algorithms-js');
const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
//const { Heap } = require('heap-js');

//let tamanhosTeste = [1000, 10000, 100000, 1000000, 10000000];
//let tempos = ExecutarSqrtSortBubble(tamanhosTeste, 1);
//console.log(tempos);
let tamanhosTeste = [10000000];

console.log("\n--- Bubble ---\n\n");
let temposBubble = ExecutarSqrtSortBubble(tamanhosTeste, 1);
console.log(temposBubble);

/* console.log("\n--- Heap ---");
let temposHeap = ExecutarSqrtSortHeap(tamanhosTeste, 1);
console.log(temposHeap);
 */

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

    bar2.start(arrays.length, 0);

    arrays.map((parte, i) => {
        bar2.update(i + 1);
        bubbleSort(parte);
        temp.push(parte[parte.length - 1]);
    })
    bar2.stop();

    bar1.start(arr.length, 0);
    arr.map((elem, i) => {
        bar1.update(i + 1);
        let max = Math.max(...temp);
        let index = temp.indexOf(max);
        res.push(max);
        arrays[index].pop();
        temp[index] = (arrays[index][(arrays[index].length - 1)]) ? arrays[index][(arrays[index].length - 1)] : 0;
    })
    bar1.stop();
    //res.reverse();

}


// HEAP
function ExecutarSqrtSortHeap(arr, qntReps) {
    let resultados = {};
    arr.forEach((item) => {
        let tempo = criarSqrtSortHeap(item, qntReps);
        console.log(`Done! Tempo: ${tempo}s`);
        resultados[item] = tempo;
    })
    return resultados;
}

function criarSqrtSortHeap(tamArray, qntRepeticoes) {
    let tempos = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        let arr = gerarArrayAleatorio(tamArray);
        let t0 = performance.now();
        let result = sqrtSortHeap(arr);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3) / 1000);
    }
    let tempoMedio = calcularMediaTempos(tempos);
    return tempoMedio;
}

function sqrtSortHeap(arr) {
    let temp = new Heap(Heap.maxComparator);
    let resultados = [];
    temp.init();
    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = separar(arr, tamPartes);

    for (let i = 0; i < arrays.length; i++) {
        let heap = new Heap(Heap.maxComparator);
        heap.init(arrays[i]);
        arrays[i] = heap;
    }


    for (let i = 0; i < arr.length; i++) {
        for (let i = 0; i < arrays.length; i++) {
            if (arrays[i].heapArray.length > 0) {
                let max = arrays[i].top()[0];
                arrays[i].pop();
                temp.add(max);
            }
        }
        let removed = temp.pop();
        resultados.unshift(removed);
    }

}



//Utils

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
        a.push(Math.round(Math.random() * 100000))
    }
    return a;
}
