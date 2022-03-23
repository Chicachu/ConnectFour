import ConnectFour from './ConnectFour';
import {useState, useEffect} from 'react';
import FourCell from './FourCell.js';
import Cell from './Cell.js';
import {useParams} from 'react-router-dom';

/* 
	A game of Connect Four where one player is a human and the other is a computer.
	The computer will look 1 move ahead by looking at various conditions: 
	
	1) Can the computer win? 
	2) Is the player about to win and need to be blocked? 
	3) Is the player in a position where they could win in 2 moves if the computer doens't 
		block their piece now?
		
	Future TODO: Have the computer look 2-3 moves ahead (all 64 or 512 possibilities) by utilizing a MinMax tree. 
*/
function ConnectFourOnePlayer(props) {
	const [fourCellSpans, setFourCellSpans] = useState([]);
	const [numMoves, incrementMoves] = useState(1);
	
	const {p1color} = useParams();
	const [computerColor] = useState(() => {
		return p1color === "blue" ? "red" : "blue";
	});
	
	const makeMove = (c, board, currentPlayer) => {
		// If human player, drop their piece where those chose to put it, otherwise, handle computer player logic. 
		if (currentPlayer === 1) {
			// starting from the bottom row, move upward the column until there is an empty space to fill. 
			placeToken(c, board, currentPlayer);
		} else if (currentPlayer === 2) {
			// Computer players first move, whether as first or second player, will take the middle column.
			if (numMoves === 1 || numMoves === 2) {
				placeToken(3, board, currentPlayer);
			} else {
				// To determine if the computer can win, or if the player needs to be blocked, 
				// create a snapshot of all spans of 4 cells that are important.
				createSnapshot(board);
				if (fourCellSpans.length > 0) {
					fourCellSpans.sort((a,b) => (a.weight < b.weight) ? 1 : -1);
					
					let heighestWeight = fourCellSpans[0].weight;
					switch(heighestWeight) {
						// In either weight 10 or 4 case, if there are more than 1 option, it doesn't matter which one we take. 
						case 10: 
						case 4: 
							placeToken(fourCellSpans[0].getNullCells()[0].column, board, currentPlayer);
							break;
						// In weight 2 case, we have multiple options for null, so pick a random one.
						case 2: 
							let nullCells = fourCellSpans[0].getNullCells();
							let ranCellIndex = Math.floor(Math.random() * (nullCells.length));
							placeToken(nullCells[ranCellIndex].column, board, currentPlayer);
							break;
					}
					
					// reset move options for next turn. 
					setFourCellSpans([]);
				} else {
					// If there are no 'smart' moves to play, just play a random piece... 
					let ranC = Math.floor(Math.random() * 7);
					placeToken(ranC, board, currentPlayer);
				}
			}
		}
		
		incrementMoves(numMoves + 1);
		return board;
	}
	
	const placeToken = (c, board, currentPlayer) => {
		for (let r = 5; r >= 0; r--) {
			if (!board[r][c]) {
				board[r][c] = currentPlayer;
				break;
			}
		}
	}
	
	const createSnapshot = (board) => {
		createVerticalSpans(board);
		createHorizontalSpans(board);
		createDiagonalLeftSpans(board);
		createDiagonalRightSpans(board);
	}
	
	// Since the board fills up vertically, this is only an important span if 
	// the bottom 3 in the span are filled by either the first or second player. 
	const createVerticalSpans = (board) => {
		for (let r = 5; r >= 3; r--) {
			for (let c = 0; c < 7; c++) {
				if (board[r][c] !== null && 
					board[r][c] === board[r - 1][c] &&
				    board[r][c] === board[r - 2][c] &&
					board[r - 3][c] === null) {
					let cells = [new Cell(r, c, board[r][c]), new Cell(r - 1, c, board[r - 1][c]), 
						new Cell(r - 2, c, board[r - 2][c]), new Cell(r - 3, c, board[r - 3][c])];
					fourCellSpans.push(new FourCell(cells, 4));
				}
			}
		}
		
		return null;
	}
	
	const createHorizontalSpans = (board, currentPlayer) => {
		for (let r = 5; r >= 0; r--) {
			for (let c = 0; c < 4; c++) {
				let cells = [[r, c], [r, c + 1], [r, c + 2], [r, c + 3]];
				checkIfImportantSpan(board, cells);
			}
		}
	}
	
	// Can block player diagonally left if player 1 has 3 in a row diagonally left, and there
	// is either an empty space diagonally left up or down, and the column below the empty space is filled. 
	const createDiagonalLeftSpans = (board, currentPlayer) => {
		for (let r = 5; r >= 3; r--) {
			for (let c = 6; c >= 3; c--) {
				let cells = [[r, c], [r - 1, c - 1], [r - 2, c - 2], [r - 3, c - 3]];
				checkIfImportantSpan(board, cells);
			}
		}
	}
	
	// Can block player diagonally right if player 1 has 3 in a row diagonally right, and there 
	// is either an empty space diagonally right up or down, and the column below the empty space is filled.
	const createDiagonalRightSpans = (board, currentPlayer) => {
		for (let r = 5; r >= 3; r--) {
			for (let c = 0; c < 4; c++) {
				let cells = [[r, c], [r - 1, c + 1], [r - 2, c + 2], [r - 3, c + 3]];
				checkIfImportantSpan(board, cells);
			}
		}
	}
	
	// First checks to see if an immediate block is necessary (3 of 4 spaces filled by the player, with 1 empty in between.)
	// If that isn't the case, then check to see if there are at least 2 spaces of the 4 filled by the player.
	const checkIfImportantSpan = (board, cells) => {
		let counts = [];
		cells.forEach( cell => {
			let boardCell = board[cell[0]][cell[1]];
			if (counts[boardCell] === undefined) { 
				counts[boardCell] = [1, [cell]];
			}  else {
				let count = counts[boardCell][0];
				count += 1;
				counts[boardCell][1].push(cell);
				counts[boardCell] = [count, counts[boardCell][1]];
			}
		});
		
		// case where computer has 3 in a row and 1 null space. 
		if (counts[null] !== undefined && counts[2] !== undefined) {
			if (counts[null][0] === 1 && counts[2][0] === 3) {
				// It's only an important span if the next piece can be placed at the null spot 
				// i.e. as long as the column is filled up to the null piece. 
				if (isColumnFilledUpToRow(board, counts[null][1][0][0])) {
					let cellObjects = cells.map( cell => {
						return new Cell(cell[0], cell[1], board[cell[0]][cell[1]]);
					});
					fourCellSpans.push(new FourCell(cellObjects, 10));
				}
			}
		}
		
		// defensive cases: 
		if (counts[null] !== undefined && counts[1] !== undefined) {
			// Case where player has 3 within a 4 cell span and will win the very next turn. 
			if (counts[null][0] === 1 && counts[1][0] === 3) {
				if (isColumnFilledUpToRow(board, counts[null][1][0][0])) {
					let cellObjects = cells.map( cell => {
						return new Cell(cell[0], cell[1], board[cell[0]][cell[1]]);
					});
					fourCellSpans.push(new FourCell(cellObjects, 4));
				}
			}
			
			// Case where player has 2 within a span of 4, and if the player doesn't block
			// early, the player could win. 
			if (counts[null][0] >= 1 && counts[1][0] === 2) {
				if (isColumnFilledUpToRow(board, counts[null][1][0][0])) {
					let cellObjects = cells.map( cell => {
						return new Cell(cell[0], cell[1], board[cell[0]][cell[1]]);
					});
					fourCellSpans.push(new FourCell(cellObjects, 2));
				}
			}
		}
		
		return null; 
	}
	
	const isColumnFilledUpToRow = (board, r, c) => {
		for (let row = 5; row > r; row--) {
			if (board[row][c] === null) {
				return false;
			}
		}
		return true;
	} 
	
	const getPlayer1SpanInfo = () => {
		let className = p1color + "Text";
		return <span className={className}>You are player 1, the {p1color} player.</span>;
	}
	
	const getComputerSpanInfo = () => {
		let className = computerColor + "Text";
		return <span className={className}>The computer is player 2, the {computerColor} player.</span>;
	}
	
	return(
		<div>
			<header className='playerDefinition'>{getPlayer1SpanInfo()} {getComputerSpanInfo()}</header>
			<ConnectFour makeMove={makeMove} computer="true" p1color={p1color} />
		</div>
	);
}

export default ConnectFourOnePlayer;