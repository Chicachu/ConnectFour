import React, {useState, useEffect} from "react";
import './ConnectFour.css'
import ConnectFour from './ConnectFour';

/*
	A game of connect four where both players are human.
*/
function ConnectFourTwoPlayer(props)  {

	// When a player clicks a cell, change the state of the bottom most cell of the row they clicked on to show their piece. 
	// For every move, check the state of the board for a winner or a draw. If there is a winner or a draw, announce the winner and set gameOver true. 
	// If no winner or draw, set the new current player. 
	const makeMove = (c, board, currentPlayer) => {
		// starting from the bottom row, move upward the column until there is an empty space to fill. 
		for (let r = 5; r >= 0; r--) {
			if (!board[r][c]) {
				board[r][c] = currentPlayer;
				break;
			}
		}
		
		return board;
	}
	
	return (
		<div>
			<header className='playerDefinition'><span className='blueText'>Player 1 is the blue player.</span><span className='redText'>Player 2 is the red player.</span></header>
			<ConnectFour makeMove={makeMove} computer="false" />
		</div>
	);
}

export default ConnectFourTwoPlayer;