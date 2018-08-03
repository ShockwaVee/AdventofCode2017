let input = 312051;
let size = 9;

let matrix = new Array(size);
for(let i = 0; i < size; i++){
    matrix[i] = new Array(size);
    matrix[i].fill(0);
}

let x = Math.ceil((size/2))-1;
let y = Math.ceil((size/2))-1;
let s = 1;
let d = 0;
let count = 0;
let flag = false;
let result = 0;

for (let k=1; k<=(size-1); k++)
{
    for (let j=0; j<(k<(size-1)?2:3); j++)
    {
        for (let i=0; i<s; i++)
        {
            
            count++;
            if (x === Math.ceil((size/2))-1 && y === Math.ceil((size/2))-1){
                matrix[x][y] = 1;
            }else{
                if(matrix[x][y+1] != null) matrix[x][y] += matrix[x][y+1];
                if(x>0 && matrix[x-1][y+1] != null) matrix[x][y] += matrix[x-1][y+1];
                if(x>0 && matrix[x-1][y] != null) matrix[x][y] += matrix[x-1][y];
                if(x>0 && y>0 && matrix[x-1][y-1] != null) matrix[x][y] += matrix[x-1][y-1];
                if(y>0 && matrix[x][y-1] != null) matrix[x][y] += matrix[x][y-1];
                if(x<size-1 && y>0 && matrix[x+1][y-1] != null) matrix[x][y] += matrix[x+1][y-1];
                if(x<size-1 && matrix[x+1][y] != null) matrix[x][y] += matrix[x+1][y];
                if(x<size-1 && y<size-1 && matrix[x+1][y+1] != null) matrix[x][y] += matrix[x+1][y+1];
            }
            if (matrix[x][y] > input && !flag){
                flag = true;
                result = matrix[x][y];
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
console.log(matrix);
console.log(result);