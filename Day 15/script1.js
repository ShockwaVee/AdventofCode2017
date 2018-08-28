let genA = 703,
    genAFactor = 16807,
    genABinary;
let genB = 516,
    genBFactor = 48271,
    genBBinary;
let modulo = 2147483647;


let counter = 0,
    prepend = 0,
    judge = 0;

while (counter < 40000000) {
    genA *= genAFactor;
    genB *= genBFactor;
    if (counter > 0) {
        genA = genA % modulo;
        genB = genB % modulo;
    }
    genABinary = genA.toString(2);
    genBBinary = genB.toString(2);

    if (genABinary.length > genBBinary.length) {
        prepend = genABinary.length - genBBinary.length;
        genBBinary = '0'.repeat(prepend) + genBBinary;
    } else {
        prepend = genBBinary.length - genABinary.length;
        genABinary = '0'.repeat(prepend) + genABinary;
    }
    if (genABinary.slice(-16) === genBBinary.slice(-16)) judge++;

    counter++;
}

console.log("Judge's final count is: " + judge);