const MaxHeap = require("../Classes/MaxHeap");
const Utils = require("./Utils");
const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);
// HEAP
function ExecutarSqrtSortHeap(arr, qntReps) {
    let resultados = {};
    arr.forEach((item) => {
        let tempo = criarSqrtSortHeap(item, qntReps);
        //console.log(`Done! Tempo: ${tempo}s`);
        resultados[item] = tempo;
    })
    return resultados;
}

function criarSqrtSortHeap(tamArray, qntRepeticoes) {
    let tempos = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        console.log(`\n--- Arr[${tamArray}]`);
        let arr = Utils.gerarArrayAleatorio(tamArray);
        let t0 = performance.now();
        let result = sqrtSortHeap(arr);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3) / 1000);
    }
    let tempoMedio = Utils.calcularMediaTempos(tempos);
    return tempoMedio;
}

function sqrtSortHeap(arr) {
    let temp = new MaxHeap();
    let tempIndexes = [];
    let resultados = new MaxHeap();

    temp.buildHeap([]);
    resultados.buildHeap([]);

    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = Utils.separar(arr, tamPartes);

    for (let i = 0; i < arrays.length; i++) {
        let heap = new MaxHeap();
        heap.buildHeap(arrays[i]);
        arrays[i] = heap;
    }

    arrays.map((heap, i) => {
        let max = heap.extractMax();
        temp.add(max);
        tempIndexes.push(max);
    });

    let removed;
    removed = temp.values.shift();
    resultados.addResult(removed);

    console.log("\n\n -> HeapSort")
    bar1.start(arr.length, 0);

    arr.map((x, i) => {
        bar1.update(i + 1);
        let index = tempIndexes.indexOf(removed);
        let prox = arrays[index].extractMax();
        temp.add(prox);        
        tempIndexes[index] = prox;
        removed = temp.extractMax();
        resultados.addResult(removed);
    })
    bar1.stop();
    console.log("\n\n")
    let final = resultados.values.reverse();
}

module.exports.ExecutarSqrtSortHeap = ExecutarSqrtSortHeap;