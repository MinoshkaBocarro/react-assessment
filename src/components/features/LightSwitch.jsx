// LightSwitch Component

// This component provides a button that allows the user to toggle between dark and light mode for the application. It tracks the times when dark mode is activated and stores these times in local storage. It also adjusts the dark mode based on the average activation time recorded in the local storage.

// State Management:
// - `darkMode`: State used to track if dark mode is on, allowing to toggle between dark and light mode.

// Methods:
// - `toggleDarkMode`
// - `saveTime`

// React Hooks
import { useEffect, useState } from "react";

// Components
import AppButton from "../common/AppButton";

// LightSwitch Functional Component

// Toggles the application's dark mode on or off. The component also tracks the times when dark mode is activated and uses those times to calculate whether dark mode should be activated automatically on page load.
function LightSwitch() {
	const [, setDarkMode] = useState(false);

	// toggles between dark and light mode by changing the body's class name and saving the current time to local storage.
	function toggleDarkMode() {
		// toggle the current dark mode status
		setDarkMode((prevMode) => {
			const nextMode = !prevMode;
			document.body.className = nextMode ? "dark-mode" : "";
			// save the current hour
			saveTime();
			return nextMode;
		});
	}

	// saves the current hour to local storage when dark mode is toggled.
	function saveTime() {
		//  get current date and time
		const now = new Date();

		// retrieve array of times stored
		const darkModeTimes = JSON.parse(
			localStorage.getItem("darkModeTimes") || "[]"
		);

		// add current hour
		darkModeTimes.push(now.getHours());

		// save to localStorage
		localStorage.setItem("darkModeTimes", JSON.stringify(darkModeTimes));
	}

	// on component mount, checks recorded dark mode activation times in local storage and activates dark mode automatically if current time is greater or equal to average dark mode activation times
	useEffect(() => {
		// retrieve array of times stored
		const darkModeTimes = JSON.parse(
			localStorage.getItem("darkModeTimes") || "[]"
		);

		// initialise variable to hold average time
		let averageTime = 0;

		// if there are any recorded dark mode activation times, calculate average activation time
		if (darkModeTimes.length > 0) {
			const averageTotal = darkModeTimes.reduce((previous, current) => {
				return previous + current;
			}, 0);
			averageTime = averageTotal / darkModeTimes.length;
		}

		// get current time
		const now = new Date();

		// if the current hour is greater than or equal to the average time, enable dark mode

		if (now.getHours() >= averageTime) {
			setDarkMode(true);
			document.body.className = "dark-mode";
		}
	}, []);

	return (
		<>
			<AppButton onClick={toggleDarkMode}>Toggle Dark Mode</AppButton>
		</>
	);
}

export default LightSwitch;
