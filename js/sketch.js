let playfield, fallingPiece, ghostPiece, paused;
let ghostMode = true;

const width = 10;
const height = 22;
let magic;
let totalWidth;
let totalHeight;
let sideBarWidth = 100;
let newFrameReady = false;
let canvas 
function setup() {

	playfield = new Playfield(width, height);

	totalWidth = playfield.cellSize * width + playfield.borderSize * 2 + 2 * sideBarWidth;
	totalHeight = playfield.cellSize * height + playfield.borderSize * 2 + 2 * sideBarWidth;

	magic = new Magic(totalWidth, totalHeight);


	canvas = createCanvas(totalWidth, totalHeight);
	canvas.attribute('style','display: none;');

	spawnNewPiece();

	noStroke();

}


let prev = 0;
function draw() {

	//============================
	// Get time passed since last frame
	//============================

	let curr = millis();
	let delta = curr - prev;
	prev = curr;

	//============================
	// Update
	//============================

	if (!paused)
		fallingPiece.update(delta);

	// move down piece and spawn a new one
	// if necessary
	if (fallingPiece.timeToFall()) {
		fallingPiece.resetBuffer();
		fallingPiece.moveDown();

		if (!playfield.isValid(fallingPiece)) {
			fallingPiece.moveUp();
			spawnNewPiece();
			
		}
		redraw();
		magic.redraw_magic_eye();
	}

	// copy falligPiece's location and
	// orientation, then hardDrop() it
	// if ghostMode is on

	ghostPiece.copy(fallingPiece)
	hardDrop(ghostPiece, playfield);


	playfield.clearLines();let setGradient = (x, y, w, h, c1, c2, axis) => {
		push()
		noFill();
	  
		if (axis === "Y_AXIS") {
		  // Top to bottom gradient
		  for (let i = y; i <= y + h; i++) {
			let inter = map(i, y, y + h, 0, 1);
			let c = lerpColor(c1, c2, inter);
			stroke(c);
			line(x, i, x + w, i);
		  }
		} else if (axis === "X_AXIS") {
		  // Left to right gradient
		  for (let i = x; i <= x + w; i++) {
			let inter = map(i, x, x + w, 0, 1);
			let c = lerpColor(c1, c2, inter);
			stroke(c);
			line(i, y, i, y + h);
		  }
		}
		pop()
	  }
	  
	background(150);

	playfield.show();
	if (ghostMode) ghostPiece.show();
	fallingPiece.show();


	if (newFrameReady == true)
	{
		//magic.redraw_magic_eye();
		newFrameReady = false;
	}
	//magic.redraw_magic_eye();

}

function spawnNewPiece() {
	if (fallingPiece) {
		playfield.addToGrid(fallingPiece);
	}

	const pieces = ['O', 'J', 'L', 'S', 'Z', 'T', 'I']
	const choice = random(pieces);
	fallingPiece = new Piece(choice, playfield);

	ghostPiece = new Piece(choice, playfield);
	ghostPiece.isghost = true;
	ghostPiece.cells = fallingPiece.cells;

	redraw();

}

function hardDrop(piece, playfield) {

	// move down as long as current position is valid
	while (playfield.isValid(piece)) {
		piece.moveDown();
	}

	// in the last iteration the position isn't valid,
	// so move up
	piece.moveUp();

}


function toggleGhost() {
	ghostMode = !ghostMode;
}

let debug_mode = false
function keyPressed() {
	// for alphabet keys
	switch (key.toLowerCase()) {

		case ' ':
			hardDrop(fallingPiece, playfield);
			spawnNewPiece();
			break;

		case 'r': magic
			break;


		// Rotation
		// --------

		case 'z':
			fallingPiece.rotateCCW();
			// if not valid, rotate back
			if (!playfield.isValid(fallingPiece))
				fallingPiece.rotateCW();
			break;

		case 'x':
			fallingPiece.rotateCW();
			// if not valid, rotate back
			if (!playfield.isValid(fallingPiece))
				fallingPiece.rotateCCW();
			break;


		// TestinghardDrop
			fallingPiece.y--;
			break;

		case 'n':
			spawnNewPiece();
			break;
		case 'y':
			debug_mode= !debug_mode
			if(debug_mode){
				canvas.attribute('style','display: none;');
			}else{
				canvas.attribute('style','');
			}

			break;

	}

	// non-ASCII keys
	switch (keyCode) {
		// movement controls in html file
		// to handle repeated movement

		case UP_ARROW:
			fallingPiece.rotateCW();

			// if not valid, rotate back
			if (!playfield.isValid(fallingPiece))
				fallingPiece.rotateCCW();

			break;

	}

	redraw();
	magic.redraw_magic_eye();
}
