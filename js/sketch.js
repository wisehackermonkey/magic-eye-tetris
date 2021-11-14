let playfield, fallingPiece, ghostPiece, paused;
let ghostMode = true;

const width = 10;
const height = 22;
let magic;

function setup() {
	
	playfield = new Playfield(width, height);
	
	let totalWidth = playfield.cellSize * width + playfield.borderSize*2;
	let totalHeight = playfield.cellSize * height + playfield.borderSize*2;
	
	magic = new Magic(totalWidth, totalHeight);
	
	
	let canvas = createCanvas(totalWidth, totalHeight);
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
		
		magic.redraw_magic_eye();
		if (!playfield.isValid(fallingPiece)) {
			fallingPiece.moveUp();
			spawnNewPiece();

		}
	}

	// copy falligPiece's location and
	// orientation, then hardDrop() it
	// if ghostMode is on

	ghostPiece.copy(fallingPiece)
	hardDrop(ghostPiece, playfield);
	

	playfield.clearLines();
	
	//============================
	// Draw
	//============================
	
	background(251);
	
	playfield.show();
	if (ghostMode) ghostPiece.show();
	fallingPiece.show();

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


function keyPressed() {
	magic.redraw_magic_eye();
	// for alphabet keys
	switch (key.toLowerCase()) {
			
		case ' ':
			hardDrop(fallingPiece, playfield);
			spawnNewPiece();
			break;
			
		case 'r':magic
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
		
			
		// Testing
		// -------
		
		case 'w':
			fallingPiece.y--;
			break;
			
		case 'n':
			spawnNewPiece();
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



}
