

import { blue, red, bold, underline } from "colorette"


const NBR_ITEMS : number          = 550;
const SHUFFLE_ITERATIONS : number = 550;


let iterationCount : number = 0;

function displaySequence(sequence: number[]) : void {
    console.log("Sequence of size " +  blue(sequence.length) +  " , values "  +  sequence);
}


  interface QuickSortFunctionParams {
     array : number[],
     low: number,
     high: number
  }

function generateSequence(size: number) : number[] {
     let array : number[] = [];

     const shuffle = (position:number, destArray:number[]) => {
        if (position <0 || position > destArray.length)  return;

        const tmp = destArray[position];
        destArray[position] = destArray[0];
        destArray[0] = tmp;
     }

    for(let i=1;i<=size;i++)   array.push(i);

  //  displaySequence(array);

    for (let i=0;i<SHUFFLE_ITERATIONS;i++) {
        const index:number = Math.floor( Math.random() * NBR_ITEMS );
        shuffle(index,array);
    }

   // displaySequence(array);

     return array;
}


// Partition function
function partition(array:number[], low:number, high:number)
{

    // Choose the pivot
    let pivot = array[high];

    // Index of smaller element and indicates
    // the right position of pivot found so far
    let i = low - 1;

    // Traverse arr[low..high] and move all smaller
    // elements to the left side. Elements from low to
    // i are smaller after every iteration
    for (let j = low; j <= high - 1; j++) {
        iterationCount++;
        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
        }
    }

    // Move pivot after smaller elements and
    // return its position
    swap(array, i + 1, high);
    return i + 1;
}

// Swap function
function swap(array:number[], i:number, j:number)
{
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// The QuickSort function implementation
function quickSort(array:number[], low:number, high:number)
{
    if (low < high) {

        // pi is the partition return index of pivot
        let pi = partition(array, low, high);

        // Recursion calls for smaller elements
        // and greater or equals elements
        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
    }
}

function run(): void {


    console.log(`generate sequence of  ${NBR_ITEMS} items...`);

    let sequence: number[] =   generateSequence(NBR_ITEMS);
    iterationCount = 0;

    quickSort(sequence, 0, sequence.length - 1);


    /*
console.log(
  blue("I'm blue"),
  bold(blue("da ba dee")),
  underline(bold(blue("da ba daa")))
) */
    console.log(blue("QuickSort"));
    displaySequence(sequence);
    console.log("Iteration Count is " + red(iterationCount));


    

}

run();

