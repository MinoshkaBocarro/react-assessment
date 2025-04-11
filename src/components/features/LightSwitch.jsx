/** LightSwitch Component
 *
 * This component provides a button that allows the user to toggle between dark and light mode for the application. It tracks the times when dark mode is activated and stores these times in local storage. It also adjusts the dark mode based on the average activation time recorded in the local storage.
 *
 * State Management:
 * - darkMode: State used to track if dark mode is on, allowing to toggle between dark and light mode.
 * Methods:
 * - toggleDarkMode
 * - saveTime */

// React Hooks
import { useEffect, useState } from "react";

// Components
import AppButton from "../common/AppButton";

/** LightSwitch Functional Component
 * @component
 * @returns {JSX.Element} a button that toggles dark mode and auto-activates based on usage. */
function LightSwitch() {
	/** Property: setDarkMode
	 * Used to update the state that controls whether dark mode is enabled. Actual state value not needed
	 * @type {Function}
	 */
	const [, setDarkMode] = useState(false);

	/** Function: toggleDarkMode
	 * Toggles dark mode by updating the body class and storing the current activation time.
	 * Called when user clicks the "Toggle Dark Mode button"
	 * @type {Function}
	 * @return {string}
	 */
	function toggleDarkMode() {
		setDarkMode((prevMode) => {
			const nextMode = !prevMode;
			document.body.className = nextMode ? "dark-mode" : "";
			saveTime();
			return nextMode;
		});
	}

	/** Function: saveTime
	 * Saves the current hour to localStorage under "darkModeTimes"
	 * @type {Function}
	 */
	function saveTime() {
		const now = new Date();

		const darkModeTimes = JSON.parse(
			localStorage.getItem("darkModeTimes") || "[]"
		);

		darkModeTimes.push(now.getHours());

		localStorage.setItem("darkModeTimes", JSON.stringify(darkModeTimes));
	}

	/** Hook: useEffect
	 * on component mount, checks recorded dark mode activation times in local storage and activates dark mode automatically if current time is greater or equal to average dark mode activation times
	 */
	useEffect(() => {
		const darkModeTimes = JSON.parse(
			localStorage.getItem("darkModeTimes") || "[]"
		);

		let averageTime = 0;

		if (darkModeTimes.length > 0) {
			const averageTotal = darkModeTimes.reduce((previous, current) => {
				return previous + current;
			}, 0);
			averageTime = averageTotal / darkModeTimes.length;
		}

		const now = new Date();

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
