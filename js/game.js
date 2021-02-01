'use strict'
const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '🥑';
const CHERRY = '🍒'

var cherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    foodAvailable: 56
}

function init() {
    console.log('game init')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gGame.score = 0;
    gGame.foodAvailable = 56;
    console.log('food counter', gGame.foodAvailable);
    clearInterval(cherryInterval);
    cherryInterval = setInterval(createCherry, 15000);
}

function createCherry() {
    var randomRow = getRandomIntInclusive(1, 8);
    var randomCol = getRandomIntInclusive(1, 8);
    if (gBoard[randomRow][randomCol] === EMPTY) {
        //update the model
        gBoard[randomRow][randomCol] = CHERRY;
        //update the model
        renderCell({ i: randomRow, j: randomCol }, CHERRY);
    } else {
        createCherry()
    }
};

//func to create the model of the board;
function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gGame.foodAvailable++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gGame.foodAvailable--
            }
            //handle the power food
            if (i === 1 && j === 1 || i === SIZE - 2 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || i === 1 && j === SIZE - 2) {
                board[i][j] = POWER_FOOD;
            }
        }
    }
    //count down also the place for pacman
    gGame.foodAvailable--
    return board;
}

// update the score: model + dom 
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

//reste the score back to 0;
function resetGame() {
    //reset the score and update the model
    gGame.score = 0;
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score

    //reset the food counter
    gGame.foodAvailable = 0;
}

// func that handle the game over
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    //handle display of the game over modal;
    var elDiv = document.querySelector('.game-over');
    elDiv.style.display = 'block';
}

//happend when we collect all ball
function victory() {
    console.log('victory');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    //handle display of the game over modal;
    var elDiv = document.querySelector('.game-done');
    elDiv.style.display = 'block';
}

//function to handle the restart buttom;
function reStart() {
    var elGameOver = document.querySelector('.game-over');
    elGameOver.style.display = 'none';
    var elGameDone = document.querySelector('.game-done');
    elGameDone.style.display = 'none';
    resetGame();
    init();
}

