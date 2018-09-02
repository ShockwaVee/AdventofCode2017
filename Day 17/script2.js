let input = 303;
let spinlock = [0];
let current_position = 0;
let result = 0;

for (let i = 0; i < 5e7; i++) {
    let next_position = ((current_position + input) % (i+1)) + 1;
    if(next_position === 1) result = i+1;
    current_position = next_position;
}

console.log('The value after 0 is:' + result);