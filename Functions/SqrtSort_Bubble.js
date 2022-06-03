const { insertionSort, bubbleSort, heapSort, quickSort, mergeSort } = require('sort-algorithms-js');
const Utils = require("./Utils");
const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_grey);

//BUBBLE
function ExecutarSqrtSortBubble(arr, qntReps) {
    let resultados = {};
    arr.forEach((item) => {
        let tempo = criarSqrtSortBubble(item, qntReps);
        //console.log(`Done! Tempo: ${tempo}s`);
        resultados[item] = tempo;
    })
    return resultados;
}

function criarSqrtSortBubble(tamArray, qntRepeticoes) {
    let tempos = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        console.log(`\n--- Arr[${tamArray}]\n`);
        let arr = Utils.gerarArrayAleatorio(tamArray);
        let t0 = performance.now();
        let result = sqrtSortBubble(arr);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3) / 1000);
    }
    let tempoMedio = Utils.calcularMediaTempos(tempos);
    return tempoMedio;
}

function sqrtSortBubble(arr) {
    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = Utils.separar(arr, tamPartes);
    let res = [];
    let temp = [];

    console.log(" -> BubbleSort")
    bar2.start(arrays.length, 0);

    arrays.map((parte, i) => {
        bar2.update(i + 1);
        bubbleSort(parte);
        temp.push(parte[parte.length - 1]);
    })
    bar2.stop();


    console.log("\n\n -> SqrtSort")
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
    console.log("\n\n")
    res.reverse();

}

module.exports.ExecutarSqrtSortBubble = ExecutarSqrtSortBubble;