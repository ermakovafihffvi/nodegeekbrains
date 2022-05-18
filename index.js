const { green, yellow, red } = require("colors/safe");

const isPrime = (number) => {
    if (number < 2) return false;

    for (let i = 2; i <= number / 2; i++) {
        if (number % i === 0) return false;
    }

    return true;
};

let checked = (var1 = null, var2 = null) => {
    if (var1 > var2 || 
        var1 === null || var2 === null || 
        var1 === undefined || var2 === undefined || 
        typeof(var1) === "string" || typeof(var2) === "string"
    ){
        return false;
    } else {
        return true;
    }
}

function myFunc(fromNumber, toNumber) {
    if (checked(fromNumber, toNumber)) {
        let count = 1;
        let primeArr = [];

        for (let number = from; number <= to; number++) {
            let colorer = green;

            if (isPrime(number)) {
                if (count % 2 === 0) {
                    colorer = yellow;
                    count++;
                } else if (count % 3 === 0) {
                    colorer = red;
                    count = 1;
                } else {
                    count++;
                }

                console.log(colorer(number));
                primeArr.push(colorer(number));
            }
        }
        if (primeArr.length == 0) {
            console.log(red("не нашлось простых чисел в указанном диапазоне"));
        }
    } else {
        console.log(red("что-то не то с входными данными"));
    }
}


const from = process.argv[2];
const to = process.argv[3];

myFunc(from, to);