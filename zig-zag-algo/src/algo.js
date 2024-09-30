



/*
 This algorythm is using a zig-zag 2d array to encode a string. The array below illustrate the order followed when placing the char of string to encode.
 An array of 4 rows is used, so a column can place 4 char, and will be followed by a smaller colum, where a space if at the top and end of the colum (see the '.' char) 

 
     | 0   .   6  .   12 |             Major column ==> Size of the number of row, as provided by the called (size of n)
     | 1   4   7  10  13 |             Minor column ==> Size of colum, where the size will be n-2  (a space on top and at the bottom)
     | 2   5   8  11  14 |
     | 3   .   9  .   15 |

  Due to the smaller column, the 2d array as to be a bit bigger than a 'rectangle' array, as there are waisted space on every odd column.   

*/


const MINIMUM_ROW_COUNT      = 3;
const MINIMUM_STRING_LENGTH = 10;                // This lenght is a bit arbitrary, but we need enough charachters to showcase the zig-zag algo


export function isValidNbrRows(nbrRows){

    if (nbrRows === null) return false;
    if (isNaN(nbrRows))   return false;

    if (nbrRows < MINIMUM_ROW_COUNT)  return false;
    else return true;
}

export function isValidString(textToEncode){

    if (textToEncode === null)  return false;
    else if (typeof textToEncode === "string" && textToEncode.length === 0)  return false;
    else if (textToEncode.length < MINIMUM_STRING_LENGTH)  return false;
    else
        return true;
}


// The result array is a succcess of a full size column (size of nbrRows), followed
function calculateArraySize(nbrRows, sourceText) {
    const majorColSize = nbrRows;
    const minorColSize = nbrRows -2 ;
    const nbrColumnRectArray =   Math.ceil( sourceText.length /  nbrRows );
    const ratio =  (2*majorColSize) / (majorColSize + minorColSize);
    const resultArraySize = Math.ceil( (nbrRows*nbrColumnRectArray) * ratio);
    const nbrColumnResultArray =  Math.ceil( resultArraySize / nbrRows );
    const longSeqLen = 2*nbrRows;
    const skipIndexes = [ nbrRows , longSeqLen - 1];
 


    return { totalSize: resultArraySize, 
             rowCount : nbrRows, 
             colCount: nbrColumnResultArray,
             longSequenceLenght: longSeqLen,
             skippedIndexes: skipIndexes
            };

}

function allocateArray(nbrRows,nbrColumns){
    let resultArray = new Array(nbrRows);
    for (let i = 0; i < resultArray.length; i++)  resultArray[i] = [];
    
    for (let i = 0; i < resultArray.length; i++) {
        for (let j = 0; j < nbrColumns; j++) {
    
            resultArray[i][j] = ' ';
        }
    }

    return resultArray;
}

export function zigzagAlgo (nbrRows, sourceText) {
   console.log(`Zig  Zag algo:\nMatrix Rows Count: ${nbrRows}\n\nInitial Text: ${sourceText}`);

   //Note: The second validation here is a bit redundant ...
   if ( !isValidNbrRows(nbrRows)) {
     console.log("Invalid number of rows!");
     return;
   }

   if ( !isValidString(sourceText)) {
        console.log("Invalid string");
        return;
   }

   let currentStrIndex = 0;

   let resultArraySpecs = calculateArraySize(nbrRows, sourceText);
   let resultArray = allocateArray(resultArraySpecs.rowCount, resultArraySpecs.colCount);

   console.log("Text to encrypt: " + sourceText);

   let currentRow = 0;
   let currentColumn = -1;
   
   // Will iterate through all the char in the string, and place them
   for (let i=0;i<resultArraySpecs.totalSize;i++){
      let nextChar;

        const currentLongSeqModule = i % resultArraySpecs.longSequenceLenght;

        if (currentLongSeqModule === resultArraySpecs.skippedIndexes[0] || currentLongSeqModule === resultArraySpecs.skippedIndexes[1] ) {
            nextChar = ' ';
        } else 
           nextChar = sourceText.charAt(currentStrIndex++);
      
      const reminder = i % resultArraySpecs.rowCount;
      currentRow = reminder
      if ( reminder === 0 ) currentColumn++;

      resultArray[currentRow][currentColumn] = nextChar;
   }

   console.log("Completed");
   console.log("Result Array:");

   return resultArray;
    
}   