let input = `0: 3
1: 2
2: 4
4: 6
6: 4
8: 6
10: 5
12: 6
14: 8
16: 8
18: 8
20: 6
22: 12
24: 8
26: 8
28: 10
30: 9
32: 12
34: 8
36: 12
38: 12
40: 12
42: 14
44: 14
46: 12
48: 12
50: 12
52: 12
54: 14
56: 12
58: 14
60: 14
62: 14
64: 14
70: 10
72: 14
74: 14
76: 14
78: 14
82: 14
86: 17
88: 18
96: 26`.split('\n').map(e => {
    let object = {};
    object[e.split(': ')[0]] = e.split(': ')[1];
    return object;
});

let picosec = 0,
    severity = 0;

let layers = new Array(Number(Object.keys(input[input.length - 1]))).fill(999);

input.forEach(e => layers[Object.keys(e)] = Number(e[Object.keys(e)]));

layers.forEach((layer, index) => {
	let offset = picosec/layer < 1 ? 2 : Math.ceil(picosec/layer);
    if (layer !== 999 && (picosec === 0 || picosec === layer * offset - offset)) {
    	console.log(picosec);
        severity += layer * index;

    }
    picosec++;
});

console.log('Your total severity is: ' + severity);