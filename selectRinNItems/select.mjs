//const chalk = require("chalk");
import chalk from "chalk";



const UNDEFINED = -1;
let iterationCount;

const nbrItems = 40;
const nbrToSelect = 8;


//let dp[nbrItems][nbrToSelect];


//let test1 = Array(4);
//let test2 = Array(nbrToSelect).fill(-1);
let dp =  Array.from( Array(nbrItems), () =>  Array(nbrToSelect).fill(UNDEFINED));


function selection(n,r) {

    iterationCount++;

    if ( r === 1) return n;
    else if ( n === r ) return 1;

    const newN = n -1;
    const newR = r -1;

    return selection(newN,r) + selection(newN,newR);;
}


function selectionDP(n,r) {

    iterationCount++;


    if ( r === 1) return n;
    else if ( n === r ) return 1;
    else if ( dp[n-1][r-1] !== UNDEFINED ) return dp[n-1][r-1];



    const newN = n -1;
    const newR = r -1;
    const result =  selectionDP(newN,r) + selectionDP(newN,newR);

    dp[n-1][r-1] = result;

    return result;
}



function main() {
    
    let result;
    console.log("Select " + chalk.green(nbrToSelect) + " items among a group of " + chalk.red(nbrItems) + " items..." );

    iterationCount = 0;
    result = selection(nbrItems,nbrToSelect);
    console.log("Final result is: " + chalk.green(result));
    console.log("Iteration Done: " + iterationCount);

    iterationCount = 0;
    result = selectionDP(nbrItems,nbrToSelect);
    console.log("Final result is: " + chalk.green(result));
    console.log("Iteration Done: " + iterationCount);

    

}


main();
