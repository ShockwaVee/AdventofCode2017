let input = 312051;
let size = Math.ceil(Math.sqrt(input));

let matrix = new Array(size);
for(let i = 0; i < size; i++){
    matrix[i] = new Array(size);
}

let x = Math.ceil((size/2))-1;
let y = Math.ceil((size/2))-1;
let s = 1;
let d = 0;
let count = 0;


for (let k=1; k<=(size-1); k++)
{
    for (let j=0; j<(k<(size-1)?2:3); j++)
    {
        for (let i=0; i<s; i++)
        {
            
            count++;
            matrix[x][y] = count;

            if(count === input){
                let diff = Math.abs(x-y);
                console.log('steps needed: ' + diff);
            }

            switch (d)
            {
                case 0: y = y + 1; break;
                case 1: x = x - 1; break;
                case 2: y = y - 1; break;
                case 3: x = x + 1; break;
            }
        }
        d = (d+1)%4;
    }
    s = s + 1;
}