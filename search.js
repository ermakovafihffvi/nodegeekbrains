const worker_threads = require("worker_threads");

const { whatToSearch } = worker_threads.workerData;

let transformStream = new Transform({
    transform(chunk, encoding, callback) {

        let str = chunk.toString();
        let arr = str.split("\n");
        let transformedChunk = "";
        let regexp = new RegExp(whatToSearch, "gm");

        for(let i = 0; i < arr.length; i++){
        if(arr[i].match(regexp)){
            transformedChunk = arr[i] + "\n";
            this.push(transformedChunk);
        }
        }
        callback();
    },
});

worker_threads.parentPort.postMessage(transformStream);