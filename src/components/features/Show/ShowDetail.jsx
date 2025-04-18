import { useContext } from "react";
import { CurrentShowContext } from "../../contexts/CurrentShowContext";
import { format } from "date-fns";
import AppButton from "../../common/AppButton";
import { CardContext } from "../../contexts/CardContext";
import { updateLocalStorage } from "../../../UtilityFunctions";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ShowListContext } from "../../contexts/ShowListContext";
import { useParams } from "react-router-dom";

function ShowDetail() {
	const { id } = useParams();

	const currentShow = useContext(CurrentShowContext);

	function handleClose() {
		currentShow.setShowActive(false);
	}

	const showInfo = currentShow.currentShow;

	function setRunDates() {
		if (showInfo.premiered) {
			const startDate = format(showInfo.premiered, "dd/MM/yyyy");

			if (showInfo.ended) {
				const endDate = format(showInfo.ended, "dd/MM/yyyy");
				return `${startDate} - ${endDate}`;
			}

			return `${startDate} - `;
		}

		if (showInfo.showStatus === "Ended") {
			return "Ended";
		}

		return "Coming Soon";
	}

	const { cardRemoveButton } = useContext(CardContext);

	function handleToggleFavourite() {
		const myListsData = getListsArray();
		const favouritesId = myListsData[0].id;
		if (cardRemoveButton) {
			updateLocalStorage(favouritesId, showInfo, setListArray, id);
		} else {
			updateLocalStorage(favouritesId, showInfo);
		}
	}

	function handleToggleListItem(listId) {
		if (cardRemoveButton) {
			updateLocalStorage(listId, showInfo, setListArray, id);
		} else {
			updateLocalStorage(listId, showInfo);
		}
	}

	function getListsArray() {
		const listArray = JSON.parse(localStorage.getItem("myLists"));
		return listArray;
	}

	const { setListArray } = useContext(ShowListContext);

	// Render if non existent

	return (
		<div className="show-detail">
			<div className="show-detail-content">
				{showInfo.image?.original ? (
					<img
						alt={`${showInfo.name}'s poster`}
						src={showInfo.image.original}
						className="poster"
					/>
				) : (
					<img
						alt={`${showInfo.name}'`}
						// src={showInfo.image.medium}
						//Add default poster here
						className="poster"
					/>
				)}
				<AppButton onClick={handleClose}>X</AppButton>
				<div className="show-detail-right">
					<h2>{showInfo.name}</h2>
					<div className="add-buttons">
						<AppButton onClick={handleToggleFavourite}>
							&#9829;
						</AppButton>
						<DropdownButton id="dropdown-basic-button" title="">
							{getListsArray().map((list) => (
								<Dropdown.Item
									key={list.id}
									onClick={() =>
										handleToggleListItem(list.id)
									}
								>
									{list.listName}
								</Dropdown.Item>
							))}
						</DropdownButton>
					</div>
					<p className="summary">
						{showInfo.summary &&
							showInfo.summary.replace(/<[^>]*>/g, "")}
					</p>
					<p>
						<b>Genres:</b>{" "}
						{showInfo.genres &&
							showInfo.genres
								.map((genre) => `${genre}`)
								.join(", ")}
					</p>
					<p>
						<b>Language:</b>{" "}
						{showInfo.language && showInfo.language}
					</p>
					<p>
						<b>Rating: </b>
						{showInfo.rating.average
							? `${showInfo.rating.average * 10}%`
							: " NA"}
					</p>
					<p>
						<b>Runtime:</b>{" "}
						{showInfo.runtime && `${showInfo.runtime} minutes`}
					</p>
					<p>
						<b>Run Dates: </b>
						{setRunDates()}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ShowDetail;
