const SqrtBubble = require("./Functions/SqrtSort_Bubble")
const SqrtHeap = require("./Functions/SqrtSort_Heap");
const chart = require("./chart");


//EXECUÇÃO
let tamanhosTeste = [10000, 100000, 1000000, 10000000];
let qntRepeticoes = 1;

console.log("\n--- BUBBLE ---\n");
let temposBubble = SqrtBubble.ExecutarSqrtSortBubble(tamanhosTeste, qntRepeticoes);
console.log(`Tempos Bubble:`);
console.log(temposBubble);

console.log("\n\n\n--- HEAP ---\n");
let temposHeap = SqrtHeap.ExecutarSqrtSortHeap(tamanhosTeste, qntRepeticoes);
console.log(`Tempos Heap:`);
console.log(temposHeap);
console.log("\n\n")


let results = {
    "BubbleSort": temposBubble,
    "HeapSort": temposHeap
}

console.log("\n---- GERANDO O GRÁFICO DA ANÁLISE ----\n")
chart.generate(tamanhosTeste, results);

console.log("✅ Gráfico salvo com sucesso! ✅\n")
console.log("Path: /graficos/AnaliseEmpirica.png\n\n");
