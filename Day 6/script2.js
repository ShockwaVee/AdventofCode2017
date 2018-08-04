let memory_banks = [5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6];
//let memory_banks = [0, 2, 7, 0];
let history = {};
let number_of_cycles = 0;
let highest_bank = 0;
let highest_bank_index = 0;
let loop_start = 0;
let loop_limit = 0;

while(!history[memory_banks.join(',')]){
	highest_bank_index = 0;
	highest_bank = 0;
	history[memory_banks.join(',')] = true;
	memory_banks.forEach((e, i) =>{
		if(highest_bank < e){
			highest_bank = e;
			highest_bank_index = i;
			//+1 to start from the element next to the highest one
			loop_limit = e + i + 1;
			loop_start = (i % memory_banks.length) + 1;
		}
	});
	memory_banks[highest_bank_index] = 0;
	for(loop_start; loop_start < loop_limit; loop_start++){
		memory_banks[loop_start%memory_banks.length]++;
	}
	number_of_cycles++;
	console.log(memory_banks);
}
let first_occurence = Object.keys(history).indexOf(memory_banks.join(','));
let number_of_steps = number_of_cycles - first_occurence;
console.log(number_of_steps);
