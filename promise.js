const fs = require("fs");
const yargs = require("yargs");
const path = require("path");
const readline = require("readline");
const inquirer = require("inquirer");

const worker_threads = require("worker_threads");

const { Transform } = require("stream");

const options = yargs
    .usage("Usage: -p <path>")
    .option("p", { 
        alias: "path", 
        describe: "Path to file", 
        type: "string",
        demandOption: true 
    })
    .argv;
   
let filePath = options.path;

async function func(somePath){
    if(fs.lstatSync(somePath).isFile()){
        //console.log("обрабатываем файл");
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question("Что будем искать? :", function(input) {

            let fileName = input + "_requests.log";
    
            const readStream = fs.createReadStream(somePath, "utf8");

            const transformStream =  new worker_threads.Worker("./search.js", {
                whatToSearch: input
            });
    
            /*let transformStream = new Transform({
                transform(chunk, encoding, callback) {
    
                    let str = chunk.toString();
                    let arr = str.split("\n");
                    let transformedChunk = "";
                    let regexp = new RegExp(input, "gm");
        
                    for(let i = 0; i < arr.length; i++){
                    if(arr[i].match(regexp)){
                        transformedChunk = arr[i] + "\n";
                        this.push(transformedChunk);
                    }
                    }
                    callback();
                },
            });*/
    
            const writeStream = fs.createWriteStream(fileName, "utf-8");
        
            readStream.pipe(transformStream).pipe(writeStream);
            rl.close();
            console.log("Job done!");
        });
    } else {
        let somePath2Obj = await inquirer.prompt([
            {
              name: "fileName",
              type: "list",
              message: "Вы находитесь в директории " + somePath + ". Выберите файл:",
              choices: fs.readdirSync(somePath),
            },
        ]);
        //console.log(somePath2Obj);
        return func(path.join(somePath, somePath2Obj.fileName));
    }
}

func(filePath);