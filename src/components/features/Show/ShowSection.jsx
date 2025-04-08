import { ShowListContext } from "../../contexts/ShowListContext";
import ShowSearch from "./ShowSearch";
import ShowWindow from "./ShowWindow";

import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

function ShowSection() {
	const [searchTerm, setSearchTerm] = useState("fun");

	const { setListArray } = useContext(ShowListContext);

	const { isLoading, isError, data } = useQuery({
		queryKey: ["shows", searchTerm],
		queryFn: fetchShows,
		keepPreviousData: true,
	});

	async function fetchShows(queryData) {
		const { queryKey } = queryData;
		const res = await fetch(
			`https://api.tvmaze.com/search/shows?q=${queryKey[1]}`
		);
		const data = await res.json();
		return data;
	}

	// setListArray(data);

	useEffect(() => {
		if (!isLoading) {
			const processedData = data.map((element) => element.show);
			setListArray([...processedData]);
		}
	}, [isLoading]);

	console.log(isLoading);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error - {isError.message}</p>;
	}

	return (
		<>
			<ShowSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
			<ShowWindow></ShowWindow>
		</>
	);
}

export default ShowSection;
