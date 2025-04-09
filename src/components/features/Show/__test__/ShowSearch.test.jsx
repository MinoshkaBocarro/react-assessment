import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import ShowSearch from "../ShowSearch";

const MockShowSearch = () => {};

test("has a search input", () => {
	render(<ShowSearch />);
	const searchInput = screen.getByRole("searchbox");
	expect(searchInput).toBeInTheDocument();
});
