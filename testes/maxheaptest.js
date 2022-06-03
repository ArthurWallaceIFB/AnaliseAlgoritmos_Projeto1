const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

class MaxHeap {
    constructor() {
        this.values = [];
    }

    // index of the parent node
    parent(index) {
        return Math.floor((index - 1) / 2);
    }

    // index of the left child node
    leftChild(index) {
        return (index * 2) + 1;
    }

    // index of the right child node
    rightChild(index) {
        return (index * 2) + 2;
    }

    // returns true if index is of a node that has no children
    isLeaf(index) {
        return (
            index >= Math.floor(this.values.length / 2) && index <= this.values.length - 1
        )
    }

    // swap using ES6 destructuring
    swap(index1, index2) {
        [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
    }


    heapifyDown(index) {

        // if the node at index has children
        if (!this.isLeaf(index)) {

            // get indices of children
            let leftChildIndex = this.leftChild(index),
                rightChildIndex = this.rightChild(index),

                // start out largest index at parent index
                largestIndex = index;

            // if the left child > parent
            if (this.values[leftChildIndex] > this.values[largestIndex]) {
                // reassign largest index to left child index
                largestIndex = leftChildIndex;
            }

            // if the right child > element at largest index (either parent or left child)
            if (this.values[rightChildIndex] >= this.values[largestIndex]) {
                // reassign largest index to right child index
                largestIndex = rightChildIndex;
            }

            // if the largest index is not the parent index
            if (largestIndex !== index) {
                // swap
                this.swap(index, largestIndex);
                // recursively move down the heap
                this.heapifyDown(largestIndex);
            }
        }
    }

    heapifyUp(index) {
        let currentIndex = index,
            parentIndex = this.parent(currentIndex);

        // while we haven't reached the root node and the current element is greater than its parent node
        while (currentIndex > 0 && this.values[currentIndex] > this.values[parentIndex]) {
            // swap
            this.swap(currentIndex, parentIndex);
            // move up the binary heap
            currentIndex = parentIndex;
            parentIndex = this.parent(parentIndex);
        }
    }

    add(element) {
        // add element to the end of the heap
        this.values.push(element);
        // move element up until it's in the correct position
        this.heapifyUp(this.values.length - 1);
    }

    addResult(element){
        this.values.push(element);
        //this.values.reverse();
    }

    pop(element) {
        // add element to the end of the heap
        this.values.pop();
        /*         // move element up until it's in the correct position
                this.heapifyUp(this.values.length - 1); */
        return this.values[0];
    }

    // returns value of max without removing
    peek() {
        return this.values[0];
    }

    // removes and returns max element
    extractMax() {
        if (this.values.length < 1) return 0;
        let max;
        let end;
        // get max and last element
        if (this.values.length > 1) {
            max = this.values[0];
            end = this.values.pop();
            // reassign first element to the last element
            this.values[0] = end;
        }
        else {
            end = this.values.pop();
            max = end;
        }
        // heapify down until element is back in its correct position
        this.heapifyDown(0);
        // return the max
        return max;
    }

    buildHeap(array) {
        this.values = array;
        // since leaves start at floor(nodes / 2) index, we work from the leaves up the heap
        for (let i = Math.floor(this.values.length / 2); i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    print() {
        let i = 0;
        while (!this.isLeaf(i)) {
            console.log("PARENT:", this.values[i]);
            console.log("LEFT CHILD:", this.values[this.leftChild(i)]);
            console.log("RIGHT CHILD:", this.values[this.rightChild(i)]);
            i++;
        }
    }

}

let heap = new MaxHeap();

function gerarArrayAleatorio(tamanho) {
    let a = [];
    for (let i = 0; i < tamanho; i++) {
        a.push(Math.round(Math.random() * 10000000))
    }
    return a;
}

let arr = gerarArrayAleatorio(10000000);
//let arr = [8, 2, 12, 25, 1, 43, 80, 95, 3, 9];
//console.log(arr);
sqrtSortHeap(arr);
//heap.buildHeap([arr]);

//heap.print();

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
    let temp = new MaxHeap();
    let tempIndexes = [];
    let resultados = new MaxHeap();
    temp.buildHeap([]);
    resultados.buildHeap([]);
    let tamPartes = Math.round(Math.sqrt(arr.length));
    let arrays = separar(arr, tamPartes);
    console.log(`Total partes: ${arrays.length}`)


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

    let final = resultados.values.reverse();
}
