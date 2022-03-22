/*
	Represents a single cell on the Connect Four board.
*/
export default class Cell {
	constructor(row, column, value) {
		this.row = row;
		this.column = column;
		// can be null for an empty space, 1 for player1, or 2 for player2.
		this.value = value;
	}
}