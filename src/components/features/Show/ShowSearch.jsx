import { useState } from "react";
import { Form } from "react-bootstrap";
import AppButton from "../../common/AppButton";

function ShowSearch({ setSearchTerm }) {
	const [searchPlaceholder, setSearchPlaceholder] = useState("");

	function handleSearchChange(e) {
		setSearchPlaceholder(e.target.value);
	}

	function searchShows() {
		setSearchTerm(searchPlaceholder);
	}

	return (
		<div className="show-search d-flex">
			<Form.Control
				type="search"
				placeholder="TV show…"
				className="me-1"
				aria-label="Search for a TV Show"
				value={searchPlaceholder}
				onChange={handleSearchChange}
				id="show-search"
			/>
			<AppButton onClick={searchShows}>Search</AppButton>
		</div>
	);
}

export default ShowSearch;
