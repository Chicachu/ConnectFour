import {Link} from 'react-router-dom';

function PlayerColorSelectionForOnePlayer() {
	return (
		<div>
			<header className="playerSelectionHeader">Please select the color you would like to play as:</header>
			<div className="playerSelection">
				<Link to="/ConnectFourOnePlayer/blue"><div className="numPlayerCircle blue">Blue</div></Link>
				<Link to="/ConnectFourOnePlayer/red"><div class="numPlayerCircle red">Red</div></Link>
			</div>
		</div>
	);
}

export default PlayerColorSelectionForOnePlayer;