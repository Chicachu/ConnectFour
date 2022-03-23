import ConnectFour from './ConnectFour';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {fireEvent} from '@testing-library/react';
import App from '../App';

let container = null;

beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it ("clicking 2 player button goes to 2 player game", () => {
	act(() => {
		render(<App />, container);
	});
	
	act(() => {
		const player2Link = container.querySelector("#player2Link");
		player2Link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	const bluePlayerLabel = document.querySelector("#bluePlayerLabel");
	expect(bluePlayerLabel).toBeInTheDocument();
});

