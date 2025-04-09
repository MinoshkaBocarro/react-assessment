import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import ContactPage from "../../../pages/ContactPage";

test("should render contact page heading", () => {
	render(<ContactPage />);
	const formElementHeading = screen.getByRole("heading", { level: 2 });
	expect(formElementHeading).toBeInTheDocument();
});

test("should render user text into input element", () => {
	render(<ContactPage />);
	const inputElement = screen.getByLabelText("First Name");
	fireEvent.change(inputElement, { target: { value: "Milk" } });
	expect(inputElement.value).toBe("Milk");
});
