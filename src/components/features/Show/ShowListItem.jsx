// ShowListItem Component

// This component represents a single item in a list of shows (ShowList Component). It displays the show LuPoundSterling, title and provides functionality for interacting with the show (viewing details and removing the item from a list)

// Contexts used:
// - 'CurrentShowContext': Provides the ability to set the active show and pass show details to other components.
// - 'CardContext': Manages visibility of the remove button (X)

// Props:
// 'showInfo'
// 'setListArray'

// Methods:
// -  `handleOpenShowDetail`
// `handleRemove`

// React Hooks
import { useContext } from "react";
import { useParams } from "react-router-dom";

// Bootstrap Components
import { Card } from "react-bootstrap";

// Contexts
import { CurrentShowContext } from "../../contexts/CurrentShowContext";
import { CardContext } from "../../contexts/CardContext";

// Components
import AppButton from "../../common/AppButton";

// Functions
import { updateLocalStorage } from "../../../UtilityFunctions";

// ShowListItem Functional Component

// Displays a show item within a list. The component allows interaction via clicks on the card to view show details, and it also includes a remove button to remove the show from the list.

// @param {Object} showInfo - An object containing show data
// @param {Function} setListArray - A function to update the list of shows after an item is removed
function ShowListItem({ showInfo, setListArray }) {
	// extract 'id' from URL
	const { id } = useParams();

	// access CurrentShowContext
	const currentShowSetting = useContext(CurrentShowContext);

	// opens the detailed view of the show when the card (but not the remove button) is clicked.
	// @param {Event} e - The event triggered by the card click
	function handleOpenShowDetail(e) {
		// Check if the target is not the remove button
		if (e.target.tagName !== "BUTTON") {
			// Set the show as active and pass the show data to the context
			currentShowSetting.setShowActive(true);
			currentShowSetting.setCurrentShow(showInfo);
		}
	}

	// access CurrentShowContext
	// controls whether "X" remove button is displayed.
	const { cardRemoveButton } = useContext(CardContext);

	// handles the removal of the show from the list, updating localStorage and the show list context.
	function handleRemove() {
		updateLocalStorage(id, showInfo, setListArray, id);
	}

	return (
		<Card className="show-item" onClick={handleOpenShowDetail}>
			{/* Conditionally render the remove button if cardRemoval is true */}
			{cardRemoveButton && (
				<AppButton onClick={handleRemove}>X</AppButton>
			)}

			{/* Render the show poster if available */}
			{showInfo.image && (
				<Card.Img
					variant="top"
					alt={`${showInfo.name}'s poster`}
					src={showInfo.image.medium}
					className="poster img-fluid"
				/>
			)}

			<Card.Body className="d-flex align-items-center justify-content-center h-100">
				{/* Display the show name as a title */}
				<Card.Title className="text-center w-100">
					{showInfo.name}
				</Card.Title>
			</Card.Body>
		</Card>
	);
}

export default ShowListItem;
