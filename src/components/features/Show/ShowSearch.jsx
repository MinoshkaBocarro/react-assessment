import { useState } from "react";

function ShowSearch({ setSearchTerm }) {
	const [searchPlaceholder, setSearchPlaceholder] = useState("");

	function handleSearchChange(e) {
		setSearchPlaceholder(e.target.value);
	}

	function searchShows() {
		setSearchTerm(searchPlaceholder);
	}

	return (
		<div className="show-search">
			<input
				type="search"
				value={searchPlaceholder}
				onChange={handleSearchChange}
				placeholder="TV show…"
				aria-label="Search for a TV Show"
				id="show-search"
			/>
			<button onClick={searchShows}>Search</button>
		</div>
	);
}

export default ShowSearch;
