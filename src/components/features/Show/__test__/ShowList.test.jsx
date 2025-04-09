import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { ShowListContext } from "../../../contexts/ShowListContext";
import { CardContext } from "../../../contexts/CardContext";

import ShowList from "../ShowList";

const listArrayZero = {
	listArray: [],
};

const listArrayTwo = {
	listArray: [
		{ showName: "", id: 1 },
		{ showName: "", id: 2 },
	],
};

const listArraySix = {
	listArray: [
		{ showName: "", id: 1 },
		{ showName: "", id: 2 },
		{ showName: "", id: 3 },
		{ showName: "", id: 4 },
		{ showName: "", id: 5 },
		{ showName: "", id: 6 },
	],
};

const MockShowList = ({ listArray }) => {
	return (
		<CardContext.Provider value={{ cardRemoveButton: false }}>
			<ShowListContext.Provider value={listArray}>
				<ShowList />
			</ShowListContext.Provider>
		</CardContext.Provider>
	);
};

test("Should render 0 list items", () => {
	render(<MockShowList listArray={listArrayZero} />);
	const cardTitles = screen.queryByTestId("showListItem");
	expect(cardTitles).not.toBeInTheDocument();
});

test("Should render 2 list items", () => {
	render(<MockShowList listArray={listArrayTwo} />);
	const cardTitles = screen.getAllByTestId("showListItem");
	expect(cardTitles).toHaveLength(2);
});

test("Should render 6 list items", () => {
	render(<MockShowList listArray={listArraySix} />);
	const cardTitles = screen.getAllByTestId("showListItem");
	expect(cardTitles).toHaveLength(6);
});
