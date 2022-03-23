import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
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

it("clicking 1 player button goes to color selection", () => {
	act(() => {
		render(<App />, container);
	});
	
	act(() => {
		const player1Link = document.querySelector("#player1Link");
		player1Link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	const playerSelectionHeader = document.querySelector("#playerSelectionHeader");
	expect(playerSelectionHeader.textContent).toBe("Please select the color you would like to play as:");
});

it("clicking blue sets player 1 as blue player, and computer as red player", () => {
	act(() => {
		render(<App />, container);
	});
	
	act(() => {
		const bluePlayerLink = document.querySelector("#blueLink");
		bluePlayerLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	const player1Header = document.querySelector("#player1Header");
	expect(player1Header.textContent).toBe("You are player 1, the blue player.");
	
	const computerHeader = document.querySelector("#computerHeader");
	expect(computerHeader.textContent).toBe("The computer is player 2, the red player.");
});

it("human player has first turn", () => {
	act(() => {
		render(<App />, container);
	});
	
	const message = document.querySelector("#message");
	expect(message.textContent).toBe("It is now the blue player's turn!");
});

it("player clicks on a column and a piece goes to the bottom of that column", () => {
	act(() => {
		render(<App />, container);
	});
	
	act(() => {
		const row2Col3 = document.querySelector("#row-2-col-3");
		debugger;
		row2Col3.dispatchEvent(new MouseEvent("click", { bubbles: true }))
	})
	
	const row5Col3 = document.querySelector("#row-5-col-3");
	expect(row5Col3.firstChild.className).toBe("blueCell");
});


/*if("clicking a cell calls take turn function", () => {
	
});

it("after player takes their first turn, computer places piece in 3rd column", () => {
	act(() => {
		render(<App />, container);
	});
	
	const row4Col3 = document.querySelector("#row-4-col-3");
	expect(row4Col3.firstChild.className).toBe("redCell");
});


// TODO make sure to go back to player selection before running this test. 

it ("clicking red sets player 1 as the red player", () => {
	act(() => {
		render(<App />, container);
	});
	
	act(() => {
		const redPlayerLink = document.querySelector("#redLink");
		redPlayerLink.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	
	const player1Header = document.querySelector("#player1Header");
	expect(player1Header).toBe("You are player 1, the red player.");
	
	const computerHeader = document.querySelector("#computerHeader");
	expect(computerHeader).toBe("The computer is player 2, the blue player.");
});
*/