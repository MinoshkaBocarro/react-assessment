import { useEffect, useState } from "react";
import { Form, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AppButton from "../common/AppButton";

function Sidebar() {
	const [myLists, setMyLists] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem("myLists")) {
			const myListsItem = [
				{ id: uuidv4(), listName: "Favourites", listItems: [] },
				{ id: uuidv4(), listName: "To Watch", listItems: [] },
				{ id: uuidv4(), listName: "Watched", listItems: [] },
			];
			const myListsItemJSON = JSON.stringify(myListsItem);
			localStorage.setItem("myLists", myListsItemJSON);
		}
		const myLists = localStorage.getItem("myLists");
		const myListsParsed = JSON.parse(myLists);
		setMyLists(myListsParsed);
	}, []);

	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	function handleSave() {
		const myListsData = JSON.parse(localStorage.getItem("myLists"));
		const newListsData = [
			...myListsData,
			{ id: uuidv4(), listName: listName, listItems: [] },
		];

		setMyLists(newListsData);
		const myListsItemJSON = JSON.stringify(newListsData);
		localStorage.setItem("myLists", myListsItemJSON);
		handleClose();
	}

	const [listName, setListName] = useState("");

	function handleListNameChange(e) {
		setListName(e.target.value);
	}

	return (
		<div className="sidebar">
			<h2>My Lists</h2>
			<ListGroup variant="flush">
				{myLists.map((item) => {
					return (
						<ListGroup.Item key={item.id}>
							<Link to={`/list/${item.id}`}>{item.listName}</Link>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
			<AppButton onClick={handleShowModal}>&#x2b;</AppButton>

			<Modal show={showModal} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>New List</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						autoFocus
						type="text"
						value={listName}
						onChange={handleListNameChange}
						aria-label="Type your list name here"
						id="list-name"
					/>
				</Modal.Body>
				<Modal.Footer>
					<AppButton variant="secondary" onClick={handleClose}>
						Close
					</AppButton>
					<AppButton variant="primary" onClick={handleSave}>
						Save Changes
					</AppButton>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Sidebar;
