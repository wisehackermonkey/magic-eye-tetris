class Playfield {

	constructor(w, h) {
		// colors
		this.foreground = [255];
		this.background = [255];
		
		// dimensions and grid
		this.cols = w;
		this.rows = h;
		this.grid = [];
		this.resetGrid();
		
		let scale = 2;
		// drawing sizes
		this.cellSize = Math.floor(scale*21);
		this.borderSize = Math.floor(scale*3);

		// whether or not gridlines are seen
		this.gridlines = true;
	}

	addToGrid(piece) {
		
		for (let row = 0; row < piece.size; row++) {
			for (let col = 0; col < piece.size; col++) {
				
				if (piece.cells[row][col] != null) {
					let gridRow = piece.y + row;
					let gridCol = piece.x + col;

					this.grid[gridRow][gridCol] = 
						piece.cells[row][col];
				}
				
			}
		}
		
	}
	
	
	clearLines() {
		
		for (let row = this.rows-1; row >= 0; row--) {

			// if this row is full
			if (!this.grid[row].includes(this.foreground)) {
				// remove the row
				this.grid.splice(row, 1)
				// and add an empty row to the top
				this.grid.unshift(new Array(this.cols).fill(this.foreground));
			}
			
		}
		
	}
	
	isValid(piece) {
		
		for (let row = 0; row < piece.size; row++) {
			for (let col = 0; col < piece.size; col++) {
				
				if (piece.cells[row][col] != null) {
					
					let gridRow = piece.y + row;
					let gridCol = piece.x + col;
					
					if (gridRow < 0 || gridRow >= this.rows ||
							gridCol < 0 || gridCol >= this.cols ||
							this.grid[gridRow][gridCol] != this.foreground)
						return false;
				}
				
			}
		}

		return true;
		
	}
	
	
	resetGrid() {
		for (let i = 0; i < this.rows; i++) {
			this.grid[i] = new Array(this.cols).fill(this.foreground);
		}
	}
	
	
	show() {
		//===========================
		// Draw the rectangle behind all the cells
		// for the border and gridlines
		//===========================
	
		let bs = this.borderSize
		let cs = this.cellSize

		if (this.gridlines) fill(this.background);
		else fill(this.foreground);
		
		stroke(this.background)
		strokeWeight(bs);

		// offset the rectangle so that
		// top and right borders stay in canvas
		let offset = floor(bs / 2)
		rect(offset, offset, cs * this.cols + bs - 1, cs * this.rows + bs - 1)
		
		
		//===========================
		// End of big rectangle 
		//===========================
		
		
		//===========================
		// Draw cells over the big rectangle
		//===========================

		for (let row = 0; row < this.grid.length; row++) {
			for (let col = 0; col < this.grid[row].length; col++) {
				
				// offset the cells by the size of the border
				let offset = this.borderSize;
				
				let cs = this.cellSize;

				// this.grid contains the colors of each cell
				fill(this.grid[row][col]);
				
				noStroke();
				rect(cs * col + offset, cs * row + offset, cs - 1, cs - 1);
			}
		}
		
		//===========================
		// End of cells loop
		//===========================

		
	} // end of show()


}