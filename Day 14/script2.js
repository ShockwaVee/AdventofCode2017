let N = 256;
let puzzle_input = "flqrgnkx";
let suffix = '17, 31, 73, 47, 23';

let used = 0,
    free = 0;
let hash_matrix = [];

for (let row = 0; row <= 127; row++) {
    let list = [...Array(N).keys()];
    let step = 0,
        starting_point = 0,
        current_position = 0;
    let dense_hash = [];
    let knot_hash = '';
    let given_lengths = puzzle_input + '-' + row;
    let hash_knot_row = '';

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
        let correct = parseInt(element, 16).toString(2);
        while (correct.length !== 4) {
            correct = '0' + correct;
        }
        hash_knot_row += correct;

        correct.toString(2).split('').forEach(e => {
            if (e == 1) used++;
            else free++;
        })
    });
    hash_matrix.push(hash_knot_row);

}

let groups = 0;
let last_row_indices = [];


while ([].concat.apply([], hash_matrix).join('').includes(1)) {
    groups++;
    hash_matrix.forEach((row, index) => {
        //console.log('index: ' + index);
        //console.log('before:    ' + hash_matrix[index]);
        //console.log('row-after: ' + hash_matrix[index + 1]);
        //console.log('last_row_indices: ' + last_row_indices);
        let current_row_indices = [];
        if (index === 0 && !(row.includes(1))) hash_matrix.splice(0, 1);
        if (row.includes(1)) {
            for (i = row.indexOf(1); i <= row.length; i++) {
                if (index === 0) {
                    if (row[i] == 1) {
                        current_row_indices.push(i);
                        hash_matrix[index] = hash_matrix[index].substr(0, i) + '0' + hash_matrix[index].substr(i + 1);
                    };
                    if (row[i] == 0) break;
                } else if (index > 0) {
                    //console.log('kurac')
                    last_row_indices.forEach(ind => {
                        if (row[ind] == 1) {
                            current_row_indices.push(ind);
                            hash_matrix[index] = hash_matrix[index].substr(0, ind) + '0' + hash_matrix[index].substr(ind + 1)
                        };
                    });
                    for (let x = last_row_indices[0] - 1; x >= 0; x--) {
                        //console.log('x: ' + x);
                        if (row[x] == 1) {
                            current_row_indices.push(x);
                            hash_matrix[index] = hash_matrix[index].substr(0, x) + '0' + hash_matrix[index].substr(x + 1)
                        };
                        if (row[x] == 0) break;
                    }
                    for (let y = last_row_indices[last_row_indices.length - 1] + 1; y <= row.length; y++) {
                        if (row[y] == 1) {
                            current_row_indices.push(y);
                            hash_matrix[index] = hash_matrix[index].substr(0, y) + '0' + hash_matrix[index].substr(y + 1)
                        };
                        if (row[y] == 0) break;
                    }
                }

                return;
            }
        }
        //console.log('after:     ' + hash_matrix[index]);
        //console.log('current: ' + current_row_indices);
        last_row_indices = (index === hash_matrix.length - 1) ? [] : current_row_indices;
        //console.log('-----------')
    });
}

console.log(groups);


/*
[ '1101 0100 1111 0111 0110 1011 1101 1100 1011 1111 1000 0011 1000 1111 1000 0100 0001 0110 1100 1100 1111 1010 1000 1011 1100 0110 1101 0001 1111 1001 1110 0110',
  '0101 0101 1110 1010 1011 0011 1100 0100 1111 1011 1111 1110 1101 1110 0001 0110 1101 1100 1110 1100 0010 1100 0110 0110 1101 1101 1010 0010 0110 0100 0110 0100',
  '00001010110111110001001111111010010000001110100011101010100000010101001101110110011101110110101011110011101101111011001000110001',
  '10101101001111011010001010001100110101111011100011111011100110010111010000101100000011100110001101100111001011001010111101100010',
  '01101000001011111110010010001100010101011000011101101010101010101010000100011101111100100110001101001111100101101101001100011010' ]

*/