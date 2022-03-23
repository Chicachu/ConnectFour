import {Link} from 'react-router-dom';

function PlayerColorSelectionForOnePlayer() {
	return (
		<div>
			<header className="playerSelectionHeader" id="playerSelectionHeader">Please select the color you would like to play as:</header>
			<div className="playerSelection">
				<Link to="/ConnectFourOnePlayer/blue" id="blueLink"><div className="numPlayerCircle blue">Blue</div></Link>
				<Link to="/ConnectFourOnePlayer/red" id="redLink"><div className="numPlayerCircle red">Red</div></Link>
			</div>
			<Link to='/'><button id="return">Return to Number of Players Selection</button></Link>
		</div>
	);
}

export default PlayerColorSelectionForOnePlayer;