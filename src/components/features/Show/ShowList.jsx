import { Col, Row } from "react-bootstrap";
import ShowListItem from "./ShowListItem";
import { useContext } from "react";
import { ShowListContext } from "../../contexts/ShowListContext";
import { CurrentShowContext } from "../../contexts/CurrentShowContext";

function ShowList() {
	const { listArray, setListArray } = useContext(ShowListContext);

	const currentShow = useContext(CurrentShowContext);

	return (
		<Row className="g-4">
			{listArray.map((show) => (
				<Col
					key={show.id}
					md={currentShow.showActive ? 12 : 3}
					data-testid="showListItem"
					className="d-flex justify-content-center"
				>
					<ShowListItem showInfo={show} setListArray={setListArray} />
				</Col>
			))}
		</Row>
	);
}

export default ShowList;
