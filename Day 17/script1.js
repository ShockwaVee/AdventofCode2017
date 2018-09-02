let input = 303;
let spinlock = [0];
let current_position = 0;
let result = 0;

for (let i = 0; i < 2017; i++) {
    let next_position = ((current_position + input) % spinlock.length) + 1;
    spinlock.splice(next_position, 0, i + 1);
    if (i === 2016) {
        result = spinlock[next_position + 1];
    }
    current_position = next_position;
    console.log(i + '. iteration: ' + spinlock);
}

console.log('The value after 2017 is:' + result);