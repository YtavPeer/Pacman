'use strict'
const GHOST = '👻';

var gGhosts;
var gIntervalGhosts;

// we craete ghost object with location object and currCellContent and push the the ghosts array, 
//then update the board model with the ghost.
function createGhost(board) {
    var ghost = {
        location: {
            i: 2,
            j: 4
        },
        color: getRandomColor(),
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST;
    //init the array for the killed ghost;
}

// we create array of ghost and call the create ghost func (3 times), then we set move ghost interval;
function createGhosts(board) {
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

// TODO: loop through ghosts and move ech ghost
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        moveGhost(currGhost)
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    //we get {i= 1 , j=0};
    var moveDiff = getMoveDiff()

    // we init next location (connect the ghost current location with the dif).
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    //we save var "nextCellContent" with the cell str of the next location from the model;
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move dont do nothing if wall or ghost meet ghost
    if (nextCellContent === WALL) return
    if (nextCellContent === GHOST) return

    // TODO: hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        gameOver()
        return
    }

    // TODO: update the model board last cell location of the ghost-  with the ghost.currCellContent (food)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM last place of ghost with the curr cell content of ghost;
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost -update the ghost object with the new location (the next location);
    ghost.location = { i: nextLocation.i, j: nextLocation.j }

    //update the model ghost curr cell with the cell str of the next move (we save this str before);
    ghost.currCellContent = nextCellContent

    // TODO: update the model board with the new location of ghoost
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM render the ghost to the new place
    if (gPacman.isSuper) {
        //render next place
        renderGhost(nextLocation, getGhostHTML(ghost), 'blue')
    } else {
        renderCell(nextLocation, getGhostHTML(ghost))
    }
}

//the func return object location randomly -move only one step one way ( i: 1 , j: 0);
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

//func that return span element with the ghost str
function getGhostHTML(ghost) {
    return `<span class=${ghost.color} data-color=${ghost.color}>${GHOST}</span>`
}