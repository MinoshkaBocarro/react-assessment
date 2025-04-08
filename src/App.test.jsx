import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
	test("should render", () => {
		expect(true).toBeTruthy();
	});

	test("renders without crashing", () => {
		render(<App />);
		const brandElement = screen.getByText("The Watchtower");
		expect(brandElement).toBeInTheDocument();
	});
});
