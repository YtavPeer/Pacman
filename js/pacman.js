'use strict'
var PACMAN = '⬆️';

var gPacman;


//the func init the global pacman object with location object and update the model with the pacman location 
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

//main func to move the padman.
function movePacman(ev) {
    if (!gGame.isOn) return

    //we get location object with the wanted location to move. example: {i = 4, j= 5}
    var nextLocation = getNextLocation(ev)
    //we save the "str-cell" of the next location from the board model;
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST) {

        if (gPacman.isSuper) {
            //handle pacman meet ghost when he have super power
            killGhost(nextLocation)

        } else {
            gameOver()
            return
        }

    } else if (nextCell === POWER_FOOD) {
        //handle eating power food twice
        if (gPacman.isSuper) return
        //give the power to pacman and update score
        givePower();
        updateScore(1)
        //remove the power after 5 sec
        setTimeout(removePower, 5000)
    } else if (nextCell === CHERRY) {
        updateScore(10)
    }

    //handle voctory
    if (gGame.foodAvailable === 0) {
        console.log('win');
        victory();
    }

    //the update score func update the model+dom
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodAvailable--;
        console.log('food:', gGame.foodAvailable)
    }

    // TODO: update the model last place of pacman with empty str
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM of the pacman last location with empty
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman (update the global model of pacman.location to the next location )
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }

    // TODO: update the model board with the pacman new location
    gBoard[nextLocation.i][nextLocation.j] = PACMAN

    // TODO: update the DOM (render the new place of pacman)
    renderCell(nextLocation, PACMAN)
}

// figure out nextLocation
function getNextLocation(eventKeyboard) {
    //we init object next location first with the same pacman location from the model.
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            PACMAN = '⬆️';
            nextLocation.i--
            break
        case 'ArrowDown':
            PACMAN = '⬇️';
            nextLocation.i++
            break
        case 'ArrowLeft':
            PACMAN = '⬅️';
            nextLocation.j--
            break
        case 'ArrowRight':
            PACMAN = '➡️';
            nextLocation.j++
            break
    }
    return nextLocation;
}

//give power to pacman
function givePower() {
    //change global to power
    gPacman.isSuper = true;
}

//remove power from pacman
function removePower() {
    //update the global- remove power
    gPacman.isSuper = false;
    bringGhostBack();
}

//function to remove the ghost if meet pacman
function killGhost(location) {
    for (let i = 0; i < gGhosts.length; i++) {
        if (location.i === gGhosts[i].location.i && location.j === gGhosts[i].location.j) {
            //save the last current place of ghost and cheack if it food- update the score
            var currentContent = gGhosts[i].currCellContent;
            if (currentContent === FOOD) {
                updateScore(1);
            }
            //update the model board
            gBoard[gGhosts[i].location.i][gGhosts[i].location.j] = PACMAN;
            //update the ghost from the array
            var tempKillGhosts = gGhosts.splice(i, 1);
            gKilledGhosts.push(tempKillGhosts);
        }
    }
}

function bringGhostBack() {
    if (gGhosts.length < 3) {
        createGhost(gBoard);
    } else if (gGhosts.length < 2) {
        createGhost(gBoard);
        createGhost(gBoard);
    }
}

