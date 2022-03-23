import React, {useState, useEffect} from "react";
import './ConnectFour.css'
import {Link} from 'react-router-dom';

/*
	A game of connect four, alternating between players, a blue and a red player.
	Players click any column they want to "drop" their piece into, and the pieces will
	render at the bottom most available slot. 
	
	The game ends when one player wins, or if the entire connect four table fills up 
	without a winner. 
	
	The winning condition is to have 4 pieces in a row horizontally, vertically, 
	or diagonally in either direction. 
*/
function ConnectFour(props)  {
	const [player1] = useState(1);
	const [player2] = useState(2);
	const [p1color] = useState(props.p1color);
	const [p2color] = useState(() => {
		return p1color === "blue" ? "red" : "blue";
	});
	const [currentPlayer, setCurrentPlayer] = useState(player1);
	const [board, setBoard] = useState(() => {
		let board = [];
		for (let r = 0; r < 6; r++) {
			let row = [];
			for (let c = 0; c < 7; c++) {
				row.push(null);
			}
			board.push(row);
		}
		
		return board;
	});
	const [gameOver, setGameOver] = useState(false);
	const [message, setMessage] = useState(""); 
	const makeMove = props.makeMove;
	const computer = props.computer;
	
	useEffect(() => {
		if (message === "") {
			setMessage(getPlayerTurnMessage(currentPlayer));	
		}
	}, []);
	
	useEffect(() => {
		// Automatically take a turn if it's the computers turn.
		if (computer === "true" && currentPlayer === player2) {
			takeTurn(null, board, currentPlayer);
		}
		
	}, [currentPlayer]);
	
	// sets the message above the gameboard to show whose turn it is. 
	const getPlayerTurnMessage = (cplayer) => {
		let msg = '';
		switch(cplayer) {
			case 1: msg = "It is now the " + p1color + " player's turn!";
				break;
			case 2: msg = "It is now the " + p2color + " player's turn!";
		}
		return msg;
	}
	
	const takeTurn = (c, board, currentPlayer) => {
		if (gameOver) {
			setMessage("Game Over! Go back to the home page to create a new game.");
		} else {
			let tboard = makeMove(c, board, currentPlayer);
			
			// check the state of the board to see if someone has won. 
			let result = checkBoard(tboard);
			let msg = '';
			switch(result) {
				case player1: msg = "Player 1 (" + p1color + ") wins the game!";
					setBoard(board);
					setMessage(msg);
					setGameOver(true);
					break;
				case player2: msg = "Player 2 " + p2color + " wins the game!";
					setBoard(board);
					setMessage(msg);
					setGameOver(true);
					break;
				case 'draw': msg = "The game is a draw! Neither player wins. (Or both players win!)";
					setBoard(board);
					setMessage(msg);
					setGameOver(true);
					break;
				case null: 
					setBoard(board);
					let cplayer = currentPlayer === player1 ? player2 : player1;
					setCurrentPlayer(cplayer);
					setMessage(getPlayerTurnMessage(cplayer));
					break;
			}
		}
	}
	
	// Checks for several conditions: checks for a vertical win, checks for a horizontal win, 
	// checks for a diagonal right win, checks for a diagonal left win, or a draw if the entire board has been filled without a winner. 
	const checkBoard = (board) => {
		return checkVertical(board) || checkHorizontal(board) || 
			checkDiagonalRight(board) || checkDiagonalLeft(board) || checkForTie(board);
	}
	
	// check for 4 in a row vertically, starting from the bottom row.
	const checkVertical = (board) => {
		for (let r = 5; r >= 3; r--) {
			for (let c = 0; c < 7; c++) {
				if (board[r][c] && 
					board[r][c] === board[r - 1][c] &&
				    board[r][c] === board[r - 2][c] &&
					board[r][c] === board[r - 3][c]) {
						return board[r][c];
				}
				
			}
		}
		return null;
	}
	
	// check for 4 in a row horizontally, starting from the bottom row.
	const checkHorizontal = (board) => {
		for (let r = 5; r >= 0; r--) {
			for (let c = 0; c < 4; c++) {
				if (board[r][c] && 
					board[r][c] === board[r][c + 1] &&
				    board[r][c] === board[r][c + 2] &&
					board[r][c] === board[r][c + 3]) {
						return board[r][c];
				}
			}
		}
		return null;
	}
	
	// check for 4 in a row in a left diagonal, starting from bottom left. 
	const checkDiagonalLeft = (board) => {
		for (let r = 5; r >= 3; r--) {
			for (let c = 6; c >= 3; c--) {
				if (board[r][c] && 
					board[r][c] === board[r - 1][c - 1] &&
				    board[r][c] === board[r - 2][c - 2] &&
					board[r][c] === board[r - 3][c - 3]) {
						return board[r][c];
				}
				
			}
		}
		return null;
	}
	
	// check for 4 in a row in a right diagonal, starting from bottom right. 
	const checkDiagonalRight = (board) => {
		for (let r = 5; r >= 3; r--) {
			for (let c = 0; c < 4; c++) {
				if (board[r][c] && 
					board[r][c] === board[r - 1][c + 1] &&
				    board[r][c] === board[r - 2][c + 2] &&
					board[r][c] === board[r - 3][c + 3]) {
						return board[r][c];	
				}
					
			}
		}
		return null;
	}
	
	// A draw is when the entire table is full, but there are no winners (which are checked for first). If any spot is null, it will not be a draw.
	const checkForTie = (board) => {
		for (let r = 0; r < 6; r++) {
			for (let c = 0; c < 7; c++) {
				if (board[r][c] === null) {
					return null;
				}
			}
		}
		return 'draw';
	}
	
	// Individual rows within the game board, which defines each cell for the row
	// row - the row number
	// makeMove - a reference to the makeMove function
	const Row = ({row, takeTurn}) => {
		return(
			<tr>                                                                                   
				{row.map((cell, i) => <Cell key={i} value={cell} colIndex={i} takeTurn={takeTurn} />)}
			</tr>
		)
	};
	
	// The game board is divided into 7 columns and 6 rows, and is made up of Cells. 
	// value - the player number
	// colIndex - the index of the column
	// makeMove - a reference to the makeMove function
	const Cell = ({value, colIndex, takeTurn}) => {
		let color = 'white';
		
		if (value == 1) {
			color = p1color + 'Cell';
		} else if (value == 2) {
			color = p2color + 'Cell';
		}
		
		return(
			<td>
				<div className='cell' onClick={ () => takeTurn(colIndex, board, currentPlayer)}>
					<div className={color} />
				</div>
			</td>
		);
	};

	
	return (
		<div className="board">
			<header id="message">{message}</header>
			<table>
				<thead></thead>
				<tbody>
					{board.map((row, i) => (<Row key={i} row={row} takeTurn={takeTurn} />))}
				</tbody>
			</table>
			<Link to='/'><button>Return to Player Selection</button></Link>
		</div>
	);
}

export default ConnectFour; 