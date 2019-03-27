"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Connor J Webdale 
   Date: 3.15.19 

   Filename: pc_cword.js 
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/
// References all letters in the crossword puzzle 
var allLetters;

// Used to reference the letter currently selected in the puzzle 
var currentLetter;

// References the letters used in the currently sselected across and down clues 
var wordLetters;

// Used to reference the across clue currently selected in the puzzle 
var acrossClue;

// References the down clue currently selected in the puzzle 
var downClue;

// Stores the current typing direction(right/down) with an initial value of "right" 
var typeDirection = "right";

// Runs the init() function when the page loads. 
window.onload = init();

// Sets up the inital conditions of the puzzle 
function init() {
      // Sets allLetters to reference the elements using the selector table#crossword span. 
      allLetters = document.querySelectorAll("table#crossword span");

      // Sets currentLetter to reference the first object in allLetters collection 
      currentLetter = allLetters[0];

      // Sets the acrossID variable to the value of the data-clue-a attribute for currentLetter 
      var acrossID = currentLetter.getAttribute("data-clue-a");

      // Sets the downID variable to the value of the data-clue-d attribute for currentLetter. 
      var downID = currentLetter.getAttribute("data-clue-d");

      // Set the value of acrossClue to reference the element with the id "across". 
      acrossClue = document.getElementById(acrossID);

      // Set the value of downClue to reference the element with the id "down". 
      downClue = document.getElementById(downID);

      // Colors the crossword puzzle's first letter by calling the formatPuzzle() function using currentLetter as the parameter value 
      formatPuzzle(currentLetter);

      // Loops through the items in the allLetters object collection 
      for (var i = 0; i < allLetters.length; i++) {
            // Changes the cursor style to pointer
            allLetters[i].style.cursor = "pointer";

            // Adds "onmousedown" event handler that runs an anonymous function calling the formatPuzzle() function 
            allLetters[i].addEventListener("mousedown", function () {
                  // i dont think this is right 
                  // it's definately not right 
                  formatPuzzle();
            });
      }


      // Runs the selectLetter() function in response to the "keydown" event occuring within the document. 
      document.addEventListener("keydown", selectLetter);

      // Declares a variable referencing an element with the ID "directionImg"
      var typeImage = document.getElementById("directionImg");

      // Changes the cursor style of typeImage to "pointer"
      typeImage.style.cursor = "pointer";

      // Runs the switchTypeDirection() function when the typeImage is clicked 
      typeImage.addEventListener("click", switchTypeDirection);

      // Adds a "click" event handler to the init() function that runs commands when the Show Errors button is clicked. 
      document.getElementById("showErrors").addEventListener("click", function () {
            for (var i = 0; i < allLetters.length; i++) {
                  // If the text content of an item does not match the value of the letter's dataset.letter property, the text color is set to red. 
                  if (currentLetter.innerText != currentLetter.dataset.letter) {
                        currentLetter.style.color = "red";
                  }
            }

            // After a 3 second interval, the color style for all items in the allLetters collection is set to an empty text string. 
            setTimeout(
                  function () {
                        for (var i = 0; i < allLetters.length; i++) {
                              allLetters[i].style.color = "";
                        }
                  }, 3000);

      });

      // Adds an click event handler to the Show Solution button. 
      document.getElementById("showSolution").addEventListener("click", function () {
            // Goes through all items in the allLetters collection
            for (var i = 0; i < allLetters.length; i++) {
                  // Changes to default color 
                  allLetters[i].style.color = "";

                  // Sets the text content of each item to the value of the letter's dataset.letter property. 
                  allLetters[i].innerHTML = allLetters[i].dataset.letter;
            }
      });
}

// Formats the colors of the crossword table cells and clues 
function formatPuzzle(puzzleLetter) {
      // Changes the value of currentLetter to puzzleLetter. 
      currentLetter.value = puzzleLetter;

      // Removes the current colors in the puzzle by looping through all items in the allLetters object collection, changing the background color of each. 
      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.backgroundColor = "";
      }

      // Removes the highlighting of the current clues 
      acrossClue.style.color = "";
      downClue.style.color = "";

      // Tests whether there is an across clue for the current letter
      if (currentLetter.dataset.clueA != undefined) {
            // Sets acrossClue to reference the element with the ID value "currentLetter.dataset.clueA" 
            acrossClue = document.getElementById(currentLetter.dataset.clueA);

            // Changes the color style for acrossClue to blue 
            acrossClue.style.color = "blue";

            // Sets wordLetters to reference all elements selected by a CSS selector using a variable 
            wordLetters = document.querySelectorAll("[data-clue-A=acrossClue]");

            // Changes the background-color style of every item in wordLetters to a light blue color 
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(231,231,255)";
            }
      }

      // Tests whether there is an down clue for the current letter
      if (currentLetter.dataset.clueD != undefined) {
            // Sets downClue to reference the element with the ID value "currentLetter.dataset.clueD" 
            downClue = document.getElementById(currentLetter.dataset.clueD);

            // Changes the color style of downClue to red 
            downClue.style.color = "red";

            // Sets wordLetters to reference all elements selected by a CSS selector using a variable 
            wordLetters = document.querySelectorAll("[data-clue-D=downClue]");

            // Changes the background-color style of every item in wordLetters to a light red color 
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(255, 231,231)";
            }

      }

      // Indicates the typing direction for the current letter by changing the color depending on the value of typeDirection 
      if (typeDirection === "right") {
            currentLetter.style.color = "rgb(191,191,255)";
      } else {
            currentLetter.style.color = "rgb(255, 191, 191)";
      }
}

// Selects puzzle cells using the keyboard 
function selectLetter(target) {
      // Declares variables and sets their values to reference letters to the left, above, right of, and below current selected letters. 
      var leftLetter = currentLetter.dataset.left;
      var upLetter = currentLetter.dataset.up;
      var rightLetter = currentLetter.dataset.right;
      var downLetter = currentLetter.dataset.down;

      // Stores the code of the key pressed by the user 
      var userKey = target.keyCode;

      // Determines what to do based on which key was pressed 
      if (userKey === 37) {
            // Calls the formatPuzzle() function using leftLetter as the parameter value 
            formatPuzzle(leftLetter);
      } else if (userKey === 38) {
            // Calls the formatPuzzle() with the upLetter variable. 
            formatPuzzle(upLetter);
      } else if (userKey === 39 || userKey === 9) {
            // Calls the formatPuzzle() with the rightLetter variable
            formatPuzzle(rightLetter);
      } else if (userKey === 40 || userKey === 13) {
            // Calls the formatPuzzle() with the downLetter variable 
            formatPuzzle(downLetter);
      } else if (userKey === 8 || userKey === 46) {
            // Deletes the text content of currentLetter; 
            currentLetter.innerHTML = "";
      } else if (userKey === 32) {
            // Runs the switchTypeDirection() function to change the typing direction
            switchTypeDirection();
      } else if (userKey >= 65 && userKey <= 90) {
            // Writes the character pressed into the cell 
            currentLetter.innerHTML = getChar(userKey);

            // If typeDirection is "right", move to the next cell by calling the formatPuzzle() with the rightLetter variable. Otherwise goes to the next cell by calling the formatPuzzle() variable with the downLetter variable 
            if (typeDirection == "right") {
                  formatPuzzle(rightLetter);
            } else {
                  formatPuzzle(downLetter);
            }
      }

      // Prevents the browser from performing the default action in response to the keyboard event. 
      target.preventDefault();
}

// Toggles the typing direction between right and down. 
function switchTypeDirection() {
      // Declares the variable "typeImage" that points to the element with the ID "directionImg". 
      var typeImage = document.getElementById("directionImg");

      // Tests the value of the typeDirection variable 
      if (typeDirection === "right") {
            // Changes typeDirection to "down" 
            typeDirection = "down";
            // Changes the src attribute of typeImage 
            typeImage.src = "pc_right.png";
            // Changes the background color of currentLetter to a red color 
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      } else {
            // Changes typeDirection to "right"
            typeDirection = "right";
            // Changes the src attribute of typeImage 
            typeImage.src = "pc_down.png";
            // Changes the background color of currentLetter 
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      }
}



/*====================================================*/

function getChar(keyNum) {
      return String.fromCharCode(keyNum);
}