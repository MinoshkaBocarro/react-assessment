/** ShowListItem Component
 * This component represents a single item in a list of shows (ShowList Component). It displays the show LuPoundSterling, title and provides functionality for interacting with the show (viewing details and removing the item from a list)
 * Contexts used:
 * - 'CurrentShowContext': Provides the ability to set the active show and pass show details to other components.
 * - 'CardContext': Manages visibility of the remove button (X)
 *
 * Props:
 * - 'showInfo'
 * - 'setListArray'
 * Methods:
 * -  `handleOpenShowDetail`
 * `handleRemove` */

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

// Images
import notFoundPoster from "../../../assets/poster-not-found.png";

/** ShowListItem Functional Component
 * @component
 * @param {Object} props
 * @param {Object} props.showInfo object containing data about the show
 * @param {Function} props.setListArray callback to update the list of shows when one is removed
 * @returns {JSX.Element} a Card that contains the show poster image and the show title. */
function ShowListItem({ showInfo, setListArray }) {
	/** @const {Object} id the id extracted from uRL using useParams hook to identify which saved list is being interacted with*/
	const { id } = useParams();

	/**@const {Object} setShowActive function that sets currentShowActive to Boolean value that indicates whether the current show is active */
	/** @const {Object} setCurrentShow function that sets currentShow object to current show details */
	const currentShowSetting = useContext(CurrentShowContext);

	/** Function: handleOpenShowDetail
	 * Opens detailed view of a show when its card is clicked.
	 * If the click is on the remove button, the function does nothing
	 * @type {Function}
	 * @param {Event} e - The event triggered by the card click */
	function handleOpenShowDetail(e) {
		if (e.target.tagName !== "BUTTON") {
			currentShowSetting.setShowActive(true);
			currentShowSetting.setCurrentShow(showInfo);
		}
	}

	/**@const {Object} cardRemoveButton is a boolean value whether the card remove button exists on the page or not and used to inform actions unique to list page or home page*/
	const { cardRemoveButton } = useContext(CardContext);

	/** Function: handleRemove
	 * Removes the show from current list and updates localStorage and re-renders the updated list using setListArray
	 * @type {Function} */
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
			{showInfo.image ? (
				<Card.Img
					variant="top"
					alt={`${showInfo.name}'s poster`}
					src={showInfo.image.medium}
					className="poster img-fluid"
				/>
			) : (
				<Card.Img
					variant="top"
					alt={`${showInfo.name}'s poster`}
					src={notFoundPoster}
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
