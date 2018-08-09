let N = 256;
let list = [...Array(N).keys()];
let given_lengths = '165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153'.split(',').map(e => Number(e));
let step = 0,
    starting_point = 0,
    current_position = 0;

given_lengths.forEach(length => {
    let array_to_be_reversed = list.slice(starting_point, length + starting_point);
    if ((length + starting_point) > list.length && (length + starting_point) % list.length > 0) {
        array_to_be_reversed.push(...list.slice(0, (length + starting_point) % list.length));
    }
    array_to_be_reversed.reverse().forEach(reversed => {
        list[starting_point % list.length] = reversed;
        starting_point = ++starting_point % list.length;
    });
    starting_point = (current_position + (length + step) % list.length) % list.length;
    current_position = starting_point;
    step++;
    console.log(step);
});


console.log(list.join(','));

console.log('Result: ' + (list[0] * list[1]))