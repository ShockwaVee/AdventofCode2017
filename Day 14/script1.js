let N = 256;
let puzzle_input = "ugkiagan";
let suffix = '17, 31, 73, 47, 23';

let used = 0,
    free = 0;

for (let row = 0; row <= 127; row++) {
    let list = [...Array(N).keys()];
    let step = 0,
        starting_point = 0,
        current_position = 0;
    let dense_hash = [];
    let knot_hash = '';
    let given_lengths = puzzle_input + '-' + row;

    given_lengths = given_lengths.split('').map(e => e.charCodeAt());
    given_lengths.push(...suffix.split(',').map(e => Number(e)))
    for (let i = 0; i < 64; i++) {
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
        });
    }

    for (i = 0; i < 16; i++) {
        dense_hash.push(list.splice(0, 16).reduce((accumulator, current) => {
            return accumulator ^ current
        }));
    }


    dense_hash.forEach((e) => {
        knot_hash += e.toString(16).length > 1 ? e.toString(16) : '0' + e.toString(16);
    });

    knot_hash.split('').forEach((element) => {
        parseInt(element, 16).toString(2).split('').forEach(e => {
            if (e == 1) used++;
            else free++;
        })
    });

    console.log('Your ' + row + ' knot hash is: ' + knot_hash);
}

console.log('The number of used squares is: ' + used);