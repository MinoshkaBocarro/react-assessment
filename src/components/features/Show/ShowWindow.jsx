import ShowList from "./ShowList";
import ShowDetail from "./ShowDetail";

import { useContext } from "react";
import { CurrentShowContext } from "../../contexts/CurrentShowContext";

function ShowWindow() {
	const currentShow = useContext(CurrentShowContext);

	return (
		<div className={`show-window ${currentShow.showActive && "open"}`}>
			<ShowList />
			{currentShow.showActive && <ShowDetail />}
		</div>
	);
}

export default ShowWindow;
