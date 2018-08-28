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

let genABuffer = [],
    genBBuffer = [];

for (let x = 1; x <= 5; x++) {
    while (genABuffer.length < 1000000 || genBBuffer.length < 1000000) {
        genA *= genAFactor;
        genB *= genBFactor;
        if (counter > 0) {
            genA = genA % modulo;
            genB = genB % modulo;
        }
        genABinary = genA.toString(2);
        genBBinary = genB.toString(2);

        genBBinary = '0'.repeat(10) + genBBinary;
        genABinary = '0'.repeat(10) + genABinary;
        if (genA % 4 === 0) {
            genABuffer.push(genABinary);

        }
        if (genB % 8 === 0) {
            genBBuffer.push(genBBinary);
        }
        counter++;
    }


    for (let i = 0; i < Math.min(genABuffer.length, genBBuffer.length); i++) {
        if (genABuffer[i].slice(-16) === genBBuffer[i].slice(-16)) {
            judge++
        };
    }

    genABuffer.splice(0, 1000000);
    genBBuffer.splice(0, 1000000);


}

console.log("Judge's final count is: " + judge);