import React , { useEffect } from 'react';
import { Canvas } from './Canvas.jsx';

import { isValidNbrRows, isValidString, zigzagAlgo } from './algo.js';



import './App.css';


function HeaderSection ()  {
  return ( 
    <div id="header-section">
      <span>Zig-Zag Algo!!</span>
    </div>
  );
}

function DetailsSection ()  {

 



  return ( 
    <div id="details-section">
        <button type="button" id="collapse-button" className="collapsible">Open Collapsible</button>
        <div id="details-text">
          <div>
              <span>The ZigZag  conversion algorightm, when a string is encoded  a non regular matrix. For instance, the string</span>
              <span>"ALGORITHMOFTHEDAYTOCODE"</span>
              <span>will be encode as the follwing:</span>
          </div>
          <div className='matrix-display'>
              <div>A</div><div>L</div><div>G</div><div>O</div>
              <div>.</div><div>R</div><div>I</div><div>.</div>
              <div>T</div><div>H</div><div>O</div><div>F</div>
              <div>.</div><div>T</div><div>H</div><div>.</div>
              <div>E</div><div>D</div><div>A</div><div>Y</div>
              <div>.</div><div>T</div><div>O</div><div>.</div>
              <div>C</div><div>O</div><div>D</div><div>E</div>          
          </div>
          <div><span>The matrix in this case has 4 rows, but for each odd column, the first and last row are empty, so only 2 items are placed in the column.</span></div>
          <div><span>The letters of the string to be encored are added to the zigzig matrix, from top to bottom.</span></div>
          <div><span>And the final read of the result, is done using the rows, from left to right:</span></div>
          <div><span>'A T E CLRHTDTOGIOHAODO F Y E'</span></div>
        <div>
    </div>
    </div>
    </div>
  );
}



function InputSection ()  {

  useEffect( () =>  {
      document.getElementById("text-to-encrypt").value = 'abcdefghijklmnopqrstvwxyzabcdefghijklmnopqrstvwxyz';

    },   []  );


    function handleChange(event) {
      console.log(event.target.value);

      let stringLen = 0;
      const textToEncrypt = document.getElementById("text-to-encrypt").value;

      if (textToEncrypt === null )  
        stringLen = 0;
      else 
        stringLen = textToEncrypt.length;
  
      document.getElementById("text-size").value =  stringLen;
    }
    

    return ( <div id="input-section">
               <div id="input-section-inner">
                  <div className="input-section-grid-item">Text to encrypt</div>
                  <div className="input-section-grid-item"><input type="text" id="text-to-encrypt" className="large-input" name="fname" onChange={handleChange}/> </div>

                  <div className="input-section-grid-item">Text Size</div>
                  <div className="input-section-grid-item"><input type="text" id="text-size" className="small-input" name="fname"  width="5" />  </div>                  
                  <div className="input-section-grid-item">Row Size</div>
                  <div className="input-section-grid-item"><input type="text" id="row-count" className="small-input" name="fname"  width="3" />  </div>                  
                </div>
          </div>);
  
  }
  


function ButtonSection ()  {

    const encodeButtonHandler = () => {
          console.log('Encode Button clicked');

          const textToEncrypt = document.getElementById("text-to-encrypt").value;
          const rowSize =  parseInt(document.getElementById("row-count").value);

          if ( !isValidString(textToEncrypt) ) {
            alert("The string is either empty or too short\nThe minium lenght is 10 characters");
            return;
           }

          if ( !isValidNbrRows(rowSize) ) {
              alert("The number of row is incorrect\nThe minum is 3 rows");
              return;
           }

          //zigzagAlgo(4,"Encrupt this message my friend!");
          const resultArray = zigzagAlgo(rowSize,textToEncrypt);
          console.log(resultArray); 
          
    }
    

    const resetButtonHandler = () => {
      console.log('reset Button clicked');

      document.getElementById("text-to-encrypt").value = '';
      document.getElementById("row-count").value = '';
    }




    return (<div id="button-section">
              <div className="button-container">
                  <div><button className='action-button'  onClick={encodeButtonHandler}>Encode</button></div>
                  <div><button className='action-button'  onClick={resetButtonHandler}>Clear</button></div>
              </div>
            </div>);
}

function App() {

  useEffect( () =>  {
    
    console.log("UseEffect of DetailsSection");
    const collapseButton = document.getElementById("collapse-button");

    collapseButton.addEventListener("click", function() {
          console.log("Click");

          const detailsText = document.getElementById("details-text");
          if (detailsText.style.display === "block") 
            detailsText.style.display = "none";
          else
            detailsText.style.display = "block";


      }
    );
  },   []  );

  
  return (
    <div   onLoad="myScript()"  className="App">
      <HeaderSection />
      <DetailsSection />
      <InputSection />
  
      <ButtonSection />
    
    </div>
  );
}

export default App;
