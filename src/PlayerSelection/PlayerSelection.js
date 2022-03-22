import React from 'react';
import {Link} from 'react-router-dom';
import './playerSelection.css';

function PlayerSelection() {
	return(
		<div className="main">
			<header className="mainHeader">Welcome to Connect Four!</header>
			<header className="playerSelectionHeader"> Create a new game by selecting the number of players:</header>
			<div className="playerSelection">
				<Link to="/PlayerColorSelectionForOnePlayer"><div className="numPlayerCircle blue">1 Player</div></Link>
				<Link to="/ConnectFourTwoPlayer"><div class="numPlayerCircle red">2 Players</div></Link>
			</div>
		</div>
	);
}

export default PlayerSelection;