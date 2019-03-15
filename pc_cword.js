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
}

// Formats the colors of the crossword table cells and clues 
function formatPuzzle(puzzleLetter) {
      // Changes the value of currentLetter to puzzleLetter. 
      currentLetter = puzzleLetter;

      // Removes the current colors in the puzzle by looping through all items in the allLetters object collection, changing the background color of each. 
      for (let i = 0; i < allLetters.length; i++) {
            allLetters[i].style.backgroundColor = "";
      }

      // Removes the highlighting of the current clues 
      acrossClue.style.color = "";
      downClue.style.color = "";

      // Tests whether there is an across clue for the current letter
      if (currentLetter.dataset.clueA != undefined) {
            // Sets acrossClue to reference the element with the ID value "currentLetter.dataset.cluaA" 
            acrossClue = document.getElementById(currentLetter.dataset.clueA);

            // Changes the color style fo acrossClue to blue 
            acrossClue.style.color = "blue";

            // Sets wordLetters to reference all elements selected by a CSS selector using a variable 
            //wrong
            wordLetters = document.querySelectorAll("data-clue-A currentLetter.dataset.clueA");

            // Changes the background-color style of every item in wordLetters to a light blue color 
            for (let i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(231,231,255)";
            }
      }

      // Tests whether there is an down clue for the current letter
      if (currentLetter.dataset.clueD != undefined) {
            // Sets downClue to reference the element with the ID value "currentLetter.dataset.clueD" 
            downClue = document.getElementById(currentLetter.dataset.clueD);

            // Changes the color style fo downClue to red 
            acrossClue.style.color = "blue";

            // Sets wordLetters to reference all elements selected by a CSS selector using a variable 
            //wrong
            wordLetters = document.querySelectorAll("data-clue-D currentLetter.dataset.clueD");

            // Changes the background-color style of every item in wordLetters to a light red color 
            for (let i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(255, 231,231)";
            }
      }
}



formatPuzzle();




/*====================================================*/

function getChar(keyNum) {
      return String.fromCharCode(keyNum);
}