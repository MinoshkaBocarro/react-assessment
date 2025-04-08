import ShowWindow from "../components/features/Show/ShowWindow";
import { CardContext } from "../components/contexts/CardContext";

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShowListContext } from "../components/contexts/ShowListContext";

function ListPage() {
	const { id } = useParams();

	const { setCardRemoveButton } = useContext(CardContext);

	const { setListArray } = useContext(ShowListContext);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("myLists"));
		console.log(data);
		setListArray(
			data.find((element) => {
				console.log(element.id === id);
				return element.id === id;
			}).listItems
		);
		setCardRemoveButton(true);
		return () => {
			setCardRemoveButton(false);
		};
	}, [id]);

	return (
		<>
			<div>listpageeeee</div>
			<ShowWindow></ShowWindow>
		</>
	);
}

export default ListPage;
