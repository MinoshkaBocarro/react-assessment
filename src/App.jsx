// Import npm packages
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/ContactPage";
import ListPage from "./pages/ListPage";
import Layout from "./components/layout/Layout";

import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

function App() {
	const queryClient = new QueryClient();

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="list/:id" element={<ListPage />} />
						<Route path="contact" element={<ContactPage />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
