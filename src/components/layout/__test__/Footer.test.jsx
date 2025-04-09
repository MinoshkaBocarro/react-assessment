import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

test("renders the footer", () => {
	render(<Footer />);
	const date = screen.getByText("© 2025 The Watchtower");
	expect(date).toBeInTheDocument();
});
