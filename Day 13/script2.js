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
96: 26`;
let inp = input.split("\n").map(r => r.split(": ").map(v => parseInt(v,10))), result;

// 13-1
result = inp.reduce((acc,val) => {
    let cycle = val[1] > 1 ? 2*val[1]-2 : 1;
    return acc + (val[0]%cycle === 0 ? val[0]*val[1] : 0);
}, 0);
console.log('DAY 13-1:', result);

// 13-2 BF2
var cycles = inp.map(r => [r[0], r[1] > 1 ? 2*r[1]-2 : 1]), caught, delay = -1;
do {
    delay++;
    caught = cycles.map(c => (c[0]+delay)%c[1]).filter(m => m == 0).length > 0;
} while(caught);
console.log('13-2 BF:', delay); // 3878062
DAY 13-1: 1612