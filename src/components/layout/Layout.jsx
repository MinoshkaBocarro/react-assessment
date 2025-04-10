import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { CurrentShowContext } from "../contexts/CurrentShowContext";
import { CardContext } from "../contexts/CardContext";
import { ShowListContext } from "../contexts/ShowListContext";

import { Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
	const [currentShow, setCurrentShow] = useState({});
	const [showActive, setShowActive] = useState(false);

	const [listArray, setListArray] = useState([]);

	const [cardRemoveButton, setCardRemoveButton] = useState(false);

	return (
		<div id="app">
			<Header id="header" />
			<Sidebar />
			<div id="app-content">
				<ShowListContext.Provider value={{ listArray, setListArray }}>
					<CurrentShowContext.Provider
						value={{
							currentShow,
							setCurrentShow,
							showActive,
							setShowActive,
						}}
					>
						<CardContext.Provider
							value={{ cardRemoveButton, setCardRemoveButton }}
						>
							<Outlet />
						</CardContext.Provider>
					</CurrentShowContext.Provider>
				</ShowListContext.Provider>
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
