import { useEffect, useState } from "react";
import AppButton from "../common/AppButton";

function LightSwitch() {
	const [, setDarkMode] = useState(false);

	function toggleDarkMode() {
		setDarkMode((prevMode) => {
			const nextMode = !prevMode;
			document.body.className = nextMode ? "dark-mode" : "";
			saveTime();
			return nextMode;
		});
	}

	function saveTime() {
		const now = new Date();
		const darkModeTimes = JSON.parse(
			localStorage.getItem("darkModeTimes") || "[]"
		);
		darkModeTimes.push(now.getHours());

		localStorage.setItem("darkModeTimes", JSON.stringify(darkModeTimes));
	}

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

		console.log("checkingdarkmode");
	}, []);

	return (
		<>
			<AppButton onClick={toggleDarkMode}>Toggle Dark Mode</AppButton>
		</>
	);
}

export default LightSwitch;
