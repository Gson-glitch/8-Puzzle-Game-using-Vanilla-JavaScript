"use strict";

const subTiles = document.querySelectorAll('.subtile'); 
const btn = document.querySelector('.btn');
let myArray = ["1", "2", "3", "8"," ", "4", "7", "6", "5"];
let goalState = ["1", "2", "3", "8"," ", "4", "7", "6", "5"];
let i = 0;
let emptyIndex, currentIndex, c;
let gameStarted = false;
let gameEnded = false;

window.onload = () => {
    subTiles.forEach(tile => {
        //use strict;
        tile.innerHTML = myArray[i];
        i++;
    })
}

// Adding an Event Listener to each subtile
subTiles.forEach(tile => tile.addEventListener('click', tileClick));

function tileClick(e) {
    emptyIndex = getIndexOfEmptyTile();
    for(let b=0; b<9; b++) {
        if(myArray[b] == e.target.innerHTML) {
            currentIndex = b;
        }
    }
    c = 0;
    // Make sure that only tiles adjacent to each other can be swapped
    if (Math.abs(currentIndex - emptyIndex) == 1 || Math.abs(currentIndex - emptyIndex) == 3) {
        if ((currentIndex==2 && emptyIndex==3 || currentIndex==3 && emptyIndex==2) || (currentIndex==5 && emptyIndex==6 || currentIndex==6 && emptyIndex==5)) {
            return;
        }
        myArray[emptyIndex] = myArray[currentIndex];
        myArray[currentIndex] = " ";
        updateTiles();
        checkWin();
    }
}

// Get the index of the empty tile
function getIndexOfEmptyTile() {
    for(let a=0; a<9; a++) {
        if(myArray[a] == " ") {
            return a;
        }
    }
}

// Update the Tiles
function updateTiles() {
    subTiles.forEach(tile => {
        tile.innerHTML = myArray[c];
        c++;
    })
}

// Making the puzzle solvabe in two moves after shuffle
const shuffleBtn = document.querySelector('.btn');
shuffleBtn.addEventListener('click', shuffleFunc);

// Shuffle the tiles
function shuffleFunc() {
    gameStarted = true;
    for (let i = myArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    }
    c = 0;
    updateTiles();
    if (gameEnded == true) {
        window.location.reload();
    }
}


// Check if the player has won
function checkWin() {
    if(gameStarted == true && JSON.stringify(goalState)==JSON.stringify(myArray)) {
        document.querySelector('.main_tile').style.display='none';
        document.querySelector('.victory').style.display='block';
        btn.style.display='block';
        btn.innerHTML = 'Restart';
        gameEnded = true;
    }
}
