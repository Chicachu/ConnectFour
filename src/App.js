import logo from './logo.svg';
import './App.css';
import './font/stylesheet.css'
import PlayerSelection from './PlayerSelection/PlayerSelection';
import ConnectFourOnePlayer from './ConnectFour/ConnectFourOnePlayer'
import ConnectFourTwoPlayer from './ConnectFour/ConnectFourTwoPlayer'
import PlayerColorSelectionForOnePlayer from './PlayerSelection/PlayerColorSelectionForOnePlayer'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from "react";

function App() {
  return (
	<div className="App">
		<header className="App-header">Connect Four</header>
		<Router>
			<Routes>
				<Route exact path="/" element={<PlayerSelection />} />
				<Route path="/ConnectFourOnePlayer/:p1color" element={<ConnectFourOnePlayer />} />
				<Route path="/ConnectFourTwoPlayer" element={<ConnectFourTwoPlayer />} />
				<Route path="/PlayerColorSelectionForOnePlayer" element={<PlayerColorSelectionForOnePlayer />} />
			</Routes>
		</Router>
    </div>
  );
}

export default App;
