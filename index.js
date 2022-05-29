const fs = require("fs");
const { Transform } = require("stream");

const readStream = fs.createReadStream("access.log", "utf8");

let ipArr = ["89.123.1.41", "34.48.240.111"];

ipArr.forEach(element => {
  let fileName = element + "_requests.log";

  let transformStream = new Transform({
    transform(chunk, encoding, callback) {
      let str = chunk.toString();
      let arr = str.split("\n");
      let transformedChunk = "";
      let regexp = new RegExp(element, "gm");
      for(let i = 0; i < arr.length; i++){
          if(arr[i].match(regexp)){
            transformedChunk = arr[i] + "\n";
            this.push(transformedChunk);
          }
      }
      callback();
    },
  });

  const writeStream = fs.createWriteStream(fileName, "utf-8");
  
  readStream.pipe(transformStream).pipe(writeStream);
});
