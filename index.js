const { green, yellow, red } = require("colors/safe");

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) return false;
  }

  return true;
};


let count = 1;

const from = process.argv[2];
const to = process.argv[3];

for (let number = from; number <= to; number++) {
  let colorer = green;

  if (isPrime(number)) {
    if (count % 2 === 0) {
      colorer = yellow;
      count ++;
    } else if (count % 3 === 0) {
      colorer = red;
      count = 1;
    } else {
      count ++;
    }

    console.log(colorer(number));
  }
}