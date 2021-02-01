//main func to render the model to the dom.
function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

//the func get location such as: {i: 2, j: 7} and value (string) and render the cell;
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.classList.add('color');

  elCell.innerHTML = value;
}

function renderGhost(location, value, color = 'magenta') {

  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;

  var elSpan = document.querySelectorAll('td span');
  for (let i = 0; i < gGhosts.length; i++) {
    elSpan[i].style.color=color;
    console.log(elSpan);
  }

}

//func to get random num
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//func to get random color;
function getRandomColor() {

  var colors = ['red', 'blue', 'yellow', 'orange', 'magenta'];
  var randomInt = getRandomIntInclusive(0, 4);

  return colors[randomInt];
  //the css after att() -- didnt work with this string
  // var letters = '0123456789ABCDEF';
  // var color = '#';
  // for (var i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
}

