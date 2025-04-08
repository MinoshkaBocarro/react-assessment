function searchArrayId(array, id) {
	const data = array.find((element) => element.id === id);
	return data;
}

function filterArray(array, id) {
	return array.filter((element) => element.id !== id);
}

function updateLocalStorage(
	currentListId,
	showInfo,
	setListArray = false,
	currentPageId = false
) {
	const myListsData = JSON.parse(localStorage.getItem("myLists"));
	const currentListData = searchArrayId(myListsData, currentListId);

	const index = myListsData.findIndex(
		(element) => element.id === currentListId
	);

	const listData = currentListData.listItems;

	const restOfDataStart = myListsData.slice(0, index);
	const restOfDataEnd = myListsData.slice(index + 1, myListsData.length);

	let newListData;

	if (!searchArrayId(listData, showInfo.id)) {
		newListData = [...listData, showInfo];
	} else {
		newListData = filterArray(listData, showInfo.id);
	}

	if (setListArray && currentPageId === currentListId) {
		setListArray(newListData);
	}

	const newCurrentListData = {
		...currentListData,
		listItems: newListData,
	};
	const newListsData = [
		...restOfDataStart,
		newCurrentListData,
		...restOfDataEnd,
	];
	localStorage.setItem("myLists", JSON.stringify(newListsData));
}

export { updateLocalStorage };
