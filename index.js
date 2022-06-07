const http = require("http");
const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");
const url = require("url");

function func(somePath){
    try{
        if(fs.lstatSync(somePath).isFile()){
            return fs.readFileSync(somePath, "utf-8");
        } else {
            return fs.readdirSync(somePath);
        }
    } catch(e){
        return "Некорректный параметр. Это не файл и не дирректория"
    }
}

http.createServer((request, response) => {
    if(request.method == "GET"){
        const ENTER_POINT = "public/index.html";
        const HTML = fs.readFileSync(ENTER_POINT, "utf-8");
        let htmlContent = HTML.replace("{{data}}", "");

        const queryParams = url.parse(request.url, true).query;
        if(queryParams.customPath){ //?customPath=index.js или ?customPath=public
            let content = func(queryParams.customPath);
            htmlContent = HTML.replace("{{data}}", content);
        } else {
            htmlContent = HTML.replace("{{data}}", "Параметр следует подавать в переменную customPath");
        }

        /*const filePath = path.join(__dirname, ENTER_POINT); // Создаем объект потока на чтение файла
        let readStream = fs.createReadStream(filePath); // В заголовке указываем тип контента html
        response.writeHead(200, { 'Content-Type': 'text/html'}); // Направляем поток на чтение файла в поток на запись (поток ответа)
        readStream.pipe(transform).pipe(response);*/

        return response.end(htmlContent);
    } else {
        response.writeHead(405, " Method Not Allowed");
        response.end();
    }
}).listen(8085, "localhost");