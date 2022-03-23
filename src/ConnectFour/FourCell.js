import Cell from "./Cell.js";

/*
	A span of 4 cells that have at least 2 of the players cells, or 3 for the computer player.
	This is used to determine how important it is for the computer player
	to make a move to block the player from winning, or to win itself. 
*/
export const WEIGHTS = {
	low : 2,
	medium : 4, 
	high : 10
}

export default class FourCell {
	constructor(cells, weight) {
		this.cells = cells;
		// If the player has 2 cells filled, and the other 2 are empty, this carries a weight of 2.
		// If the player has 3 cells filled, and the other is empty, this carries a weight of 4. 
		// If the computer has 3 in a row and will win in the next turn, this carries a weight of 10. 
		this.weight = weight;
	}
	
	getNullCells() {
		let nullCells = [];
		this.cells.forEach(cell => {
			if (cell.value === null) {
				nullCells.push(cell);
			}
		});
		return nullCells;
	}
}