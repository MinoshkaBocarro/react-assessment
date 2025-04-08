import { Col, Row } from "react-bootstrap";
import ShowListItem from "./ShowListItem";
import { useContext } from "react";
import { ShowListContext } from "../../contexts/ShowListContext";

function ShowList() {
	const { listArray, setListArray } = useContext(ShowListContext);

	return (
		<Row className="g-4">
			{listArray.map((show) => (
				<Col key={show.id} xs={12}>
					<ShowListItem showInfo={show} setListArray={setListArray} />
				</Col>
			))}
		</Row>
	);
}

export default ShowList;
