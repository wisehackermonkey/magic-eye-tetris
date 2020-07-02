// Helper funciton 
// creddit goes to https://medium.com/front-end-weekly/matrix-rotation-%EF%B8%8F-6550397f16ab
const flipMatrix = matrix => (
  matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ))
);



const rotateMatrix = matrix => (
  flipMatrix(matrix.reverse())
);

const rotateMatrixCounterClockwise = matrix => (
  flipMatrix(matrix).reverse()
);

const flipMatrixCounterClockwise = matrix => (
  rotateMatrix(matrix).reverse()
);

function render_tetromino(grid, xoffset = 0, yoffset = 0, callback) {

  let endx = grid.length - 1
  let endy = grid[0].length - 1
  let stepx = height / box_width
  let stepy = height / box_height

  // generates serise of numbers with a offset value like 10,20,30, where the step is 10
  for (let x = 0, i = 0; x <= endx * stepx; i += 1, x = i * stepx) {
    for (let y = 0, j = 0; y <= endy * stepy; j += 1, y = j * stepy) {
      if (grid[i][j] === 1) {
        // allows for setting offset of all the rectangle's to  offset by n rectangles width and hieght
        callback(x + xoffset * stepx + center_line, y + yoffset * stepy, stepx, stepy)
      }
    }
  }
}

function rotate_2d_grid(tetronimoe) {
  return _.zip.apply(_, tetronimoe)
}


function copy_to_screen(tetronimo, grid, xoffset = 0, yoffset = 0) {
  if (xoffset < 0) throw (`xoffset is less than 0, xoffset=${xoffset}`)
  if (yoffset < 0) throw (`yoffset is less than 0, yoffset=${yoffset}`)

  for (var x = 0; x <= tetronimo.length - 1; x += 1) {
    for (var y = 0; y <= tetronimo[x].length - 1; y += 1) {
      try{
      if (tetronimo[x][y] === 1) {
        grid[x + xoffset][y + yoffset] = tetronimo[x][y]
      }}catch(e){
        console.error("outofbounds")
      }
    }
  }
  return grid
}


function render_grid(gamegrid, callback) {

  let endx = gamegrid.length - 1
  let endy = gamegrid[0].length - 1
  let stepx = height / box_width
  let stepy = height / box_height

  for (let x = 0, i = 0; x <= endx * stepx; i += 1, x = i * stepx) {
    for (let y = 0, j = 0; y <= endy * stepy; j += 1, y = j * stepy) {
      if (gamegrid[i][j] === 1) {
        callback(x + center_line, y, stepx, stepy)
      }
    }
  }
}

function get_tetronimoes() {
  return ({
    "i": [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    "j": [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    "l": [

      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],

    ],
    "o": [

      [1, 1],
      [1, 1],

    ],
    "s": [

      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],

    ],
    "t": [

      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],

    ],
    "z": [

      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],

    ],
    "test": [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],

    ],

  })
}