import { useContext } from "react";
import { CurrentShowContext } from "../../contexts/CurrentShowContext";
import { Card, Col, Row } from "react-bootstrap";
import AppButton from "../../common/AppButton";
import { CardContext } from "../../contexts/CardContext";
import { updateLocalStorage } from "../../../UtilityFunctions";
import { useParams } from "react-router-dom";
import { ShowListContext } from "../../contexts/ShowListContext";

function ShowListItem({ showInfo, setListArray }) {
	const { id } = useParams();

	const currentShowSetting = useContext(CurrentShowContext);

	function handleOpenShowDetail(e) {
		if (e.target.tagName !== "BUTTON") {
			currentShowSetting.setShowActive(true);
			currentShowSetting.setCurrentShow(showInfo);
		}
	}

	const { cardRemoveButton } = useContext(CardContext);

	function handleRemove() {
		updateLocalStorage(id, showInfo, setListArray, id);
	}

	return (
		<Card className="show-item" onClick={handleOpenShowDetail}>
			{cardRemoveButton && (
				<AppButton onClick={handleRemove}>X</AppButton>
			)}
			{showInfo.image && (
				<Card.Img
					variant="top"
					alt={`${showInfo.name}'s poster`}
					src={showInfo.image.medium}
					className="poster img-fluid"
				/>
			)}
			<Card.Body className="d-flex align-items-center justify-content-center h-100">
				<Card.Title className="text-center w-100">
					{showInfo.name}
				</Card.Title>
			</Card.Body>
		</Card>
	);
}

export default ShowListItem;
