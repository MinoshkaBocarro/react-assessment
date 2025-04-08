import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Header from "../Header";

test("renders the header", () => {
	render(<Header />);
	const homeLink = screen.getByText("Home");
	expect(homeLink).toBeInTheDocument();
});
