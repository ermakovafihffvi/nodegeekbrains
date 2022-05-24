//const { time } = require("console");
const { green, yellow, red } = require("colors/safe");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const handler = (time, index) => {
    let now = new Date();
    let nowUTC = now.getTime();
    let diff = time - nowUTC;
    if(diff < 0){ 
        console.log(green("Таймер" + index + " закончился"));   
        return;
    } else {
        console.log("Для таймера" + index + " осталось: " + diff + " секунд");
        setTimeout(handler, 1000, time, index);
    }
};

function convertTime(stringTime){
    try {
        let timeArr = stringTime.split("-");
        let dateTime = new Date(Math.round(timeArr[4]), Math.round(timeArr[3]) - 1, Math.round(timeArr[2]), Math.round(timeArr[1]), Math.round(timeArr[0]));
        let now = new Date();
        if (isNaN(dateTime) 
            || timeArr[3] > 11 || timeArr[2] > 31 || timeArr[1] > 23 || timeArr[0] > 60
            || timeArr[3] < 0 || timeArr[2] < 1 || timeArr[1] < 0 || timeArr[0] < 0
            || dateTime.getTime() < now.getTime()
        ) {
            throw new Error();
        }
        return dateTime.getTime();
    } catch(e) {
        console.log(red("ошибка входных данных"));
        throw "stop";
    }
}

for(let i = 2; i < process.argv.length; i++){
    let utcTime = convertTime(process.argv[i]);
    eventEmitter.on("timer" + i, handler);
    eventEmitter.emit("timer" + i, utcTime, i);
}
